import { Component, OnInit } from '@angular/core';
import { faUser, faHome, faPenAlt, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  faUser = faUser;
  faHome = faHome;
  faPenAlt = faPenAlt;
  faBell = faBell;

  ngOnInit(): void {
  }

}
