import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user.service'
import { MedicalReferralsTable } from './medical-referrals-table'

export function MedicalReferrals() {
  const { user } = useSelector((state) => state.userModule)
  const [referrals,setReferrals] = useState(null)
  const [filteredRefs, setFilteredRefs] = useState(null);

  

    
  const filterRefs = ({target}) => {
    const filteredResults = referrals.filter((res) =>
        res.title.toLowerCase().includes(target.value) 
    );
    setFilteredRefs((prev) => (prev = filteredResults));
};


  useEffect(() => {
    const referrals = user.appointments.filter((app) => 
      app.referrals)
    setReferrals((prevReferrals)=>prevReferrals = referrals)
  }, [])

  return (
    <div className="medical-referrals-content">
      <div className="main-content-header">Mecial Refferals</div>
      <input
                    onChange={filterRefs}
                    className="patient-search-input"
                    type="text"
                    placeholder="Serach Meetings..."
                />
      {referrals&&<MedicalReferralsTable referrals={filteredRefs||referrals}/>}
      
    </div>
  )
}
