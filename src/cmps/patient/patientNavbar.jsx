import { NavLink } from 'react-router-dom';
import { patientNestedRoutes } from '../../routes';

export function PatientNavBar({ user }) {
    return (
        <>
            {patientNestedRoutes.map((route) => (
                <div className="details" key={route.path}>
                    <NavLink to={route.path}>
                        <p>{route.label}</p>
                    </NavLink>
                </div>
            ))}
            {user.isAdmin && (
                <div className="details">
                    <NavLink to={'/admin/dashboard'}>
                        <p>Admin Panel</p>
                    </NavLink>
                </div>
            )}
        </>
    );
}
