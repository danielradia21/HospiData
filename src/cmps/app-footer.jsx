import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';



export function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="top-footer">
                <div className="company">
                    <h3>Company</h3>
                    <p>About Us</p>
                    <p>Career</p>
                    <p>Editorial Team</p>
                    <p>Protection</p>
                </div>
                <div className="more">
                    <h3>More</h3>

                    <p>Terms & Condition</p>
                    <p>Privacy</p>
                    <p>Advertise</p>
                    <p>Join as Doctors</p>
                </div>
                <div className="our-partner">
                    <h3>Our Partner</h3>
                    <p>One-Fitness</p>
                    <p>One-Drugs</p>
                    <p>One-Live</p>
                </div>
                <div className="contact">
                    <h3>Contact</h3>
                    <p>351 Willow Street Franklin, MA 02038</p>
                    <p>701-573-7582</p>
                    <p>hospidata@hospidata.com</p>
                    <div className="social-media">
                        <h3>Social Media</h3>
                        <div className="social-media-links">
                            <div className="social-media-icon">
                                {' '}
                                <FacebookIcon />
                            </div>
                            <div className="social-media-icon">
                                {' '}
                                <TwitterIcon />
                            </div>
                            <div className="social-media-icon">
                                <GoogleIcon /> +
                            </div>
                            <div className="social-media-icon">
                                {' '}
                                <InstagramIcon />
                            </div>
                            <div className="social-media-icon">
                                <LinkedInIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line-seperator"></div>
            <div className="footer-bottom">
                <p>
                    Copyright <CopyrightIcon /> 2022 HospiData. All right
                    reserved.{' '}
                </p>
            </div>
        </footer>
    );
}
