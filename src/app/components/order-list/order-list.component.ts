import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  today = new Date();
  updateInterval;

  constructor() {}

  ngOnInit(): void {
    this.updateInterval = setInterval(() => this.updateToday(), 6000);
  }

  updateToday() {
    this.today = new Date();
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }
}
