import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public baseURl: string = environments.baseURL;

  constructor(private httpClient: HttpClient) { }

  getHoroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseURl}/heroes`);
  }
}
