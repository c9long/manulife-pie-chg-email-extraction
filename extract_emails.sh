#!/bin/bash

brew install jq
brew install moreutils

curl https://change-ticket.apps.cac.pcf.manulife.com/api/getPendingApprovers/${1} | jq -r '.[] | .email' > "emails.txt"

sort -u emails.txt | sponge emails.txt
grep "\S" emails.txt | sponge emails.txt
truncate -s -1 emails.txt

tr '\n' '; ' < emails.txt | sponge emails.txt

cat emails.txt
