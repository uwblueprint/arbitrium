#!/bin/bash

# Seeds mongo database
# Expects file SVP.csv in the same directory. Ask Greg or Karissa for this file.
# Argument
#   ${1} - Mongo db username
#   ${2} - Mongo db password
# Ask Greg or Karissa for Mongo db credentials and for SVP.csv
# SVP.csv can be found by downloading form responses

#Note: You must use linux style line endings

#To push data to production change the --db line from Development to Production

if [ "$#" -ne 2 ]; then
  echo "Illegal number of arguments. Expects 2 arguments: username and password"
  exit 1
fi

mongoimport \
  --host Cluster0-shard-0/cluster0-shard-00-00-kbiz0.mongodb.net:27017,cluster0-shard-00-01-kbiz0.mongodb.net:27017,cluster0-shard-00-02-kbiz0.mongodb.net:27017 \
  --ssl \
  --username ${1} \
  --password ${2} \
  --authenticationDatabase admin \
  --db EmergencyFund \
  --collection Applications \
  --type csv \
  --file ./ttt.csv \
  --headerline \
