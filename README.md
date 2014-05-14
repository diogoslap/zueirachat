zueirachat
==========

The zueirachat is an app developed using NodeJS and Express , made for study purposes .To use it you must have the environment to run and test the ZueiraChat.

Step 1

Install NodeJS . The version used in this app is the 0.10 and the NPM 1.4.9. How I used Ubuntu for development, will use it as a base for installation

apt-get install python-software-properties

apt-add-repository ppa:chris-lea/node.js

apt-get update

After this, execute:

apt-get install nodejs

It is not necessary to add the npm , since it is already included in that repository.

After installation , check the version of nodejs and npm

node- v

npm -v

Step 2

Install the modules used in the project. The modules were used : express , socket.io , ejs. Used the ejs to keep the template in html typical structure. Some use jade template for .

To install the modules of the project, simply run the command

    npm install socket.io express ejs

If any error, run as root .

Then to run the application

    node server.js

And zueirachat already be on the way http://localhost:3000

Good studies !
