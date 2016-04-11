#!/bin/bash

# NPM link hilib
cd ./hire-login
echo "developer" | sudo -S npm link

cd ../hire-faceted-search
echo "developer" | sudo -S npm link

cd ../hire-forms-checkbox
echo "developer" | sudo -S npm link

ssh-add ~/.ssh/id_rsa

# Start tmuxinator
mux marginal-scholarship
