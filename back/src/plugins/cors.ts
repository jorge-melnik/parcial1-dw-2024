import fp from "fastify-plugin";
import cors from "@fastify/cors";

const frontUrl = process.env.FRONT_URL;
const apkHostname = process.env.APK_HOSTNAME;

if (!frontUrl || !apkHostname)
  throw new Error("Debes especificar la variable de entorno FRONT_URL.");

export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: [`https://${frontUrl}`, `https://${apkHostname}`],
  });
});
