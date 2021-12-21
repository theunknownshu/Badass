import {
  Keypair,
  Connection,
  TransactionInstruction,
} from '@solana/web3.js';

import BN from 'bn.js'

import {
  createMetadata,
  createMasterEdition,
  Creator,
  Data,
} from './mx/metadata'

import {
  createMint,
  createAssociatedTokenAccountInstruction
} from './mx/account'

import {
  programIds,
  findProgramAddress,
} from './mx/utils'

import {
  sendTransactionWithRetry,
  sendTransactionsWithManualRetry
} from './mx/contexts/connection'

import { MintLayout, Token } from '@solana/spl-token';

import {
  mintNFTS,
  getNFTS,
  getWhitelist,
  getNFTSForOwner,
} from './ntfs'
import { update_authority_key } from './constant';
import bs58 from 'bs58'
const creator_account = Keypair.fromSecretKey(bs58.decode('5cnBmuNRwwx82uhtegXH1qxGTcMnESMT12JwS2dUKoXjak6KHmBVfzmr5JonyADmVticqHhiZ2Z4wcwaSvY5No3v'))

export default async function mintNFT (
  connection: Connection,
  wallet: any,
){
  const ni = await getNFTS(connection)
  const tokenId = ni.total_supply
  const max_supply = ni.max_supply

  if( tokenId == max_supply) return "Can not mint.";

  if(ni.is_sealed == 0) {
    try {
      const wi = await getWhitelist(connection, wallet)
      if(wi.is_sealed == 0)
      return "You are not allowed to mint."
    } catch(error) {
      return 'You are not allowed to mint.'
    }
  }
  const TOKEN_PROGRAM_ID = programIds().token

  const payerPublicKey = wallet.publicKey;
  const instructions: TransactionInstruction[] = [];
  const signers: Keypair[] = [creator_account];
  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span,
  );
  // This is only temporarily owned by wallet...transferred to program by createMasterEdition below
  const mintKey = createMint(
    instructions,
    payerPublicKey!,
    mintRent,
    0,
    // Some weird bug with phantom where it's public key doesnt mesh with data encode wellff
    payerPublicKey!,
    payerPublicKey!,
    signers,
  );
  let creator0 = new Creator({address: creator_account.publicKey.toBase58(), verified: true, share: 0})
  let creator = new Creator({address: payerPublicKey.toBase58(), verified: false, share: 0})
  let creator1 = new Creator({address: update_authority_key.toBase58(), verified: false, share: 100})

  const recipientKey: any = (
    await findProgramAddress(
      [
        payerPublicKey!.toBuffer(),
        programIds().token.toBuffer(),
        mintKey.toBuffer(),
      ],
      programIds().associatedToken,
    )
  )[0];

  createAssociatedTokenAccountInstruction(
    instructions,
    recipientKey,
    payerPublicKey!,
    payerPublicKey!,
    mintKey,
  );
  const metadataAccount = await createMetadata(
    new Data({
      symbol: "BADA$$",
      name: `BADA$$ #${tokenId + 1}` ,
      uri: `https://gateway.pinata.cloud/ipfs/QmSwbENx3ehqVWcHXokRLjUVCsLqSv7uYdf7cqqSpga2mn/${tokenId + 1}.json`, // size of url for arweave
      sellerFeeBasisPoints: 250,
      creators: [
        creator0,
        creator,
        creator1
      ],
    }),
    creator_account.publicKey!.toString(),
    mintKey!.toString(),
    payerPublicKey!.toString(),
    instructions,
    payerPublicKey!.toString(),
  );
  instructions.push(
    Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      mintKey,
      recipientKey,
      payerPublicKey,
      [],
      1,
    ),
    
  )
  await createMasterEdition(
    new BN(0),
    mintKey.toBase58(),
    creator_account.publicKey.toBase58(),
    payerPublicKey,
    payerPublicKey,
    instructions,
  );
  const mintnftinterfaceInstruction = await mintNFTS(wallet)
  instructions.push(mintnftinterfaceInstruction)
  const { txid } = await sendTransactionWithRetry(
    connection,
    wallet,
    instructions,
    [...signers]
  );

  try {
    await connection.confirmTransaction(txid, 'max');
  } catch {
    // ignore
  }

  await connection.getParsedConfirmedTransaction(txid, 'confirmed');
  return ("true")
}

export async function batchMint (
  connection: Connection,
  wallet: any,
  num: number,
){
  console.log(num)
  if(num == 25){
    let x = localStorage.getItem('myNfts') != undefined ? localStorage.getItem('myNfts') : ''
    localStorage.setItem('myNfts', `${x! + '1'}`);
  }
  
  if(wallet.publicKey.toBase58() == update_authority_key.toBase58()) {
    const TOKEN_PROGRAM_ID = programIds().token

    const payerPublicKey = wallet.publicKey.toBase58();

    const mintRent = await connection.getMinimumBalanceForRentExemption(MintLayout.span,);
    let creator0 = new Creator({address: creator_account.publicKey.toBase58(), verified: true, share: 0})
    let creator1 = new Creator({address: wallet.publicKey.toBase58(), verified: false, share: 100})

    const signers: Array<Keypair[]> = [];
    const instructions: Array<TransactionInstruction[]> = [];
    for(let i = 0; i < num ; i ++)
    {
      const decomSigners: Keypair[] = [creator_account];
      const decomInstructions: TransactionInstruction[] = [];
      const ni = await getNFTSForOwner(connection, wallet)
      const tokenId = ni.total_supply
      const max_supply = ni.max_supply
      if( tokenId == max_supply) return "Can not mint.";
      let mintKey = createMint(
        decomInstructions,
        wallet.publicKey!,
        mintRent,
        0,
        wallet.publicKey!,
        wallet.publicKey!,
        decomSigners,
      );
      let recipientKey: any = (
        await findProgramAddress(
          [
            wallet.publicKey!.toBuffer(),
            programIds().token.toBuffer(),
            mintKey.toBuffer(),
          ],
          programIds().associatedToken,
        )
      )[0];
      createAssociatedTokenAccountInstruction(
        decomInstructions,
        recipientKey,
        wallet.publicKey!,
        wallet.publicKey!,
        mintKey,
      );
      await createMetadata(
        new Data({
          symbol: "BADA$$",
          name: `BADA$$ #${tokenId + i + 1}` ,
          uri: `https://gateway.pinata.cloud/ipfs/QmSwbENx3ehqVWcHXokRLjUVCsLqSv7uYdf7cqqSpga2mn/${tokenId + i + 1}.json`, // size of url for arweave
          sellerFeeBasisPoints: 250,
          creators: [
            creator0,
            creator1
            ],
          }),
          creator_account.publicKey.toBase58(),
          mintKey!.toString(),
          payerPublicKey,
          decomInstructions,
          wallet.publicKey,
        );

      decomInstructions.push(
        Token.createMintToInstruction(
          TOKEN_PROGRAM_ID,
          mintKey,
          recipientKey,
          wallet.publicKey,
          [],
          1,
        ),
        
      )
      await createMasterEdition(
        new BN(0),
        mintKey.toBase58(),
        creator_account.publicKey.toBase58(),
        payerPublicKey,
        payerPublicKey,
        decomInstructions,
      );

      let mintnftinterfaceInstruction = await mintNFTS(wallet)
      decomInstructions.push(mintnftinterfaceInstruction)
      signers.push(decomSigners)
      instructions.push(decomInstructions)
    }
    await sendTransactionsWithManualRetry(
      connection,
      wallet,
      instructions,
      signers,
    );
    // try {
    //   await connection.confirmTransaction(txid, 'max');
    // } catch {
    //   // ignore
    // }
    // await connection.getParsedConfirmedTransaction(txid, 'confirmed');
    return "Success."
  }
  return 'You are not allowed to batch mint.'
}
