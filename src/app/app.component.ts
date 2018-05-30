import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from './demo-service.service';
import { Observable } from 'rxjs';
import { element } from 'protractor';

import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public companies;

  public company_Name;

  constructor(private _demoService: DemoServiceService) {}

  ngOnInit(){
    this.getCompanies();
  } 

  getCompanies(company?) {

    // error handling to allow optional parameters on function call
    company = (company === undefined) ? '' : company;
    this._demoService.getCompanies(company).subscribe(
      data => { this.companies = data },
      err => console.error(err),
      () => console.log('we be done did done loading companies')
    );
  }

  createCompany(name) {
    let company = {name: name};
    this._demoService.createCompany(company).subscribe(
      data => {
        //refresh the list
        this.getCompanies();
        return true;
      },
      error => { 
          console.error("Error saving company!");
          return Observable.throw(error);
        }
    );
  }

  updateCompany(company) {
    this._demoService.updateComapny(company).subscribe(
       data => {
         // refresh the list
         this.getCompanies();
         return true;
       },
       error => {
         console.error("Error saving company!");
         return Observable.throw(error);
       }
    );
  }

  deleteCompany(company){
    if (confirm("Are you sure you want to delete" + company.CompanyName + "?")){
      this._demoService.deleteCompany(company).subscribe(
        data => {
          //refresh the list
          this._demoService.getCompanies();
          return true;
        },
        error => {
          console.error("Error deleting companies!");
          return Observable.throw(error);
        }
      );
    }
  }

}