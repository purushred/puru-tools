import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Data } from './../data';
import { Component, OnInit } from '@angular/core';
import * as yaml from 'js-yaml';
import * as xml from 'xml-js';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {

  data: Data = new Data();
  types: string[] = ['JSON', 'YAML', 'XML'];
  leftSelected: string = 'JSON';
  rightSelected: string = 'YAML';
  options = { compact: true, spaces: 2 };
  failureError: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  loadFile() {
    
  }
  convertData(data: Data, from: string, to: string) {

    if (data.leftText == "") return;
    try {
      let jsObject = this.getJSObject(data.leftText, from);
      let convertedText = this.getConvertedText(jsObject, to);
      data.rightText = convertedText;
    } catch (e: any) {
      this.dialog.open(AlertDialogComponent);
      this.failureError = e.message;
      console.log(e.message);
    }
  }

  getJSObject(text: string, from: string): any {
    switch (from) {
      case 'JSON':
        return JSON.parse(text);
      case 'XML':
        return xml.xml2js(text, this.options);
      case 'YAML':
        return yaml.load(text);
    }
  }

  getConvertedText(jsObject: any, to: string): string {
    switch (to) {
      case 'JSON':
        return JSON.stringify(jsObject, null, 2);
      case 'XML':
        return xml.js2xml(jsObject, this.options);
      case 'YAML':
        return yaml.dump(jsObject);
      default:
        return "";
    }
  }

}
