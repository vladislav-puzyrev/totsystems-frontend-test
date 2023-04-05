@echo off

call npx --yes npm-check-updates --upgrade
call npx --yes sort-package-json
call yarn install
call yarn upgrade
call yarn run verify

pause
