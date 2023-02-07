#!/bin/bash

tag=$1
if [ -z $tag ]; then
  echo "please input the tag"
  exit 1
fi

echo "build docker image with tag: poc/runxiao_api:$tag"

docker build --network=host -t poc/runxiao_api:$tag .
docker tag poc/runxiao_api:$tag swr.cn-north-4.myhuaweicloud.com/meinenghua/poc/runxiao_api:$tag
docker push swr.cn-north-4.myhuaweicloud.com/meinenghua/poc/runxiao_api:$tag
