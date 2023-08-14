#!/bin/bash

# Source ZOTERO_API_KEY from .env file
source .env

GROUP="4530458"
COLLECTION="UCVH98NN"
URL="https://api.zotero.org/groups/$GROUP/collections/$COLLECTION/items/top"

# Get CSL export from Zotero library
# https://www.zotero.org/support/dev/web_api/v3/basics
curl --get $URL \
  -H "Authorization: Bearer $ZOTERO_API_KEY" \
  --data-urlencode "format=csljson"

