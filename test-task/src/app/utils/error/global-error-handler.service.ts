import { ErrorHandler, Injectable } from "@angular/core";
import { MessageNotificationService } from "../message/message.service";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import {StoreManagerComponent} from "../../shared-components/store-manager/store-manager.component";
import {State} from "../../store/models/state.model";

@Injectable()
export class GlobalErrorHandlerService extends StoreManagerComponent implements ErrorHandler {
  constructor(private messageService: MessageNotificationService, protected override store: Store<State>) {
    super(store);
  }

  handleError(error: Error | HttpErrorResponse | any): void {
    this.messageService.showError(error.message);
    this.setLoading(false);
  }
}
