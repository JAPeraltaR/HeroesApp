import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public baseURl: string = environments.baseURL;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable< Hero[] > {
    return this.http.get<Hero[]>(`${ this.baseURl }/heroes`);
  }

  getHeroById( id: string ): Observable< Hero | undefined > {
    return this.http.get<Hero>((`${ this.baseURl }/heroes/${ id }`))
      .pipe(
        catchError( () => of(undefined))
      );
  }

  getSuggestion( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseURl }/heroes?q=${ query }&_limit=5`);
  }

}
