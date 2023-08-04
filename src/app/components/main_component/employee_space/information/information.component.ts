import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Schedule } from 'src/app/models/dto';
import jwt_decode from 'jwt-decode';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  //Constructor
  constructor(private activeRoute: ActivatedRoute,
    private nzMessageService: NzMessageService,
    private useService: UseServiceService) { }

  //Oninit Method
  ngOnInit(): void {
    this.loading = true;
    if(this.token != null)
    {
      this.user1 = jwt_decode(this.token);
      setTimeout(() => {
        this.getEmployee(this.user1['id']);
      }, 600);
    }
  }

  //Declare Variables
  loading = false;
  user1: any;
  token?: string | null = localStorage.getItem("token");
  employee: any = {};
  user: any = {};
  shedules: Schedule[] = [];
  payroll: any = {};

  //Methods
  async getEmployee(id: string) {
    await this.useService.getData(`TbUsers/${id}`)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.user = result;
            if (result.employeeID != null) {
              this.getEmployeeByID(result.employeeID);
            }
            else {
              this.loading = false;
              this.nzMessageService.warning("Không có thông tin nhân viên này");
            }
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          console.log(error);
        }
      })
  }

  async getEmployeeByID(id: string)
  {
    await this.useService.getData(`Employees/${id}`)
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

    await this.useService.getData(`Payrolls/Employee?id=${id}`)
      .subscribe({
        next: (result) => {
          this.payroll = result;
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        }
      })
    
    await this.useService.getData(`Schedules/Employee?id=${id}`)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.loading = false;
            this.shedules = result;
          }, 600);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        }
      })
  }
}
