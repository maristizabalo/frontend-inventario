import { Component, OnInit } from '@angular/core';
import { IonContent, IonTitle } from "@ionic/angular/standalone";
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonTitle, IonContent, AuthFormComponent]
})
export class LoginPage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
