import {Component, ViewChild, OnInit} from '@angular/core';

import './user-management.component.scss';

import {UserService} from "../shared/auth/user.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {User} from "../shared/auth/user";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: 'user-management',
  template: require('./user-management.component.html')
})
export class UsermanagementComponent implements OnInit  {

  private usersPromise : Promise<any>;

  constructor( private userService: UserService, private toasterService: ToasterService) {}

  private users;

  ngOnInit(): void {
    this.refreshUsers();
  }

  private refreshUsers () {
    //Get all users
    this.userService.getUsers().then(users => {
      this.users = users;
    });
  }

  private model = {
    title : 'Add User',
    type: 'Edit'
  };

  private userModel : User = new User('','','','','',true);
  private userToDelete : User = new User('','','','','',true);

  roles = [
    {name: 'Viewer'},
    {name: 'Modifier'},
    {name: 'Administrator'}
  ];

  @ViewChild('manageModal')
  manageModal: ModalComponent;

  @ViewChild('deleteModal')
  deleteModal: ModalComponent;

  openManageModal (type, user) {

    this.model.type = type;

    //Edit
    if (type === 'Edit') {
      this.userModel.fullName = user.fullName;
      this.userModel.userName = user.userName;
      this.userModel.userId = user.userId;
      this.userModel.password = user.password;
      this.userModel.role = user.role;
    }
    //Add
    else {
      this.cleanUserModel();
    }

    this.model.title = type + ' User';
    this.manageModal.open();
  }

  private cleanUserModel() {
    this.userModel = new User('','','','','Viewer',true);
  }

  openDeleteModal (user) {
    this.userToDelete = user;
    this.deleteModal.open();
  }

  onManageSave () {
    //Edit
    if (this.model.type === 'Edit') {
      //Clone object and create new one
      this.usersPromise = this.userService.modifyUser(Object.assign({},this.userModel)).then(() => {
        this.toasterService.pop('success', 'User modified successfully!', this.userModel.userName);
        this.refreshUsers();
    } )
    }
    //Add
    else {
      this.usersPromise = this.userService.addUser(Object.assign({},this.userModel)).then(user => {
        this.toasterService.pop('success', 'User added successfully!', this.userModel.userName);
        this.refreshUsers();
      });

    }
  }

  onDeleteUserOk () {
    //this.userService.removeUser(this.userToDelete.userId);
    this.usersPromise = this.userService.removeUser(this.userToDelete.userId).then(() => {
      this.toasterService.pop('success', 'User removed successfully!', this.userModel.userName);
      this.refreshUsers();
    })
  }
}
