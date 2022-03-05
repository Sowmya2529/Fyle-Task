import { Component ,OnInit} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

title = 'FyleTask';
users:any;
username="";
apierror=false;
error=false;
errmsg="";
profloading:any;


name=new FormControl();

constructor(private apiservice:ApiService,private router: Router)
{

}
ngOnInit() {
 
}

onSubmit()
{
  console.log(this.username);
  if(!this.username)
  {
    this.error=true;
     this.errmsg="Please provide username to continue!";
     this.apiservice.errmsg=this.errmsg;
  }
else
    this.getUser();
  
    

}

getUser()
{
  let user=this.username.toLowerCase()
  this.profloading=false;
this.apiservice.getUser(user).subscribe(data=>
  {
    this.profloading=true;
    this.apierror=false;
    this.error=false;
    this.apiservice.user=data;
    console.log(data);
    this.users=data
  localStorage.setItem('loginname', this.users['login']);
  localStorage.setItem('avatar_url',this.users['avatar_url']);
  localStorage.setItem('public_repos',this.users['public_repos']);
  localStorage.setItem('url',this.users['html_url']);
  console.log(this.users['html_url'])
  this.router.navigate([this.users['login'],'repos']);
  },
  error => {
    // You can access status:
    console.log(error.status);
    this.apierror=true;
    this.errmsg="User does not exist!";
    this.apiservice.errmsg=this.errmsg;
});

//console.log(this.users);
}


changeValue()
{
  console.log("changed");
  this.apierror=false;
  this.error=false;
}
}