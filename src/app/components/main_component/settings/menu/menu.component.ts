import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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
  ) { }

  ngOnInit(): void {
    this.handleLoadData();
  }

  //Decalre Variable
  loading = false;
  width = window.innerWidth;
  editCache: { [key: string]: { edit: boolean; data: Menu } } = {};
  listOfColumn = MenuColumnList;
  menus: readonly Menu[] = [];

  //Methos

  async handleLoadData() {
    this.loading = true;
    await this.useService.getData("Menus/")
      .subscribe((menus) => {
        setTimeout(() => {
          this.loading = false;
          this.menus = menus;
          this.updateEditCache(menus);
        }, 600);
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
      .subscribe(() => {
        setTimeout(() => {
          this.nzMessageService.remove(waiting);
          this.nzMessageService.success("Sửa thành công");
          this.handleLoadData();
        }, 600)
      });
    this.editCache[id].edit = false;
  }

  async switch(id: number, state: string, value: boolean) {
    const waiting = this.nzMessageService.loading('Chờ vài giây..', { nzDuration: 0 }).messageId;
    await this.useService.putData(`Menus/${id}/Active?state=${state}&value=${value}`, null)
      .subscribe(() => {
        setTimeout(() => {
          this.nzMessageService.remove(waiting);
          this.handleLoadData();
        }, 600);
      })
  }

  async confirm(menuID: number) {
    const waiting = this.nzMessageService.loading('Chờ vài giây..', { nzDuration: 0 }).messageId;
    await this.useService.deleteData(`Menus/${menuID}`)
      .subscribe(() => {
        setTimeout(() => {
          this.nzMessageService.remove(waiting);
          this.nzMessageService.success("Xóa thành công");
          this.handleLoadData();
        }, 600);
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

  switchActive(id: number) {
    this.editCache[id].data.isActive = !this.editCache[id].data.isActive;
  }

  switchSubmenu(id: number) {
    this.editCache[id].data.isSubmenu = !this.editCache[id].data.isSubmenu;
  }

  handleSelect(id: number, value: number) {
    this.editCache[id].data.parentID = value;
  }

  handleReload() {
    this.menus = [];
    this.handleLoadData();
  }

  cancel(): void {
    this.nzMessageService.info('Hủy');
  }

  convertToName(id: number) {
    return id == null ? null : this.menus.find(x => x.menuID === id)?.title;
  }

  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }

  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }

  exportXLSX(): void {
    let elm = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elm);

    //Tạo work book và thêm work sheet vào
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Lưu lại
    XLSX.writeFile(wb, 'Menu.xlsx');
  }
}
