import './index.css'
import { BsDiscord, BsTwitter } from 'react-icons/bs'
export default function Header() {
  return (
    <div className='container'>
      <div className='col-6 icons-cont'>
        <a className="icons" href="#home" > <BsTwitter/> </a>
      </div>
      <div className='col-6 icons-cont'>
        <a href="#contact" className='icons'> <BsDiscord/> </a>
      </div>
    </div>
  );
}
