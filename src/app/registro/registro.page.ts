import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['alumno', Validators.required],
    });
  }


  async registrarUsuario() {
    const email = this.registroForm.value.email;
    const password = this.registroForm.value.password;
    const role = this.registroForm.value.role;


    const registroExitoso = await this.authService.registrarUsuario(email, password, role);

    if (registroExitoso) {
      alert('Usuario registrado correctamente');
    } else {
      alert('Error al registrar el usuario');
    }
  }
}
