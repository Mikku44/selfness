import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.selfness.app',
  appName: 'Selfness',
  webDir: 'build/client', // <--- ถ้า Remix with Vite สร้าง index.html ที่นี่
  server: {
    url: 'http://selfness.khain.app', 
    cleartext: true,
  }
};

export default config;