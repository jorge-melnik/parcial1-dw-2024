#!/bin/sh
#########################################################################################
#                                      PUSH                                             #
#########################################################################################
set -eu #-u  variables sin definir=error.  -e  Error si $? != 0    -x Muestra las órdenes
DIR_SCRIPT=$(dirname $(readlink -f $0) );
#Todo esto es para cargar en .env en variables de entornos para este proceso/script en ejecución.
if [ -e ${DIR_SCRIPT}/../.env ] 
then
    export $(grep -v '^#' ${DIR_SCRIPT}/../.env | xargs -0)
    echo "${GREEN}OK${NOCOLOR}\t\t.env"
else
    echo "No existe el .env"
    exit 1;
fi

LA_IP=$(dig +short ${FRONT_URL})

openssl req \
-newkey rsa:2048 \
-x509 \
-days 365 \
-nodes -addext "subjectAltName = DNS:${FRONT_URL},IP:${LA_IP}" \
-keyout ${DIR_SCRIPT}/certs/ucu.key \
-out ${DIR_SCRIPT}/certs/ucu.crt 

cp ${DIR_SCRIPT}/certs/ucu.crt ${DIR_SCRIPT}/../front/android/app/src/main/res/raw/ucu.crt