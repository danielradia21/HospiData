
export function CardList ({doctorsSum,patienceSum,appointments}) {

    const cardsInfo = [{num:doctorsSum,text:'Doctors'},{num:patienceSum,text:'Patience'},{num:appointments,text:'Appointments'}]

    return <div className="card-list flex">
    {cardsInfo.map((card,idx) => 
        <div key={idx} className="card flex justify-center align-center">{card.num} {card.text}</div>
        )}
</div>
}