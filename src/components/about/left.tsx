import * as React from 'react';
import { Zoom } from '@mui/material';
export default function Left() {
  const checked: boolean = true
  return (
    <div className='margin-right'>
      <Zoom in={checked} style={{ transitionDelay: '800ms' }}>
        <h3 className='about-min1'>
          <br></br>
          Fourteen kangaroos escaped from their owner, who raised them for their fur and meat. Once free, they decided to see the entire world! They passed through Tokyo, China, Siberia, Moscow, Turkey, Africa, the Czech Republic, Italy, France before they finally reached America! Throughout this trip we were crazy lucky to meet them. Their story found a way into our hearts and inspired us to create an NFT collection for these incredibly beautiful creatures.
        </h3>
      </Zoom>
    </div>
  );
}
