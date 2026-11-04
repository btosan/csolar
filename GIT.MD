If you're starting a new repo for esofi-tech

Create it on GitHub first (under the esofi-tech account), then clone it using the alias host — swap github.com for github.com-esofi-tech in the clone URL:

bash
git clone git@github.com-esofi-tech:esofi-tech/repo-name.git


If you already have a local project (e.g. this ngcoms folder) that you want to push to esofi-tech
Create an empty repo on GitHub under esofi-tech (don't initialize it with a README).
In your project folder, check if it already has a remote:
bash
   git remote -v
If there's no remote yet:
bash
   git remote add origin git@github.com-esofi-tech:esofi-tech/repo-name.git

If a remote already exists pointing elsewhere:

bash
   git remote set-url origin git@github.com-esofi-tech:esofi-tech/repo-name.git
Set the commit identity for this repo only (so commits show as esofi-tech, not your account 1 identity):
bash
   git config user.name "esofi-tech"
   git config user.email "chimsomesofi@gmail.com"
Push:
bash
   git push -u origin main



<!-- ngpage frontend -->
git remote set-url origin git@github.com-esofi-tech:esofi-tech/ngpagecom.



<!-- CONFIRM  GIT EMAIL AND CONFIGURE-->
git config user.name "esofi-tech"
git config user.email "chimsomesofi@gmail.com"

<!-- OR -->
<!-- CONFIRM  GIT EMAIL AND CONFIGURE-->
git config user.name "btosan"
git config user.email "besttosan@gmail.com"

<!-- VERIFY -->
git config user.email


<!-- Remove and re-add -->

git remote remove origin
git remote add origin https://github.com/esofi-tech/towdah.git

<!-- PUSH -->
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main


cd ~/next/towdah
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/esofi-tech/towdah.git
git push -u origin main --force