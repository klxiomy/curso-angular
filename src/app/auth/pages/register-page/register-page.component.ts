import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validtors.service';
import { EmailValidator } from 'src/app/shared/validators/email-validators.service';
// import *as customValidators from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // name:['',[Validators.required,Validators.pattern(customValidators.firstNameAndLastnamePattern)]], ejemplo utilizando validators.ts
    // email:['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[new EmailValidator()]],
    email:['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[this.emailValidator]],
    username:['',[Validators.required, this.validatorsService.cantBeStrider]],
    password:['',[Validators.required, Validators.minLength(6)]],
    password2:['',[Validators.required]],
  },{
    validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor(private fb: FormBuilder, 
    private validatorsService:ValidatorService,
    private emailValidator: EmailValidator){}

  isValidField(field:string){
    return this.validatorsService.isValidField(this.myForm,field)
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
