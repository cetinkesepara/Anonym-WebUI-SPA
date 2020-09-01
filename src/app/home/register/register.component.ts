import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { 
    if(this.isAuthenticated){
      this.router.navigateByUrl('');
    }
  }

  ngOnInit() {
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}
