import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

const ejemplo = {
  name: 'RTX 5049',
  price: 2500,
  inStorage: 6
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})


export class BasicPageComponent implements OnInit {
  //Forms Group
  // public myForm: FormGroup= new FormGroup({
  //   name:new FormControl('',[],[])
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['0', [Validators.required, Validators.min(0)]],
    inStorage: ['0',[Validators.required, Validators.min(0)]]
  })
  constructor(private fb: FormBuilder) { }

  onSave(): void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
    }
    this.myForm.reset();

  }
  isValidField(field:string):boolean|null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }


  ngOnInit(): void {
    // this.myForm.reset(ejemplo)
  }
}
