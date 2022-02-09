import hero from '../../assets/img/hero.jpg';
import { Link } from 'react-router-dom';
import * as React from 'react';


export function Hero() {
    return (
      
        <div className="news-section main-hero full">
            <img src={hero} alt="Hospital" />
            <div className="main-content">
               <div className='link-chain'><Link to={'/'}>Home</Link> / <p className='news'>News</p></div>
               <h1>News</h1>
            </div>
        </div>
  
    );
}