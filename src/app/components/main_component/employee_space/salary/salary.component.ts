import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Employee } from 'src/app/models/dto';
import { Report } from 'src/app/models/dto';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {
  constructor(private useService : UseServiceService, 
              private router : Router) {}

  // listOfSelection = [
  //   {
  //     text: 'Select All Row',
  //     onSelect: () => {
  //       this.onAllChecked(true);
  //     }
  //   },
  //   {
  //     text: 'Select Odd Row',
  //     onSelect: () => {
  //       this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.idReport, index % 2 !== 0));
  //       this.refreshCheckedStatus();
  //     }
  //   },
  //   {
  //     text: 'Select Even Row',
  //     onSelect: () => {
  //       this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.idReport, index % 2 === 0));
  //       this.refreshCheckedStatus();
  //     }
  //   }
  // ];

  // //Declare variables
  // checked = false;
  // loading = false;
  // indeterminate = false;
  // listOfCurrentPageData: readonly Report[] = [];
  // reports: readonly Report[] = [];
  // employees: readonly Employee[] = [];
  // setOfCheckedId = new Set<number>();
  // dateFormat(date: Date): string {
  //   return moment(date).format("DD-MM-YYYY");
  // }
  // fullname(lastname?: string | null, firstname?: string | null) : string {
  //   return lastname + " " + firstname;
  // }
  // formatCurrency(payroll: number) : string {
  //   return payroll.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
  // }

  // updateCheckedSet(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.setOfCheckedId.add(id);
  //   } else {
  //     this.setOfCheckedId.delete(id);
  //   }
  // }

  // onItemChecked(id: number, checked: boolean): void {
  //   this.updateCheckedSet(id, checked);
  //   this.refreshCheckedStatus();
  // }

  // onAllChecked(value: boolean): void {
  //   this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.idReport, value));
  //   this.refreshCheckedStatus();
  // }

  // onCurrentPageDataChange($event: readonly Report[]): void {
  //   this.listOfCurrentPageData = $event;
  //   this.refreshCheckedStatus();
  // }

  // refreshCheckedStatus(): void {
  //   this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.idReport));
  //   this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.idReport)) && !this.checked;
  // }

  // async handleLoadData()
  // {
  //   this.loading = true;
  //   await this.reportService.getAllReports().subscribe({
  //     next: (result) => {
  //       setTimeout(() => {
  //         this.reports = result;
  //         this.loading = false;
  //       }, 600);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       if(error.status == 403)
  //       {
  //         this.router.navigate(["/403"]);
  //       }
  //       else
  //       {
  //         this.loading = false;
  //       }
  //     }
  //   });

  //   await this.employeeService.getAllEmployees().subscribe({
  //     next: (result) => {
  //       setTimeout(() => {
  //         this.employees = result;
  //         this.loading = false;
  //       }, 600);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       if(error.status == 403)
  //       {
  //         this.router.navigate(["/403"]);
  //       }
  //       else
  //       {
  //         this.loading = false;
  //       }
  //     }
  //   });
  // }

  // handleReload()
  // {
  //   this.reports = [];
  //   this.handleLoadData();
  // }

  // getNameEmployee(employeeID: String): string | undefined {
  //   return this.employees.find(emp => emp.employeeID === employeeID)?.fullname;
  // }

  // cancel(): void {
  //   this.nzMessageService.info('Hủy');
  // }

  // async confirm(idEmployee: number) {
  //   await this.empService.Delete(idEmployee)
  //     .subscribe({
  //       next: (result) => {
  //         setTimeout(() => {
  //           this.nzMessageService.success('Xóa thành công');
  //         }, 600);
  //         this.handleLoadData();
  //       },
  //       error: (error) => {
  //         console.log(error);
  //         this.nzMessageService.error('Xóa thất bại');
  //       }
  //     })
  // }

  // ngOnInit(): void {
  //   this.handleLoadData();
  // }
}
