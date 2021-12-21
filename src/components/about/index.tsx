import * as React from 'react';
import './index.css'
import Left from './left'
import Right from './right'
import Title from './title'
export default function About() {

  return (

    <div id="about" data-aos="fade-up"
    data-aos-duration="3000">
      <br></br>
      <Title />
      <hr></hr>
      <div className="row">
        <div className="col-md-6">
          <Left />
        </div>
        <div className="col-md-6">
          <Right />
        </div>
      </div>
    
    </div>
  );
}
