import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    window.addEventListener('resize', this.onResize);
  }
  title = 'Timekeeping';

  onResize() {
    location.reload();
  }
}
