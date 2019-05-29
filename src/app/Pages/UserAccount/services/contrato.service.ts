import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import 'rxjs/Rx';

//import { ReviewPopupComponent } from '../Global/ReviewPopup/ReviewPopup.component';
//import { ConfirmationPopupComponent } from '../Global/ConfirmationPopup/ConfirmationPopup.component';

interface Response {
  data     : any;
}

@Injectable()
export class ContratoService {

}
