import healthDoctor from '../../assets/img/health-section-doctor.png';

export function HealthSection() {
    return (
        <div className="health-section-container">
            <div className="section-content">
                <h1>Welcome to Your Health</h1>
                <h1>Center</h1>
                <p>
                    The Hospi Data Health System has dozens of locations in
                    several states. Thousands of patients from around the world
                    travel to Hospi Data locations, and Hospi Data's
                    International Patient Offices help ensure that distance and
                    language are not obstacles to receiving world-class care.
                </p>
                <button className="main-btn">Learn More</button>
            </div>
            <div className="img-container">
                <img src={healthDoctor} alt="doctor" />
            </div>
        </div>
    );
}
