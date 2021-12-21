import './index.css'
import { Grow } from '@mui/material';
import React, { useState } from 'react';
import {AiOutlinePlus} from 'react-icons/ai'

export default function CardFaq(props:{ title:string, details:string, checked:boolean, timeout:number}) {
  const [activePanel, setActivePanel] = useState(false);
  const divStyle= {
    display: activePanel? "block" : "none"
  }
  return (
    <Grow in={props.checked} style={{ transformOrigin: '0 0 0' }} {...(props.checked ? { timeout: props.timeout } : {})}>
      <div>
        <h2 className='roadmap-stage'>
        <button className="accord-button" onClick={() => setActivePanel(!activePanel)}>{props.title} 
        </button>
        </h2>
        <hr></hr>
        <p className="faq-p" style={divStyle}>
          {props.details}
        </p>
      </div>
    </Grow>
  );
}