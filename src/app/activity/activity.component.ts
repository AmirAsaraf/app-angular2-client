import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import './activity-component.scss';

/*
 <!--<link rel="stylesheet" type="text/css" href="node_modules/primeng/resources/themes/omega/theme.css" />-->
 <!--<link rel="stylesheet" type="text/css" href="node_modules/font-awesome/font-awesome.min.css" />-->
 <!--<link rel="stylesheet" type="text/css" href="node_modules/primeng/resources/primeng.min.css" />-->
 */

@Component({
  selector: 'app-admin',
  template: require('./activity.component.html'),
})
export class ActivityComponent implements OnInit {

  actions = [
    {name: 'All'},
    {name: 'Upload'},
    {name: 'Delete'}
  ];

  model = {
    action: 'All Actions',
    from: new Date(),
    to: new Date()
  };

  constructor() {}

  ngOnInit() {

  }
  submitForm(): void {
    console.log("app");
  }
}
