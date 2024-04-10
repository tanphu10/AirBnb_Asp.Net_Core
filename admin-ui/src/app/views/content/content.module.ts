import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ContentRoutingModule } from './content-routing.module';
import { BlockUIModule } from 'primeng/blockui';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TeduSharedModule } from 'src/app/shared/modules/tedu-shared.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ImageModule } from 'primeng/image';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SeriesComponent } from './series/series.component';
import { SeriesDetailComponent } from './series/series-detail.component';
import { RoomCategoryComponent } from './room-categories/room-category.component';
import { RoomCategoryDetailComponent } from './room-categories/room-category-detail.component';
import { RoomComponent } from './rooms/room.component';
import { RoomSeriesComponent } from './rooms/room-series.component';
import { RoomReturnReasonComponent } from './rooms/room-return-reason.component';
import { RoomActivityLogsComponent } from './rooms/room-activity-logs.component';
import { RoomDetailComponent } from './rooms/room-detail.component';
import { SeriesRoomsComponent } from './series/series-room.component';

@NgModule({
  imports: [
    ContentRoutingModule,
    IconModule,
    CommonModule,
    ReactiveFormsModule,
    ChartjsModule,
    ProgressSpinnerModule,
    PanelModule,
    BlockUIModule,
    PaginatorModule,
    BadgeModule,
    CheckboxModule,
    TableModule,
    KeyFilterModule,
    TeduSharedModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    EditorModule,
    InputNumberModule,
    ImageModule,
    AutoCompleteModule,
    DynamicDialogModule
  ],
  declarations: [
    RoomCategoryComponent,
    RoomCategoryDetailComponent,
    RoomComponent,
    RoomSeriesComponent,
    RoomReturnReasonComponent,
    RoomActivityLogsComponent,
    RoomDetailComponent,
    SeriesComponent,
    SeriesDetailComponent,
    SeriesRoomsComponent
  ],
})
export class ContentModule {}
