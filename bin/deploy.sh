#!/usr/bin/php
# Agquote Deploy: Install mup & libraries and deploy to staging, production
# Description: Install Ubuntu EC2 with necessary libraries
#              Deploy to staging
#              Deploy to production

#INSTALLDIR=`echo $0 | sed 's/deploy\.sh//g'`
#if [ "$2" = "local" ] ;
#then
#
#elif [ "$2" = "prod" ] ;
#then
#
#elif [ "$2" = "other" ]
#then
#
#else
#    echo "You need to choose an environment setting" ;
#fi
#CRON=emarsys.php

installDeployLibraries () {
  sudo apt-get update
  sudo apt-get install python-software-properties
  sudo apt-get install npm
  curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
  nvm install 4.4.7
  nvm use 4.4.7
  sudo apt-get install awscli
  sudo npm install -g mupx
  sudo npm install -g mupx-letsencrypt
  sudo npm install mup
  curl https://install.meteor.com | /bin/sh
  sudo ln -s /usr/bin/nodejs /usr/bin/node
}

setupStaging() {
  mup setup
  mup deploy
  mup reconfig
  mup start
}


case "$1" in
  installDeployLibraries)
    echo 'Installing Mup'
    installDeployLibraries
    echo 'Finishing Installing Mup'
    ;;
  setupStaging)
    echo 'Setup Staging'
    setupStaging
    echo 'Finished Setting up staging'
    ;;
  *)


echo "
SYNOPSIS
    sh deploy.sh
    sh deploy.sh [-- [OPTIONS...]]
DESCRIPTION
    Agquote Deploy

OPTIONS
    installDeployLibraries staging | production   -  Installs Deployment app and libraries
    setupStaging staging | production

EXAMPLES
sh bin/deploy.sh staging install installDeployLibraries
sh bin/deploy.sh setupStaging
"
    >&2
    exit 1
    ;;
esac
