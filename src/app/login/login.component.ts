import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [/* RouterLink,  */ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  errores: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.form = this.fb.group({
      email:/*  new FormControl(), */['', Validators.required],
      password:/* new FormControl()  */['', Validators.required]
    });

  }

  /* login() {
    const val = this.form.value;
    console.log(val.email)
    console.log(val.password)

    this.authService.login(val.email, val.password)
      .subscribe(
        (res) => {
          console.log(res);
        }
      );

  } */

  async login() {
    const val = this.form.value;
    /* console.log(val.email);
    console.log(val.password);
 */
    if (this.form.invalid) {
      let thr = {
        error: 'Invalid Credentials.'
      };
      this.errores = thr;
      return;
    }
    if (val.email && val.password) {
      try {
        const res = await this.authService.login(val.email, val.password);
        console.log(res.token);
        sessionStorage.setItem('jwt', res.token);

        this.router.navigate(['portal']);

      } catch (error: any) {
        this.errores = error.error;
        console.error('Error en login:', error);
        console.log(this.errores)
      }
    }
  }

  //funcion getToken( ) que recupera el token
 

}
