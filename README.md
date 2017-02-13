# map_report

## Development
meteor npm install
meteor npm start


## Staging
TBC

### Setup EC2 deploy node
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

### Deploy from EC2 deploy node to staging

mup setup
mup deploy
mup start


## Production
....

