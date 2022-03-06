import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public getUser(username:string):Observable<any>
  {
    return this.http.get(this.rootUrl+'/users/'+username)
  }
  // public getRepos(username:string,page:number)
  // {
  //   return this.http.get(this.rootUrl+'/users/'+username+'/repos'+'?page='+page+'&per_page='+this.itemsPerPage)
  // }
  public getRepos(username:string,page:number):Observable<any>
  {
    return this.http.get(this.rootUrl+'/users/'+username+'/repos?page='+page+'&per_page=6')
  }
}
