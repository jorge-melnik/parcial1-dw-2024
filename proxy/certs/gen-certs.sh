openssl req \
-newkey rsa:2048 \
-nodes \
-x509 \
-days 36500 -nodes \
-addext "subjectAltName = IP.1:192.168.1.101" \
-keyout ucu.key \
-out ucu.crt