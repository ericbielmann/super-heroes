import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    HeroesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HeroesComponent],
})
export class HeroesModule {}
