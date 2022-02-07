import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroDetailRoutingModule } from './hero-detail-routing.module';
import { HeroDetailComponent } from './hero-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    HeroDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HeroDetailComponent],
})
export class HeroDetailModule {}
