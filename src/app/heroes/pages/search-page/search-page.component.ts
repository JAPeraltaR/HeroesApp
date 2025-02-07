import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../service/hero.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  standalone: false,

  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  public searchInput = new FormControl();
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroService: HeroService ) { }

  searchHero(): void {
    const value: string  = this.searchInput.value || '';
    this.heroService.getSuggestion( value ).subscribe( heroes => this.heroes = heroes);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if( !event.option.value ){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  };
}
