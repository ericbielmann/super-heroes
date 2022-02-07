import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  loading: boolean;

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.loaderService.isLoading
      .pipe(takeUntil(this.onDestroy))
      .subscribe((v) => {
        this.loading = v;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
