import Title from '../about/title'
//import CardRoadmap from './cardRoadmap'
import { Grow } from '@mui/material'
import { RiShieldCheckFill } from 'react-icons/ri'

import './index.css'
export default function Roadmap(): JSX.Element {
  return (
    <div data-aos="fade-up"
    data-aos-duration="3000">
      <h1 className='detail-container-title'>Roadmap</h1>
    <hr className="colored-hr"></hr>
    <div className="roadmap-container">
      <div className='roadmap-left-div col-md-6'></div>
      {/* <CardRoadmap stage={"Stage 1"} title={"July-October doing the high quality artwork"} details={"Choose the whitelisted participants."}
         checked={true} timeout={500}/>
      <CardRoadmap stage={"Stage 1"} title={"July-October doing the high quality artwork"} details={"Choose the whitelisted participants."}
         checked={true} timeout={1000}/>
      <CardRoadmap stage={"Stage 1"} title={"July-October doing the high quality artwork"} details={"Choose the whitelisted participants."}
         checked={true} timeout={1500}/> */}
        <div className='row'>
          <div className='col-md-10 scale-div'>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...( { timeout: 500 })}>
              <div className="roadmap-card">
                <h2 className='roadmap-stage'>Stage 1</h2>
                  <RiShieldCheckFill className='icons-roadmap'/> 
                <h3 className="detail-title">July-October doing the high quality artwork</h3>   
                
              </div>
            </Grow>  
          </div>
          <div className='col-md-2'>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2'>
             
          </div>
          <div className='col-md-10 scale-div'>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...( { timeout: 1000 })}>
              <div className="roadmap-card">
                <h2 className='roadmap-stage'>Stage 2</h2>
                <h3 className="detail-title">Mid November Launch</h3>   
                <div className='roadmap-parse'>
                  <h5 className='roadmap-parse-title'>Choose the whitelisted participants.</h5>
                  <p className='detail-p'>- Charity donation to help Kangaroos environment - $ 50 000</p>
                  <p className='detail-p'>- Listing on Howrare.is</p>
                </div>  
                <div className='roadmap-parse'>
                <h5 className='roadmap-parse-title'>20 holders are going to win a raffle and will win an amazing painting artwork of their Kangaroo ( 10 big and 10 medium size)</h5>
                </div>  
                <div className='roadmap-parse'>
                  <h5 className='roadmap-parse-title'>Creating a HUGE Exclusive B$$K Merch.</h5>
                </div>  
              </div>
            </Grow>  
          </div>
        </div>
        <div className='row'>
          <div className='col-md-10 scale-div'>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...( { timeout: 1500 })}>
              <div className="roadmap-card">
                <h2 className='roadmap-stage'>Stage 3</h2>
                <h3 className="detail-title">Q1 2022: Exhibitions in several physical galleries</h3>   
              </div>
            </Grow> 
          </div>
          <div className='col-md-2'>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2'>
          </div>
          <div className='col-md-10 scale-div'>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...( { timeout: 2000 })}>
              <div className="roadmap-card">
                <h2 className='roadmap-stage'>Stage 4</h2>
                <h3 className="detail-title">Q1 2022: Creating our member area</h3>   
                <div className='roadmap-parse'>
                  <h5 className='roadmap-parse-title'>club with 14 rooms to play at- only holders have access- wallet access!</h5>
                </div>
              </div>
            </Grow> 
          </div>
        </div>
      </div>
    </div>
  )
}