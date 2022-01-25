import { AppointmentPrev } from './appointment-prev'

export function AppointmentList() {
  const appointments = [
    {
        _id: "a101",
        title: "Nose Pain",
        description: "Nose bled twice for no reason",
        date: "1642506255660",
        status: "cancelled",
        doctor: {
            _id: "u101",
            fullname: "Orly Amadi",
            imgUrl: "https://randomuser.me/api/portraits/women/39.jpg"
        }
    },
    {
        _id: "a103",
        title: "Back pain",
        description: "Back hurts after falling from a bike",
        date: "1642507155660",
        status: "arrived",
        doctor: {
            _id: "u101",
            fullname: "Orly Amadi",
            imgUrl: "https://randomuser.me/api/portraits/women/39.jpg"
        },
        drugs: ["acamol", "decsamol"],
      medicalReferences: [
            {
                _id: "r-101",
                title: "Ultrasound",
                date: "1642508955660"
            }
        ]
    },
    {
        _id: "a104",
        title: "headache",
        description: "Head hurts alot, feels like i may faint",
        date: "1642508155660",
        status: "pending",
        doctor: {
            _id: "u101",
            fullname: "Orly Amadi",
            imgUrl: "https://randomuser.me/api/portraits/women/39.jpg"
        }
    }
]

  return (
    <div className="appointments-contents">
      <div className="contents">
        <div className="content">
          <div>Date</div>
          <div>Time</div>
          <div>Name</div>
          <div>Cancel</div>
        </div>
        <div className="btns-wrapper">
          <button className="main-btn red">X</button>
        </div>
      </div>
      {appointments.map((appointment) => (
        <AppointmentPrev appointment={appointment} key={appointment._id} />
      ))}
    </div>
  )
}
