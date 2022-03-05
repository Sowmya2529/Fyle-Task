import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  rootUrl="https://api.github.com";
  user:any;
  itemsPerPage=6;
  errmsg="";

  constructor(private http: HttpClient ) { 

  }

  public getUser(username:string)
  {
    return this.http.get(this.rootUrl+'/users/'+username)
  }
  // public getRepos(username:string,page:number)
  // {
  //   return this.http.get(this.rootUrl+'/users/'+username+'/repos'+'?page='+page+'&per_page='+this.itemsPerPage)
  // }
  public getRepos(username:string)
  {
    return this.http.get(this.rootUrl+'/users/'+username+'/repos')
  }
}
