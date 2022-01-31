import { Route, Switch } from "react-router-dom";
import { patientNestedRoutes } from "../../routes";


export function PatientMainContent(){
    return (
        <Switch> 
          <div className="main-content">
        {patientNestedRoutes.map((route) => (
         
             
          <Route
            exact
            path={route.path}
            component={route.component}
            key={route.path}
          />
          ))}
          </div>
      </Switch>
    )
}