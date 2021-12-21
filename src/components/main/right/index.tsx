import * as React from 'react';
import './index.css'
import Card from '../../card'
import img1 from '../../../assets/card.jpg'
import img2 from '../../../assets/card2.jpg'
import img3 from '../../../assets/card3.jpg'
import img4 from '../../../assets/card42.jpg'
import img5 from '../../../assets/card5.jpg'
import img6 from '../../../assets/card6.jpg'
import img7 from '../../../assets/card7.jpg'
import img8 from '../../../assets/card8.jpg'
import img9 from '../../../assets/card9.jpg'

export default function Right() {

  return (
    <div>
      <div className='row'>
          <div className='col-sm-4 ani-card'>
            <Card img={img1} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
          <div className='col-sm-4 ani-card'>
            <Card img={img2} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
          <div className='col-sm-4 ani-card'>
            <Card img={img3} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4 ani-card'>
            <Card img={img4} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
          <div className='col-sm-4 ani-card'>
            <Card img={img5} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
          <div className='col-sm-4 ani-card'>
            <Card img={img6} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
          </div>
        <div className='row'>
          <div className='col-sm-4 ani-card'>
            <Card img={img7} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
          <div className='col-sm-4 ani-card'>
            <Card img={img8} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
          <div className='col-sm-4 ani-card'>
            <Card img={img9} checked={true} timeout={500*(Math.floor(Math.random() * 5) + 1)}/>
          </div>
      </div>
    </div>
    
  );
}
