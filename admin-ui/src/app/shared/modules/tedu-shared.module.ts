import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidationMessageComponent } from './validation-message/validation-massage.component';
import {PermissionDirective} from './moduledirective'
@NgModule({
  imports: [CommonModule],
  declarations: [ValidationMessageComponent,PermissionDirective],
  exports: [ValidationMessageComponent],
})
export class TeduSharedModule {}