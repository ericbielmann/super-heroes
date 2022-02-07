import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Hero } from '../shared/models/hero';
import { HeroService } from '../shared/hero.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, takeUntil, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit, AfterViewInit, OnDestroy {
  heroes: Hero[] = [];
  dataSource!: MatTableDataSource<Hero>;
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  displayedColumns: string[] = [
    'id',
    'superHeroName',
    'realName',
    'powers',
    'action',
  ];
  private readonly onDestroy = new Subject<void>();

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.dataSource = new MatTableDataSource<Hero>(this.heroes);
        this.cdr.detectChanges();
      });
  }

  deleteHero(heroId: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `Are you sure you want to delete?`,
      })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((result: Boolean) => {
        if (result) {
          const data = this.dataSource.data;
          data.splice(
            this.heroes.findIndex((x) => x.id === heroId),
            1
          );
          this.dataSource.data = data;
          this.heroService
            .deleteHero(heroId)
            .pipe(takeUntil(this.onDestroy))
            .subscribe();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
