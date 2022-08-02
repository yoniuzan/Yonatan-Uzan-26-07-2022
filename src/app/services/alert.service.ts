import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor() {

    }

    success(title: string, message: string): Promise<boolean> {
        return this.display(title, message, 'success', 'Cool');
    }

    warning(title: string, message: string): Promise<boolean> {
        return this.display(title, message, 'warning', 'Ok');
    }
   
    error(title: string, message: string): Promise<boolean> {
        return this.display(title, message, 'error', 'Oops');
    }

    private display(title: string, message: string, icon: SweetAlertIcon, button: string): Promise<boolean> {
        Swal.fire({
            title: title,
            text: message,
            icon: icon,
            confirmButtonText: button
        }).then((ans) => {
            return Promise.resolve(ans)
        })

        return;
    }

}
