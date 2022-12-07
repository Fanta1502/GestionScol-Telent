import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  print;
  text;
  constructor() { }  
  printData(data)
  {
    this.print = data;
  }
  getPrintData()
  {
    return this.print;
  }
  printText(data)
  {
    this.text = data;
  }
  getPrintText()
  {
    return this.text;
  }
}
