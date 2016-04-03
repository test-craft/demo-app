NODE_ENV=production webpack
#webpack

rm -rf ./build
mkdir ./build

find ./app -name '*.html' -exec cp --parents \{\} build \;
#find ./app -name '*.png' -exec cp --parents \{\} build \;
#find ./app -name '*.jpg' -exec cp --parents \{\} build \;
find ./app -name 'bundle.js' -exec cp --parents \{\} build \;

cp -R ./app/assets ./build/app
cp -R ./app/config ./build/app

cp ./app/*.png ./build
cp ./app/*.jpg ./build

cp ./index.html ./build/