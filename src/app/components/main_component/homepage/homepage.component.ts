import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  isActive = false;
  sidebarWidth: string = window.innerWidth <= 600 ? `${window.innerWidth * 0.8}px` : window.innerWidth >= 1280 ? '300px' : 'auto';
  translateMenu: string = '';

  constructor() {

  }

  ngOnInit(): void {}

  handleClick()
  {
    this.isActive = !this.isActive;
    this.isActive ? this.translateMenu = this.sidebarWidth : this.translateMenu = '0px';
  }
}
