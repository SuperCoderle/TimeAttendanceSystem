import { NgModule, Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/main_component/login/login.component';
import { NotfoundComponent } from './components/main_component/errors/notfound/notfound.component';
import { ForbiddenComponent } from './components/main_component/errors/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { path: 'home', loadChildren: () => import('./module/homepage/homepage.module').then(m => m.HomepageModule) },
  {
    path: 'error',
    children: [
      {
        path: '403',
        component: ForbiddenComponent
      },
      {
        path: '404',
        component: NotfoundComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

