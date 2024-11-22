import type { CapacitorConfig } from '@capacitor/cli';

const frontUrl = process.env['FRONT_URL'];
const apkHostname = process.env['APK_HOSTNAME'];
console.log({ frontUrl });
if (!frontUrl)
  throw Error('Tienes que especificar la variable de entorno FRONT_URL');

console.log('--------------------------------------------');
console.log({ frontUrl });
console.log('--------------------------------------------');
const config: CapacitorConfig = {
  appId: 'com.ucu.desaweb.parcial',
  appName: 'front',
  webDir: 'dist/front/browser',
  server: {
    androidScheme: 'https',
    allowNavigation: [frontUrl],
    hostname: apkHostname,
  },
  android: {
    allowMixedContent: true, //mezclar http y https
  },
};

export default config;
