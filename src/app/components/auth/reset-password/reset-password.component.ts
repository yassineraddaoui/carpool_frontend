import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "../../../utils/Validation";
import {ResetPasswordRequest} from "../../../models/ResetPasswordRequest";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  constructor(private authservice:AuthService,private formBuilder: FormBuilder,private route: ActivatedRoute){
  }
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  token!:string;
  ngOnInit(): void {
    this.route.params.subscribe( params => this.token=params.token );

    this.form = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authservice.resetPassword(this.token,new ResetPasswordRequest(this.f['confirmPassword'].value,this.f['password'].value));


  }

}
