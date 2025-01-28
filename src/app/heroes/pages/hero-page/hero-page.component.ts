import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-page',
  standalone: false,

  templateUrl: './hero-page.component.html'
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor( private heroService: HeroService,
               private activateRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      delay(3000),
      switchMap( ({ id }) =>  this.heroService.getHeroById(id) )
    ).subscribe( hero => {
          if(!hero) return this.router.navigate([ '/heroes/list' ])
          this.hero = hero;
          console.log(hero);
          return;
      })
  }

  goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }

}
