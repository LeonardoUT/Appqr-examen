import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escanearqr',
  templateUrl: './escanearqr.page.html',
  styleUrls: ['./escanearqr.page.scss'],
})
export class EscanearqrPage implements OnInit {
  scannedData: any; 
  scanning: boolean = false; 

  constructor(private router: Router) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (!status.granted) {
      alert('No se pudo obtener permiso para usar la cámara.');
      return;
    }
    this.startScan();
  }

  async startScan() {
  try {
    this.scanning = true;

    // Ocultar el fondo (importante para el funcionamiento del escáner)
    await BarcodeScanner.hideBackground();

    // Inicia el escaneo
    const result = await BarcodeScanner.startScan();

    this.scanning = false;

    
    BarcodeScanner.showBackground();

    if (result.hasContent) {
      this.scannedData = JSON.parse(result.content);
      console.log('Datos escaneados:', this.scannedData);

      // Redirige si los datos están completos
      if (this.scannedData.curso && this.scannedData.fecha) {
        this.router.navigate(['/alumno'], {
          queryParams: { curso: this.scannedData.curso, fecha: this.scannedData.fecha },
        });
      } else {
        alert('Código QR escaneado, pero faltan datos requeridos.');
      }
    } else {
      alert('No se detectó contenido en el código QR.');
    }
  } catch (error) {
    this.scanning = false;
    BarcodeScanner.showBackground();
    console.error('Error durante el escaneo:', error);
    alert('Hubo un problema al escanear el código.');
  }
}


    //opScan() {
    //arcodeScanner.showBackground();
    //arcodeScanner.stopScan();
    //his.scanning = false;
  //
}
