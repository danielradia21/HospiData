import hero from '../../assets/img/hero.jpg';
import { Link } from 'react-router-dom';
import * as React from 'react';


export function Hero() {
    return (
      
        <div className="about-us-section main-hero full">
            <img src={hero} alt="Hospital" />
            <div className="main-content">
               <div className='link-chain'><Link to={'/'}>Home</Link> / <p>About</p></div>
               <h1>About Us</h1>
            </div>
        </div>
  
    );
}
