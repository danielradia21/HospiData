
export function CardList () {

    const cardsInfo = [{num:10,text:'Doctors'},{num:10,text:'Patience'},{num:22,text:'Appointments'}]

    return <div className="card-list flex column">
    {cardsInfo.map((card,idx) => 
        <div key={idx} className="card flex justify-center align-center">{card.num} {card.text}</div>
        )}
</div>
}