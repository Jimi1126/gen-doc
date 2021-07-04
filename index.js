const YAML = require('yamljs');
const parse = require('./src/parse');
const build = require('./src/build');
const generate = require('./src/generate')
const globalConf = YAML.load('config.yml');

const fileList = parse(globalConf);
build(fileList);
generate(fileList, globalConf);
