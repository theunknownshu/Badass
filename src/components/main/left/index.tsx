import * as React from 'react';
import './index.css'
import { Zoom } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Left() {
  const checked: boolean = true
  const timeout = 300
  return (
    <div className='vertical-center'>
      <Zoom in={checked}>
        <h2 className='welcome-to'>
          Welcome to
        </h2>
      </Zoom>
      
      <Zoom in={checked} style={{ transitionDelay: timeout +'ms' }}>
        <h2 className="link-about kangaroos">
          BADA$$
          KANGAROOs
        </h2>
      </Zoom>
      
      <Zoom in={checked} style={{ transitionDelay: timeout*2 +'ms'  }}>
        <h2 className='solana'>
          Solana
        </h2>

      </Zoom>
      {/* <Zoom in={checked} style={{ transitionDelay: timeout*3 +'ms'  }}>
        <h1 className='min1'>
          Mint 1~3
        </h1>
      </Zoom> */}

    </div>
  );
}
