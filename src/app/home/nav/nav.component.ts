import { Component, OnInit } from '@angular/core';
import { faUser, faHome, faPenAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [UserService]
})
export class NavComponent implements OnInit {

  constructor(private userService:UserService, private router:Router,private authService: SocialAuthService) { }

  faUser = faUser;
  faHome = faHome;
  faPenAlt = faPenAlt;
  faBell = faBell;

  ngOnInit(): void {
  }

  logOut(){
    this.authService.signOut();
    this.userService.logOut();
    this.router.navigateByUrl("girisyap");
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}
