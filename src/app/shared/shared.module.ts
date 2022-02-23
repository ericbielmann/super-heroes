import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HeroService } from './services/hero.service';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [ConfirmDialogComponent, ConfirmDialogComponent, UppercaseDirective],
  imports: [CommonModule, AngularMaterialModule],
  exports: [CommonModule, AngularMaterialModule, UppercaseDirective],
  entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [HeroService],
    };
  }
}
