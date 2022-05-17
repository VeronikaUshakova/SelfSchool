import {NbComponentStatus, NbToastrService} from '@nebular/theme';
import { Injectable } from '@angular/core';

export abstract class IToastrService {
  abstract showToastr(status: NbComponentStatus, message: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class ToastrService implements IToastrService {

  constructor(private toastrService: NbToastrService) { }

  showToastr(status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, message, { duration: 3000, status });
  }
}
