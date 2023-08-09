import jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent {
  //Declare Variables
  user: any;
  userRole: String[] = [];
  show: boolean = false;
  show1: boolean = false;
  loading: boolean = false;

  form = this.formBuilder.group({
    email: ['',[Validators.email, Validators.required] ],
    password: ['', Validators.required]
  })

  //Constructor
  constructor(private loginService: LoginService, 
              private nzMessageService: NzMessageService, 
              private router: Router, private formBuilder:FormBuilder) { }

  async handleLogin() {
    this.loading = true;
    window.localStorage.clear();
    await this.loginService.login(this.form.controls["email"].value!, this.form.controls["password"].value!)
      .subscribe({
        next: (result) => {
          if(result != null)
          {
            setTimeout(() => {
              this.loading = false;
              this.loginService.storeToken(result);
              this.isAdmin(result.token) ? this.router.navigate(['home/dashboard']) : this.router.navigate(['home/information']);
            }, 1000);
          }
        },
        error: (error: HttpErrorResponse) => {
          setTimeout(() => {
            this.loading = false;
            if (error.status == 401) {
              this.nzMessageService.error("Sai tên đăng nhập hoặc mật khẩu.");
            }
            else
            {
              this.nzMessageService.error("Server không phản hồi");
            }
          }, 300);
        }
      })
  }

  isAdmin(token: string): boolean {
    const decodeValue: any = jwt_decode(token);
    const roles: String[] = decodeValue != null && decodeValue != undefined ? decodeValue['roles'] instanceof Array ? decodeValue['roles'] : [decodeValue['roles']] : []; 
    if(roles.length <= 0)
      return false;
    return roles.some(x => x == "Administrator"); 
  }
}