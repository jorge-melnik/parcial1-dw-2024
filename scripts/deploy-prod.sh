#!/bin/sh
#########################################################################################
#                                      DEPLOY REMOTO                                    #
#########################################################################################
set -eu  #-u  variables sin definir=error.       -e  Error si $? != 0
DIR_SCRIPT=$(dirname $(readlink -f $0) );
if [ -e ${DIR_SCRIPT}/../.env ] 
then
    echo ".env OK..."
else
    echo "No existe el archivo .env con las variables de entorno"
    exit 1;
fi
export $(grep -v '^#' ${DIR_SCRIPT}/../.env | xargs -0)

#Hacemos un push para asegurar.
sh ${DIR_SCRIPT}/push.sh latest

#Copiamos los archivos para el proxy (no los certificados)
ssh ${USER_SSH}@${FRONT_URL} "mkdir -p ${REMOTE_FOLDER}/proxy/certs"
scp ${DIR_SCRIPT}/../proxy/certs/*.* ${USER_SSH}@${FRONT_URL}:${REMOTE_FOLDER}/proxy/certs/
scp ${DIR_SCRIPT}/../proxy/myconf.template ${USER_SSH}@${FRONT_URL}:${REMOTE_FOLDER}/proxy/
#Copiamos el docker file para production
scp ${DIR_SCRIPT}/../docker-compose.production.yaml ${USER_SSH}@${FRONT_URL}:${REMOTE_FOLDER}

#Descargamos las nuevas imágenes y volvemos a levantar todo
ssh ${USER_SSH}@${FRONT_URL} "docker login ${REGISTRY_URL} -u ${REGISTRY_USER} --password ${REGISTRY_PASSWORD}"
ssh ${USER_SSH}@${FRONT_URL} "cd ${REMOTE_FOLDER} && docker compose -f "docker-compose.production.yaml" down"
ssh ${USER_SSH}@${FRONT_URL} "cd ${REMOTE_FOLDER} && docker compose -f "docker-compose.production.yaml" pull"
ssh ${USER_SSH}@${FRONT_URL} "cd ${REMOTE_FOLDER} && docker compose -f "docker-compose.production.yaml" up -d --remove-orphans"
