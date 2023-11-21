import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent {
  email!:string;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.email=params.email );
  }

}
