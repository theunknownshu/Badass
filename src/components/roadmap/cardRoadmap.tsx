import './index.css'
import { Grow } from '@mui/material';
import { RiShieldCheckFill } from 'react-icons/ri'

export default function CardRoadmap(props:{stage:string, title:string, details: string, checked: boolean, timeout:number}) {
  return (
    <Grow in={props.checked} style={{ transformOrigin: '0 0 0' }} {...(props.checked ? { timeout: props.timeout } : {})}>
      <div className="roadmap-card">
        <h2 className='roadmap-stage'>{props.stage}</h2>
          <RiShieldCheckFill className='icons-roadmap'/> 
        <h3 className="roadmap-title">{props.title}</h3>
         
        <p className='roadmap-p'>{props.details}</p>
      </div>
    </Grow>
  );
}
