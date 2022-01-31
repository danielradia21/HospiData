import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user.service'
import { MedicalReferralsTable } from './medical-referrals-table'

export function MedicalReferrals() {
  const { user } = useSelector((state) => state.userModule)
  const [referrals,setReferrals] = useState([])

  useEffect(() => {
    console.log(user)
    const referrals = user.appointments.reduce((acc, app) => {
        console.log(app)
      if (app.referrals) acc.push([...app.referrals])
      return acc
    }, [])
    setReferrals((prevReferrals)=>prevReferrals = referrals)
  }, [])

  return (
    <div className="medical-referrals-content">
      <div className="main-content-header">Mecial Refferals</div>
      <MedicalReferralsTable referrals={referrals}/>
    </div>
  )
}
