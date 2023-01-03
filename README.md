### JWT RSA signing and verify in Node.js using RSA Public/Private Key Pairs

Generate key pair 2048 bit
```console
openssl genrsa -des3 -out PC_IO_rsa_key 2048
```
Export private key PC_IO_private_key.pem
```console
openssl pkcs8 -topk8 -inform PEM -in PC_IO_rsa_key -outform PEM -out PC_IO_private_key.pem -nocrypt
```
Export public key PC_IO_public_key.pem
```console
openssl rsa -in PC_IO_private_key.pem -pubout > PC_IO_public_key.pem
```
