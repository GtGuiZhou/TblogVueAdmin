#!/usr/bin/env bash
cnpm i
npx vue-cli-service build --mode production --dest /www/wwwroot/TBlog/public/static/admin --target app --dashboard
# 这种方法也可以
# ./node_modules/.bin/vue-cli-service build