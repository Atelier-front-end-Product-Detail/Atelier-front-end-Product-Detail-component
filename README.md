# shopify-fe
Front End Capstone Project: A front end for our eCommerce application.

OverView: 
This is a front-end project designed to simulate a e-commerce website. Users will be able to view products, read reviews and comments, add questions, etc. 

Team members

Nhu Le: Questions & Answers

Michael O'Brien: Related items

Eric Yap: Product details

Vincent Lieu: Reviews


Description

Components


Git Workflow
{} = just plug in dont actually put in brackets 

If you are working on a new feature
Start on the main branch
1. git checkout main 

Make sure your main branch is up to date
2. git fetch origin

Make sure your staging area is clear
3. git resset --hard origin/main

Create the new branch you will be working on
4. git checkout -b {branch name} (make sure you are in this branch when doing any new work 'git checkout new-feature'/ to check 'git branch')

If you are done working on your feature

Add your files to your staging area
5. git add .

Commit the files from your staging area
6. git commit -m ""

Double check that you aren't on the main branch
7. git branch (to make sure your not on main branch)

Push from your origin (current branch) to the desired branch
8. git push -u origin {branch name}

Submit your pull request
9. submit PR

If any merge conflicts then...

Go back to your main branch
10. git checkout main

Ensure your main branch is up to date
11. git pull

Go back to your working branch
12. git checkout {branch name}

Merge your main branch into the branch you are on
13. git merge main

14. Resolve any conflicts

15. Repeat steps 8 & 9. There should no longer be any conflicts






- ADD MORE TO THE README AS WE DEVELOP THE PROJECT -
