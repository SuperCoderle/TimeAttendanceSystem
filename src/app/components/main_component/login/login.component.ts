import jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UseServiceService } from 'src/app/services/useService/use-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  constructor(private useService: UseServiceService, 
              private nzMessageService: NzMessageService, 
              private router: Router, private formBuilder:FormBuilder) { }

  async handleLogin() {
    this.loading = true;
    window.localStorage.removeItem("token");
    await this.useService.postData(`Login?Email=${this.form.controls["email"].value}&Password=${this.form.controls["password"].value}`, null)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.loading = false;
            window.localStorage.setItem("token", result.token);
            this.isAdmin(result.token) ? this.router.navigate(['home/dashboard']) : this.router.navigate(['home/employee/information']);
          }, 1000);
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