import hero from '../../assets/img/hero.jpg';

export function Hero() {
    return (
        <div className="main-hero full">
            <img src={hero} alt="Hospital" />
            <div className="main-content">
                <p>let's make your life happier</p>
                <h1>Healthy Living</h1>
                <button className="reg-btn">Register Today</button>
            </div>
        </div>
    );
}
