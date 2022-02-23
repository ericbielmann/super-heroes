import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Hero } from '../shared/models/hero';
import { HeroService } from '../shared/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  hero: Hero | undefined;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  heroId?: number;
  heroForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    superHeroName: new FormControl(),
    realName: new FormControl(),
    description: new FormControl(),
    powers: new FormControl(),
  });
  private readonly onDestroy = new Subject<void>();
  @ViewChild('superHeroName') superHeroName: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    if (this.heroId != 0) {
      this.getHero();
    }
    
  }

  getHero(): void {
    this.heroService
      .getHero(this.heroId!)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((hero) => {
        this.hero = hero;

        this.heroService.addRecentlyViewedHeroe(hero);

        this.heroForm = this.fb.group({
          superHeroName: [hero.superHeroName, [Validators.required]],
          realName: [hero.realName, [Validators.required]],
          description: [hero.description],
          powers: [hero.powers],
        });

        if(this.superHeroName) {
          this.superHeroName.nativeElement.focus();
        }
        this.cdr.detectChanges();
      });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.heroForm.controls[controlName].hasError(errorName);
  };

  updateHeroForm() {
    const id = this.actRoute.snapshot.paramMap.get('id')!;
    if (this.heroId) {
      this.heroService
        .updateHero(id, this.heroForm.value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res) => {
          this.router.navigateByUrl('/heroes');
        });
    } else {
      this.heroService
        .createHero(this.heroForm.value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res) => {
          this.router.navigateByUrl('/heroes');
        });
    }
  }

  cancel(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `Are you sure you want cancel the operation?`,
      })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((result: Boolean) => {
        if (result) {
          this.location.back();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
