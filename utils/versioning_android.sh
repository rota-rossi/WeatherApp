#!/bin/bash

# exit if a command fails
set -e

NEW_VERSION_NAME=$1
# to be generated using GH Action
NEW_VERSION_CODE="${GITHUB_RUN_ID}${GITHUB_RUN_ATTEMPT}"

# Generates a version code that's versionName without dots.
if [ -z "${NEW_VERSION_CODE}" ];
then 
  NEW_VERSION_CODE=`echo ${NEW_VERSION_NAME} | sed 's/\.//g'`
fi


MANIFEST_FILE="./android/app/src/main/AndroidManifest.xml"
CURRENT_VERSION_CODE=`grep versionCode ${MANIFEST_FILE} | sed 's/.*versionCode="//;s/".*//'`
CURRENT_VERSION_NAME=`grep versionName ${MANIFEST_FILE} | sed 's/.*versionName\s*=\s*\"\([^\"]*\)\".*/\1/g'`


echo "Old Version: ${CURRENT_VERSION_NAME}"
echo "Old Version Code: ${CURRENT_VERSION_CODE}"
echo "New Version: ${NEW_VERSION_NAME}"
echo "New Version Code: ${NEW_VERSION_CODE}"

sed -i.bak "s/android\:versionName\s*=.*/android:versionName=\"${NEW_VERSION_NAME}\"/g" ${MANIFEST_FILE}
sed -i.bak "s/android\:versionCode\s*=.*/android:versionCode=\"${NEW_VERSION_CODE}\"/g" ${MANIFEST_FILE}

rm ${MANIFEST_FILE}.bak