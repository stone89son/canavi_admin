import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.css']
})
export class ManageJobComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['position', 'jobName', 'companyName','status','action'];
  ngOnInit() {
  }

}
