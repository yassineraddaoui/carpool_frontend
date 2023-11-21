import { Component,OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authservice: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.authservice.getToken())
      this.authservice.navigate();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      roles: this.formBuilder.array([], [Validators.required]),
    });
  }

  registerForm!: FormGroup;

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    let roles = [];
    roles.push(this.registerForm.value['role']);
    this.authservice.register(new RegisterRequest(this.registerForm.value['firstName'], this.registerForm.value['lastName'], this.registerForm.value['email'], this.registerForm.value['password'], this.registerForm.value['roles']));
  }

  onCheckboxChange(e: any) {
    const roles: FormArray = this.registerForm.get('roles') as FormArray;
    if (e.target.checked) {
      roles.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      roles.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          roles.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
