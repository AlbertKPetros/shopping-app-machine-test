import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './shared/components/error/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { BuyerDashboardComponent } from './components/dashboard/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './components/dashboard/seller-dashboard/seller-dashboard.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard-buyer',
        component: BuyerDashboardComponent,
      },
      {
        path: 'dashboard-seller',
        component: SellerDashboardComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
