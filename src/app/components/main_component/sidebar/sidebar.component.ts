import { HttpErrorResponse } from '@angular/common/http';
import  jwt_decode  from 'jwt-decode';
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
    }
    this.width = window.innerWidth;
    this.loadData();
  }

  //Constructor
  constructor(private useService: UseServiceService,
              private router: Router) {}
  ngAfterViewInit(): void {
    this.width = window.innerWidth;
  }

  //Methods
  isAdmin()
  {
    return this.userRole.some(x => x == "Administrator");
  }

  parentMenu()
  {
    return this.menus.filter(x => x.parentID == null && !x.isSubmenu);
  }

  submenu()
  {
    return this.menus.filter(x => x.isSubmenu);
  }

  childMenu(parentID: number): Menu[] {
    return this.menus.filter(x => x.parentID === parentID);
  }
  
  async loadData()
  {
    this.loading = true;
    await this.useService.getData("Menus/Authenticate")
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.menus = result;
            this.loading = false
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false; 
          console.log(error);
        }
      })
  }
}
