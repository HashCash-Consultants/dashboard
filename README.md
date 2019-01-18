# dashboard

Dashboard Setup:-
TO DO

Step:--1
•	Inside ubuntu execute following command:
               sudo apt-get install curl
               curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
               sudo apt-get update
               sudo apt-get install nodejs
               sudo apt-get install npm
               sudo npm install --global gulp-cli
               sudo apt-get install redis-server
               sudo npm install -g forever


Note: Code has been modified, hence recommended to download the code from the Dashboard AWS instance from path - /home/ubuntu/dashboard

Step:--2
•	Inside ubuntu/dashboard folder execute following command:
    npm install
    gulp
Note:  Add  3000,3001 and 3443 port on AWS instance.



Command to run - 

In background:
forever start node_modules/gulp/bin/gulp.js
sudo DEV=true NODE_TLS_REJECT_UNAUTHORIZED=0 forever start app.js
In Foreground:
gulp
sudo DEV=true NODE_TLS_REJECT_UNAUTHORIZED=0 node app.js


It will create a proxy to `browser-sync` server started by gulp at:

```
http://localhost:3443
```

