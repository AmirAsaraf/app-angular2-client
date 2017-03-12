import { Component, OnInit } from '@angular/core';

import './upload.component.scss';
import {Http, Headers} from "@angular/http";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: 'app-upload',
  template: require('./upload.component.html')
})
export class UploadComponent {

  model = {
    step: 1,
    resourceId: '',
    uploadUrl: '',
    enableUpload: false,
    type: 'local',
    fileName: ''
  };

  constructor(private toasterService: ToasterService){}

  onAddingFile (name) {
    this.model.fileName = name;
  }

  onFinishedUpload (name) {
    this.cleanModel();
    this.toasterService.pop('success', 'Image uploaded successfully', name);
  }

  onRadioClick (value) {
    this.model.type = value;
  }
  uploadFromUrl () {
    /*
     this.http.get('http://pre13.deviantart.net/d96c/th/pre/i/2010/180/6/8/water_dragon_by_tiantian1008.jpg')
     .subscribe(
     data => {
     console.log(data.arrayBuffer());
     },
     err => console.log('Error is..:' + err)
     );.
     */
  }

  next (step) {
    this.model.step = step;
  }

  private cleanModel() {
    this.model = {
      step: 1,
      resourceId: '',
      uploadUrl: '',
      enableUpload: false,
      type: 'local',
      fileName: ''
    }
  }
}
