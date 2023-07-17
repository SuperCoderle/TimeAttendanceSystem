import  jwt_decode  from 'jwt-decode';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuAdmin, MenuEmployee } from 'src/app/models/menu';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //Declare Variables
  menu = MenuAdmin;
  active: string | null = '';
  token?: string | null = localStorage.getItem("token");
  user: any;

  //On Init method
  ngOnInit(): void {
    this.active = window.localStorage.getItem("state") != null ? window.localStorage.getItem("state") : 'Dashboard';
    if(this.token != null)
    {
      this.user = jwt_decode(this.token);
    }

    switch(this.user)
    {
      case "Administrator":
        this.menu = MenuAdmin;
        break;
      default:
        this.menu = MenuEmployee;
    }
  }

  //Constructor
  constructor(private route: ActivatedRoute, private router: Router) {}

  //Methods
  handleRoute(active: string)
  {
    this.active = active;
    window.localStorage.setItem("state", active);
  }
  
}
