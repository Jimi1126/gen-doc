/**
 * ，注解解析
 * @param {*} fileList 文件信息列表
 */
function buildComms (fileList = []) {
  fileList.forEach(meta => {
    meta.comms = meta.comms.map(str => {
      let name, params, rtn, desc;
      const list = str.replace(/\t+/g, ' ').replace(/：/g, ':').replace(/；/g, ';').match(/.+(:|：)\s+.+/g) || [];
      list.forEach(s => {
        switch (true) {
          case /函数名\s*:/.test(s):
            name = s.replace(/\s+/g, '').split(':')[1]
            break;
          case /参数\s*:/.test(s):
            const ps = s.replace(/参数\s*:\s*/, '').match(/\S+\s+\S+;*/g) || [];
            params = ps.map(p => {
              const kv = p.trim().split(' ')
              return { nm: kv[0], desc: kv[1] }
            })
            break;
          case /返回\s*:/.test(s):
            rtn = s.replace(/\s+/g, '').split(':')[1]
            break;
        }
      });
      desc = str.replace(/(.|\n\r)*描述\s*:\s*/, '')
      return {
        name,
        params,
        rtn,
        desc
      }
    })
  });
}

module.exports = buildComms;