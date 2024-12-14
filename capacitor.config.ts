import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TuApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    BarcodeScanner: {
      androidSupportBarcodeFormats: ['QR_CODE'], 
    },
  },
};

export default config;
