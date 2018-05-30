import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

let URL: string = "https://databaseintergration.azurewebsites.net/api";

@Injectable({
  providedIn: 'root'
})
export class DemoServiceService {

  constructor(private http:HttpClient) { }

  getCompanies(company?){
    return this.http.get(URL + '/GetCompanyList?name=' + company);
  }

  createCompany(company){
    let body = JSON.stringify(company);
    return this.http.post(URL +'/PostCompanyList', body, httpOptions);
  }

  updateComapny(company){
    let body = JSON.stringify(company);
    return this.http.put(URL+'/PutCompanyList/', body, httpOptions);
  }

  deleteCompany(company){
    let body = JSON.stringify(company);
    return this.http.post(URL + '/DeleteCompanyList/', body, httpOptions);
  }

}