FROM node
COPY . /analizador
WORKDIR /analizador
RUN npm install
RUN npm install --save-dev typescript
RUN npm install -g typescript
RUN npm install express
RUN npm install d3-graphviz
RUN npm install @types/cors
WORKDIR /analizador/build
EXPOSE 3000

CMD ["node","index.js"]

