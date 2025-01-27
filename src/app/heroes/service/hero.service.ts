import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public baseURl: string = environments.baseURL;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable< Hero[] > {
    return this.http.get< Hero[] >(`${ this.baseURl }/heroes`);
  }

  getHeroById( id: string ): Observable< Hero | undefined > {
    return this.http.get< Hero >((`${ this.baseURl }/heroes/${ id }`))
      .pipe(
        catchError( () => of(undefined))
      );
  }

  getSuggestion( query: string ): Observable< Hero[] > {
    return this.http.get< Hero[] >(`${ this.baseURl }/heroes?q=${ query }&_limit=5`);
  }

  addHero( hero: Hero ): Observable< Hero > {
    return this.http.post< Hero >(`${ this.baseURl }/heroes`, hero);
  }

  updateHero( hero: Hero ): Observable< Hero > {
    if ( !hero ) throw Error("Hero Id is required");
    return this.http.patch< Hero >(`${ this.baseURl }/heroes/${ hero.id }`, hero);
  }

  deleteHeroById( id: string ): Observable< boolean >{
    return this.http.delete(`${ this.baseURl }/heroes/${ id }`).pipe(
      catchError(() => of(false)),
      map( resp => true)
    )
  }

}
