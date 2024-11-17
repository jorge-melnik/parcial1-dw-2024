import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: [
      "https://localhost",
      "https://192.168.1.101",
      "http://localhost",
      "capacitor://localhost",
      "ionic://localhost",
      "https://desaweb.brazilsouth.cloudapp.azure.com",
    ],
  });
});
