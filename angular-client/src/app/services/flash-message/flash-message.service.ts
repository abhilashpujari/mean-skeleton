import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class FlashMessageService {

    constructor(private toastrService:ToastrService) {
    }

    success(title:string, message:any) {
        this.displayToast(title, message, 'success');
    }

    error(title:string, message:any) {
        this.displayToast(title, message, 'error');
    }

    info(title:string, message:any) {
        this.displayToast(title, message, 'info');
    }

    warning(title:string, message:any) {
        this.displayToast(title, message, 'warning');
    }

    private displayToast(title:string, message:any, type:string) {
        var timeout = 5000,
            message = message || '';

        var toastOptions = {
            closeButton: true,
            timeout: timeout,
        };

        switch (type) {
            case 'info':
                this.toastrService.info(title, message, toastOptions);
                break;
            case 'success':
                this.toastrService.success(title, message, toastOptions);
                break;
            case 'error':
                this.toastrService.error(title, message, toastOptions);
                break;
            case 'warning':
                this.toastrService.warning(title, message, toastOptions);
                break;
        }
    }
}