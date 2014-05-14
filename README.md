zueirachat
==========

O zueirachat é um app desenvolvido em NodeJs utilizando Express, feito para fins de estudos. Para utilizá-lo você deverá ter
o ambiente para rodar e testar o ZueiraChat.

Primeiro Passo

Instalar o NodeJs. A versão utilizada nesse app é o 0.10 e o NPM 1.4.9
Como utilizei o Ubuntu para o desenvolvimento, utilizarei ele como base para instalação

apt-get install python-software-properties

apt-add-repository ppa:chris-lea/node.js

apt-get update

Após isso execute

apt-get install nodejs

Não é necessário acrescentar o npm, pois ele já está incluído nesse repositório.

Após a instalação, verifique a versão do nodejs e do npm

node -v

npm -v

Passo 2

Instalar os modulos utilizados no projeto
Os módulos utilizados foram: express, socket.io,  ejs
Utilizei o ejs para manter o template na típica estrutura html. Alguns utilizam [jade](http://jade-lang.com/) para template.

Para instalar os módulos do projeto, basta executar o comando

 - npm install express socket.io ejs

Caso de algum erro, execute como root.

Em seguida para executar a aplicação

- node server.js

E o zueirachat já estará no caminho http://localhost:3000

Bons estudos!
