#!/bin/bash

tag=$1
if [ -z $tag ]; then
  echo "please input the tag"
  exit 1
fi

echo "build docker image with tag: poc/runxiao_ui:$tag"

docker build --network=host -t poc/runxiao_ui:$tag .
docker tag poc/runxiao_ui:$tag swr.cn-north-4.myhuaweicloud.com/meinenghua/poc/runxiao_ui:$tag
docker push swr.cn-north-4.myhuaweicloud.com/meinenghua/poc/runxiao_ui:$tag
