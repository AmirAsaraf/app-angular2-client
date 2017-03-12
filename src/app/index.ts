import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {UsermanagementComponent} from "./usermanagement/user-management.component";
import {LoginComponent} from "./login/login.component";
import {SearchComponent} from "./search/search.component";
import {UploadComponent} from "./upload/upload.component";
import {ActivityComponent} from "./activity/activity.component";
import {ImagesGridComponent} from "./search/imagesgrid/images-grid.component";
import {MainComponent} from "./main";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {AuthenticationService} from "./shared/auth/authentication.service";
import {rootRouterConfig} from "./routes";
import {Ng2TableModule, NgTablePagingDirective} from "ng2-table";
import {ImageUploadComponent} from "./upload/imageupload/image-upload.component";
import {FileUploadModule} from "ng2-file-upload";
import {CalendarModule} from 'primeng/primeng';
//import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule }   from '@angular/forms';
import {UserService} from "./shared/auth/user.service";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";

import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import {ActivitygridComponent} from "./activity/activitygrid/activity-grid.component";
import { HttpModule } from '@angular/http';
import {ToasterModule} from "angular2-toaster";
import {BusyModule} from "angular2-busy";


//import { Ng2TableModule } from 'ng2-table/ng2-table';
//import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    Ng2TableModule,
    FileUploadModule,
    CalendarModule,
    FormsModule,
    Ng2Bs3ModalModule,
    HttpModule,
    ToasterModule,
    BusyModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    UsermanagementComponent,
    LoginComponent,
    SearchComponent,
    UploadComponent,
    ActivityComponent,
    ImagesGridComponent,
    ImageUploadComponent,
    ActivitygridComponent
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
