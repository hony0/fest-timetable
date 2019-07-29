# hub.docker.comから公式で用意されたイメージをベースとする
FROM node:10.11.0-alpine
 
RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g vue-cli && \
    npm install -g nuxt && \
    npm install -g create-nuxt-app
    npm install --save @nuxtjs/axios
    npm install --save @nuxtjs/pwa
    npm install --save firebase
ENV HOST 0.0.0.0
 
 # カレントディレクトリを app に
WORKDIR /app