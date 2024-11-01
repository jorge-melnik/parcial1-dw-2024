import { FastifyPluginAsync } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { join } from "path";
import { writeFileSync } from "fs";
import { IdUsuarioType, ImagenUsuario } from "../../../../types/usuario.js";

import * as usuarioService from "../../../../services/usuarios.js";

const rutasImagenUsuario: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts
): Promise<void> => {
  fastify.put("/", {
    handler: async function (request, reply) {
      const body = request.body as ImagenUsuario;
      const params = request.params as IdUsuarioType;
      const fileBuffer = body.imagen._buf as Buffer;
      const filename = join(
        process.cwd(),
        "public",
        "img",
        "usuarios",
        params.id_usuario + ".png"
      );
      writeFileSync(filename, fileBuffer);
      const urlUsuario =
        "http://localhost/back/public/img/usuarios/" +
        params.id_usuario +
        ".png";
      const usuario = await usuarioService.updateImageUrlById(
        params.id_usuario,
        urlUsuario
      );
      console.log({ usuario });
      return;
    },
  });
};

export default rutasImagenUsuario;
