export function CardPrev({ text, icon,color }) {
    return (
        <div className="card-container">
            <div className="icon-container" style={{backgroundColor:color}}>{icon}</div>
            <p>{text}</p>
        </div>
    );
}
