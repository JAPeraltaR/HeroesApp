import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../service/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  standalone: false,

  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:  new FormControl< string >(''),
    superhero:  new FormControl< string >('', { nonNullable: true}),
    publisher:  new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego:  new FormControl<string>(''),
    first_appearance:  new FormControl<string>(''),
    characters:  new FormControl<string>(''),
    alt_img: new FormControl<string>('')
  });

  public publishers = [
    {id:'DC Comics', desc: 'DC - Comics'},
    {id:'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  constructor( private heroService : HeroService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) { }


  ngOnInit(): void {
    if( !this.router.url.includes('edit') ) return;
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroService.getHeroById( id )),
    ).subscribe( hero => {
      if( !hero ) return this.router.navigateByUrl('/');
      this.heroForm.reset( hero );
      return;
    })

  }

  get currentHero(): Hero {
    const heroe = this.heroForm.value as Hero;
    return heroe;
  }

  onSubmit(): void {
    if( this.heroForm.invalid ) return;
    if( this.currentHero.id ){
      this.heroService.updateHero( this.currentHero )
                      .subscribe( hero => {
                        this.showSnackBar(`${ hero.superhero } Updated!!`)
                      });
      return;
    }

    this.heroService.addHero(this.currentHero)
                    .subscribe( hero => {
                      this.router.navigate(['/heroes/edit', hero.id]),
                      this.showSnackBar(`${ hero.superhero } Created!!`)
                    });
  }

  showSnackBar( message: string ): void {
    this.snackBar.open( message, 'done ', {
      duration: 2500,    } );
  }

  onDeleteHero(): void {
    if( !this.currentHero ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().pipe(
      filter(( res: boolean ) => res ),
      switchMap( () => this.heroService.deleteHeroById( this.currentHero.id )),
      filter( (wasDeleted: boolean) => wasDeleted)
    ).subscribe( () => {
      this.router.navigate(['/heroes'])
    })
  }
}
