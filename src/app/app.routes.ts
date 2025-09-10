import { Routes } from '@angular/router';
import { StudentLogin } from './components/student-login/student-login';
import { StudentList } from './components/student-list/student-list';

import { HomeComponent } from './components/home/home';
import { StudentRegisterComponent } from './components/student-register/student-register';


export const routes: Routes = [ 
 

  { path: '', component: HomeComponent },
  { path: 'homepage', component: HomeComponent },
  { path: 'login', component: StudentLogin },
  { path: 'register', component: StudentRegisterComponent },
  { path: 'students', component: StudentList },
  { path: 'edit-student/:id', component: StudentRegisterComponent },

  
];
