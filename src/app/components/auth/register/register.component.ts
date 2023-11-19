import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private authservice:AuthService,private formBuilder: FormBuilder){
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });  }
    registerForm!: FormGroup;
    onSubmit(){
      if (this.registerForm.invalid) {
        return;
      }
      let roles=[];
      roles.push(this.registerForm.value['role']);
    this.authservice.register(new RegisterRequest(this.registerForm.value['firstName'],this.registerForm.value['lastName'],this.registerForm.value['email'],this.registerForm.value['password'],roles));
  }
}
