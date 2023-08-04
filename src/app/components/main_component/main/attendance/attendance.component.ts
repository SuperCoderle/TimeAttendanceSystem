import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Schedule, Shift } from 'src/app/models/dto';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';
import { CheckStatusCode } from 'src/app/status/status';
import { ActivatedRoute, Router } from '@angular/router';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  //Constructor
  constructor(private useService: UseServiceService,
              private nzMessageService: NzMessageService,
              private router: Router,
              private activeRoute: ActivatedRoute
  ) { }
  //OnInit method
  ngOnInit(): void {
    this.clock();
    this.loading = true;
    this.activeRoute.paramMap.subscribe(params => {
      setTimeout(() => {
        this.getEmployeeID(params.get('id')!);
      }, 600);
    })
  }

  //Declare Variables
  checkStatusCode: CheckStatusCode = new CheckStatusCode(this.router);
  loading = false;
  schedule: any = {};
  shifts: readonly Shift[] = [];
  schedules: readonly Schedule[] = [];
  activeCheckIn = false;
  activeCheckOut = false;
  now: Date = new Date();
  secs: string = '';
  mins: string = '';
  hr: number = 0;
  Time: string = '';

  //Methods
  clock() {
    requestAnimationFrame(this.clock.bind(this));
    this.secs = ('0' + new Date().getSeconds()).slice(-2);
    this.mins = ('0' + new Date().getMinutes()).slice(-2);
    this.hr = new Date().getHours();
    this.Time = this.hr + ":" + this.mins + ":" + this.secs;
  }

  async loadData() {
    await this.useService.getData("Shifts/")
      .subscribe({
        next: (result) => {
          this.shifts = result;
        },
        error: (error: HttpErrorResponse) => {
          console.log("LoadData: " + error);
        }
      })
  }

  async getEmployeeID(id: string) {
    await this.useService.getData(`TbUsers/${id}`)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            if (result != null)
            {
              if(result.employeeID != null)
              {
                this.getToday(result.employeeID);
              }
              else
              {
                this.nzMessageService.warning("Không có thông tin nhân viên. Vui lòng liên hệ quản lý để thêm vào danh sách nhân viên!");
              }
            }
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.checkStatusCode.ErrorResponse(error.status) ? "" : this.loading = false; console.log("GetEmployeeID: " + error);
        }
      });
  }

  async getToday(id: string)
  {
    await this.useService.getData(`Schedules/Employee?id=${id}`)
    .subscribe({
      next: (result) => {
        setTimeout(() => {
          this.loading = false;
          this.schedules = result;
        }, 600);
      },
      error: (error:HttpErrorResponse) => {
        this.checkStatusCode.ErrorResponse(error.status) ? "" : this.loading = false; console.log("GetScheduleByEmployee: " + error);
      }
    })

    await this.useService.getData(`Schedules/GetToday/${id}`)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.schedule = result;
            this.checkTime();
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.checkStatusCode.ErrorResponse(error.status) ? "" : this.loading = false; console.log("GetToday: " + error);
        }
      })
  }

  async check() {
    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    await this.useService.putData(`Schedules/${this.schedule.scheduleID}?action=Check`, this.schedule)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.getToday((<Schedule>this.schedule).scheduleID);
            this.nzMessageService.remove(id);
            this.nzMessageService.success("Chấm công xong");
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.nzMessageService.remove(id);
          console.log("Check: " + error);
        } 
      })
  }

  checkTime() {
    if(this.schedule != null)
    {
      const today = new Date();
      const startTime = this.shifts.find(x => x.shiftID === (<Schedule>this.schedule).shiftID)!.startTime;
      const endTime = this.shifts.find(x => x.shiftID === (<Schedule>this.schedule).shiftID)!.endTime;
      let checkInTime = today.getTime() - this.convertToDateTime(startTime).getTime();
      let checkOutTime = today.getTime() - this.convertToDateTime(endTime).getTime();
      this.convertToMinutes(checkInTime) >= 0 && this.convertToMinutes(checkInTime) <= 30 ? this.activeCheckIn = true : this.activeCheckIn = false;
      this.convertToMinutes(checkOutTime) >= 0 && this.convertToMinutes(checkOutTime) <= 30 ? this.activeCheckOut = true : this.activeCheckOut = false;
    }
  }

  convertToDateTime(time: string): Date {
    let tempTime = time.split(":");
    let date = new Date();
    date.setHours(Number(tempTime[0]));
    date.setMinutes(Number(tempTime[1]));
    date.setSeconds(Number(tempTime[2]));
    return date;
  }

  convertToMinutes(mls: number): number {
    return Math.floor(mls / 60000);
  }

  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
}

