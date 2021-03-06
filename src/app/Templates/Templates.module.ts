import { NgModule }       from '@angular/core'; 
import { RouterModule }   from '@angular/router';
import { CommonModule }   from '@angular/common';
import { MatButtonModule, 
         MatCardModule, 
         MatMenuModule, 
         MatToolbarModule, 
         MatIconModule, 
         MatInputModule, 
         MatDatepickerModule, 
         MatNativeDateModule, 
         MatProgressSpinnerModule,
         MatTableModule, 
         MatExpansionModule, 
         MatSelectModule,
         MatSnackBarModule, 
         MatTooltipModule, 
         MatChipsModule, 
         MatListModule, 
         MatSidenavModule, 
         MatTabsModule, 
         MatProgressBarModule,
         MatCheckboxModule,
         MatSliderModule,
         MatRadioModule,
         MatDialogModule,
         MatGridListModule,
         MatPaginatorModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GlobalModule } from '../Global/Global.module';
import { ProductGridComponent } from './Grid/ProductGrid/ProductGrid.component';
import { Grid3Component } from './Grid/Grid3/Grid3.component';
import { ReviewComponent } from './Review/Review.component';
import { ShopDetailsComponent } from './ShopDetails/ShopDetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSuggestedGridComponent } from './Grid/ProductSuggestedGrid/ProductSuggestedGrid.component';


@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      MatButtonModule, 
      FlexLayoutModule,
      MatCardModule, 
      MatMenuModule, 
      MatToolbarModule, 
      MatIconModule, 
      MatInputModule, 
      MatDatepickerModule, 
      MatNativeDateModule, 
      MatProgressSpinnerModule,
      MatTableModule, 
      MatExpansionModule, 
      MatSelectModule, 
      MatSnackBarModule, 
      MatTooltipModule, 
      MatChipsModule, 
      MatListModule, 
      MatSidenavModule, 
      MatTabsModule, 
      MatProgressBarModule,
      MatCheckboxModule,
      MatSliderModule,
      MatRadioModule,
      MatDialogModule,
      MatGridListModule,
      GlobalModule,
      FormsModule, 
      ReactiveFormsModule,
      MatPaginatorModule
   ],
   declarations: [
      ProductGridComponent,
      Grid3Component,
      ReviewComponent,
      ShopDetailsComponent,
      ProductSuggestedGridComponent
   ],
   exports: [
      ProductGridComponent,
      Grid3Component,
      ReviewComponent,
      ShopDetailsComponent,
      ProductSuggestedGridComponent
   ]
})
export class TemplatesModule {}
