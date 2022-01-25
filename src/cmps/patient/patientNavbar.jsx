import { NavLink } from "react-router-dom";
import { patientNestedRoutes } from "../../routes";




export function PatientNavBar(){
    return (
        <>
      {patientNestedRoutes.map((route) => (
                <div className="details">
                  <NavLink to={route.path}>
                    <p>{route.label}</p>
                  </NavLink>
                </div>
              ))}
              </>
    )
}