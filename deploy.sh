ng build --prod
cd dist/MyBlog
git init
git add .
git remote add origin git@github.com:way-zer/myBlog.git
git push -u origin master:gh-pages --force

