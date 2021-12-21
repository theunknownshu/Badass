import './index.css'
import { Grow } from '@mui/material';
import { IoDiamond } from 'react-icons/io5'
import { AiFillContacts } from 'react-icons/ai'
import { CgCommunity } from 'react-icons/cg'
import { GiRoyalLove, GiKangaroo } from 'react-icons/gi'

export default function CardDetail(props:{title:string, details: string, checked: boolean, timeout:number}) {
  return (
    <Grow in={props.checked} style={{ transformOrigin: '0 0 0' }} {...(props.checked ? { timeout: props.timeout } : {})}>
      <div className="detail-card">
          <span className='icons-card'>{
            props.title === 'Rarity' ? <GiKangaroo/> : props.title === 'Club' ? <IoDiamond/>: props.title === 'Ownership' ? <AiFillContacts/> : props.title === 'Royalty' ?  <GiRoyalLove/>: <CgCommunity/>
          }</span>   
        <h3 className="detail-title">{props.title}</h3>   
        <p className='detail-p'>{props.details}</p>
      </div>
    </Grow>
  );
}
