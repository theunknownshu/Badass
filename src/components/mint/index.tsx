import { useEffect, useState } from "react";

import './index.css'
import {
  getBalanceOf,
  getNFTS
} from '../../utils/ntfs'
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import mintNFT, {batchMint} from "../../utils/nft";
import { update_authority_key } from "../../utils/constant";

export default function Mint(
  props:{
    can_mint: boolean
  }
) {
  const wallet = useWallet()
  const connection = useConnection()
  const [balance, setBalance] = useState(0.00)
  const [mintLoading, setMintLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [isOwner, setIsOwner] = useState(false)
  const [total_supply, setTotalSupply] = useState(0)
  const [token_price_per_nft, setTokenPricePerNft] = useState(0.00)
  const [max_supply, setMaxSupply] = useState(0)
  const [owner_nfts, setOwnerNfts] = useState('')
  useEffect(() => {
    getBalanceOfWallet()
    getTotalSupply()
    if (wallet.connected && wallet.publicKey?.toBase58() == update_authority_key.toBase58())
      setIsOwner(true)
    else setIsOwner(false)
    let x = localStorage.getItem('myNfts') != undefined ? localStorage.getItem('myNfts') : ''
    setOwnerNfts(x!)
  })

  const getTotalSupply = async() => {
    try{
      let to = await getNFTS(connection.connection)
      setTotalSupply(to.total_supply)
      setTokenPricePerNft(to.token_price_per_nft)
      setMaxSupply(to.max_supply)
    } catch (error) {
      setTotalSupply(0)
      console.log(error)
    }
  }

  const getBalanceOfWallet = async()=> {
    try {
      const balanceof = await getBalanceOf(connection.connection, wallet.publicKey!)
      setBalance((balanceof)/1e9)
    } catch (error) {
      setStatus("")
    }
  }

  const mint = async() => {
    if(wallet.connected) {
      setMintLoading(true);
      setStatus("")
      try {
        let mintStatus = await mintNFT(connection.connection, wallet)
        if (mintStatus != 'true') setStatus(mintStatus)
        else setStatus("Success.")
        setMintLoading(false)
      } catch(error) {
        setStatus("Something went wrong.")
        console.log(error)
        setMintLoading(false)
      }
    }
  }

  const batchmint = async(num: number) => {
    if(wallet.connected) {
      setMintLoading(true);
      setStatus("")
      try {
        let mintStatus = await batchMint(connection.connection, wallet, num)
        if (mintStatus != 'true') setStatus(mintStatus)
        else setStatus("Success.")
        setMintLoading(false)
      } catch(error) {
        setStatus("Something went wrong.")
        console.log(error)
        setMintLoading(false)
      }
    }
  }

  return(
    <div className="Minter">
      <div className='mintArea'>
          <h2 className='mint-min1'>Total Minted: {total_supply}/ {max_supply}</h2>
          <div className='progress'>
            <span className="progress-bar" style={{width: `${total_supply * 100 / max_supply}%`}}></span>
          </div>
          <div style={{padding: '10px 0px'}}>
            <h3>Wallet Balance <span style={{float: "right"}}>{(balance).toFixed(4)} SOL </span></h3>
          </div>
          <div style={{padding: '10px 0px'}}>
            <h3>Mint Price <span style={{float: "right"}}>{token_price_per_nft} SOL</span></h3>
          </div>
          { 
          wallet.connected ? 
          ( !isOwner ?
              mintLoading?
                <button id="mintButton" disabled onClick={() => mint()} >
                  Wait a minute.
                </button>
                :
                <button id="mintButton" onClick={() => mint()} disabled={!props.can_mint}>
                  Mint
                </button>
              :
              mintLoading?
              <>
                <button id="mintButton" disabled  >
                  wait a few minutes
                </button>
              </>
              :
              <>
                <button id="mintButton2" onClick={() => batchmint(1)} >
                  Mint
                </button>
                {owner_nfts.length != 4 ?
                <button id="mintButton2" onClick={() => batchmint(25)} >
                  Reserve {owner_nfts.length != undefined ? owner_nfts.length * 25 : 0}
                </button> 
                : <button id="mintButton2" onClick={() => batchmint(25)} disabled >
                  Reserve {owner_nfts.length != undefined ? owner_nfts.length * 25 : 0}
                </button> }
              </>
          ) 
          : (<button id="mintButton" disabled onClick={() => mint()}>
              Connect your wallet.
            </button>)
          }
      </div>
      <p id="status" style={{ color: "white" }}>
        {status}
      </p>
    </div>
  )
}