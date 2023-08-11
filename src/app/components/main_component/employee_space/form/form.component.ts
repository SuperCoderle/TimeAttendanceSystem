import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, User, Payroll } from 'src/app/models/dto';
import { v4 as uuid } from 'uuid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  //Declare Variables
  loading = false;
  validateForm: UntypedFormGroup;
  employeeID: string = '';
  title: String = "";
  width = window.innerWidth;
  isChecked = false;
  positions = [
    {
      name: "Văn phòng",
      basicSalary: 35000
    },
    {
      name: "Kinh doanh",
      basicSalary: 37000
    },
    {
      name: "Marketing",
      basicSalary: 42000
    },
    {
      name: "Tài chính / Kế toán",
      basicSalary: 50000
    },
    {
      name: "Kỹ thuật",
      basicSalary: 40000
    },
    {
      name: "Kiểm soát chất lượng",
      basicSalary: 55000
    },
    {
      name: "Quản lý",
      basicSalary: 63000
    },
  ]
  employee: any;

  //Constructor
  constructor(private formBuilder: UntypedFormBuilder,
    private activeRoute: ActivatedRoute,
    private useService: UseServiceService,
    private nzMessageService: NzMessageService) {

    this.width = window.innerWidth;

    this.activeRoute.paramMap.subscribe(params => {
      this.loading = true;
      if(params.get('id') != null || params.get('id') != undefined)
      {
        this.employeeID = params.get('id')!;
        this.getEmployee(params.get('id')!);
        this.title = "Cập nhật thông tin nhân viên"
      }
      else
      {
        this.loading = false;
        this.title = "Thêm nhân viên";
      }
    });

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
      createdBy: "someone"
    }

    var newUser: User = {
      userID: uuid(),
      fullname: this.validateForm.controls["fullname"].value,
      email: this.validateForm.controls["email"].value,
      password: this.validateForm.controls["password"].value,
      employeeID: newEmp.employeeID,
      createdAt: new Date,
      isManager: this.validateForm.controls["isManager"].value,
      isActive: true
    }

    var newPay: Payroll = {
      payRollID: 0,
      position: this.validateForm.controls["position"].value,
      basicSalary: this.positions.find(x => x.name === this.validateForm.controls["position"].value)!.basicSalary,
      employeeID: newEmp.employeeID
    }

    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    await this.useService.postData("TbUsers/", newUser)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.createNewEmp(newEmp);
            this.addToPayroll(newPay);
            this.nzMessageService.remove(id);
            this.nzMessageService.success("Tạo thành công");
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.nzMessageService.remove(id);
          console.log(error);
        }
      })
  }

  async createNewEmp(newEmp: Employee) {
    await this.useService.postData(`Employees/`, newEmp)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            window.history.back();
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  async addToPayroll(newPay: Payroll) {
    await this.useService.postData("Payrolls/", newPay)
      .subscribe({
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  async getEmployee(empID: string) {
    await this.useService.getData(`Employees/${empID}`)
      .subscribe({
        next: (result: Employee) => {
          setTimeout(() => {
            this.employee = result;
            this.validateForm = this.formBuilder.group({
              fullname: [result.fullname, [Validators.required]],
              birthday: [result.birthday, Validators.required],
              gender: [result.gender, [Validators.required]],
              phoneNumber: [result.phoneNumber, [Validators.required, Validators.maxLength(11)]]
            });
            this.loading = false;
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          console.log(error);
        }
      })
  }

  async update() {
    const data: Employee = {
      employeeID: this.employeeID,
      fullname: this.validateForm.controls["fullname"].value,
      birthday: new Date(this.validateForm.controls["birthday"].value),
      gender: this.validateForm.controls["gender"].value,
      phoneNumber: this.validateForm.controls["phoneNumber"].value,
      createdAt: this.employee.createdAt,
      createdBy: this.employee.createdBy,
    }

    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    await this.useService.putData(`Employees/${data.employeeID}`, data)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.remove(id);
            window.history.back();
            this.nzMessageService.success("Cập nhật thành công.");
          }, 600);
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
