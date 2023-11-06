import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/adminDashboard/adminDashboard.component';
import { UserDashboardComponent } from './components/user/userDashboard/userDashboard.component';
import { NotFoundComponent } from './components/shareed/NotFound/NotFound.component';
import { DriverDashboardComponent } from './components/driver/driverDashboard/driverDashboard.component';
import { AuthGuard } from './guards/Auth-guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CheckEmailComponent } from './components/shareed/CheckEmail/check-email/check-email.component';

const routes: Routes = [
  { path: 'login',component:LoginComponent},
  { path: 'register',component:RegisterComponent},
  {path:'checkemail',component:CheckEmailComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin', component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  { path: 'driver', component: DriverDashboardComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'DRIVER'
  }
},
  { path: 'user', component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'PASSENGER'
    }
  },
  { path: '**', component: NotFoundComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
