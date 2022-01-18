import {Route, Switch } from "react-router-dom"

export function AdminMainContect({routes}){
  return  <div className="admin-main-contect-continer">
    <Switch>
        {routes.map((route) => (
              <Route key={route.path} exact component={route.component} path={route.path} />
                ))}
    </Switch>
 </div>
}