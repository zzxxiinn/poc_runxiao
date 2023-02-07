#!/bin/bash

tag=$1
if [ -z $tag ]; then
  echo "please input the tag"
  exit 1
fi

echo "build docker image with tag: xingyuan/meadow_rpa_admin_ui:$tag"

docker build --network=host -t xingyuan/meadow_rpa_admin_ui:$tag .
docker tag xingyuan/meadow_rpa_admin_ui:$tag swr.cn-north-4.myhuaweicloud.com/meinenghua/xingyuan/meadow_rpa_admin_ui:$tag
docker push swr.cn-north-4.myhuaweicloud.com/meinenghua/xingyuan/meadow_rpa_admin_ui:$tag
