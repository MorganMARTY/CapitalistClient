import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { World, Pallier, Product } from './world';


@Injectable({
  providedIn: 'root'
})
export class RestserviceService {
  server = "http://localhost:8080/"
  user = "";

  constructor(private http: HttpClient) {
    
   }
  getUser() {
    return this.user;
  }
  setUser(){
    this.user=this.user;
  }
  getServer() {
    return this.server;
  }
  setServer(){
    this.server=this.server;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getWorld(): Promise<World> {
    return this.http.get(this.server + "adventureisis/generic/world", { 
   headers: this.setHeaders(this.user)})
    .toPromise().catch(this.handleError);
   };
   
  private setHeaders(user: string): HttpHeaders {
    var headers = new HttpHeaders({ 'X-User': user});
    return headers;
    };

}
