const str = `
/*
函数名	: TCOM_Filter
参数	: u8 传入通道，用于区分可控硅或者0-10V; u16 adc的值; u8 调用类型，1表示1ms调用1次，0表示正常调用滤波
返回	: 返回过滤过的ADC值
描述	: 滤波函数  0-10V
		  每1ms需要调用1次
          AD上存在一定的冲击干扰，这时就中位值平均滤波，又由于效率的问题对其添加滑动平均滤波法，提高其动态性
*/`;

let name, params, rtn, desc;
str.replace(/\t+/g, ' ').replace(/：/g, ':').replace(/；/g, ';').match(/.+(:|：)\s+.+/g).forEach(s => {
  switch (true) {
    case /函数名\s*:/.test(s):
      name = s.replace(/\s+/g, '').split(':')[1]
      break;
    case /参数\s*:/.test(s):
      params = s.replace(/参数\s*:\s*/, '').match(/\S+\s+\S+;*/g).map(p => {
        const kv = p.trim().split(' ')
        return { nm: kv[0], desc: kv[1] }
      })
      break;
    case /返回\s*:/.test(s):
      rtn = s.replace(/\s+/g, '').split(':')[1]
      break;
  }
});
desc = str.replace(/(.|\n|\r)*描述\s*:\s*/, '')
console.log(name, params, rtn, desc);