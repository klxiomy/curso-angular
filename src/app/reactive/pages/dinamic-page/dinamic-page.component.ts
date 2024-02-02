import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamic-page',
  templateUrl: './dinamic-page.component.html',
  styleUrls: ['./dinamic-page.component.css']
})
export class DinamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required, Validators.minLength(3)],
    favoritesGames: this.fb.array([
      ['Matl Gear', Validators.required],
      ['Death Strading', Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl('', Validators.required)

  constructor(private fb: FormBuilder) { }

  get favoritesGames() {
    return this.myForm.get('favoritesGames') as FormArray;
  }

  onAddToFavorites(): void {
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoritesGames.push(
      this.fb.control(newGame, Validators.required)
    )
    this.newFavorite.reset()
  }

  onDeleteFavorite(index: number): void {
    this.favoritesGames.removeAt(index)
  }
 
  // onSubmit(): void {

  //   if (this.myForm.invalid) {
  //     this.myForm.markAllAsTouched()
  //     return;
  //   }
  //   (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  //   this.myForm.reset()
  // }
  

  onSubmit():void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();

  }
}
