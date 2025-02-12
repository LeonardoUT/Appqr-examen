import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistenciaData: any[] = [];

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit() {
    
    this.asistenciaData = this.asistenciaService.obtenerAsistencia();
  }
}
