import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MbscCalendarEvent, MbscEventcalendarOptions, MbscResource, setOptions } from '@mobiscroll/angular';
import { Employee, Schedule } from 'src/app/models/dto';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

@Component({
    selector: 'app-staff-calendar',
    templateUrl: './staff-calendar.component.html',
    styleUrls: ['./staff-calendar.component.css'],
})

export class StaffCalendarComponent implements OnInit {
    //Constructor
    constructor(private useService: UseServiceService
                ) {}

    ngOnInit(): void {
        console.log(this.calendarOptions.resources);
    }

    //Declare Variables
    employees: MbscResource[] = [];
    schedules: MbscCalendarEvent[] = [];
    calendarOptions: MbscEventcalendarOptions = {
        view: {
            timeline: {
                type: 'week',
                eventList: true,
                startDay: 1,
                endDay: 7
            }
        },
        dragToCreate: false,
        dragToResize: false,
        dragToMove: true,
        clickToCreate: false,
        resources: this.employees
    };

    //Methods
    startDate(shift: string, workDate: Date): string {
        let date = '';
        switch (shift) {
            case "Ca sáng":
                date = workDate.toString().split("00")[0] + "07:00:00";
                break;
            case "Ca chiều":
                date = workDate.toString().split("00")[0] + "15:00:00";
                break;
            case "Ca tối":
                date = workDate.toString().split("00")[0] + "23:00:00";
                break;
        }
        return date;
    }

    endDate(shift: string, workDate: Date): string {
        let date = '';
        switch (shift) {
            case "Ca sáng":
                date = workDate.toString().split("00")[0] + "15:00:00";
                break;
            case "Ca chiều":
                date = workDate.toString().split("00")[0] + "23:00:00";
                break;
            case "Ca tối":
                date = workDate.toString().split("00")[0] + "07:00:00";
                break;
        }
        return date;
    }

    onPageLoading(event: any): void {
        this.loadData();
    }

    async loadData() {
        await this.useService.getData("Employees/")
            .subscribe({
                next: (result: readonly Employee[]) => {
                    setTimeout(() => {
                        result.forEach(item => {
                            let emp: MbscResource = {
                                id: item.employeeID,
                                name: item.fullname,
                                color: '#f1e920',
                                title: 'HR'
                            }
                            if (!this.employees.some(x => x.id === emp.id)) {
                                this.employees.push(emp);
                            }
                        });
                    }, 600);
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error);
                }
            })
        await this.useService.getData("Schedules/")
            .subscribe({
                next: (result: readonly Schedule[]) => {
                    setTimeout(() => {
                        result.forEach(item => {
                            if (!this.schedules.some(x => x.id === item.scheduleID)) {
                                this.schedules.push({
                                    // start: this.startDate(item.shift, item.workDate),
                                    // end: this.endDate(item.shift, item.workDate),
                                    // title: item.shift,
                                    resource: 'asdasdasd'
                                })
                            }
                        })
                    }, 600)
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error);
                }
            })
    }
}
