import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  onLogin(): void {
    this.authService.login('asfasf','fafasfs').subscribe(
     () => this.router.navigate(['/']),
    )
  }
}
