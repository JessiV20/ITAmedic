import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import{ MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatOptionModule, MatSelectModule,
    MatTableModule, MatDatepickerModule, MatTabsModule, MatExpansionModule, MatMenuModule,
    MatPaginatorModule, MatProgressSpinnerModule, FormsModule, MatSlideToggleModule, MatAutocompleteModule,
    ReactiveFormsModule, MatTooltipModule, MatCheckboxModule, MatDialogModule,
    MatGridListModule, MatNativeDateModule
  ],
  exports:[
    CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule,
    MatOptionModule, MatSelectModule, MatTableModule, MatDatepickerModule,
    MatTabsModule, MatExpansionModule, MatMenuModule, MatPaginatorModule,
    MatProgressSpinnerModule,  MatCardModule, FormsModule, MatSlideToggleModule, MatAutocompleteModule,
    ReactiveFormsModule, MatTooltipModule, MatCheckboxModule, MatDialogModule, MatGridListModule, MatNativeDateModule
  ],
  providers:[
    { provide: MatPaginatorIntl }
  ]
})
export class CompartidosModule { }
