import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Schedule, Shift } from 'src/app/models/dto';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';
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
  ) { }
  //OnInit method
  ngOnInit(): void {
    this.clock();
    this.loading = true;
    this.getToday();
  }

  //Declare Variables
  loading = false;
  schedule: any = {};
  shifts: readonly Shift[] = [];
  schedules: readonly Schedule[] = [];
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

  async getToday() {
    await this.useService.getData(`Schedules/Employee`)
      .subscribe((schedules) => {
        setTimeout(() => {
          this.loading = false;
          this.schedules = schedules;
        }, 600);
      })

    await this.useService.getData(`Schedules/GetToday`)
      .subscribe((schedule) => {
        setTimeout(() => {
          this.schedule = schedule;
        }, 600);
      })
  }

  async check() {
    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    await this.useService.putData(`Schedules/${this.schedule.scheduleID}?action=Check`, this.schedule)
      .subscribe(() => {
        setTimeout(() => {
          this.getToday();
          this.nzMessageService.remove(id);
          this.nzMessageService.success("Chấm công xong");
        }, 600);
      })
  }

  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
}

