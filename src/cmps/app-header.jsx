import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';

export function AppHeader() {
    return (
        <header className="app-header">
            <div>
                <Link to={"/"}>
                    <h1>logo</h1>
                </Link>
            </div>
            <nav>
                <NavLink exact to={'/'}>Home</NavLink>
                {routes.map((route) => (
                    <NavLink exact key={route.path} to={route.path}>
                        {route.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}
