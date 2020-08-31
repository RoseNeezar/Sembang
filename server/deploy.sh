#!/bin/bash
echo What should the version be?
read VERSION

docker build -t rneezar2/sembang:$VERSION .
docker push rneezar2/sembang:$VERSION 
