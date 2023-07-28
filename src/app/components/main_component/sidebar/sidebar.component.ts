import  jwt_decode  from 'jwt-decode';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //Declare Variables
  token?: string | null = localStorage.getItem("token");
  user: any;
  userRole: String[] = [];
  width: number = 1280;

  //On Init method
  ngOnInit(): void {
    if(this.token != null)
    {
      this.user = jwt_decode(this.token);
      this.userRole = this.user['roles'];
    }
    this.width = window.innerWidth;
  }

  //Constructor
  constructor() {}

  //Methods
  isAdmin()
  {
    return this.userRole.some(x => x == "Administrator");
  }
}
