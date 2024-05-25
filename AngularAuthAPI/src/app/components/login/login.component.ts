import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type:string ="password";
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService ,private router:Router){}//in here we are injecting form builder
  
  ngOnInit():void{
    //in here we are grouping username and password and validating them
    //those are known as controlls username and password
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

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
    if(this.loginForm.valid){
      //send the object to database
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.loginForm.reset();
          this.router.navigate(['home']);
        },
        error:(err)=>{
          alert(err?.error.message);
        }
      })
    }else{
      //throw the error using toaster and with required field
      console.log("Form is not valid!");
      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid!")
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })

  }

}
