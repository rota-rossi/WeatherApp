#!/bin/bash

# exit if a command fails
set -e

PLIST_BUDDY_COMMAND="/usr/libexec/PlistBuddy"

if [ -f ${PLIST_BUDDY_COMMAND} ];
then
  APP_NAME=`jq .name  app.json | sed 's/"//g'`
  NEW_VERSION_NAME=`echo ${1} | sed 's/\-.*//g'`
  # to be generated using GH Action
  NEW_VERSION_CODE=`date +%Y%m%d${GITHUB_RUN_ATTEMPT}`

  # Generates a version code that's versionName without dots.
  if [ -z "${NEW_VERSION_CODE}" ] 
  then 
    NEW_VERSION_CODE=`echo ${NEW_VERSION_NAME} | sed 's/\.//g'`
  fi

  INFO_PLIST_FILE="./ios/${APP_NAME}/Info.plist"

  CURRENT_VERSION_CODE=`${PLIST_BUDDY_COMMAND} -c "Print CFBundleVersion" "${INFO_PLIST_FILE}"`
  CURRENT_VERSION_NAME=`${PLIST_BUDDY_COMMAND} -c "Print CFBundleShortVersionString" "${INFO_PLIST_FILE}"`

  echo "Old Version: ${CURRENT_VERSION_NAME}"
  echo "Old Version Code: ${CURRENT_VERSION_CODE}"
  echo "New Version: ${NEW_VERSION_NAME}"
  echo "New Version Code: ${NEW_VERSION_CODE}"

  $PLIST_BUDDY_COMMAND -c "Set :CFBundleVersion ${NEW_VERSION_CODE}" "${INFO_PLIST_FILE}"
  $PLIST_BUDDY_COMMAND -c "Set :CFBundleShortVersionString ${NEW_VERSION_NAME}" "${INFO_PLIST_FILE}"

else 
  echo "PlistBuddy not found - possibly not macOS"
fi