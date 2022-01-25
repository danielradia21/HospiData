import React from 'react';
// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router';
<<<<<<< HEAD

import {routes} from './routes';

import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { PatientPage } from './pages/patient-page';
import { HomePage } from './pages/home-page';
=======
import routes from './routes';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { DoctorPage } from './pages/doctor-page';
import { HomePage } from './pages/home-page';

>>>>>>> a85f4b83e8699cb4a2067777077a350834b103e2

export class RootCmp extends React.Component {
    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    <Switch>
<<<<<<< HEAD
                        <Route component={HomePage} exact path={'/'}/>
=======
                        <Route exact component={HomePage} path={'/'} />
>>>>>>> a85f4b83e8699cb4a2067777077a350834b103e2
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                component={route.component}
                                path={route.path}
                            />
                        ))}
<<<<<<< HEAD
                        <Route component={PatientPage} path={'/patient'}/>
=======
                        <Route component={DoctorPage} path={'/doctor-page'} />
>>>>>>> a85f4b83e8699cb4a2067777077a350834b103e2
                    </Switch>
                </main>
                <AppFooter />
            </div>
        );
    }
}
