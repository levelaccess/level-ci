#!/bin/sh
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git add .
git commit -m "Auto-update after running package script" || echo "No changes to commit"
if [ "$2" = "refs/heads/main" ]; then
  if git rev-parse "refs/tags/$1" >/dev/null 2>&1; then
    echo "Tag $1 already exists, skipping tag creation"
  else
    git tag -a "$1" -m "Release version $1"
    git push origin --tags
  fi
fi
git push origin HEAD:"$2"
