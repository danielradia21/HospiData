
import { AboutUs } from './pages/about-us.jsx'
import { Lab } from './cmps/patient/lab.jsx'
import { AppointmentList } from './cmps/patient/appointment-list.jsx'
import { MedicalHistory } from './cmps/patient/medical-history.jsx'
import { Inbox } from './cmps/patient/inbox.jsx'
import {News} from './pages/news-page'
import { Meetings } from './cmps/doctor/meetings.jsx'
import { Patients } from './cmps/doctor/patients.jsx'
import { History } from './cmps/doctor/history.jsx'
import { DocCalendar } from './cmps/doctor/doc-calendar.jsx'
import { AdminDashBord } from './cmps/admin/admin-dashbord.jsx'
import { AdminDoctorsList } from './cmps/admin/admin-doctors-list.jsx'
import { AdminPatienceList } from './cmps/admin/admin-patience-list.jsx'


export const routes = [


  {
    path: '/about',
    component: AboutUs,
    label: 'About',
  },
  {
    path: '/news',
    component: News,
    label: 'News',
  },

]

export const patientNestedRoutes = [
  {
    path: '/patient/inbox',
    component: Inbox,
    label: 'Inbox',
  },
  {
    path: `/patient/appointments`,
    component: AppointmentList,
    label: 'Appointments',
  },
  {
    path: '/patient/lab',
    component: Lab,
    label: 'Labs Results',
  },
  {
    path: '/patient/medical-referrals',
    component: MedicalHistory,
    label: 'Medical History',
  }
]


export const doctorNestedRoutes = [
  {
    path:'/doctor/meetings',
    component:Meetings,
    label:'Meetings'
  },
  {
    path:'/doctor/patients',
    component:Patients,
    label:'Patients'
  }, 
  {
    path:'/doctor/history',
    component:History,
    label:'History'
  },
  {
    path:'/doctor/calendar',
    component:DocCalendar,
    label:'Calendar'
  }
]

export const adminNestedRoutes =[
  {
    path:'/admin/dashboard',
    component:AdminDashBord,
    label:'Dash Board'
  },
  {
    path:'/admin/doctors',
    component:AdminDoctorsList,
    label:'Doctors'
  }, 
  {
    path:'/admin/patients',
    component:AdminPatienceList,
    label:'Patients'
  }
]