ng build --prod
cd dist/MyBlog
echo "www.wayzer.cf" > CNAME
git init
git add .
git commit -m "deploy"
git remote add origin git@github.com:way-zer/myBlog.git
git push -u origin master:gh-pages --force

