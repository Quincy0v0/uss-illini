# USS-illini

## Objectives:
```
Basic Functionality:
  insert records to the database: insert new player's stats
  query that searches the database, and display the returned records in your application: search player's stats
  how to update records: modify player's stats
  how to delete records: delete player's stats
Two Advanced Functions: 
  Many many data visualizations:
  Design UI matches in-game UI: calculate detail numbers using in-game mechanics
```

## Set up the environment:
### ReactJS Quick Start:
```
https://reactjs.org/docs/getting-started.html#try-react
```
### UI framwork: ReactStrap: Bootstrap for ReactJS
```
https://reactstrap.github.io/
```
### Node JS:
```
https://nodejs.org/en/
// Use the 10.10.0 version
```
### Data Visualization framworks
```
https://plot.ly/
http://recharts.org/en-US/guide
```
### Recommanded Web IDE: Webstorm
```
https://www.jetbrains.com/webstorm/
// Register with UIUC campus email and use it for free!
```
## To start hacking:
```
cd uss-illini             // enter the project directory
npm i                     // install the modules required for our Web App
npm start                 // you can view the site at http://localhost:3000/
```
## To write new pages:                
```
cd uss-illini/src         // our codes are located there               
```

## To deploy the site:
```
1.
Install nodejs using SSH on cPanel

2.
Type the following:
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:3001/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3001/$1 [P,L]
in:
/home/ussillini/public_html/.htacess
(You need to go to filemanager -> setting -> tick "Show Hidden Files (dotfiles)" if havn't)

reference link: https://www.a2hosting.com/kb/installable-applications/manual-installations/installing-node-js-on-managed-hosting-accounts


3.
In uss-illini/package.json:
{
...
  "scripts": {
    "start": "set PORT=3001 && PORT=3001 react-scripts start || react-scripts start",
    ...
  },
"proxy": "http://localhost:3000"
}

4.
Terminal #1:
cd react-backend
forever start -c "npm start" ./
(Express start at PORT3000)

Terminal #2:
cd uss-illini 
chmod +x node_modules/.bin/react-scripts
forever start -c "npm start" ./
(React start at PORT3001)

To stop: 
forever stop 0

To clear the ports:
$ ps aux | grep "ussillini"
for all <pid> in the 2nd col listed:
$ kill <pid>


```

## Install Libraries (Important)
```
Front end：
npm i react-plotly.js plotly.js react-bootstrap-table react-bootstrap-typeahead

Back end：
npm i mysql

Cpanel:
install nodejs and bind npm -> npm i forever
```
