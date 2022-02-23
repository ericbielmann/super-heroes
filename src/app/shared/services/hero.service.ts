import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Hero } from '../models/hero';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService {
  base_path = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getRecentlyViewedHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.base_path}/recentlyViewed`)
      .pipe(catchError(this.handleError));
  }

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.base_path}/heroes`)
      .pipe(catchError(this.handleError));
  }

  getHero(id: number): Observable<Hero> {

    return this.http
      .get<Hero>(`${this.base_path}/heroes/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(
        `${this.base_path}/heroes`,
        JSON.stringify(hero),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateHero(id: string, hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(
        `${this.base_path}/heroes/${id}`,
        JSON.stringify(hero),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteHero(id: number) {
    return this.http
      .delete<Hero>(`${this.base_path}/heroes/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => 'Something went wrong');
  }

  addRecentlyViewedHeroe(hero: Hero) {
    this.getRecentlyViewedHeroes().subscribe((recents) => {
      const recent = recents.find((x) => x.id === hero.id);
      if (!recent) {
        if (recents.length >= 5) {
          this.deleteRecent(recents[0].id).subscribe((x) =>
            this.createRecent(hero).subscribe()
          );
        } else {
          this.createRecent(hero).subscribe();
        }
      }
    });
  }

  private createRecent(hero: Hero) {
    return this.http
      .post<Hero>(
        `${this.base_path}/recentlyViewed`,
        JSON.stringify(hero),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  private deleteRecent(heroId: number) {
    return this.http
      .delete<Hero>(
        `${this.base_path}/recentlyViewed/${heroId}`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
