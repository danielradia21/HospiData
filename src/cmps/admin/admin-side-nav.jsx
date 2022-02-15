import { NavLink } from "react-router-dom";

export function AdminSideNavBar({routes}){
   return <div className="details-wrapper">
             {routes.map((route) => (
                 <div className="details" key={route.path}>
                    <NavLink exact key={route.path} to={route.path}>
                        {route.label}
                    </NavLink>
                    </div>
                ))}
             </div>
}