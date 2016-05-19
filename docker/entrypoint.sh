#!/bin/bash

# cd ./hire-login
# echo "developer" | sudo -S npm link

cd ./hire-faceted-search
echo "developer" | sudo -S npm link

cd ../hire-forms-select-combo
echo "developer" | sudo -S npm link

cd ../hire-forms-select
echo "developer" | sudo -S npm link

cd ../hire-forms-options
echo "developer" | sudo -S npm link

cd ../hire-tabs
echo "developer" | sudo -S npm link

ssh-add ~/.ssh/id_rsa

# Start tmuxinator
mux marginal-scholarship
