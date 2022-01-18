import { NavLink } from "react-router-dom";

export function AdminSideNavBar({routes}){
   return <nav className="admin-side-nav flex column">
             {routes.map((route) => (
                    <NavLink exact key={route.path} to={route.path}>
                        {route.label}
                    </NavLink>
                ))}
             </nav>
}