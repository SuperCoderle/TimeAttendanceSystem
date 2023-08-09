import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Schedule, Shift } from 'src/app/models/dto';
import { UseServiceService } from 'src/app/services/useService/use-service.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-register-shift-employee',
  templateUrl: './register-shift-employee.component.html',
  styleUrls: ['./register-shift-employee.component.css']
})
export class RegisterShiftEmployeeComponent {
  //Declare Variables
  validateForm: UntypedFormGroup;
  title: string = "";
  shifts: readonly Shift[] = [];
  shiftName(id: number): string | undefined {
    let shiftName = this.shifts.find(x => x.shiftID === id)?.shiftName;
    return shiftName;
  }

  //Constructor
  constructor(private formBuilder: UntypedFormBuilder,
    private nzMessageService: NzMessageService,
    private useService: UseServiceService,
    ) {

    this.validateForm = this.formBuilder.group({
      formArray: this.formBuilder.array([])
    });

    this.addField();
    this.loadData();
  }

  //Methos
  get formArray()
  {
    return this.validateForm.controls["formArray"] as FormArray;
  }

  submit() {
    this.formArray.controls.forEach((element, index) => {
      var data: Schedule = {
        scheduleID: uuid(),
        shiftID: element.value.shift,
        timeIn: '00:00:00',
        timeOut: '00:00:00',
        workDate: element.value.workDate,
        description: element.value.description,
        employeeID: uuid(),
        totalWorkHours: 0.0,
        isInProgress: true,
        isSubmit: false,
        isOpen: false,
        violationID: null,
        approvedAt: null,
        approvedBy: null,
        createdAt: new Date(),
        createdBy: "someone"
      }
      
      this.post(index + 1, data);
    });
  }

  async post(index: number, data: Schedule)
  {
    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;

    await this.useService.postData("Schedules/Employee", data)
    .subscribe({
      next: (result) => {
        setTimeout(() => {
          if(index == this.formArray.length)
          {
            this.nzMessageService.success('Đăng ký ca thành công');
            this.loadData();
          }
          this.nzMessageService.remove(id);
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        this.nzMessageService.remove(id);
        if (error.status == 400) {
          this.nzMessageService.error(error.error, { nzDuration: 5000 });
        }
      }
    })
  }

  async loadData() {
    await this.useService.getData("Shifts")
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.shifts = result;
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
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

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    }
    return {};
  };

  addField(): void {
    const formGroup = this.formBuilder.group({
      workDate: [new Date, Validators.required],
      shift: [0, Validators.required],
      description: [null]
    })

    this.formArray.push(formGroup);
  }

  removeField(index: number): void {
    this.formArray.removeAt(index);
  }
}
