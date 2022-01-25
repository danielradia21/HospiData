export function AppointmentPrev({ appointment }) {

    const date = appointment.date

  return (
    <div className="appointment-content">
        <div className="content">
          <div></div>
          <div>time</div>
          <div>name</div>
        </div>
        <div className="btns-wrapper">
          <button className="main-btn red">X</button>
        </div>
    </div>
  )
}
