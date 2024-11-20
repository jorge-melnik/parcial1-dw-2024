#!/bin/sh
#########################################################################################
#                                      PUSH                                             #
#########################################################################################
set -eu #-u  variables sin definir=error.  -e  Error si $? != 0    -x Muestra las órdenes
DIR_SCRIPT=$(dirname $(readlink -f $0) );

if [ -e ${DIR_SCRIPT}/../.env ] 
then
    export $(grep -v '^#' ${DIR_SCRIPT}/../.env | xargs -0)
    echo "${GREEN}OK${NOCOLOR}\t\t.env"
else
    echo "${RED}Error:${NOCOLOR}\tNo existe el .env"
    exit 1;
fi


docker compose -f "${DIR_SCRIPT}/../docker-compose.build.yaml" down
docker compose -f "${DIR_SCRIPT}/../docker-compose.build.yaml" up -d --build --remove-orphans
docker compose -f "${DIR_SCRIPT}/../docker-compose.build.yaml" down

#Chequeamos que existan imágenes para el proyecto en cuestión con el tag especificado
if [ "$(docker images ${REGISTRY_URL}/${NOMBRE_GRUPO}/${NOMBRE_PROYECTO}/*:${1} -q)" = "" ]; then
    echo ${RED} No hay imágenes con tag ${1} en ${REGISTRY_URL}/${NOMBRE_GRUPO}/${NOMBRE_PROYECTO} ${NOCOLOR}
    exit 1
fi

#//FIXME --password es inseguro ya que queda en el history
docker login ${REGISTRY_URL} -u ${REGISTRY_USER} --password ${REGISTRY_PASSWORD}
echo "${GREEN}OK${NOCOLOR}\t\tLogin en ${REGISTRY_URL} "

#Borramos todas las imágenes del proyecto en cuestión y con el tag especificado.
for IMAGE in $(docker images ${REGISTRY_URL}/${NOMBRE_GRUPO}/${NOMBRE_PROYECTO}/*:${1} | cut -f1 -d' '| tail -n +2); do 
    docker push ${IMAGE}:${1}
done
echo "${GREEN} Push $1 OK ${NOCOLOR}"
