FROM node:16

USER root

#Criando diretorio
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY transacao/package.json /usr/src/app/
RUN npm install

#Copiando arquivos do projeto
COPY transacao/ /usr/src/app

#Documentando qual porta sera executado
EXPOSE 3002 

CMD [ "npm", "start" ]