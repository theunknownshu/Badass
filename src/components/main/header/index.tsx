import './index.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { BsDiscord, BsTwitter, BsWallet } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Grow } from '@mui/material';
export default function Header() {
  return (
    <div>
      <div id="navbar">

          {/* <Link to='/about' className='link-logo'>
            About
          </Link> */}
          <a className="link-logo" href="#about">About</a>
          <a className='link-logo' href='https://docs.google.com/spreadsheets/d/e/2PACX-1vSP3bZjRc-ub5ayCePzdWfvzEntyaZE613n8U2X_M8p6Z0eicaCkOoAPsvB48Zi_ttXtn2zLC_DscHd/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false' target="_blank" >Rarity</a>
        <div id="navbar-right">
          <a className="icons" href="https://twitter.com/BadAssKangaroos" target="_blank" > <BsTwitter/> </a>
          <a href="https://discord.gg/VZYJu2qgqK" target="_blank" className='icons'> <BsDiscord/> </a>
             
        </div>
      </div>
      <div className='fixed-wallet'>
            <WalletMultiButton/>
          </div> 
          <br></br>
    </div>
  );
}
