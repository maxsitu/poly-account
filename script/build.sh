tsc && \
cpy '**/*' '!**/*.ts' ../${npm_package_build_dir}/ --cwd=src/ --no-overwrite --parents && \
cpy 'ormconfig.js' ${npm_package_build_dir}/ --cwd=. --no-overwrite