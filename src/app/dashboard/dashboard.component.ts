import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../shared/models/hero';
import { HeroService } from '../shared/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  private readonly onDestroy = new Subject<void>();

  constructor(
    private heroService: HeroService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getRecentlyViewedHeroes()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
