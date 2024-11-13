import { FastifyPluginAsync } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { extname, join } from "node:path";
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
      const extension = extname(body.imagen.filename);
      const filename = params.id_usuario + extension;
      console.log(body.imagen);
      const destinoArchivo = join(
        process.cwd(),
        "public",
        "img",
        "usuarios",
        filename
      );
      writeFileSync(destinoArchivo, fileBuffer);
      const urlUsuario =
        "http://localhost/back/public/img/usuarios/" + filename;
      const usuario = await usuarioService.updateImageUrlById(
        params.id_usuario,
        urlUsuario
      );
      return usuario;
    },
  });
};

export default rutasImagenUsuario;
