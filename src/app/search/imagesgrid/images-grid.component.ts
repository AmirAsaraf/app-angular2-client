
import {Component, OnInit, ViewChild} from '@angular/core';
import { DemoData } from './demo-data';

import './images-grid.component.scss';
import {ModalComponent} from "ng2-bs3-modal/components/modal";

/*
 http://valor-software.com/ng2-table/
 */


@Component({
  selector: 'images-grid',
  template: require('./images-grid.component.html')
})

export class ImagesGridComponent implements OnInit {

  @ViewChild('deleteImageModal')
  deleteImageModal: ModalComponent;

  @ViewChild('showImageModal')
  showImageModal: ModalComponent;

  public model =
  {
    image : {},
    imageUrl:''
  };

  private LINK_PREFIX = '<a style="cursor: pointer">';
  private LINK_POSTFIX = '</a>';

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {
      title: 'Image Url',
      name: 'imageUrl',
      sort: 'asc'
    },
    {
      title: 'Source Name',
      name: 'sourceName',
      sort: 'asc'
    },
    {
      title: 'Width',
      name: 'width'
    },
    {
      title: 'Height',
      name: 'height'
    },
    {
      title: '',
      name: 'delete'
    }
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = DemoData;

  public constructor() {
    this.length = this.data.length;
  }

  public ngOnInit():void {
    this.onChangeTable(this.config);
    this.formatRows();
  }

  private formatRows() {
    this.columns.forEach((column:any) => {
      this.rows.forEach((row:any) => {
        if (column.name === 'imageUrl') {
          row[column.name] = this.LINK_PREFIX + row[column.name] + this.LINK_POSTFIX;
        }
        else if (column.name === 'delete') {
          row[column.name] = '<a style="cursor: pointer"><i class="glyphicon glyphicon-trash"></i></a>';
        }
      });
    });
  }

  private stripLink(link) {
    return link.replace(this.LINK_PREFIX,'').replace(this.LINK_POSTFIX,'');
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name] !== undefined) {
          if (item[column.name].toString().match(this.config.filtering.filterString)) {
            flag = true;
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);

    this.model.image = data.row;
    this.model.imageUrl = data.row.url;

    if (data.column === 'delete') {
      this.deleteImageModal.open();
    }
    else if (data.column === 'imageUrl') {

      //Dialog container should be in the size of the image, In case larger than the screen set to 85% with scroller
      var htmlElement: Element  = document.getElementsByClassName('modal-dialog')[1];

      var widthValue = ((this.model.image['width'] + 22 ) > window.innerHeight) ? '85%' : (this.model.image['width'] + 22 ) + 'px';

      htmlElement['style'].width = widthValue;

      this.showImageModal.open();
    }
  }

}
