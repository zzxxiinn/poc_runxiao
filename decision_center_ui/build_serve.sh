#!/bin/bash

envs=$(printenv)

rm .env.production

array=(${envs//' '/ })

for element in "${array[@]}"
do
  if  [[ $element == VUE_APP_* ]] || [[ $element == NODE_ENV* ]] || [[ $element == VITE_* ]];
  then
    echo "$element"
    echo "$element" >> .env.production
  fi
done

echo "final env production file content as:"
cat .env.production

npm run build

echo 'build succeed'

serve -s dist -l 5173

