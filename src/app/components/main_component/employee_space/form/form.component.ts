import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Employee, Payroll } from 'src/app/models/dto';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { v4 as uuid } from 'uuid';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { PayrollService } from 'src/app/services/payroll/payroll.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  //Declare Variables
  validateForm: UntypedFormGroup;
  employeeID: string | null = null;
  title: String = "";
  token?: string | null = localStorage.getItem("token");
  user: any;
  width: number = 1280;
  isChecked = false;
  indeterminate = true;
  positions = [
    {
      name: "HR",
      basicSalary: 35000000
    },
    {
      name: "Fresher",
      basicSalary: 10000000
    },
    {
      name: "Junior",
      basicSalary: 25000000
    },
    {
      name: "Senior",
      basicSalary: 50000000
    },
    {
      name: "Tech Lead",
      basicSalary: 85000000
    }
  ]
  employee: Employee = {
    employeeID: uuid(),
    fullname: '',
    birthday: new Date(),
    gender: '',
    phoneNumber: '',
    createdAt: new Date(),
    createdBy: '',
    lastUpdatedAt: null,
    lastUpdatedBy: null
  };

  //Constructor
  constructor(private formBuilder: UntypedFormBuilder, 
              private employeeService: EmployeeService, 
              private router: Router, 
              private activeRoute: ActivatedRoute, 
              private userService: UserService,
              private payrollService: PayrollService,
              private nzMessageService: NzMessageService) 
  {
    if (this.token != null) {
      this.user = jwt_decode(this.token);
    }

    this.width = window.innerWidth;

    this.validateForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      birthday: ['', Validators.required],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.email, Validators.required]],
      position: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      isManager: [false]
    });

    this.activeRoute.paramMap.subscribe(params => {
      this.employeeID = params.get('id');
    })

    this.employeeID != null ? this.title = "Cập nhật thông tin nhân viên" : this.title = "Thêm nhân viên";
    this.getEmployee();
  }

  //Methos

  async submit() {
    var newEmp: Employee = {
      employeeID: uuid(),
      fullname: this.validateForm.controls["fullname"].value,
      birthday: new Date(this.validateForm.controls["birthday"].value),
      gender: this.validateForm.controls["gender"].value,
      phoneNumber: this.validateForm.controls["phoneNumber"].value,
      createdAt: new Date,
      createdBy: this.user["fullname"],
      lastUpdatedAt: null,
      lastUpdatedBy: null
    }

    var newUser: User = {
      userID: uuid(),
      fullname: this.validateForm.controls["fullname"].value,
      email: this.validateForm.controls["email"].value,
      password: this.validateForm.controls["password"].value,
      employeeID: newEmp.employeeID,
      lastLoggedIn: null,
      createdAt: new Date,
      lastUpdatedAt: null,
      isManager: this.validateForm.controls["isManager"].value,
      isActive: true
    }

    var newPay: Payroll = {
      payRollID: 0,
      position: this.validateForm.controls["position"].value,
      basicSalary: this.positions.find(x => x.name === this.validateForm.controls["position"].value)!.basicSalary,
      employeeID: newEmp.employeeID
    }

    await this.userService.Register(newUser)
      .subscribe({
        next: (result) => {
          this.createNewEmp(newEmp);
          this.addToPayroll(newPay);
          this.router.navigate(['/home/employee']);
        },
        error: (error: HttpErrorResponse) => {
          this.nzMessageService.error(error.error);
        }
      })
  }

  async createNewEmp(newEmp: Employee) {
    await this.employeeService.Add(newEmp)
      .subscribe({
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  async addToPayroll(newPay: Payroll)
  {
    await this.payrollService.Add(newPay)
      .subscribe({
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  async getEmployee() {
    if (this.employeeID != null) {
      await this.employeeService.getById(this.employeeID)
        .subscribe({
          next: (result) => {
            this.employee = result;
          },
          error: (error) => {
            console.log(error);
          }
        })
    }
  }

  async update() {
    const data: Employee = {
      employeeID: this.employee.employeeID,
      fullname: this.validateForm.controls["fullname"].value,
      birthday: new Date(this.validateForm.controls["birthday"].value),
      gender: this.validateForm.controls["gender"].value,
      phoneNumber: this.validateForm.controls["phoneNumber"].value,
      createdAt: this.employee.createdAt,
      createdBy: this.employee.createdBy,
      lastUpdatedAt: new Date(),
      lastUpdatedBy: this.user["fullname"]
    }

    await this.employeeService.Update(data)
      .subscribe({
        next: (result) => {
          this.router.navigate(['/home/employee']);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls['confirm'].updateValueAndValidity());
  }

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
