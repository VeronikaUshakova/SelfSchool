import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export abstract class IExcelService {
  abstract exportExcel(element: HTMLElement, fileName: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportExcel(element: HTMLElement, fileName: string): void {
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName+'.xlsx');
  }
}
