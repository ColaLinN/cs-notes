#! /bin/bash
echo "Start running the script $0, pls enter your commit message"
read enterMsg

# generate the summary of the project
python3 summarize.py

commitedMsg=""
if [ -z "$enterMsg" ]
then
    commitedMsg="update @ $(date)"
else
    commitedMsg="$enterMsg @ $(date)"
fi

echo "echo push to github with message: $commitedMsg"

git add .
git status
git commit -m "$commitedMsg"
git push 

echo done