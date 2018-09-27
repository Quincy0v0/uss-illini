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
npm run build
//You will see a 'build' folder which contains the static files for the project.
//You have to modify the 'index.js', remove the extra '/' according to the link below: 
//https://stackoverflow.com/questions/44371052/why-wont-react-production-build-run-on-the-browser
//After doing so, open index.js using browser and you should be able to view the site.
//To deploy the site, Copy the contents from 'build' to 'public_html' in the cPanel directory, 
//and you should be able to see it at http://ussillini.web.illinois.edu
```

