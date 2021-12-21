import { 
  SystemProgram, 
  TransactionInstruction, 
  Connection, 
  PublicKey, 
} from '@solana/web3.js'
import BN from "bn.js"
import { deserialize, serialize } from 'borsh'
import {
  update_authority_key,
  fee_receiver_key,
  programId,
  NFTINTERFACEPREFIX,
  WHITELISTPREFIX,
} from './constant'

class MintArgs {
  instruction = new BN(2)
  constructor() {
  }
}

class Whitelist {
  is_sealed
  constructor(args:{
    is_sealed: boolean
  }) {
    this.is_sealed = args.is_sealed
  }
}

class NFTInterface {
  token_price_per_nft
  max_supply
  total_supply 
  update_authority_key
  fee_receiver_key
  is_sealed
  constructor(args: {
    token_price_per_nft: any,
    max_supply: number,
    total_supply: number,
    update_authority_key: number,
    fee_receiver_key: number,
    is_sealed: boolean
  }) {
      this.token_price_per_nft = args.token_price_per_nft / (10 ** 9)
      this.max_supply = args.max_supply
      this.total_supply = args.total_supply
      this.update_authority_key = args.update_authority_key
      this.fee_receiver_key = args.fee_receiver_key
      this.is_sealed = args.is_sealed
  }
}

const NFT_INTERFACE_SCHEMA = new Map<any, any>([
  [
    MintArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
      ],
    },
  ],
  [
    NFTInterface,
    {
      kind:'struct',
      fields: [
        ['token_price_per_nft', 'u64'],
        ['max_supply', 'u16'],
        ['total_supply', 'u16'],
        ['update_authority_key', 'u256'],
        ['fee_receiver_key', 'u256'],
        ['is_sealed', 'u8']
      ]
    }
  ],
  [
    Whitelist,
    {
      kind:'struct',
      fields: [
        ['is_sealed', 'u8']
      ]
    }
  ],
])

export const mintNFTS = async(
  wallet: any,
) => {

  const nft_interface_account_key = await PublicKey.findProgramAddress(
      [
          Buffer.from(NFTINTERFACEPREFIX),
          programId.toBuffer(),
          update_authority_key.toBuffer(),
      ],
      programId
  )
  const mvalue = new MintArgs()
  const mtxnData = Buffer.from(serialize(NFT_INTERFACE_SCHEMA, mvalue))

  const minstruction = new TransactionInstruction({
      keys: [
          {pubkey:nft_interface_account_key[0], isSigner: false, isWritable: true},
          {pubkey:update_authority_key, isSigner: false, isWritable: false},
          {pubkey:fee_receiver_key, isSigner: false, isWritable: true},
          {pubkey:wallet.publicKey, isSigner: true, isWritable: true},
          {pubkey:SystemProgram.programId, isSigner: false, isWritable: false},
      ],
      programId: programId,
      data: mtxnData,
  })
  return minstruction
}

export const getNFTS = async(
  conn: Connection,
) => {
  const nft_interface_account_key = await PublicKey.findProgramAddress(
    [
        Buffer.from(NFTINTERFACEPREFIX),
        programId.toBuffer(),
        update_authority_key.toBuffer(),
    ],
    programId
  )
  const accountInfo = await conn.getAccountInfo(nft_interface_account_key[0])
  if (accountInfo === null) {
    throw 'Error: cannot find the account'
  }
  const ni = deserialize(
      NFT_INTERFACE_SCHEMA,
      NFTInterface,
      accountInfo.data,
  )
  return ni
} 

export const getNFTSForOwner = async(
  conn: Connection,
  wallet: any
) => {
  const nft_interface_account_key = await PublicKey.findProgramAddress(
    [
        Buffer.from(NFTINTERFACEPREFIX),
        programId.toBuffer(),
        wallet.publicKey.toBuffer(),
    ],
    programId
  )
  const accountInfo = await conn.getAccountInfo(nft_interface_account_key[0])
  if (accountInfo === null) {
    throw 'Error: cannot find the account'
  }
  const ni = deserialize(
      NFT_INTERFACE_SCHEMA,
      NFTInterface,
      accountInfo.data,
  )
  return ni
} 

export const getWhitelist = async(
  conn: Connection,
  wallet: any
) => {
  const whitelist_account_key = await PublicKey.findProgramAddress(
    [
        Buffer.from(WHITELISTPREFIX),
        programId.toBuffer(),
        update_authority_key.toBuffer(),
        wallet.publicKey.toBuffer()
    ],
    programId
)
  const accountInfo = await conn.getAccountInfo(whitelist_account_key[0])
  if (accountInfo === null) {
    throw 'Error: cannot find the account'
  }

  const whi = deserialize(
      NFT_INTERFACE_SCHEMA,
      Whitelist,
      accountInfo.data,
  )
  return whi
} 

export const getBalanceOf = async( 
  conn: Connection,
  wallet: PublicKey,
) => {
  const balanceinfo = await conn.getBalance(wallet)
  return balanceinfo
} 