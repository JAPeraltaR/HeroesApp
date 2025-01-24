import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { Error404PageComponent } from "../shared/pages/error404-page/error404-page.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'login' , component: LoginPageComponent },
      { path: 'new-account' , component: RegisterPageComponent },
      { path: '404' , component: Error404PageComponent },
      { path: '**' , redirectTo: 'login' }
    ]
  }
]

@NgModule({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class AuthRoutingModule{

}
