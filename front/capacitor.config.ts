import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'front',
  server: {
    hostname: 'my-app.com',
    androidScheme: 'https',
  },
  webDir: 'dist/front/browser',
};

export default config;
