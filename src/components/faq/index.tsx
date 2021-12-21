import * as React from 'react';
import CardFaq from './cardFaq'

export default function Faq() {
  return (
    <div data-aos="fade-up"
    data-aos-duration="3000">
    <h1 className='detail-container-title'>FAQ</h1>
    <hr className="colored-hr"></hr>
      <div className="accord-card">
        <CardFaq title="When is the Mint date?" details="On the 25th of November at 10PM UTC the minting on our website will go live." checked={true} timeout={500}/>
        <CardFaq title="How can I get a Bada$$Kangaroos?" details="B$$K will be available for purchase on our website through an initial sale. When you purchase, a randomly generated B$$K will be minted on the blockchain and delivered to your wallet." checked={true} timeout={1000}/>
        <CardFaq title="What is the mint price?" details="0.33 SOL" checked={true} timeout={1500}/>
        <CardFaq title="Will B$$K be listed on secondary markets?" details="Yes, we are currently in contact with a number of Solana nft marketplaces. More details about that in our Discord" checked={true} timeout={2000}/>
        <CardFaq title="How many B$$K are there?" details="We have limited the collection to a total 10,000 B$$K." checked={true} timeout={2500}/>
        <CardFaq title="Where is the Bada$$Kangaroos located?" details="B$$K resides in the world of Solana. A land with cheap gas, instant transactions, and an unstoppable community." checked={true} timeout={3000}/>
      </div>
    </div>
  );
}