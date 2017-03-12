import {Component, OnInit, HostListener, Output, EventEmitter} from "@angular/core";
import {FileUploader} from "ng2-file-upload";
import "./image-upload.component.scss";

/*
 https://github.com/valor-software/ng2-file-upload
 */

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'image-upload',
  template: require('./image-upload.component.html')
})
export class ImageUploadComponent implements OnInit {

  @Output()
  onAddingFile: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  onFinishedUpload: EventEmitter<String> = new EventEmitter<String>();

  private allowedFileType = ['image/png','image/jpeg'];
  private allowedFileSize = 5000000;

  public uploader:FileUploader = new FileUploader({
    url: URL,
    queueLimit: 2,
    removeAfterUpload: true
  });

  public model = {
    fileItem: undefined,
    size: 0,
    message: '',
    isValidFile: false,
    isUploading : false
  };

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (item: any) => {

      if (this.uploader.queue.length > 1) {
        this.uploader.queue.splice(0,1)
      }

      console.log(this.uploader.queue);

      this.model.fileItem = item.file;
      this.model.size = item.file.size;
      this.model.isValidFile = this.isValidFile(item.file);

      //If file is valid
      if (this.model.isValidFile) {
        this.onAddingFile.next(item.file.name);
      }
    };

    this.uploader.onProgressAll = (progress: any) => {
      this.model.message = 'Uploading... (' + progress + '%)';
    };

    this.uploader.onCompleteAll = () => {
      setTimeout(() => {
        this.model.message = 'All Ok';
        this.model.isUploading = false

        this.onFinishedUpload.next(this.model.fileItem.name);
      }, 1000);
    };
  }

  private onUpload() {
    this.model.isUploading = true;
    this.model.message = 'Uploading...';
    this.uploader.uploadAll();
  }

  private isValidFile(file: any) {
    this.model.message = 'Ready to upload!';

    if ( !(this.isAllowedTypes(file.type)) ) {
      this.model.message = 'Only jpg, jpeg and png files allowed';
      return false;
    }
    else if ( !(this.isAllowedSize(file.size)) ) {
      this.model.message = 'Exceeded maximum size of 5 MB';
      return false;
    }

    return true;
  }

  private isAllowedTypes(type) {
    return (this.allowedFileType.indexOf(type) > -1);
  }

  private isAllowedSize(size) {
    return size <= this.allowedFileSize;
  }
}
