# Map Report

This is full-stack javascript web application written with React, Mongo, Node.js.  As a map reporting tool it can be used to to find missing items let by using, saving the location via dropping a pin as well as leave commits on a google map.
* React
* Mongo
* Node.js
* Meteor

## Development
meteor npm install
meteor npm start

## Staging
Instructions to deploy to a staging environment

### Setup EC2 deploy node on AWS
Create Ubuntu EC2
git clone ssh://git@bitbucket.org/magescale/map_report.git
cd map_report
git fetch && git checkout master
cd ..
cp map_report.io/install.sh .
cp map_report/mup.json .
cp map_report/settings.json .
cp map_report/install.sh .
sh install.sh
cd map_report
npm install
