import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';
import logo from '../assets/img/logo.png';

export function AppHeader() {
    return (
        <header className="app-header">
            <Link className="img-container" to={'/'}>
                <img src={logo} alt="" />
            </Link>
            <div className="nav-links-container">
                <nav className="nav-links">
                    {routes.map((route) => (
                        <NavLink exact key={route.path} to={route.path}>
                            {route.label}
                        </NavLink>
                    ))}
                    <div>
                        <button className="main-btn">Login</button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
