#!/usr/bin/env bash
cnpm i
npx vue-cli-service build --dist /www/wwwroot/TBlog/public/static
# 这种方法也可以
# ./node_modules/.bin/vue-cli-service build --dist /www/wwwroot/TBlog/public/static