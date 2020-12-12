#!/bin/sh

. .env

if [ "$#" -ne 2 ] ; then
    echo "Usage: ./scripts/getFirebaseToken.sh {email} {password}"
    exit 1
fi

URL="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword"
EMAIL="$1"
PASSWORD="$2"

curl -d "email=$EMAIL" -d "password=$PASSWORD" -d "returnSecureToken=true" "$URL?key=$REACT_APP_FIREBASE_KEY"

exit 0
