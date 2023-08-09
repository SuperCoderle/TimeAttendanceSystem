import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  //Declare Variables
  token?: string | null = localStorage.getItem("token");
  user: any;
  paths: String[] = location.pathname.replace("/home/", '').split("/");
  url?:String;
  pathname: string = window.location.pathname;
  pathArray = this.pathname.split("/").filter(x => x !== "" && x !== "home");

  //On Init method
  ngOnInit(): void {
    if(this.token != null)
    {
      this.user = jwt_decode(this.token);
    }

    this.pathArray.forEach((word, index) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
    
      this.pathArray[index] = firstLetter + rest;
    });
  }

  //Constructor
  constructor(
    private router: ActivatedRoute,
    private loginService: LoginService
    ) {}

  //Methods
  Signout()
  {
    this.loginService.logout();
  }

  RouterLink(name: string): string {
    let path = '';
    for(let i = 0; i <= this.pathArray.indexOf(name); i++)
    {
      path += "/" + this.pathArray[i].toLowerCase();
    }
    return "home" + path;
  }
}
