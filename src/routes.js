import { HomePage } from './pages/home-page.jsx';
import { AboutUs } from './pages/about-us.jsx';
import { DoctorPage } from './pages/doctor-page.jsx';
import { PatientPage } from './pages/patient-page.jsx';
import { Lab } from './cmps/patient/lab.jsx';
import { AppointmentList } from './cmps/patient/appointment-list.jsx';
import { DoctorPage } from './pages/doctor-page';


// Routes accesible from the main navigation (in AppHeader)
export const routes = [
// Routes accesible from the main navigation (in AppHeader)

    {
        path: '/about',
        component: AboutUs,
        label: 'About',
    },
    {
        path: '/news',
        component: HomePage,
        label: 'News',
    },
    {
        path: '/contact',
        component: HomePage,
        label: 'Contact',
    },

]

export const patientNestedRoutes=[
    {
      path: `/patient/appointments`,
      component: AppointmentList,
      label: 'Appointments',
    },
    {
      path: '/patient/lab',
      component: Lab,
      label: 'Labs',
    },
  ]
