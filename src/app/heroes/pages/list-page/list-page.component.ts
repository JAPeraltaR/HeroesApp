import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'heroes-list-page',
  standalone: false,

  templateUrl: './list-page.component.html'
})
export class ListPageComponent implements OnInit{

  public heroes: Hero[] = [];

  constructor( public heroService: HeroService ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe( heroes => this.heroes = heroes);
  }




}
