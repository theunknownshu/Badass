import './App.css';
import {
  BrowserRouter as Router,  Route, Switch
} from "react-router-dom";
import { useState, useEffect } from 'react'
import * as web3 from '@solana/web3.js';

import { getPhantomWallet, getSolflareWallet, getSolletExtensionWallet, getSolletWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './wallets/styles.css'
import About from './components/about'
import Main from './components/main'
import Detail from './components/detail'
// import ArtView from './components/artView'

const wallets = [
  getPhantomWallet(),
  getSolflareWallet(),
  getSolletWallet(),
  getSolletExtensionWallet(),
]

const { clusterApiUrl } = web3
const network = clusterApiUrl('mainnet-beta');

function CombineApp() {
  const [can_mint, setCanMint] = useState(false)
  const [remainTime, setRemainTime] = useState(0)
  let currentLocalTime = new Date();
  const timeoffset = (currentLocalTime.getTimezoneOffset())*60
  useEffect(() => {
    let launchTime = new Date("November 25, 2021 22:00:00");
    let currentTime = new Date();
    console.log(currentTime)
    setRemainTime(Math.floor((launchTime.getTime()/1000-timeoffset-currentTime.getTime()/1000)))
  }, [])

  useEffect(() => {
    let timerID = setInterval( () => setRemainTime(remainTime - 1), 1000 );
    return () => clearInterval(timerID) 
   });
  
  function formatTime(timestamp: any) {
    let days = Math.floor(timestamp/(60 * 24 * 60));
    let hours = Math.floor((timestamp - days* 24 * 60 * 60)/3600);
    let mins = Math.floor((timestamp-days*60*24*60 - hours*60*60)/60);
    let seconds = Math.floor((timestamp-days*60*24*60 - hours*60*60 - mins*60))
    if(timestamp < 0 )
    {
      if(!can_mint) setCanMint(true)
      return ""
    }
    let res = days +':'+hours+':'+mins+':' + seconds 
    return res;
  }


  return (
    <>
    <div className='time-header'>
      <h1 className="link-logo time-header-text" dangerouslySetInnerHTML={{__html: formatTime(remainTime)}} />
    </div>
      <Main can_mint={can_mint}/>
      <About />
      <Detail/>
      <p className="footer-p">&copy; 2021 Bada$$Kangaroos. All rights reserved.</p>
    </>
  )
}

function App() {
  return (
    <Router>
      <Switch >
        <Route exact path='/' component={Main}/>
        <Route path="/about" component={About}/>
        <Route path='/detail' component={Detail}/>
        {/* <Route path='/ArtView' component={ArtView}/> */}
      </Switch>
    </Router>
  )
}

/* wallet configuration as specified here: https://github.com/solana-labs/wallet-adapter#setup */
const AppWithProvider = () => (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} >
        <WalletModalProvider>

          <CombineApp/>

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
)

export default AppWithProvider;