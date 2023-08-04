import { HttpErrorResponse } from '@angular/common/http';
import  jwt_decode  from 'jwt-decode';
import { Component, Inject, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/dto';
import { CheckStatusCode } from 'src/app/status/status';
import { Router } from '@angular/router';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //Declare Variables
  checkStatusCode: CheckStatusCode = new CheckStatusCode(this.router);
  token?: string | null = localStorage.getItem("token");
  user: any;
  userRole: String[] = [];
  menus: Menu[] = [];
  width: number = 1280;

  //On Init method
  ngOnInit(): void {
    if(this.token != null)
    {
      this.user = jwt_decode(this.token);
      this.user['roles'] instanceof Array ? this.userRole = this.user['roles'] : this.userRole.push(this.user['roles']);
      console.log(this.user);
    }
    this.width = window.innerWidth;
    this.loadData();
  }

  //Constructor
  constructor(private useService: UseServiceService,
              private router: Router) {}

  //Methods
  isAdmin()
  {
    return this.userRole.some(x => x == "Administrator");
  }

  newMenus(parent: string): Menu[] {
    return this.menus.filter(x => x.parent === parent);
  }

  async loadData()
  {
    await this.useService.getData("Menus/")
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.menus = result;
            console.log(this.menus);
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.checkStatusCode.ErrorResponse(error.status) ? "" : console.log(error);
        }
      })
  }
}
