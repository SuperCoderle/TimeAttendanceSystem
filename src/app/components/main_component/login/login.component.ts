import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})


export class LoginComponent {
  //Declare Variables
  show: boolean = false;
  show1: boolean = false;
  loading: boolean = false;
  message: string = '';

  Email: string = '';
  Password: string = '';

  //Constructor
  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  //Methods
  async handleLogin() {
    this.loading = true;
    this.message = '';
    await this.userService.Verify(this.Email, this.Password)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.loading = false;
            window.localStorage.setItem("token", <any>result.token);
            this.router.navigate(['home']);
          }, 1000);
        },
        error: (error) => {
          setTimeout(() => {
            this.loading = false;
            if (error.status == 401) {
              this.messageService.add( { severity: 'error', summary: 'Error', detail: 'The username or password is invalid.'});
            }
            else
            {
              this.messageService.add( { severity: 'error', summary: 'Error', detail: 'Server not responding'});
            }
          }, 300);
        }
      })
  }
}