import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee } from 'src/app/models/dto';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit {
  //Decalre variables
  employees: Employee[] = [];
  roles: String[] = ["Administrator", "User"];
  loading = false;
  fullname(lastname?: string | null, firstname?: string | null): string {
    return lastname + " " + firstname;
  }

  //Constructor
  constructor(private employeeService: EmployeeService, private nzMessageService: NzMessageService) { }

  //Methods
  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    await this.employeeService.getAllEmployees()
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.employees = result;
          }, 600);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  handleChange(employeeID: String) {
    this.loading = true;
    const waiting = this.nzMessageService.loading('Chờ vài giây..', { nzDuration: 0 }).messageId;
    const employee = this.employees.find(emp => emp.employeeID === employeeID)!;
    setTimeout(async () => {
      await this.employeeService.Update(employee)
        .subscribe({
          next: (result) => {
            setTimeout(() => {
              this.nzMessageService.remove(waiting);
              this.nzMessageService.success("Phân quyền thành công");
            }, 600)
          },
          error: (error) => {
            this.nzMessageService.remove(waiting);
            this.nzMessageService.error("Có lỗi xảy ra");
            console.log(error);
          }
        })
    }, 1000);
  }
}
