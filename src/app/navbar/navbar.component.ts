import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RepoComponent } from '../repo/repo.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  users:any;
  username="";
  apierror=false;
  error=false;
  errmsg="";
  profloading:any;
  name=new FormControl(); 
  constructor(private matDialog: MatDialog,private repo:RepoComponent,private apiservice:ApiService) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    console.log(this.username);
    if(!this.username)
    {
      this.error=true;
       this.errmsg="Please provide username to continue!";
       this.apiservice.errmsg=this.errmsg;
       this.openModal();
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
  this.repo.ngOnInit();
  },
  error => {
    // You can access status:
    console.log(error.status);
    this.apierror=true;
    this.errmsg="User does not exist!";
    this.apiservice.errmsg=this.errmsg;
    this.openModal();
});


}

openModal() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "200px";
  dialogConfig.width = "300px";
  const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
}
}
