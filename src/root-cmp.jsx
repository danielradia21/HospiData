import React from 'react';

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router';

import {routes} from './routes';

import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { PatientPage } from './pages/patient-page';
import { HomePage } from './pages/home-page';

export class RootCmp extends React.Component {

    

    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    <Switch>
                        <Route component={HomePage} exact path={'/'}/>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                component={route.component}
                                path={route.path}
                            />
                        ))}
                        <Route component={PatientPage} path={'/patient'}/>
                    </Switch>
                </main>
                <AppFooter />
            </div>
        );
    }
}
