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

# Backup the required folders.
cp -r ./backend/plugins $HOME/hostinger-backup
cp -r ./backend/themes $HOME/hostinger-backup

# Clean up the entire directory, except .git.
for dir in ./*; do
    [ "$dir" = ".git" ] && continue
    rm -rf "$dir"
done

# Copy Plugins
cp -r $HOME/hostinger-backup/plugins .

# Copy Themes
cp -r $HOME/hostinger-backup/themes .

# Remove .gitignore files.
rm ./backend/plugins/souptik2001/.gitignore
rm ./backend/themes/souptik/.gitignore

# Check if we have changes
if [[ -z $(git status -s) ]]; then
	# No changes
	echo "No changes to push"
else
	# Push changes to Pantheon
	git add .
	git status
	git commit -m "Deploy from GitHub $GITHUB_SHA"
	git push origin $BUILT_BRANCH
fi

set +x