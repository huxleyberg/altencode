import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/create-trade', title: 'Create Trade',  icon:'bubble_chart', class: '' },
    // { path: '/create-instrument', title: 'Create Instruments',  icon:'bubble_chart', class: '' },
    { path: '/instruments', title: 'Securities Management',  icon:'bubble_chart', class: '' },
    // { path: '/create-bank', title: 'Create Bank',  icon:'bubble_chart', class: '' },
    { path: '/banks', title: 'Settlement Bank',  icon:'bubble_chart', class: '' },
    // { path: '/create-institution', title: 'Create Institution',  icon:'bubble_chart', class: '' },
    { path: '/institutions', title: 'Institutions',  icon:'bubble_chart', class: '' },
    { path: '/institution-contacts', title: 'Institution Contacts',  icon:'bubble_chart', class: '' },
    { path: '/blotter', title: 'Blotter',  icon:'library_books', class: '' },
    { path: '/income-summary', title: 'Income Summaries',  icon:'library_books', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },


    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
