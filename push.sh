#! /bin/bash
echo "Start running the script $0"

python3 summarize.py


chmod +x $push.sh

commitMsg="$1 $(date)"
echo "echo push to github with message: $1"

git add .
git status
git commit -m "$commitMsg"
git push 

echo done