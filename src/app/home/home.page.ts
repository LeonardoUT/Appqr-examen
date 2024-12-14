import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  homeForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.homeForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}


  async iniciarSesion() {
    const email = this.homeForm.value.username;
    const password = this.homeForm.value.password;


    if (this.homeForm.valid) {
      const loginExitoso = await this.authService.login(email, password);
      if (loginExitoso) {
        console.log('Login exitoso');
      } else {
        alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      }
    } else {
      alert('Por favor, ingrese un correo electrónico y una contraseña válidos.');
    }
  }
}
