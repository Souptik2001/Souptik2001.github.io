#!/bin/bash
set -x
set -euo pipefail

# Git Config
git config --global user.email "bot@souptik.dev"
git config --global user.name "GitHub Deploy"

# Checkout the the Hostinger built branch.
git checkout $BUILT_BRANCH || git checkout -b $BUILT_BRANCH

# Create backup folder.
mkdir $HOME/hostinger-backup

# Backup the required three folders.
cp -r ./.git $HOME/hostinger-backup
cp -r ./backend/plugins $HOME/hostinger-backup
cp -r ./backend/themes $HOME/hostinger-backup

# Clean up the entire directory.
rm -rf *

# Copy Git folder.
cp -r $HOME/hostinger-backup/.git .

# Copy Plugins
cp -r $HOME/hostinger-backup/plugins .

# Copy Themes
cp -r $HOME/hostinger-backup/themes .

# Check if we have changes
if [[ -z $(git status -s) ]]; then
	# No changes
	echo "No changes to push"
else
	# Push changes to Pantheon
	git add .
	git status
	git commit -m "Deploy from GitHub $GITHUB_SHA"
	git push origin $PANTHEON_GIT_BRANCH
fi

set +x