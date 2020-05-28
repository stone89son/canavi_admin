import { Component, OnInit, Input } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FileService } from '../../services/upload/file.service';
import { FileUploadResponseModel } from '../../models/upload/file-upload-response-model';
import { FileUploadModel } from '../../models/result-model';

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.css']
})
export class MultipleFileUploadComponent implements OnInit {
  @Input() maxFiles = 100;

  errors: Array<string> = [];
  files: FileUploadModel[] = [];
  showDefaultContent = true;

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit() {    
    this.files = [];
  }

  onSelect(event, form) {
    this.showDefaultContent = event.files.length <= 0;
  }

  onRemove(event, form) {
    this.showDefaultContent = form.files.length <= 1;
  }

  async onUpload(event, form) {
    for (const file of event.files) {
      if (this.files.length < this.maxFiles) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const response = await this.fileService.upload(formData);
        // const responseObject = JSON.parse(response) as FileUploadResponseModel;
        if (response.status) {
          const item = new FileUploadModel();
          item.fullUrl = response.fullUrl;
          item.name = response.name;
          item.path = response.path;
          item.size = file.size;
          item.imagePath = response.path + '/' + response.name;
          this.files.push(item);
        } else {
          for (let i = 0; i < response.messages.length; i++) {
            this.errors.push(response.messages[i]);
          }
        }
      } else {
        this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      }
    }
    form.clear();
    this.showDefaultContent = true;
  }
}
