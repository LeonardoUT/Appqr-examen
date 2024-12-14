import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private localStorageKey = 'asistenciaData';

  constructor() {}


  agregarAsistencia(dato: any): void {

    const asistenciaActual = this.obtenerAsistencia();

    asistenciaActual.push(dato);

 
    localStorage.setItem(this.localStorageKey, JSON.stringify(asistenciaActual));
  }


  obtenerAsistencia(): any[] {
    const asistencia = localStorage.getItem(this.localStorageKey);
    return asistencia ? JSON.parse(asistencia) : []; 
  }

  limpiarAsistencia(): void {
    localStorage.removeItem(this.localStorageKey);
    console.log('Todos los registros de asistencia han sido eliminados.');
  }
}
