import {Route, Switch } from "react-router-dom"

export function AdminMainContect({routes}){
  return  <>
    <Switch>
        {routes.map((route) => (
              <Route key={route.path} exact component={route.component} path={route.path} />
                ))}
    </Switch>
 </>
}