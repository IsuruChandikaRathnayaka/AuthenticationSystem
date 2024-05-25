import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
 
  type:string ="password";
  eyeIcon:string="fa-eye-slash";
  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){}
  ngOnInit():void{
    this.signUpForm =this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    });

  }

  hideShowPass(){
    if(this.type =="password"){
      this.type="text";
      this.eyeIcon="fa-eye";
    }else{
      this.type="password";
      this.eyeIcon="fa-eye-slash";
    }
  }

  onSubmit(){
    if(this.signUpForm.valid){
        console.log(this.signUpForm.value);
        this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next:(res)=>{
            alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
            
          }
        });
    }else{
        console.log("The form is not valid!");
        this.validateAllFormFields(this.signUpForm);
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
       this.validateAllFormFields(control);
        console.log("hm");
      }
    })

  }

}
