import type { CapacitorConfig } from '@capacitor/cli';

const frontUrl = process.env['FRONT_URL'];
console.log({ frontUrl });
if (!frontUrl)
  throw Error('Tienes que especificar la variable de entorno FRONT_URL');

console.log('--------------------------------------------');
console.log({ frontUrl });
console.log('--------------------------------------------');
const config: CapacitorConfig = {
  appId: 'front',
  appName: 'front',
  webDir: 'dist/front/browser',
  server: {
    androidScheme: 'https',
    allowNavigation: [frontUrl],
  },
  android: {
    allowMixedContent: true, //mezclar http y https
  },
};

export default config;
