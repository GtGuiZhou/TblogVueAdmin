#!/usr/bin/env bash
npm i # d2-admin需要用nrm配置npm的源，要不然会出现core-js无法加载的问题
npx vue-cli-service build --mode production --dest /www/wwwroot/TBlog/public/static/admin --target app --dashboard
# 这种方法也可以
# ./node_modules/.bin/vue-cli-service build