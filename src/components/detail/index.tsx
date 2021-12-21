import CardDetail from './cardDetail'
import Title from '../about/title'
import './index.css'
import Roadmap from '../roadmap'
import Faq from '../faq'
export default function Detail(): JSX.Element {
  return (
    <div className="detail-container" >
      <div data-aos="fade-up"
     data-aos-duration="3000">
        <h1 className='detail-container-title'>
          Features
        </h1>
        <hr></hr>
      <div className='row'>
        <div className='col-md-4'>
          <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vSP3bZjRc-ub5ayCePzdWfvzEntyaZE613n8U2X_M8p6Z0eicaCkOoAPsvB48Zi_ttXtn2zLC_DscHd/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false' target="_blank" className="rarity">
            <CardDetail title={'Rarity'} details={"Over 160 different elements make up each Bada$$kangaroo, guaranteed to be truly unique."} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
          </a>
        </div>
        <div className='col-md-4'>
          <CardDetail title={'Club'} details={"Only the owners will have access to it. The club will have 14 rooms."}  checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
        <div className='col-md-4'>
          <CardDetail title={'Ownership'} details={"Ownership and commercial usage rights given to the consumer over their NFT"} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
          <CardDetail title={'Community first'} details={"10,000 B$$K to ever be minted."} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
        <div className='col-md-4'>
          <CardDetail title={'Royalty'} details={"2.5% for the team, everything will be reinvested in the development of the brand"} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
        <div className='col-md-2'></div>
        </div>
      </div>
        {/* <Connectors /> */}
        <Roadmap/>
        <Faq/>
    </div>
  )
}