import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender:['M',Validators.required],
    wantNotifications:[true, Validators.required],
    termsAndConditions:[false, Validators.requiredTrue]
  })

  public person={
    gender:'F',
    wantNotifications:false
  }

  constructor(private fb : FormBuilder){}

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    const{termsAndConditions, ...newPerson}= this.myForm.value;

    this.person = newPerson;
    
  }

  isValidField(field:string):boolean| null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }
}
