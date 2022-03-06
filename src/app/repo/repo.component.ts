import { HttpClient } from '@angular/common/http';
import { Component, OnInit,HostListener } from '@angular/core';
import { ApiService } from '../api.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
 
  username:any;
  public_repos:any;
  avatar_url:any;
  url:any;
  repos:any;
  page: number=1;
  itemsPerPage = 6;
  totalItems: any;
  searchText="";
  profloading:any;
  repoloading:any;
  pages:number[]=[]
  totalpages:any=1;
  public innerWidth: any;
  smallscreen=false;
  curpage=1;
  public maxSize: number = 10;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;


  private routeSub: Subscription=new Subscription();
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  //windows resize event
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
   this.innerWidth= event.target.innerWidth;
   if(this.innerWidth<1280)
     this.smallscreen=true
   else
   this.smallscreen=false
  }

  //browswer backward press event
  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    console.log('back button')
   this.ngOnInit();
  }


  constructor(private apiservice:ApiService,private http:HttpClient,private router:Router,private route:ActivatedRoute) {
    
  

   }


//method to return to home page
goToHome()
{
  this.router.navigate([""])
}
//method to get repos of user
   getRepos(currpage:number)
   {
   // console.log(this.apiservice.user)
    console.log(this.username,this.avatar_url,this.public_repos,this.url)
      this.repoloading=true;
     if(this.public_repos>30)
     {
       if(this.public_repos%30)
       
         this.totalpages=Math.floor(this.public_repos/30)+1
       else
          this.totalpages=this.public_repos/30
     }
 //   this.pages=Array(this.totalpages).fill(0).map((_, i) => i+1);
  //  console.log(this.pages)
 //   console.log(this.totalpages)
     this.apiservice.getRepos(this.username,currpage).subscribe(data=>
       {
        this.repoloading=false;
          console.log(data);
          this.repos=data;
           this.totalItems= this.repos.length;
         
       },
       error=>{
 
       });
   
 
   }


  ngOnInit(): void 
  {
    console.log("oninit loaded");
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<1280)
    {
      this.smallscreen=true
    }
    this.username=localStorage.getItem('loginname');
    this.avatar_url=localStorage.getItem('avatar_url');
    this.public_repos=localStorage.getItem('public_repos');
    this.url=localStorage.getItem('html_url');

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
    //  this.page=params['page']
     
    });
    
    if(!this.username)
    
      this.router.navigate(['']);
    
    else
    
      this.getRepos(this.page);
      
  }

ngOnDestroy()
{
  localStorage.setItem("loginname","")
  localStorage.setItem("avatar_url","")
  localStorage.setItem("public_repos",'')
  localStorage.setItem("html_url","")
  this.routeSub.unsubscribe();
}


//on page change
loadPage(event:any)
{
  this.page=event;
 
//  this.router.navigate([this.username,event,'repos']);
 this.getRepos(this.page);

}

}
