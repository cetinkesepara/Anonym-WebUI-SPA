import { Component, OnInit } from '@angular/core';
import { faUser, faHome, faPenAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [UserService]
})
export class NavComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  faUser = faUser;
  faHome = faHome;
  faPenAlt = faPenAlt;
  faBell = faBell;

  ngOnInit(): void {
  }

  logOut(){
    this.userService.logOut();
    this.router.navigateByUrl("girisyap");
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}
