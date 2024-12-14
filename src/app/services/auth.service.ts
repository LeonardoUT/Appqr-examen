import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  async registrarUsuario(email: string, password: string, role: string): Promise<boolean> {
    try {
      
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioExistente = usuarios.find((user: any) => user.email === email);

      if (usuarioExistente) {
        alert('El correo electrónico ya está en uso.');
        return false;
      }

      
      const nuevoUsuario = {
        email,
        password,
        role,
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log('Usuario registrado exitosamente en localStorage');
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrar al usuario. Intenta de nuevo más tarde.');
      return false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuario = usuarios.find((user: any) => user.email === email && user.password === password);

      if (usuario) {

        localStorage.setItem('currentUser', JSON.stringify(usuario));
        this.redirectUser(usuario.role);
        console.log('Inicio de sesión exitoso');
        return true;
      } else {
        alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión. Intenta de nuevo más tarde.');
      return false;
    }
  }

  private redirectUser(role: string) {
    if (role === 'profesor') {
      this.router.navigate(['/menuprofesor']);
    } else if (role === 'alumno') {
      this.router.navigate(['/menualumno']);
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
