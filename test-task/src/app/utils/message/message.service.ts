import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar'

@Injectable()
export class MessageNotificationService {
  snackBarRef: any;
  errorClass: string = 'error';
  successClass: string = 'success';
  topPosition: MatSnackBarVerticalPosition = 'top';
  rightPosition: MatSnackBarHorizontalPosition = 'right';

  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  showError(errorMessage: string): void {

      this.zone.run(() => {
        this.snackBarRef = this.snackBar.open(errorMessage, undefined, {
          panelClass: [this.errorClass],
          verticalPosition: this.topPosition,
          horizontalPosition: this.rightPosition,
          duration: 3500
        });
      });
  }

  showSuccess(message: string): void {

      this.zone.run(() => {
        this.snackBarRef = this.snackBar.open(message, undefined, {
          panelClass: [this.successClass],
          verticalPosition: this.topPosition,
          horizontalPosition: this.rightPosition,
          duration: 3500
        });
      });
  }
}
