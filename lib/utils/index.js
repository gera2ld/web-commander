const fs = require('fs');
const path = require('path');
const config = require('../config');

exports.cookies = {
  get(ctx, key) {
    const value = ctx.cookies.get(key, {signed: true});
    try {
      return JSON.parse(new Buffer(value, 'base64').toString());
    } catch (e) {
      // ignore invalid data
    }
  },
  set(ctx, key, data) {
    const value = new Buffer(JSON.stringify(data)).toString('base64');
    ctx.cookies.set(key, value, {signed: true});
  },
  remove(ctx, key) {
    ctx.cookies.set(key, '', {expires: new Date(Date.now() - 24 * 60 * 60 * 1000)});
  },
};

{
  function generateKey(length) {
    let key = '';
    for (let i = 0; i < length; i++) {
      key += chars.charAt(~~ (Math.random() * charLength));
    }
    return key;
  }
  function getKey() {
    const fullpath = path.resolve(config.get('DATA_DIR'), 'key');
    try {
      return fs.readFileSync(fullpath, 'utf8');
    } catch (e) {
      const key = generateKey(30);
      fs.writeFile(fullpath, key, 'utf8', err => {
        if (err) throw err;
      });
      return key;
    }
  }
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/.,;?';
  const charLength = chars.length;
  exports.getKey = getKey;
}