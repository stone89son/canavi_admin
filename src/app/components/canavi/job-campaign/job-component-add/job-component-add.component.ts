import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
import { CompanyAutocompleteComponent } from '../company-autocomplete/company-autocomplete.component';
@Component({
  selector: 'app-job-component-add',
  templateUrl: './job-component-add.component.html',
  styleUrls: ['./job-component-add.component.css']
})
export class JobComponentAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JobComponentAddComponent>) { }

  ngOnInit() {
  }
  @ViewChild(CompanyAutocompleteComponent, {static: false})
  private timerComponent: CompanyAutocompleteComponent;

}
