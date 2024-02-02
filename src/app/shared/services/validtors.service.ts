import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
    constructor() { }

    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public cantBeStrider = (control: FormControl):ValidationErrors  |null=>{

        const value: string = control.value.trim().toLowerCase();
    
        if(value === 'strider'){
            return{
                noStrider:true
            }
        }
        return null;
    }

    public isValidField(form:FormGroup, field:string){
    return form.controls[field].errors && form.controls[field].touched;
    }

    public isFieldOneEqualFieldTwo(field:string,field2:string){

        return(formGroup:AbstractControl) :ValidationErrors | null =>{

            const fieldValue = formGroup.get(field)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if(fieldValue !== fieldValue2){
                formGroup.get(field2)?.setErrors({noEqual:true})
                return{noEqual:true}
            }

            formGroup.get(field2)?.setErrors(null);
            return null;

            
        }
    }
}