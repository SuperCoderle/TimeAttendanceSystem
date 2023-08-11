import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Password, Schedule } from 'src/app/models/dto';
import { UseServiceService } from 'src/app/services/useService/use-service.service';
import * as moment from 'moment';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  //Constructor
  constructor(private formBuilder: UntypedFormBuilder,
              private nzMessageService: NzMessageService,
              private useService: UseServiceService,
              private loginService: LoginService
              ) 
  {
    this.validateForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  //Oninit Method
  ngOnInit(): void {
    this.loading = true;
    this.getInfomation();
  }

  //Declare Variables
  loading = false;
  employee: any = {};
  user: any = {};
  schedules: Schedule[] = [];
  payroll: any = {};
  width = window.innerWidth;
  isVisible = false;
  validateForm: UntypedFormGroup;

  //Methods

  async getInfomation()
  {
    await this.useService.getData(`TbUsers/Authenticated`)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.user = result;
            this.getEmployee(result.employeeID);
            this.getPayroll(result.employeeID);
          }, 600);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        }
      })
    
    await this.useService.getData(`Schedules/Employee`)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.schedules = result;
          }, 600);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        }
      })
  }

  async getPayroll(employeeID: string)
  {
    await this.useService.getData(`Payrolls/Employee?id=${employeeID}`)
    .subscribe({
      next: (result) => {
        setTimeout(() => {
          this.loading = false;
          this.payroll = result;
        }, 600);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      }
    })
  }

  async getEmployee(employeeID: string)
  {
    await this.useService.getData(`Employees/${employeeID}`)
    .subscribe({
      next: (result) => {
        setTimeout(() => {
          this.loading = false;
          this.employee = result;
        }, 600);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      }
    })
  }

  async handleOk()
  {
    const data: Password = {
      oldPassword: this.validateForm.controls["oldPassword"].value,
      newPassword: this.validateForm.controls["newPassword"].value
    }

    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    await this.useService.putData(`TbUsers/ChangePassword/`, data)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.remove(id);
            this.nzMessageService.success("Đổi mật khẩu thành công. Bạn cần phải đăng nhập lại.");
            this.isVisible = false;
            this.loginService.logout();
          }, 600);
        },
        error: (error) => {
          this.nzMessageService.remove(id); 
          this.nzMessageService.error(error.error);
          console.log(error);
        }
      })
  }

  totalWorkHours(): { total: number, violation: number }
  {
    let sum = 0, count = 0;
    this.schedules.filter(x => x.isSubmit).map(value => {
      sum += value.totalWorkHours;
      value.violationID != null ? count++ : null;
    })

    return { total: sum, violation: count};
  }

  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }

  show(): void {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }
}
