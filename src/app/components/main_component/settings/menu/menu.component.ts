import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Menu } from 'src/app/models/dto';
import { MenuColumnList } from 'src/app/models/listOfColumn';
import { UseServiceService } from 'src/app/services/useService/use-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //Constructor
  constructor(
    private nzMessageService: NzMessageService,
    private useService: UseServiceService
  ) {}

  ngOnInit(): void {
    this.handleLoadData();
  }

  //Decalre Variable
  loading = false;
  indeterminate = false;
  editCache: { [key: string]: { edit: boolean; data: Menu } } = {};
  listOfColumn = MenuColumnList;
  listOfCurrentPageData: readonly Menu[] = [];
  menus: readonly Menu[] = [];
  visible = false;

  //Methos

  async handleLoadData()
  {
    this.loading = true;
    await this.useService.getData("Menus/")
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.loading = false;
            this.menus = result;
            this.updateEditCache(result);
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false; 
          console.log(error);
        }
      })
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.menus.findIndex(item => item.menuID === id);
    this.editCache[id] = {
      data: { ...this.menus[index] },
      edit: false
    };
  }

  async saveEdit(id: number) {
    const waiting = this.nzMessageService.loading('Chờ vài giây..', { nzDuration: 0 }).messageId;
    await this.useService.putData(`Menus/${id}`, this.editCache[id].data)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.remove(waiting);
            this.nzMessageService.success("Sửa thành công");
            this.handleLoadData();
          }, 600)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    this.editCache[id].edit = false;
  }

  async switch(id: number, state: string, value: boolean)
  {
    const waiting = this.nzMessageService.loading('Chờ vài giây..', { nzDuration: 0 }).messageId;
    await this.useService.putData(`Menus/${id}/Active?state=${state}&value=${value}`, null)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.remove(waiting);
            this.handleLoadData();
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  updateEditCache(menus: Menu[]): void {
    this.menus.forEach(item => {
      this.editCache[item.menuID] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  switchActive(id: number)
  {
    this.editCache[id].data.isActive = !this.editCache[id].data.isActive;
  }

  switchSubmenu(id: number)
  {
    this.editCache[id].data.isSubmenu = !this.editCache[id].data.isSubmenu;
  }

  handleSelect(id: number, value: number) {
    this.editCache[id].data.parentID = value;
  }

  handleReload()
  {
    this.menus = [];
    this.handleLoadData();
  }

  cancel(): void {
    this.nzMessageService.info('Hủy');
  }

  convertToName(id: number)
  {
    return id == null ? null : this.menus.find(x => x.menuID === id)?.title;
  }

  exportXLSX(): void {
    let elm = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elm);

    //Tạo work book và thêm work sheet vào
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Lưu lại
    XLSX.writeFile(wb, 'Menu.xlsx');
  }
}
