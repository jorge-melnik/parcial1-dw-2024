import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'front',
  appName: 'front',
  webDir: 'dist/front/browser',
  server: {
    // url: 'https://192.168.1.101',
    androidScheme: 'https',
    allowNavigation: ['192.168.1.101'],
  },
  android: {
    allowMixedContent: true, //mezclar http y https
  },
};

export default config;
