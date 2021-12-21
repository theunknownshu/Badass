import * as React from 'react';
import './index.css'
import { Zoom } from '@mui/material';
import { Link } from 'react-router-dom'
export default function Title() {
  const checked: boolean = true
  return (
    <div className='margin-top'>
      <Zoom in={checked}>
        <h2 className='welcome-title2'>
          About
        </h2>
      </Zoom>
    </div>
  );
}
