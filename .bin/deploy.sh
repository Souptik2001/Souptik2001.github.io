#!/bin/bash
set -x
set -euo pipefail

# Add SSH Key
eval $(ssh-agent -s)
ssh-agent -a /tmp/ssh_agent.sock > /dev/null
echo "$PANTHEON_SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null
mkdir -p ~/.ssh && echo "StrictHostKeyChecking no" >> ~/.ssh/config

# Git Config
git config --global user.email "bot@souptik.dev"
git config --global user.name "GitHub Deploy"

# Clone Pantheon Repo
git clone --single-branch --branch $PANTHEON_GIT_BRANCH $PANTHEON_GIT_REPOSITORY $HOME/pantheon-deploy --depth 1
cd $HOME/pantheon-deploy

# Copy Plugins
rm -rf wp-content/plugins
cp -r $GITHUB_WORKSPACE/backend/plugins wp-content

# Copy Themes
rm -rf wp-content/themes
cp -r $GITHUB_WORKSPACE/backend/themes wp-content

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