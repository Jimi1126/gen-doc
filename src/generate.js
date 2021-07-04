const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mkdirp = require('mkdirp');

function generate (fileList = [], config) {
  fileList.forEach(meta => {
    const fullPath = meta.path.replace(config.source, config.target || 'doc') + '.html';
    mkdirp.sync(path.dirname(fullPath));
    ejs.renderFile('ejs/post.ejs', meta, (err, html) => {
      if (err) throw new Error(err);
      fs.writeFileSync(fullPath, html);
    });
  })
}

module.exports = generate;