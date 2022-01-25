import React from 'react';
// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router';
import routes from './routes';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { DoctorPage } from './pages/doctor-page';
import { HomePage } from './pages/home-page';

export class RootCmp extends React.Component {
    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact component={HomePage} path={'/'} />
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                component={route.component}
                                path={route.path}
                            />
                        ))}
                        <Route component={DoctorPage} path={'/doctor-page'} />
                    </Switch>
                </main>
                <AppFooter />
            </div>
        );
    }
}
