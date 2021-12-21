import Card from '../card'
import img1 from '../../assets/Moscow.jpg'
import img2 from '../../assets/nyc.jpg'
import img3 from '../../assets/tokio.jpg'
import img4 from '../../assets/sidney.jpg'

export default function Right(): JSX.Element {
  return(
    <div className='margin-right'>
      <div className='row'>
        <div className='col-sm-6 ani-card'>
          <Card img={img1} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
        <div className='col-sm-6 ani-card'>
          <Card img={img2} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 ani-card'>
          <Card img={img3} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
        <div className='col-sm-6 ani-card'>
          <Card img={img4} checked={true} timeout={500*(Math.floor(Math.random() * 4) + 1)}/>
        </div>
      </div>
    </div>
  )
}