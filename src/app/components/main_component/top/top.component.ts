import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  //On Init method
  ngOnInit(): void {
    if(this.token != null)
    {
      this.user = jwt_decode(this.token);
      console.log(this.user);
    }
  }

  //Constructor
  constructor(private router: ActivatedRoute) {}

  //Methods
  Signout()
  {
    window.localStorage.removeItem("token");
  }
}
