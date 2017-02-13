#!/bin/sh

sudo apt-get update
sudo apt-get install python-software-properties
sudo apt-get install npm
curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
nvm install 4.4.7
nvm use 4.4.7
sudo apt-get install awscli
sudo npm install -g mupx
sudo npm install -g mupx-letsencrypt
sudo npm install -g mup
curl https://install.meteor.com | /bin/sh
sudo ln -s /usr/bin/nodejs /usr/bin/node

