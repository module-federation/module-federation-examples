#!/bin/bash

# Recreate config file
rm -rf ./env-config.json
touch ./env-config.json

# Add assignment 
echo "{" >> ./env-config.json

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  \"$varname\": \"$value\"," >> ./env-config.json
done < .env

# Removing the last comma to make the json valid
sed -i '$ s/.$//' ./env-config.json

echo "}" >> ./env-config.json
