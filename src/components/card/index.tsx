import * as React from 'react';
import './index.css'
import { Grow } from '@mui/material';

export default function Card(props:{img:string, checked: boolean, timeout:number}) {
  return (
    <Grow in={props.checked} style={{ transformOrigin: '0 0 0' }} {...(props.checked ? { timeout: props.timeout } : {})}>
      <img className='rounded-image' src={props.img} alt="Avatar"/>    
  </Grow>
  );
}
