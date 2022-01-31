import React from 'react';

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router';

import { routes } from './routes';

import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { AdminPage } from './pages/admin-page';
import { HomePage } from './pages/home-page';
import { PatientPage } from './pages/patient-page';
import { DoctorPage } from './pages/doctor-page';

export class RootCmp extends React.Component {
    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    <Switch>
                        <Route component={HomePage} exact path={'/'} />
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                component={route.component}
                                path={route.path}
                            />
                        ))}
                        <Route component={AdminPage} path={'/admin'} />
                        <Route component={PatientPage} path={'/patient'} />
                        <Route component={DoctorPage} path={'/doctor'} />
                    </Switch>
                </main>
                <AppFooter />
            </div>
        );
    }
}
