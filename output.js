//Wed Jan 08 2025 15:17:00 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let scriptVersion = "1.0.1";
let update_data = "1.0.1 适配圈x";
const $ = new Env("7MA出行");
const {
  log
} = console;
let scriptVersionLatest = "";
let mateToken = ($.isNode() ? process.env.mateToken : $.getdata("mateToken")) || "";
let mateTokenArr = [];
let login_log = "";
let login_notice_log = "";
let loginBack = 0;
let signinBack = 0;
let extraadResultBack = 0;
let adResultBack = 1;
let token = "";
let msg = "";
!(async () => {
  if (typeof $request !== "undefined") {
    await GetRewrite();
  } else {
    if (!(await Envs())) {
      return;
    } else {
      log("\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：" + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString() + " \n=============================================\n");
      await poem();
      await getVersion();
      log("\n============ 当前版本：" + scriptVersion + "  最新版本：" + scriptVersionLatest + " ============");
      if (scriptVersionLatest != scriptVersion) {
        log("\n发现新版本,请拉库更新！\n" + update_data);
      }
      log("\n=================== 共找到 " + mateTokenArr.length + " 个账号 ===================");
      for (let _0x5a64b5 = 0; _0x5a64b5 < mateTokenArr.length; _0x5a64b5++) {
        let _0x519ae4 = _0x5a64b5 + 1;
        if (_0x519ae4 > 1) {
          await $.wait(2000);
        }
        log("\n========= 开始【第 " + _0x519ae4 + " 个账号】=========\n");
        token = mateTokenArr[_0x5a64b5];
        loginBack = 0;
        await login();
        await $.wait(2000);
        log(login_log);
        if (loginBack > 0) {
          signinBack = 0;
          await signin();
          await $.wait(2000);
          if (signinBack > 0) {
            extraadResultBack = 0;
            await extraadResult();
            await $.wait(2000);
            if (extraadResultBack > 0) {
              adResultBack = 1;
              for (let _0x34ec80 = 0; _0x34ec80 < 10; _0x34ec80++) {
                if (adResultBack = 1) {
                  await adResult();
                  await $.wait(2000);
                }
              }
            }
          }
        }
        await login();
        msg += "============= 账号" + _0x519ae4 + " =============\n" + login_notice_log + "\n";
      }
      log("\n\n============== 推送 ==============");
      await SendMsg(msg);
    }
  }
})().catch(_0x1c77ff => log(_0x1c77ff)).finally(() => $.done());
function login(_0x4f3c6c = 3000) {
  return new Promise(_0x423dfc => {
    const _0x2bbb58 = {
      Host: "newmapi.7mate.cn",
      Authorization: "Bearer " + token,
      Referer: "https://servicewechat.com/wx9a6a1a8407b04c5d/143/page-frame.html",
      "content-type": "application/json"
    };
    const _0x5e39f9 = {
      url: "https://newmapi.7mate.cn/api/user",
      headers: _0x2bbb58,
      data: ""
    };
    $.get(_0x5e39f9, async (_0x2792fe, _0x3eebde, _0x488ac5) => {
      try {
        let _0x46887b = _0x488ac5 == "undefined" ? await login() : JSON.parse(_0x488ac5);
        if (_0x46887b.data.phone) {
          login_log = "登录成功\n手机号：" + _0x46887b.data.phone + "\nID：" + _0x46887b.data.id + "\n积分：" + _0x46887b.data.points;
          login_notice_log = "手机号：" + _0x46887b.data.phone + "\n积分：" + _0x46887b.data.points;
          loginBack = 1;
        } else {
          if (_0x46887b.status_code == 401) {
            login_log = "登录失败，" + decodeURI(_0x46887b.message);
            login_notice_log = "登录失败，\n" + decodeURI(_0x46887b.message);
            loginBack = 0;
          } else {
            login_log = "登录失败，发送未知错误";
            loginBack = 0;
          }
        }
      } catch (_0x5f4bf2) {
        log(_0x5f4bf2);
      } finally {
        _0x423dfc();
      }
    }, _0x4f3c6c);
  });
}
function signin(_0x14ed94 = 3000) {
  return new Promise(_0x35c175 => {
    const _0x47916f = {
      Host: "newmapi.7mate.cn",
      Authorization: "Bearer " + token,
      Referer: "https://servicewechat.com/wx9a6a1a8407b04c5d/143/page-frame.html",
      "content-type": "application/json"
    };
    const _0x1f7503 = {
      url: "https://newmapi.7mate.cn/api/signin",
      headers: _0x47916f,
      body: ""
    };
    $.post(_0x1f7503, async (_0x50ebc9, _0x4c59d9, _0x415b91) => {
      try {
        let _0x3658d4 = _0x415b91 == "undefined" ? await signin() : JSON.parse(_0x415b91);
        if (_0x3658d4.status_code == 200) {
          log("\n签到成功，获得1积分");
          signinBack = 1;
        } else {
          if (_0x3658d4.status_code == 406) {
            log("\n" + decodeURI(_0x3658d4.message));
            signinBack = 1;
          } else {
            if (_0x3658d4.status_code == 401) {
              log(decodeURI(_0x3658d4.message));
            } else {
              log("发生未知错误 ❌");
            }
          }
        }
      } catch (_0xedc3fe) {
        log(_0xedc3fe);
      } finally {
        _0x35c175();
      }
    }, _0x14ed94);
  });
}
function extraadResult(_0x26cc50 = 3000) {
  return new Promise(_0xe73679 => {
    const _0x4ea9df = {
      Host: "newmapi.7mate.cn",
      Authorization: "Bearer " + token,
      Referer: "https://servicewechat.com/wx9a6a1a8407b04c5d/143/page-frame.html",
      "content-type": "application/json"
    };
    const _0x2410f5 = {
      url: "https://newmapi.7mate.cn/api/adResult",
      headers: _0x4ea9df,
      body: "is_sign=1&finish=1"
    };
    $.post(_0x2410f5, async (_0x96e78d, _0x149f3b, _0x4e84f2) => {
      try {
        let _0x320a54 = _0x4e84f2 == "undefined" ? await extraadResult() : JSON.parse(_0x4e84f2);
        if (_0x320a54.status_code == 200) {
          log("签到额外任务完成，获得7积分");
          extraadResultBack = 1;
        } else {
          if (_0x320a54.status_code == 512) {
            log(decodeURI(_0x320a54.message));
            extraadResultBack = 1;
          } else {
            if (_0x320a54.status_code == 401) {
              log(decodeURI(_0x320a54.message));
            } else {
              log("发生未知错误 ❌");
            }
          }
        }
      } catch (_0x33634f) {
        log(_0x33634f);
      } finally {
        _0xe73679();
      }
    }, _0x26cc50);
  });
}
function adResult(_0x363a8c = 3000) {
  return new Promise(_0x3f724b => {
    const _0x3a7567 = {
      Host: "newmapi.7mate.cn",
      Authorization: "Bearer " + token,
      Referer: "https://servicewechat.com/wx9a6a1a8407b04c5d/143/page-frame.html",
      "content-type": "application/json"
    };
    const _0xfadf47 = {
      url: "https://newmapi.7mate.cn/api/adResult",
      headers: _0x3a7567,
      body: "finish=1"
    };
    $.post(_0xfadf47, async (_0x441f49, _0xa58f51, _0x3f5aef) => {
      try {
        let _0x1e4c94 = _0x3f5aef == "undefined" ? await adResult() : JSON.parse(_0x3f5aef);
        if (_0x1e4c94.status_code == 200) {
          log("广告观看成功,获得1积分");
          adResultBack = 1;
        } else {
          if (_0x1e4c94.status_code == 512) {
            log(decodeURI(_0x1e4c94.message));
            adResultBack = 0;
          } else {
            if (_0x1e4c94.status_code == 401) {
              log(decodeURI(_0x1e4c94.message));
              adResultBack = 0;
            } else {
              log("发生未知错误 ❌");
              adResultBack = 0;
            }
          }
        }
      } catch (_0x58800b) {
        log(_0x58800b);
      } finally {
        _0x3f724b();
      }
    }, _0x363a8c);
  });
}
async function GetRewrite() {
  if ($request.url.indexOf("api/user") > -1) {
    const _0x57bc16 = $request.headers.Authorization.split(" ")[1];
    if (mateToken) {
      if (mateToken.indexOf(_0x57bc16) == -1) {
        mateToken = mateToken + "\n" + _0x57bc16;
        $.setdata(mateToken, "mateToken");
        let _0x4c18c3 = mateToken.split("\n");
        $.msg("【" + $.name + "】" + (" 获取第" + _0x4c18c3.length + "个 ck 成功"));
      }
    } else {
      $.setdata(_0x57bc16, "mateToken");
      $.msg("【" + $.name + "】" + " 获取第1个 ck 成功");
    }
  }
}
async function Envs() {
  if (mateToken) {
    if (mateToken.indexOf("@") != -1 || mateToken.indexOf("&") != -1) {
      mateToken.split("@" && "&").forEach(_0x59a39f => {
        mateTokenArr.push(_0x59a39f);
      });
    } else {
      if (mateToken.indexOf("\n") != -1) {
        mateToken.split("\n").forEach(_0x2bc594 => {
          mateTokenArr.push(_0x2bc594);
        });
      } else {
        mateTokenArr.push(mateToken);
      }
    }
  } else {
    log("\n 未填写变量 mateToken");
    return;
  }
  return true;
}
async function SendMsg(_0x2a2295) {
  if (!_0x2a2295) {
    return;
  }
  if ($.isNode()) {
    var _0x4dd6a0 = require("./sendNotify");
    await _0x4dd6a0.sendNotify($.name, _0x2a2295 + ("\n运行时间：" + t() + "\n"));
  } else {
    $.msg(_0x2a2295);
  }
}
function local_hours() {
  let _0x36d5ca = new Date();
  let _0x548d79 = _0x36d5ca.getHours();
  return _0x548d79;
}
function local_minutes() {
  let _0x2b0012 = new Date();
  let _0x54ec49 = _0x2b0012.getMinutes();
  return _0x54ec49;
}
function randomString(_0x2c1d82) {
  _0x2c1d82 = _0x2c1d82 || 32;
  var _0x1956c2 = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
    _0x42bcd2 = _0x1956c2.length,
    _0x56aa50 = "";
  for (i = 0; i < _0x2c1d82; i++) {
    _0x56aa50 += _0x1956c2.charAt(Math.floor(Math.random() * _0x42bcd2));
  }
  return _0x56aa50;
}
function randomInt(_0xe21dbd, _0x33cc3a) {
  return Math.round(Math.random() * (_0x33cc3a - _0xe21dbd) + _0xe21dbd);
}
function timestampMs() {
  return new Date().getTime();
}
function timestampS() {
  return Date.parse(new Date()) / 1000;
}
function poem(_0xa0eee8 = 3000) {
  return new Promise(_0x3de963 => {
    const _0x5ce0b5 = {
      url: "https://v1.jinrishici.com/all.json"
    };
    $.get(_0x5ce0b5, async (_0x1cb6e0, _0x3fd4f4, _0x3d9650) => {
      try {
        _0x3d9650 = JSON.parse(_0x3d9650);
        log(_0x3d9650.content + "  \n————《" + _0x3d9650.origin + "》" + _0x3d9650.author);
      } catch (_0x55197e) {
        log(_0x55197e, _0x3fd4f4);
      } finally {
        _0x3de963();
      }
    }, _0xa0eee8);
  });
}
function modify() {
  fs.readFile("/ql/data/config/config.sh", "utf8", function (_0x827a01, _0x3071fc) {
    if (_0x827a01) {
      return log("读取文件失败！" + _0x827a01);
    } else {
      var _0xaa2f95 = _0x3071fc.replace(/regular/g, string);
      fs.writeFile("/ql/data/config/config.sh", _0xaa2f95, "utf8", function (_0x98e7f9) {
        if (_0x98e7f9) {
          return log(_0x98e7f9);
        }
      });
    }
  });
}
function getVersion(_0x35a505 = 3000) {
  return new Promise(_0xf0e665 => {
    const _0x5622cc = {
      url: "https://ghproxy.com/https://raw.githubusercontent.com/zhacha222/NoteJS/main/7ma.js"
    };
    $.get(_0x5622cc, async (_0x5874c9, _0x57b984, _0x2d05bc) => {
      try {
        scriptVersionLatest = _0x2d05bc.match(/scriptVersion = "([\d\.]+)"/)[1];
        update_data = _0x2d05bc.match(/update_data = "(.*?)"/)[1];
      } catch (_0x316d98) {
        $.logErr(_0x316d98, _0x57b984);
      } finally {
        _0xf0e665();
      }
    }, _0x35a505);
  });
}
function t() {
  var _0xdae73c = new Date();
  var _0x3be1ec = _0xdae73c.getMonth() + 1;
  var _0x40f90f = _0xdae73c.getDate();
  var _0x439692 = _0xdae73c.getHours();
  var _0x8a0c70 = _0xdae73c.getMinutes();
  var _0x38fc51 = _0xdae73c.getSeconds();
  var _0x3e1afd = "-";
  var _0x218fa3 = ":";
  if (_0x3be1ec >= 1 && _0x3be1ec <= 9) {
    _0x3be1ec = "0" + _0x3be1ec;
  }
  if (_0x40f90f >= 0 && _0x40f90f <= 9) {
    _0x40f90f = "0" + _0x40f90f;
  }
  if (_0x439692 >= 0 && _0x439692 <= 9) {
    _0x439692 = "0" + _0x439692;
  }
  if (_0x8a0c70 >= 0 && _0x8a0c70 <= 9) {
    _0x8a0c70 = "0" + _0x8a0c70;
  }
  if (_0x38fc51 >= 0 && _0x38fc51 <= 9) {
    _0x38fc51 = "0" + _0x38fc51;
  }
  var _0x2a2aed = _0xdae73c.getFullYear() + _0x3e1afd + _0x3be1ec + _0x3e1afd + _0x40f90f + " " + _0x439692 + _0x218fa3 + _0x8a0c70 + _0x218fa3 + _0x38fc51;
  return _0x2a2aed;
}
function Env(_0x2b5b2a, _0x378c46) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x698cad {
    constructor(_0x23b361) {
      this.env = _0x23b361;
    }
    send(_0x2cbcb7, _0x3c94d7 = "GET") {
      _0x2cbcb7 = "string" == typeof _0x2cbcb7 ? {
        url: _0x2cbcb7
      } : _0x2cbcb7;
      let _0x128e81 = this.get;
      "POST" === _0x3c94d7 && (_0x128e81 = this.post);
      return new Promise((_0x2a5098, _0x502553) => {
        _0x128e81.call(this, _0x2cbcb7, (_0x2c7c84, _0x6c2ae5, _0x5ad156) => {
          _0x2c7c84 ? _0x502553(_0x2c7c84) : _0x2a5098(_0x6c2ae5);
        });
      });
    }
    get(_0x41169a) {
      return this.send.call(this.env, _0x41169a);
    }
    post(_0x31ee24) {
      return this.send.call(this.env, _0x31ee24, "POST");
    }
  }
  return new class {
    constructor(_0x8d1698, _0x15a0d2) {
      this.name = _0x8d1698;
      this.http = new _0x698cad(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x15a0d2);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(_0x1e406b, _0x9ba8d1 = null) {
      try {
        return JSON.parse(_0x1e406b);
      } catch {
        return _0x9ba8d1;
      }
    }
    toStr(_0xac19ab, _0x216686 = null) {
      try {
        return JSON.stringify(_0xac19ab);
      } catch {
        return _0x216686;
      }
    }
    getjson(_0x50896c, _0x1006a9) {
      let _0x44202d = _0x1006a9;
      const _0x5a7ed1 = this.getdata(_0x50896c);
      if (_0x5a7ed1) {
        try {
          _0x44202d = JSON.parse(this.getdata(_0x50896c));
        } catch {}
      }
      return _0x44202d;
    }
    setjson(_0x17bdff, _0xaa7891) {
      try {
        return this.setdata(JSON.stringify(_0x17bdff), _0xaa7891);
      } catch {
        return !1;
      }
    }
    getScript(_0x289176) {
      return new Promise(_0x1bd948 => {
        const _0x5b5805 = {
          url: _0x289176
        };
        this.get(_0x5b5805, (_0x1d80b9, _0x3bfd29, _0x54a961) => _0x1bd948(_0x54a961));
      });
    }
    runScript(_0x206bb9, _0x51b216) {
      return new Promise(_0xeac89 => {
        let _0x318ec0 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x318ec0 = _0x318ec0 ? _0x318ec0.replace(/\n/g, "").trim() : _0x318ec0;
        let _0x34232e = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x34232e = _0x34232e ? 1 * _0x34232e : 20;
        _0x34232e = _0x51b216 && _0x51b216.timeout ? _0x51b216.timeout : _0x34232e;
        const _0x2960a9 = {
          script_text: _0x206bb9,
          mock_type: "cron",
          timeout: _0x34232e
        };
        const [_0x2e253f, _0x21060c] = _0x318ec0.split("@"),
          _0x3f4c16 = {
            url: "http://" + _0x21060c + "/v1/scripting/evaluate",
            body: _0x2960a9,
            headers: {
              "X-Key": _0x2e253f,
              Accept: "*/*"
            }
          };
        this.post(_0x3f4c16, (_0x26b650, _0xec6e79, _0x1808e6) => _0xeac89(_0x1808e6));
      }).catch(_0x59c819 => this.logErr(_0x59c819));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x592cf9 = this.path.resolve(this.dataFile),
          _0x26ab6b = this.path.resolve(process.cwd(), this.dataFile),
          _0x10f2b6 = this.fs.existsSync(_0x592cf9),
          _0x31d8f3 = !_0x10f2b6 && this.fs.existsSync(_0x26ab6b);
        if (!_0x10f2b6 && !_0x31d8f3) {
          return {};
        }
        {
          const _0x4efbe1 = _0x10f2b6 ? _0x592cf9 : _0x26ab6b;
          try {
            return JSON.parse(this.fs.readFileSync(_0x4efbe1));
          } catch (_0x1dc1cc) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x2d1747 = this.path.resolve(this.dataFile),
          _0x570ad1 = this.path.resolve(process.cwd(), this.dataFile),
          _0xe06366 = this.fs.existsSync(_0x2d1747),
          _0x5963aa = !_0xe06366 && this.fs.existsSync(_0x570ad1),
          _0x85f63f = JSON.stringify(this.data);
        _0xe06366 ? this.fs.writeFileSync(_0x2d1747, _0x85f63f) : _0x5963aa ? this.fs.writeFileSync(_0x570ad1, _0x85f63f) : this.fs.writeFileSync(_0x2d1747, _0x85f63f);
      }
    }
    lodash_get(_0x9acdc9, _0x35a4c5, _0x3f75d9) {
      const _0x456a1e = _0x35a4c5.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x17e361 = _0x9acdc9;
      for (const _0x22924e of _0x456a1e) if (_0x17e361 = Object(_0x17e361)[_0x22924e], void 0 === _0x17e361) {
        return _0x3f75d9;
      }
      return _0x17e361;
    }
    lodash_set(_0x1c6394, _0x163e00, _0x3d5793) {
      return Object(_0x1c6394) !== _0x1c6394 ? _0x1c6394 : (Array.isArray(_0x163e00) || (_0x163e00 = _0x163e00.toString().match(/[^.[\]]+/g) || []), _0x163e00.slice(0, -1).reduce((_0xf263ba, _0x5e928c, _0x4d2996) => Object(_0xf263ba[_0x5e928c]) === _0xf263ba[_0x5e928c] ? _0xf263ba[_0x5e928c] : _0xf263ba[_0x5e928c] = Math.abs(_0x163e00[_0x4d2996 + 1]) >> 0 == +_0x163e00[_0x4d2996 + 1] ? [] : {}, _0x1c6394)[_0x163e00[_0x163e00.length - 1]] = _0x3d5793, _0x1c6394);
    }
    getdata(_0x2ecf3c) {
      let _0x544c7c = this.getval(_0x2ecf3c);
      if (/^@/.test(_0x2ecf3c)) {
        const [, _0xa048a4, _0x1ef191] = /^@(.*?)\.(.*?)$/.exec(_0x2ecf3c),
          _0x3781a5 = _0xa048a4 ? this.getval(_0xa048a4) : "";
        if (_0x3781a5) {
          try {
            const _0x5e19a9 = JSON.parse(_0x3781a5);
            _0x544c7c = _0x5e19a9 ? this.lodash_get(_0x5e19a9, _0x1ef191, "") : _0x544c7c;
          } catch (_0x90cd43) {
            _0x544c7c = "";
          }
        }
      }
      return _0x544c7c;
    }
    setdata(_0xb0c099, _0x53eab3) {
      let _0x72f22e = !1;
      if (/^@/.test(_0x53eab3)) {
        const [, _0x227160, _0x106a11] = /^@(.*?)\.(.*?)$/.exec(_0x53eab3),
          _0x3335ad = this.getval(_0x227160),
          _0x1771e6 = _0x227160 ? "null" === _0x3335ad ? null : _0x3335ad || "{}" : "{}";
        try {
          const _0x4449ce = JSON.parse(_0x1771e6);
          this.lodash_set(_0x4449ce, _0x106a11, _0xb0c099);
          _0x72f22e = this.setval(JSON.stringify(_0x4449ce), _0x227160);
        } catch (_0x138456) {
          const _0x557ba1 = {};
          this.lodash_set(_0x557ba1, _0x106a11, _0xb0c099);
          _0x72f22e = this.setval(JSON.stringify(_0x557ba1), _0x227160);
        }
      } else {
        _0x72f22e = this.setval(_0xb0c099, _0x53eab3);
      }
      return _0x72f22e;
    }
    getval(_0x450b7c) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x450b7c) : this.isQuanX() ? $prefs.valueForKey(_0x450b7c) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x450b7c]) : this.data && this.data[_0x450b7c] || null;
    }
    setval(_0x4d1910, _0x3ff147) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x4d1910, _0x3ff147) : this.isQuanX() ? $prefs.setValueForKey(_0x4d1910, _0x3ff147) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x3ff147] = _0x4d1910, this.writedata(), !0) : this.data && this.data[_0x3ff147] || null;
    }
    initGotEnv(_0xf30232) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0xf30232 && (_0xf30232.headers = _0xf30232.headers ? _0xf30232.headers : {}, void 0 === _0xf30232.headers.Cookie && void 0 === _0xf30232.cookieJar && (_0xf30232.cookieJar = this.ckjar));
    }
    get(_0x2ebdfe, _0x503509 = () => {}) {
      const _0xbbd4f6 = {
        "X-Surge-Skip-Scripting": !1
      };
      const _0x482e95 = {
        hints: !1
      };
      _0x2ebdfe.headers && (delete _0x2ebdfe.headers["Content-Type"], delete _0x2ebdfe.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x2ebdfe.headers = _0x2ebdfe.headers || {}, Object.assign(_0x2ebdfe.headers, _0xbbd4f6)), $httpClient.get(_0x2ebdfe, (_0x1abab7, _0x1103e3, _0x2a9f15) => {
        !_0x1abab7 && _0x1103e3 && (_0x1103e3.body = _0x2a9f15, _0x1103e3.statusCode = _0x1103e3.status);
        _0x503509(_0x1abab7, _0x1103e3, _0x2a9f15);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x2ebdfe.opts = _0x2ebdfe.opts || {}, Object.assign(_0x2ebdfe.opts, _0x482e95)), $task.fetch(_0x2ebdfe).then(_0x378ab7 => {
        const {
          statusCode: _0x3ab874,
          statusCode: _0x321f13,
          headers: _0x2d3f0a,
          body: _0x18d520
        } = _0x378ab7;
        const _0x51ccdf = {
          status: _0x3ab874,
          statusCode: _0x321f13,
          headers: _0x2d3f0a,
          body: _0x18d520
        };
        _0x503509(null, _0x51ccdf, _0x18d520);
      }, _0x3df767 => _0x503509(_0x3df767))) : this.isNode() && (this.initGotEnv(_0x2ebdfe), this.got(_0x2ebdfe).on("redirect", (_0x21fb63, _0x189e22) => {
        try {
          if (_0x21fb63.headers["set-cookie"]) {
            const _0x5a01e2 = _0x21fb63.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x5a01e2 && this.ckjar.setCookieSync(_0x5a01e2, null);
            _0x189e22.cookieJar = this.ckjar;
          }
        } catch (_0x5574c8) {
          this.logErr(_0x5574c8);
        }
      }).then(_0x364af8 => {
        const {
          statusCode: _0x22bf50,
          statusCode: _0x2b34a4,
          headers: _0x34d2bf,
          body: _0x227e4a
        } = _0x364af8;
        const _0x10e8f9 = {
          status: _0x22bf50,
          statusCode: _0x2b34a4,
          headers: _0x34d2bf,
          body: _0x227e4a
        };
        _0x503509(null, _0x10e8f9, _0x227e4a);
      }, _0xdb9ac3 => {
        const {
          message: _0x5d49db,
          response: _0x3a3111
        } = _0xdb9ac3;
        _0x503509(_0x5d49db, _0x3a3111, _0x3a3111 && _0x3a3111.body);
      }));
    }
    post(_0x198cf9, _0x38d6e2 = () => {}) {
      const _0x5035fc = {
        "X-Surge-Skip-Scripting": !1
      };
      const _0x1c5ab7 = {
        hints: !1
      };
      if (_0x198cf9.body && _0x198cf9.headers && !_0x198cf9.headers["Content-Type"] && (_0x198cf9.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x198cf9.headers && delete _0x198cf9.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x198cf9.headers = _0x198cf9.headers || {}, Object.assign(_0x198cf9.headers, _0x5035fc));
        $httpClient.post(_0x198cf9, (_0x440037, _0x139970, _0x1b3fef) => {
          !_0x440037 && _0x139970 && (_0x139970.body = _0x1b3fef, _0x139970.statusCode = _0x139970.status);
          _0x38d6e2(_0x440037, _0x139970, _0x1b3fef);
        });
      } else {
        if (this.isQuanX()) {
          _0x198cf9.method = "POST";
          this.isNeedRewrite && (_0x198cf9.opts = _0x198cf9.opts || {}, Object.assign(_0x198cf9.opts, _0x1c5ab7));
          $task.fetch(_0x198cf9).then(_0x25383c => {
            const {
              statusCode: _0x25370a,
              statusCode: _0x15570d,
              headers: _0x660717,
              body: _0x2530a5
            } = _0x25383c;
            const _0x1535ca = {
              status: _0x25370a,
              statusCode: _0x15570d,
              headers: _0x660717,
              body: _0x2530a5
            };
            _0x38d6e2(null, _0x1535ca, _0x2530a5);
          }, _0x2cc8a6 => _0x38d6e2(_0x2cc8a6));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0x198cf9);
            const {
              url: _0x5beab0,
              ..._0x128f16
            } = _0x198cf9;
            this.got.post(_0x5beab0, _0x128f16).then(_0x217169 => {
              const {
                statusCode: _0x3e3d92,
                statusCode: _0x208b8c,
                headers: _0x4915fc,
                body: _0x209937
              } = _0x217169;
              const _0x4b867a = {
                status: _0x3e3d92,
                statusCode: _0x208b8c,
                headers: _0x4915fc,
                body: _0x209937
              };
              _0x38d6e2(null, _0x4b867a, _0x209937);
            }, _0x4f91b4 => {
              const {
                message: _0x35e69c,
                response: _0x44b9f0
              } = _0x4f91b4;
              _0x38d6e2(_0x35e69c, _0x44b9f0, _0x44b9f0 && _0x44b9f0.body);
            });
          }
        }
      }
    }
    time(_0x350b2b, _0x51776f = null) {
      const _0x12b150 = _0x51776f ? new Date(_0x51776f) : new Date();
      const _0x59b025 = {
        "M+": _0x12b150.getMonth() + 1,
        "d+": _0x12b150.getDate(),
        "H+": _0x12b150.getHours(),
        "m+": _0x12b150.getMinutes(),
        "s+": _0x12b150.getSeconds(),
        "q+": Math.floor((_0x12b150.getMonth() + 3) / 3),
        S: _0x12b150.getMilliseconds()
      };
      /(y+)/.test(_0x350b2b) && (_0x350b2b = _0x350b2b.replace(RegExp.$1, (_0x12b150.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x2b8df6 in _0x59b025) new RegExp("(" + _0x2b8df6 + ")").test(_0x350b2b) && (_0x350b2b = _0x350b2b.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x59b025[_0x2b8df6] : ("00" + _0x59b025[_0x2b8df6]).substr(("" + _0x59b025[_0x2b8df6]).length)));
      return _0x350b2b;
    }
    msg(_0x573ce7 = _0x2b5b2a, _0x5131cb = "", _0x10f5df = "", _0x19f2e2) {
      const _0x5a6603 = _0x42f067 => {
        if (!_0x42f067) {
          return _0x42f067;
        }
        if ("string" == typeof _0x42f067) {
          return this.isLoon() ? _0x42f067 : this.isQuanX() ? {
            "open-url": _0x42f067
          } : this.isSurge() ? {
            url: _0x42f067
          } : void 0;
        }
        if ("object" == typeof _0x42f067) {
          if (this.isLoon()) {
            let _0xa8decd = _0x42f067.openUrl || _0x42f067.url || _0x42f067["open-url"],
              _0x46563c = _0x42f067.mediaUrl || _0x42f067["media-url"];
            const _0x2e73d1 = {
              openUrl: _0xa8decd,
              mediaUrl: _0x46563c
            };
            return _0x2e73d1;
          }
          if (this.isQuanX()) {
            let _0x5339a7 = _0x42f067["open-url"] || _0x42f067.url || _0x42f067.openUrl,
              _0x494010 = _0x42f067["media-url"] || _0x42f067.mediaUrl;
            const _0x27f2ec = {
              "open-url": _0x5339a7,
              "media-url": _0x494010
            };
            return _0x27f2ec;
          }
          if (this.isSurge()) {
            let _0x29d2c3 = _0x42f067.url || _0x42f067.openUrl || _0x42f067["open-url"];
            const _0x191a36 = {
              url: _0x29d2c3
            };
            return _0x191a36;
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x573ce7, _0x5131cb, _0x10f5df, _0x5a6603(_0x19f2e2)) : this.isQuanX() && $notify(_0x573ce7, _0x5131cb, _0x10f5df, _0x5a6603(_0x19f2e2))), !this.isMuteLog) {
        let _0x1fe465 = ["", "==============📣系统通知📣=============="];
        _0x1fe465.push(_0x573ce7);
        _0x5131cb && _0x1fe465.push(_0x5131cb);
        _0x10f5df && _0x1fe465.push(_0x10f5df);
        console.log(_0x1fe465.join("\n"));
        this.logs = this.logs.concat(_0x1fe465);
      }
    }
    log(..._0x172490) {
      _0x172490.length > 0 && (this.logs = [...this.logs, ..._0x172490]);
      console.log(_0x172490.join(this.logSeparator));
    }
    logErr(_0x2b2038, _0x237f71) {
      const _0x567f68 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x567f68 ? this.log("", "❗️" + this.name + ", 错误!", _0x2b2038.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x2b2038);
    }
    wait(_0x937014) {
      return new Promise(_0x16ad72 => setTimeout(_0x16ad72, _0x937014));
    }
    done(_0x5b660c = {}) {
      const _0x4e5019 = new Date().getTime(),
        _0x419ce2 = (_0x4e5019 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x419ce2 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x5b660c);
    }
  }(_0x2b5b2a, _0x378c46);
}