import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})



export class HomepageComponent implements OnInit {
  token: any = window.localStorage.getItem("token");

  constructor() {}

  ngOnInit(): void {

  }

}
