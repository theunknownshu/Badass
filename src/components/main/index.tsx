import Header from './header'
import Right from './right'
import Left from './left'
import Mint from '../mint'
import './index.css'
// import Connectors from './connectors'
export default function Main(props:{
  can_mint: boolean
}) {
  return (
    <div>
      <Header />
      <div className='row' data-aos="fade-up"
     data-aos-duration="3000">
        <div className='col-md-6'>
          <Left />       
          <Mint can_mint={props.can_mint}/>
        </div>
        <div className='col-md-6'>
          <Right />
        </div>
      </div>
        {/* <Connectors /> */}
    </div>
  )
}