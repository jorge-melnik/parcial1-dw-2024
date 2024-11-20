FROM node:22-alpine AS base
RUN npm i -g fastify-cli
WORKDIR /back
RUN chown -R node:node /back
USER node:node

FROM base AS development
EXPOSE 3000

# Stage para hacer build
FROM base AS build
USER node:node
COPY --chown=1000:1000 package.json .
RUN npm install 
COPY --chown=1000:1000 . .
RUN npm run build:ts

FROM base AS production
COPY --chown=1000:1000 --from=build /back/dist /back/dist
COPY --chown=1000:1000 package.json .
RUN npm install --prod 
RUN mkdir -p /back/public/img/usuarios
CMD [ "npm" , "start" ]
