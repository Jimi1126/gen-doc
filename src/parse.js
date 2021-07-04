const fs = require('fs');
const _path = require('path');
const iconv = require('iconv-lite');

/**
 * 递归目录，解析出文件信息
 * @param {String} path 目标目录
 * @param {Array} fileList 结果
 */
function core (path, fileList = []) {
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(path);
    while (files.length) {
      const file = files.shift();
      core(_path.join(path, file), fileList);
    }
  } else {
    const source = iconv.decode(fs.readFileSync(path, 'binary'), 'GB2312');
    const comms = source.match(/\/\*(.|\n|\r)*?\*\//g);
    fileList.push({
      path,
      comms,
      ...stat
    });
  }
}

/**
 * 解析
 * @param {Object} config 配置
 */
function parse (config) {
  const fileList = [];
  core(config.source, fileList)
  return fileList;
}

module.exports = parse;