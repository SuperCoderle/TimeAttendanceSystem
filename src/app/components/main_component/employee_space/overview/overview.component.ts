import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ItemData } from 'src/app/models/data';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{

  constructor(private empService : EmployeeService) {}

  listOfColumn = [
    {
      title: 'Họ và Tên',
      compare: (a: Employee, b: Employee) => a.nameEmployees.localeCompare(b.nameEmployees),
      priority: false
    },
    {
      title: 'Tuổi',
      compare: (a: Employee, b: Employee) => Number(a.yearOfBirth) - Number(b.yearOfBirth),
      priority: 3
    },
    {
      title: 'Giới tính',
      compare: (a: Employee, b: Employee) => a.gender.localeCompare(b.gender),
      priority: 2
    },
    {
      title: 'Ngày thuê',
      compare: (a: Employee, b:Employee) => <any>a.createdAt - <any>b.createdAt,
      priority: 1
    }
  ]
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.idEmployees, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.idEmployees, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Employee[] = [];
  employees: readonly Employee[] = [];
  setOfCheckedId = new Set<number>();
  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }

  

  error = false;

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.idEmployees, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Employee[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.idEmployees));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.idEmployees)) && !this.checked;
  }

  ngOnInit(): void {
    this.empService.getAllEmployees().subscribe({
      next: (result) => {
        this.employees = result;
      },
      error: (error) => {
        console.log(error);
        this.error = true;
      }
    });
  }
}
