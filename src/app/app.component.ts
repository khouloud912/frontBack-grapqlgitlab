import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { DataService } from './data.service';


export interface ProjectElement {
  name: string;
  position: number;
  stars: number;
}
const ELEMENT_DATA: ProjectElement[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private dataService: DataService){ }

  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe((data: any[])=>{
      console.log("data",data , typeof(data));
      let p=0;
      Object.entries(data).forEach(([key, value]) => {
        console.log(key, value);
        ELEMENT_DATA.push(
          {position: p++ , name: key, stars: value}
        )
      });
      console.log("final",ELEMENT_DATA )
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    })      
  }
  title = 'my-app';
  displayedColumns: string[] = ['position', 'name', 'stars'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
