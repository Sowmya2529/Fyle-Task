import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit,HostListener } from '@angular/core';
import { ApiService } from '../api.service';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  user:any;
  username:any;
  repos:any;
  page: number=1;
  itemsPerPage = 6;
  totalItems: any;
  searchText="";
  profloading:any;
  repoloading:any;
  public innerWidth: any;
  smallscreen=false;
  public maxSize: number = 100;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
   this.innerWidth= event.target.innerWidth;
   if(this.innerWidth<1280)
     this.smallscreen=true
   else
   this.smallscreen=false
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    console.log('back button')
   this.getRepos();
  }
  constructor(private apiservice:ApiService,private http:HttpClient,private router:Router) {
    

   }
//method to return to home page
goToHome()
{
  this.router.navigate([""])
}
//method to get repos of user
   getRepos()
   {
   
    if(this.username)
    {
      this.repoloading=true;
   
     this.apiservice.getRepos(this.username).subscribe(data=>
       {
        this.repoloading=false;
          console.log(data);
          this.repos=data;
           this.totalItems= this.repos.length;
         
       },
       error=>{
 
       });
   }
 
   }


  ngOnInit(): void 
  {
    console.log("oninit loaded")
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<1280)
    {
      this.smallscreen=true
    }
    this.username=localStorage.getItem('loginname');
    if(!this.username)
    {
      this.router.navigate(['']);
    }
    else
    {
      console.log(this.username)
      this.profloading=true;
      this.apiservice.getUser(this.username).subscribe(data=>
        {
        this.profloading=false;
          this.user=data
          this.user=Array.of(this.user)
        },
        error=>{
           console.log(error)
        });
      this.getRepos();
    }
  }


ngOnDestroy()
{
  localStorage.setItem("loginname","")
}

}
