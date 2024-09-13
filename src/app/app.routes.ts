import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentCreateComponent } from './components/appointment/appointment-create/appointment-create.component';
import { AppointmentDetailComponent } from './components/appointment/appointment-detail/appointment-detail.component';
import { AppointmentEditComponent } from './components/appointment/appointment-edit/appointment-edit.component';
import { AppointmentListComponent } from './components/appointment/appointment-list/appointment-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { HomeComponent } from './components/shared/home/home.component';
import { HttpClientModule } from '@angular/common/http';



export const routes: Routes = [
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/:id', component: AppointmentDetailComponent },
  { path: 'appointments/create', component: AppointmentCreateComponent },
  { path: 'appointments/edit/:id', component: AppointmentEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', component: HomeComponent},
  { path: '', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule ],
  exports: [RouterModule]

})

export class AppRoutingModule { }
