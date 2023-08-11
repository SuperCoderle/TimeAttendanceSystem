import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/dto';
import { Router } from '@angular/router';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  //Declare Variables
  loading = false;
  userRole: String[] = [];
  menus: Menu[] = [];
  width: number = 1280;

  //On Init method
  ngOnInit(): void {
    this.width = window.innerWidth;
    this.loadData();
  }

  //Constructor
  constructor(private useService: UseServiceService,
    private router: Router) { }
  ngAfterViewInit(): void {
    this.width = window.innerWidth;
  }

  //Methods
  isAdmin(): boolean {
    const token = localStorage.getItem("token");
    let roles: String[] = [];
    if (token != null) {
      const decodeValue: any = jwt_decode(token);
      roles = decodeValue != null && decodeValue != undefined ? decodeValue['roles'] instanceof Array ? decodeValue['roles'] : [decodeValue['roles']] : [];
      if (roles.length <= 0)
        return false;
    }

    return roles.some(x => x == "Administrator");
  }

  parentMenu() {
    return this.menus.filter(x => x.parentID == null && !x.isSubmenu);
  }

  submenu() {
    return this.menus.filter(x => x.isSubmenu);
  }

  childMenu(parentID: number): Menu[] {
    return this.menus.filter(x => x.parentID === parentID);
  }

  async loadData() {
    this.loading = true;
    await this.useService.getData("Menus/Authenticate")
      .subscribe((menus) => {
        setTimeout(() => {
          this.menus = menus;
          this.loading = false
        }, 600);
      })
  }
}
