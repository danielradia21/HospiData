import healthDoctor from '../../assets/img/health-section-doctor.png'

export function HealthSection() {
    return (
        <div className="health-section-container">
            <div className="section-content">
                <h1>Welcome to Your Health</h1>
                <h1>Center</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Accusantium aperiam earum
                    ipsa eius, inventore nemo labore eaque porro consequatur ex
                    aspernatur. Explicabo, excepturi accusantium! Placeat
                    voluptates esse ut optio facilis!
                </p>
                <button className="main-btn">Learn More</button>
            </div>
            <div className="img-container">
                <img src={healthDoctor} alt="doctor" />
            </div>
        </div>
    );
}
