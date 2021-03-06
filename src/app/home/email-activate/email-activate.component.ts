import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ErrorMessage } from 'src/app/models/errorMessage';

@Component({
  selector: 'app-email-activate',
  templateUrl: './email-activate.component.html',
  styleUrls: ['./email-activate.component.scss'],
  providers: [UserService]
})
export class EmailActivateComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService:UserService, private router:Router) { 
    if(this.isAuthenticated){
      this.router.navigateByUrl('');
    }
  }

  errorMessages:ErrorMessage[] = [];
  successMessage:string = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.userService.activateEmail(params["userId"], params["token"]).subscribe(data =>{
        this.successMessage = data.toString();
      });
    }); 

    this.errorMessages = this.userService.getErrorMessages();
  }

  get isAuthenticated(){
    return this.userService.loggedIn();
  }
}
