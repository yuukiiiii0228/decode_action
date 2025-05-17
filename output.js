//Sat May 17 2025 15:33:45 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
NAME = "爱义乌";
VALY = ["aywck"];
VER = "1.1.7";
CK = "";
LOGS = 0;
usid = 0;
Notify = 1;
nowhour = Math.round(new Date().getHours()).toString();
const 哇哈哈_0x25dbfc = require("fs"),
  {
    v4: 哇哈哈_0x2b98cd
  } = require("uuid");
DCFHOST = process.env.DCFHOST;
dcfkey = encodeURIComponent(process.env.dcfkey);
IP = "";
IPCITY = "";
class 哇哈哈_0x3906d7 {
  constructor(_0x4a57b6) {
    this.zh = _0x4a57b6.split("#")[0];
    this.mm = $.MD5Encrypt(0, _0x4a57b6.split("#")[1]);
    this.did = _0x4a57b6.split("#")[2];
    this.jscode = _0x4a57b6.split("#")[3];
    this._ = ++usid;
    this.f = "小主 [" + this._ + "] ";
    this.message = "";
    this.logs = true;
  }
  async ["login"]() {
    let _0x2abe2b = $.time(13),
      _0x683fdd = $.SJS(32, 1),
      _0x6022c0 = "password=" + this.mm + "&phone=" + this.zh + "&appId=" + this.did + "&currentTimeMillis=" + _0x2abe2b + "&siteId=b496650d5db94435a690db7326131dc9&versionName=4.2.0&platform=Android&deviceToken=" + _0x683fdd + "&signature=1b32a9bb306846e0badd070065836c24",
      _0x374ddf = _0x6022c0.match(/=(.*?)(?:&|$)/g).map(_0x368d67 => _0x368d67.slice(1));
    _0x374ddf.sort();
    let _0x461ca5 = _0x374ddf.join("").replace(/[^a-zA-Z0-9.]/g, ""),
      _0x26e5af = $.MD5Encrypt(0, _0x461ca5),
      _0x14fa67 = await $.task("post", "https://app.media.ywcity.cn/memberapi/api/member/doMLogin", {}, "password=" + this.mm + "&phone=" + this.zh + "&appId=" + this.did + "&currentTimeMillis=" + _0x2abe2b + "&siteId=b496650d5db94435a690db7326131dc9&versionName=4.2.0&platform=Android&deviceToken=" + _0x683fdd + "&signature=" + _0x26e5af);
    if (_0x14fa67.status == 200) {
      this.name = _0x14fa67.username;
      this.us = _0x14fa67.us;
      this.userid = _0x14fa67.id;
      console.log("【" + this.name + "】登录成功");
      await this.login1();
    } else {
      console.log("【" + this.f + "】登录失败");
    }
  }
  async ["login1"]() {
    let _0x5bf41d = $.time(13),
      _0x969b92 = "application=cloud&appId=" + this.did + "&currentTimeMillis=" + _0x5bf41d + "&siteId=b496650d5db94435a690db7326131dc9&un=" + this.us + "&versionName=4.2.0&userId=" + this.userid + "&platform=android",
      _0x1bec80 = $.generateOutput(_0x969b92),
      _0x3e52dd = $.MD5Encrypt(0, _0x1bec80),
      _0x90627c = "application=cloud&appId=" + this.did + "&currentTimeMillis=" + _0x5bf41d + "&siteId=b496650d5db94435a690db7326131dc9&un=" + _0x3e52dd + "&versionName=4.2.0&userId=" + this.userid + "&platform=android&signature=1b32a9bb306846e0badd070065836c24",
      _0x16ac34 = _0x90627c.match(/=(.*?)(?:&|$)/g).map(_0x36f821 => _0x36f821.slice(1));
    _0x16ac34.sort();
    let _0x464449 = _0x16ac34.join("").replace(/[^a-zA-Z0-9.]/g, ""),
      _0x36cf4b = $.MD5Encrypt(0, _0x464449),
      _0x3f955b = await $.task("get", "https://app.media.ywcity.cn/shopapi/api/ryPlatform/getLoginToken?application=cloud&appId=" + this.did + "&currentTimeMillis=" + _0x5bf41d + "&siteId=b496650d5db94435a690db7326131dc9&un=" + _0x3e52dd + "&versionName=4.2.0&userId=" + this.userid + "&platform=android&signature=" + _0x36cf4b, {
        Host: "app.media.ywcity.cn"
      });
    _0x3f955b.status == 200 && (console.log("【" + this.name + "】刷新token成功"), this.token = _0x3f955b.token, await this.login2());
  }
  async ["login2"]() {
    const _0xe7bdbb = {
      token: this.token
    };
    let _0xeb49f5 = "{}",
      _0x145e3a = await $.task("post", "https://mkapi.xinhuamm.net/coinApi/clapi/statistics/getStaticsInfo", _0xe7bdbb, _0xeb49f5);
    _0x145e3a.status == 200 && (console.log("【" + this.name + "】登陆成功,当前余额:" + _0x145e3a.obj.balance + "今日获得金币:" + _0x145e3a.obj.todayCoin + ",未结算剩余金币:" + _0x145e3a.obj.unsettledCoin + ",昨日兑换零钱:" + _0x145e3a.obj.yesterdayCashIncome), this.message += "【" + this.name + "】登陆成功,当前余额:" + _0x145e3a.obj.balance + "今日获得金币:" + _0x145e3a.obj.todayCoin + ",未结算剩余金币:" + _0x145e3a.obj.unsettledCoin + ",昨日兑换零钱:" + _0x145e3a.obj.yesterdayCashIncome, _0x145e3a.obj.balance >= 5 && (await this.gettoken()));
  }
  async ["wzlist"]() {
    const _0x37d3bc = {
      token: this.token
    };
    let _0x456bd3 = "{}",
      _0x1a9c8d = await $.task("post", "https://mkapi.xinhuamm.net/coinApi/clapi/content/getHighContentList", _0x37d3bc, _0x456bd3);
    if (_0x1a9c8d.status == 200) {
      for (let _0x57e94a of _0x1a9c8d.list) {
        let _0x5cf998 = _0x57e94a.contentId,
          _0x11adfd = _0x57e94a.title;
        await this.dotask(_0x5cf998, _0x11adfd);
      }
    }
  }
  async ["dotask"](_0x4d4798, _0x396101) {
    for (let _0x4abc6f of ["visit", "support", "comment", "share"]) {
      let _0x2c5dc8 = await this.getkey(),
        _0xc535a6 = this.ts + $.RT(20, 100);
      const _0x422b6c = [_0xc535a6, this.userid, _0x2c5dc8, _0x4d4798, this.did, _0x4abc6f];
      _0x422b6c.sort((_0x587e32, _0x58b59d) => {
        let _0x46eeca = String(_0x587e32).toLowerCase(),
          _0x31f684 = String(_0x58b59d).toLowerCase();
        if (_0x46eeca < _0x31f684) {
          return -1;
        }
        if (_0x46eeca > _0x31f684) {
          return 1;
        }
        return 0;
      });
      let _0x5a3e3f = _0x422b6c.join("");
      await this.dotask2(_0x5a3e3f, _0x396101, _0x4abc6f, _0xc535a6, _0x4d4798);
    }
  }
  async ["dotask2"](_0x2059f0, _0x121dd4, _0x167d25, _0x29e54d, _0x24afd8) {
    let _0x10ad27 = $.MD5Encrypt(0, "" + _0x2059f0),
      _0x46a7a1 = $.DecryptCrypto("0", "AES", "CBC", "Pkcs7", "{\"eventCode\":\"" + _0x167d25 + "\",\"timeStamp\":\"" + _0x29e54d + "\",\"signature\":\"" + _0x10ad27 + "\",\"contentId\":\"" + _0x24afd8 + "\",\"userId\":\"" + this.userid + "\",\"deviceId\":\"" + this.did + "\"}", "1d185a236bfa9636", "0000000000000000"),
      _0x1fff0d = "{\"appKey\":\"361f1fdcf22640329655ec1910402c86\",\"data\":\"" + _0x46a7a1 + "\"}",
      _0x10b947 = await $.task("post", "https://ryapi.xinhuamm.net/coinLog/sdk/log/acceptLog", {}, _0x1fff0d);
    if (_0x10b947.status == 200) {
      console.log("【" + this.name + "】完成文章" + _0x121dd4 + "的" + _0x167d25 + "任务");
      await $.wait(5000, 10000);
      return true;
    } else {
      return _0x10b947.status == 60004 ? false : true;
    }
  }
  async ["getkey"]() {
    const _0x1aa49c = {
      token: this.token
    };
    let _0xc6ceb4 = "{\"token\":\"" + this.token + "\",\"deviceId\":\"" + this.did + "\"}";
    this.ts = $.time(13);
    let _0x15ff15 = await $.task("post", "https://mkapi.xinhuamm.net/coinApi/clapi/sdk/init", _0x1aa49c, _0xc6ceb4);
    if (_0x15ff15.status == 200) {
      let _0x41547a = $.DecryptCrypto("1", "AES", "CBC", "NoPadding", _0x15ff15.obj.us, "1d185a236bfa9636", "0000000000000000");
      return _0x41547a;
    }
  }
  async ["openbox"]() {
    const _0x58ecf9 = {
      token: this.token
    };
    let _0x27067d = "{}",
      _0x2ed984 = await $.task("post", "https://mkapi.xinhuamm.net/coinApi/clapi/coin/openTreasureBox", _0x58ecf9, _0x27067d);
    _0x2ed984.status == 200 && console.log("【" + this.name + "】开宝箱成功");
  }
  async ["gettoken"]() {
    const _0x300cfa = {
      token: this.token
    };
    let _0x2cea9c = "{\"amount\":\"5\"}",
      _0x1a8af8 = await $.task("post", "https://mkapi.xinhuamm.net/coinApi/clapi/account/withdrawal", _0x300cfa, _0x2cea9c);
    if (_0x1a8af8.status == 200) {
      let _0x2bd5b2 = _0x1a8af8.obj.ticket;
      await this.tx(_0x2bd5b2);
    }
  }
  async tx(_0x728f13) {
    let _0x1ca533 = "{\"token\":\"" + this.jscode + "\",\"ticket\":\"" + _0x728f13 + "\"}",
      _0x4fa455 = await $.task("post", "https://mkapi.xinhuamm.net/coinApi/cvapi/account/withdrawal/callback", {}, _0x1ca533);
    _0x4fa455.status == 200 && console.log("【" + this.name + "】🎉🎉提现5元成功！！");
  }
  async ["getlotteryid"]() {
    const _0x22fd15 = {
      token: this.token
    };
    let _0xd4876 = "{}",
      _0x5c969f = await $.task("post", "https://mkapi.xinhuamm.net/coinApi/clapi/global/config/getConfig", _0x22fd15, _0xd4876);
    _0x5c969f.status == "200" && (this.lotteryId = $.extractLotteryId(_0x5c969f.obj.inviteLotteryPath));
  }
  async ["cxlottery"]() {
    await this.getlotteryid();
    const _0x16b22a = {
      Cookie: "token=" + this.token
    };
    let _0x1ed442 = await $.task("get", "https://ryapi.xinhuamm.net/lotteryapi/lottery/expandInfo/" + this.lotteryId, _0x16b22a);
    if (_0x1ed442.status == "200") {
      let _0x32427a = _0x1ed442.data.availableJoinCount;
      _0x32427a >= 1 ? await this.lottery(_0x32427a) : console.log("【" + this.name + "】暂无抽奖机会，快去完成任务吧！！");
    }
  }
  async ["lottery"](_0x12df64) {
    for (let _0x2831cf = 0; _0x2831cf < _0x12df64; _0x2831cf++) {
      const _0x5236ab = {
        Cookie: "token=" + this.token
      };
      let _0x526b3e = await $.task("get", "https://ryapi.xinhuamm.net/lotteryapi/lottery/draw?id=" + this.lotteryId + "&appId=3ae39e32299c4dafacb54044ec4db630&password=&idcard=", _0x5236ab);
      if (_0x526b3e.status == "200" && _0x526b3e.data.extendInfo != "") {
        let _0x8e8ef1 = JSON.parse(_0x526b3e.data.extendInfo).amount,
          _0x2893ab = JSON.parse(_0x526b3e.data.extendInfo).ticket;
        console.log("【" + this.name + "】抽奖成功，抽中了" + _0x8e8ef1 + "元");
        await this.lotterytx(_0x8e8ef1, _0x2893ab);
      } else {
        console.log("【" + this.name + "】抽奖成功，抽到了空气");
        await $.wait(15000, 20000);
      }
    }
  }
  async ["lotterytx"](_0x2f9ebc, _0x345100) {
    let _0x2f85b9 = "{\"token\":\"" + this.jscode + "\",\"ticket\":\"" + _0x345100 + "\"}",
      _0x302857 = await $.task("post", "https://ryapi.xinhuamm.net/lotteryapi/noLogin/redpack/redeem", {}, _0x2f85b9);
    _0x302857.status == 200 ? (console.log("【" + this.name + "】提现" + _0x2f9ebc + "元成功"), await $.wait(15000, 20000)) : console.log("【" + this.name + "】提现:" + _0x302857.msg);
  }
}
$ = 哇哈哈_0xa518a1();
!(async () => {
  let _0x3abe4f = await $.task("get", "http://" + DCFHOST + "/download?DCFKEY=" + dcfkey + "&JSMANE=ayw&VER=" + VER, {});
  if (_0x3abe4f.code == 0) {
    console.log("【" + NAME + "】当前版本号：V" + VER + ",正在更新脚本，请稍等......");
    const _0x3e9b0f = require("fs").promises,
      _0x194bd4 = process.argv[1];
    await _0x3e9b0f.writeFile(_0x194bd4, _0x3abe4f.scriptData);
    console.log("脚本更新完成，请重新运行脚本");
  } else {
    if (_0x3abe4f.code == 1) {
      console.log("正在运行脚本：【" + NAME + "】V" + VER);
      console.log("📢 请认真阅读以下声明\n 【免责声明】   \n📌 脚本文件仅用于测试和学习研究   \n📌 脚本文件任何人不得用于商业以及非法用途   \n📌 禁止任何公众号、自媒体进行任何形式的转发   \n📌 脚本文件请在下载试用后24小时内自行删除   \n📌 因使用脚本造成软件平台的一切损失皆由使用者承担   \n📌 脚本文件如有不慎被破解或修改由破解或修改者承担   \n📌 如不接受此条款请立即删除脚本文件");
      let _0x29958c = await $.getkami(),
        _0x2138a5 = await $.readUUID();
      if (_0x29958c.dcfkey) {
        if (_0x29958c.Notify != "") {
          console.log(_0x29958c.Notify);
        }
        TSdata = $.time(13);
        if (_0x29958c.MAC == null) {
          console.log("请提交正确的MAC地址后再运行脚本！");
          return;
        } else {
          if (_0x29958c.MAC != null) {
            if (_0x29958c.MAC != _0x2138a5) {
              let _0x3460f2 = require("path"),
                _0x5817df = _0x3460f2.basename(__filename);
              console.log("本次MAC地址与数据库记录不匹配，停止运行文件[" + _0x5817df + "]");
              return;
            }
          }
        }
        if (_0x29958c.Delete == 1) {
          let _0x36aee6 = require("path"),
            _0x3cd3d2 = _0x36aee6.basename(__filename);
          console.log("关闭服务器跑路啦，帮你删除脚本文件[" + _0x3cd3d2 + "]");
          哇哈哈_0x25dbfc.unlink(_0x3cd3d2, _0x898c6a => {});
          return;
        }
        if (TSdata <= _0x29958c.Data) {
          console.log("尊贵的" + _0x29958c.UserName + "小主,您的卡密有效期到：" + _0x29958c.DataTime);
        } else {
          let _0x4981e9 = require("path"),
            _0xb13fa = _0x4981e9.basename(__filename);
          console.log("卡密已过期，停止运行文件[" + _0xb13fa + "]");
          return;
        }
        await $.ExamineCookie(_0x29958c);
        if ($.cookie_list.length < _0x29958c.xianjin) {
          await $.Multithreading("login");
          let _0x43075a = $.cookie_list.filter(_0x4cc204 => _0x4cc204.logs == true);
          if (_0x43075a.length == 0) {
            console.log("Cookie格式错误 或 账号被禁封");
            return;
          } else {
            await $.Multithreading("cxlottery");
            (nowhour == 12 || nowhour == 18 || nowhour == 24) && (await $.Multithreading("openbox"));
            if (nowhour != 0) {
              await $.Multithreading("wzlist");
            }
          }
        } else {
          console.log("账号数量超过限制，请减少账号数量后重试！");
        }
      } else {
        if (_0x29958c.message == "更新成功") {
          console.log("数据更新成功，请重新运行脚本");
          return;
        } else {
          let _0x2e88cf = require("path"),
            _0x47137a = _0x2e88cf.basename(__filename);
          console.log("无效卡密，停止运行文件[" + _0x47137a + "]");
          return;
        }
      }
    } else {
      console.log("脚本更新失败，不进行覆盖操作，请稍后重试！");
      console.log("正在运行脚本：【" + NAME + "】V" + VER);
      console.log("📢 请认真阅读以下声明\n 【免责声明】   \n📌 脚本文件仅用于测试和学习研究   \n📌 脚本文件任何人不得用于商业以及非法用途   \n📌 禁止任何公众号、自媒体进行任何形式的转发   \n📌 脚本文件请在下载试用后24小时内自行删除   \n📌 因使用脚本造成软件平台的一切损失皆由使用者承担   \n📌 脚本文件如有不慎被破解或修改由破解或修改者承担   \n📌 如不接受此条款请立即删除脚本文件");
      let _0x59fd37 = await $.getkami(),
        _0x13e605 = await $.readUUID();
      if (_0x59fd37.dcfkey) {
        if (_0x59fd37.Notify != "") {
          console.log(_0x59fd37.Notify);
        }
        TSdata = $.time(13);
        if (_0x59fd37.MAC == null) {
          console.log("请提交正确的MAC地址后再运行脚本！");
          return;
        } else {
          if (_0x59fd37.MAC != null) {
            if (_0x59fd37.MAC != _0x13e605) {
              let _0x4a6a20 = require("path"),
                _0x23b8c6 = _0x4a6a20.basename(__filename);
              console.log("本次MAC地址与数据库记录不匹配，停止运行文件[" + _0x23b8c6 + "]");
              return;
            }
          }
        }
        if (_0x59fd37.Delete == 1) {
          let _0x4dd5e9 = require("path"),
            _0x546061 = _0x4dd5e9.basename(__filename);
          console.log("关闭服务器跑路啦，帮你删除脚本文件[" + _0x546061 + "]");
          哇哈哈_0x25dbfc.unlink(_0x546061, _0x4ff525 => {});
          return;
        }
        if (TSdata <= _0x59fd37.Data) {
          console.log("尊贵的" + _0x59fd37.UserName + "小主,您的卡密有效期到：" + _0x59fd37.DataTime);
        } else {
          let _0x5bc5f9 = require("path"),
            _0x22038f = _0x5bc5f9.basename(__filename);
          console.log("卡密已过期，停止运行文件[" + _0x22038f + "]");
          return;
        }
        await $.ExamineCookie(_0x59fd37);
        if ($.cookie_list.length < _0x59fd37.xianjin) {
          await $.Multithreading("login");
          let _0x53113b = $.cookie_list.filter(_0x47e609 => _0x47e609.logs == true);
          if (_0x53113b.length == 0) {
            console.log("Cookie格式错误 或 账号被禁封");
            return;
          } else {
            await $.Multithreading("cxlottery");
            (nowhour == 12 || nowhour == 18 || nowhour == 24) && (await $.Multithreading("openbox"));
            if (nowhour != 0) {
              await $.Multithreading("wzlist");
            }
          }
        } else {
          console.log("账号数量超过限制，请减少账号数量后重试！");
        }
      } else {
        if (_0x59fd37.message == "更新成功") {
          console.log("数据更新成功，请重新运行脚本");
          return;
        } else {
          let _0x1ab131 = require("path"),
            _0x4bf1b = _0x1ab131.basename(__filename);
          console.log("无效卡密，停止运行文件[" + _0x4bf1b + "]");
          return;
        }
      }
    }
  }
  let _0x38af80 = [];
  for (let _0xd7ade9 of $.cookie_list) {
    if (_0xd7ade9.message) {
      _0x38af80.push(_0xd7ade9.message);
    }
  }
  if (_0x38af80.length > 0) {
    await $.SendMsg(_0x38af80.join("\n"));
  }
})().catch(_0x1ed980 => {
  console.log(_0x1ed980);
}).finally(() => {});
function 哇哈哈_0xa518a1() {
  return new class {
    constructor() {
      this.cookie_list = [];
      this.message = "";
      this.CryptoJS = require("crypto-js");
      this.NodeRSA = require("node-rsa");
      this.request = require("request");
      this.Sha_Rsa = require("jsrsasign");
    }
    async ["Multithreading"](_0x3cde65, _0x589a31, _0x8dc9df) {
      let _0x16faca = [];
      !_0x8dc9df && (_0x8dc9df = 1);
      while (_0x8dc9df--) {
        for (let _0x2e57ee of $.cookie_list) {
          _0x16faca.push(_0x2e57ee[_0x3cde65](_0x589a31));
        }
      }
      await Promise.allSettled(_0x16faca);
    }
    ["ExamineCookie"](_0x1671a0) {
      let _0x3e1486 = process.env[VALY] || CK,
        _0x32d071 = 0;
      if (_0x3e1486) {
        for (let _0x1a8b10 of _0x3e1486.split("\n").filter(_0x591df5 => !!_0x591df5)) {
          $.cookie_list.push(new 哇哈哈_0x3906d7(_0x1a8b10));
        }
        _0x32d071 = $.cookie_list.length;
      }
      console.log("共找到" + _0x32d071 + "个账号,本脚本最大可运行ck数量：" + _0x1671a0.xianjin + "个");
      return $.cookie_list;
    }
    ["task"](_0x3497c0, _0x3d7fc4, _0x5b3afb, _0x1902c9, _0x3d88e2) {
      _0x3497c0 == "delete" ? _0x3497c0 = _0x3497c0.toUpperCase() : _0x3497c0 = _0x3497c0;
      if (_0x3497c0 == "post") {
        delete _0x5b3afb["content-type"];
        delete _0x5b3afb["Content-type"];
        delete _0x5b3afb["content-Type"];
        if ($.safeGet(_0x1902c9)) {
          _0x5b3afb["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0x5b3afb["Content-Type"] = "application/x-www-form-urlencoded";
        }
        _0x1902c9 && (_0x5b3afb["Content-Length"] = $.lengthInUtf8Bytes(_0x1902c9));
      }
      _0x3497c0 == "get" && (delete _0x5b3afb["content-type"], delete _0x5b3afb["Content-type"], delete _0x5b3afb["content-Type"], delete _0x5b3afb["Content-Length"]);
      _0x5b3afb.Host = _0x3d7fc4.replace("//", "/").split("/")[1];
      return new Promise(async _0x251059 => {
        if (_0x3497c0.indexOf("T") < 0) {
          var _0x5c0102 = {
            url: _0x3d7fc4,
            headers: _0x5b3afb,
            body: _0x1902c9,
            proxy: "http://" + _0x3d88e2
          };
        } else {
          var _0x5c0102 = {
            url: _0x3d7fc4,
            headers: _0x5b3afb,
            form: JSON.parse(_0x1902c9),
            proxy: "http://" + _0x3d88e2
          };
        }
        !_0x3d88e2 && delete _0x5c0102.proxy;
        this.request[_0x3497c0.toLowerCase()](_0x5c0102, (_0x1d7d3a, _0x41dad1, _0xdaab9) => {
          try {
            if (_0xdaab9) {
              if (LOGS == 1) {
                console.log("================ 请求 ================");
                console.log(_0x5c0102);
                console.log("================ 返回 ================");
                if ($.safeGet(_0xdaab9)) {
                  console.log(JSON.parse(_0xdaab9));
                } else {
                  console.log(_0xdaab9);
                }
              }
            }
          } catch (_0x2d4cc7) {
            console.log(_0x2d4cc7, _0x3d7fc4 + "\n" + _0x5b3afb);
          } finally {
            let _0x568a5c = "";
            if (!_0x1d7d3a) {
              if ($.safeGet(_0xdaab9)) {
                _0x568a5c = JSON.parse(_0xdaab9);
              } else {
                _0xdaab9.indexOf("/") != -1 && _0xdaab9.indexOf("+") != -1 ? _0x568a5c = _0xdaab9 : _0x568a5c = _0xdaab9;
              }
            } else {
              _0x568a5c = _0x3d7fc4 + "   API请求失败，请检查网络重试\n" + _0x1d7d3a;
            }
            return _0x251059(_0x568a5c);
          }
        });
      });
    }
    async ["httpRequest"](_0x136d1a) {
      delete _0x136d1a.fn;
      var _0x35a9ea = require("request");
      return new Promise(_0x46c564 => {
        _0x35a9ea(_0x136d1a, function (_0x2c8a6f, _0x2e5504) {
          if (_0x2c8a6f) {
            throw new Error(_0x2c8a6f);
          }
          let _0x77c6b7 = _0x2e5504.body;
          _0x46c564(_0x77c6b7);
        });
      });
    }
    ["generateOutput"](_0x3f9ec2) {
      let _0x37c34b = _0x3f9ec2.split("&"),
        _0x12de26 = _0x37c34b.map(_0x2e3bd7 => _0x2e3bd7.split("=")[1]);
      _0x12de26.sort((_0x4aee31, _0x39471c) => {
        if (_0x4aee31 < _0x39471c) {
          return 1;
        }
        if (_0x4aee31 > _0x39471c) {
          return -1;
        }
        return 0;
      });
      let _0x51427a = _0x12de26.join(""),
        _0x3b36f9 = _0x12de26.slice();
      _0x3b36f9.sort((_0x3b6fe4, _0x19f17a) => {
        let _0xde739 = parseInt(_0x3b6fe4.replace(/\D/g, "")),
          _0x2b6f3b = parseInt(_0x19f17a.replace(/\D/g, ""));
        if (_0xde739 < _0x2b6f3b) {
          return 1;
        }
        if (_0xde739 > _0x2b6f3b) {
          return -1;
        }
        return 0;
      });
      let _0x490603 = _0x51427a;
      return _0x490603;
    }
    ["extractLotteryId"](_0x1bca52) {
      const _0x2ca47d = /id=([a-zA-Z0-9]+)/,
        _0x275d4d = _0x1bca52.match(_0x2ca47d);
      return _0x275d4d ? _0x275d4d[1] : null;
    }
    async ["SendMsg"](_0x27918b) {
      if (!_0x27918b) {
        return;
      }
      if (Notify == 1) {
        var _0x43d225 = require("./sendNotify");
        await _0x43d225.sendNotify(NAME, _0x27918b);
      }
    }
    async ["readUUID"]() {
      const _0x1d73f1 = "uuid.txt";
      await $.generateUUID(_0x1d73f1);
      try {
        const _0x102767 = 哇哈哈_0x25dbfc.readFileSync(_0x1d73f1, "utf8"),
          _0xf2ed18 = _0x102767.trim();
        return _0xf2ed18;
      } catch (_0x22266d) {
        return null;
      }
    }
    ["generateUUID"](_0x828d87) {
      if (哇哈哈_0x25dbfc.existsSync(_0x828d87)) {
        return;
      }
      const _0x4b68b0 = 哇哈哈_0x2b98cd();
      哇哈哈_0x25dbfc.writeFile(_0x828d87, _0x4b68b0, "utf8", _0x2e5545 => {
        if (_0x2e5545) {
          console.error("写入文件出错: " + _0x2e5545.message);
          return;
        }
      });
    }
    async ["getkami"]() {
      let _0x25f54d = await $.readUUID();
      await $.getCurrentIP();
      await $.getIPCITY();
      let _0x57fd14 = await $.task("get", "http://" + DCFHOST + "/querys?DCFKEY=" + dcfkey + "&MAC=" + _0x25f54d + "&JSHOST=" + IP + "&JSCITY=" + IPCITY, {});
      return _0x57fd14;
    }
    async ["getIPCITY"]() {
      let _0x560a9d = await $.task("get", "http://ip-api.com/json/" + IP + "?lang=zh-CN", {}),
        _0x4fb9da = _0x560a9d.regionName + _0x560a9d.city;
      IPCITY = encodeURIComponent(_0x4fb9da);
    }
    async ["getCurrentIP"]() {
      let _0x25bca0 = await $.task("get", "https://httpbin.org/ip", {});
      IP = _0x25bca0.origin;
    }
    ["lengthInUtf8Bytes"](_0x73510) {
      let _0x470cfe = encodeURIComponent(_0x73510).match(/%[89ABab]/g);
      return _0x73510.length + (_0x470cfe ? _0x470cfe.length : 0);
    }
    ["randomArr"](_0x3d7d84) {
      return _0x3d7d84[parseInt(Math.random() * _0x3d7d84.length, 10)];
    }
    ["wait"](_0x39bd16) {
      return new Promise(_0xe5443b => setTimeout(_0xe5443b, _0x39bd16));
    }
    ["time"](_0x1792cc) {
      return _0x1792cc == 10 ? Math.round(+new Date() / 1000) : +new Date();
    }
    ["timenow"]() {
      const _0xdc5442 = new Date(),
        _0x3a0e29 = _0xdc5442.getFullYear(),
        _0x139a60 = String(_0xdc5442.getMonth() + 1).padStart(2, "0"),
        _0x40bbbd = String(_0xdc5442.getDate()).padStart(2, "0"),
        _0x2987e5 = _0x3a0e29 + "-" + _0x139a60 + "-" + _0x40bbbd;
      return _0x2987e5;
    }
    ["safeGet"](_0x615a09) {
      try {
        if (typeof JSON.parse(_0x615a09) == "object") {
          return true;
        }
      } catch (_0x389529) {
        return false;
      }
    }
    ["SJS"](_0x2593bf, _0x4835c4) {
      if (_0x4835c4 == 0) {
        let _0x145094 = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
          _0x343225 = _0x145094.length,
          _0x2716c1 = "";
        for (let _0x404fa8 = 0; _0x404fa8 < _0x2593bf; _0x404fa8++) {
          _0x2716c1 += _0x145094.charAt(Math.floor(Math.random() * _0x343225));
        }
        return _0x2716c1;
      } else {
        if (_0x4835c4 == 1) {
          let _0x4a4b86 = "qwertyuiopasdfghjklzxcvbnm0123456789",
            _0x5a15cc = _0x4a4b86.length,
            _0x526496 = "";
          for (let _0x18210b = 0; _0x18210b < _0x2593bf; _0x18210b++) {
            _0x526496 += _0x4a4b86.charAt(Math.floor(Math.random() * _0x5a15cc));
          }
          return _0x526496;
        } else {
          if (!("TqLrf" === "HRQvG")) {
            let _0x4824db = "0123456789",
              _0x338fd5 = _0x4824db.length,
              _0x20c168 = "";
            for (let _0x9ea058 = 0; _0x9ea058 < _0x2593bf; _0x9ea058++) {
              _0x20c168 += _0x4824db.charAt(Math.floor(Math.random() * _0x338fd5));
            }
            return _0x20c168;
          }
        }
      }
    }
    ["encodeUnicode"](_0x397c23) {
      var _0xb1ed71 = [];
      for (var _0x4de58e = 0; _0x4de58e < _0x397c23.length; _0x4de58e++) {
        _0xb1ed71[_0x4de58e] = ("00" + _0x397c23.charCodeAt(_0x4de58e).toString(16)).slice(-4);
      }
      return "\\u" + _0xb1ed71.join("\\u");
    }
    ["base64ToHex"](_0x14eeb4) {
      const _0xb44dfa = atob(_0x14eeb4),
        _0x3439a1 = new Uint8Array(_0xb44dfa.length);
      for (let _0x3a2461 = 0; _0x3a2461 < _0xb44dfa.length; _0x3a2461++) {
        _0x3439a1[_0x3a2461] = _0xb44dfa.charCodeAt(_0x3a2461);
      }
      let _0x4fcd8d = "";
      for (let _0x42e862 = 0; _0x42e862 < _0x3439a1.length; _0x42e862++) {
        const _0x2f63fc = _0x3439a1[_0x42e862].toString(16).padStart(2, "0");
        _0x4fcd8d += _0x2f63fc;
      }
      return _0x4fcd8d;
    }
    ["decodeUnicode"](_0x55d3ea) {
      _0x55d3ea = _0x55d3ea.replace(/\\u/g, "%u");
      return unescape(unescape(_0x55d3ea));
    }
    RT(_0x1f3449, _0x47b0e7) {
      return Math.round(Math.random() * (_0x47b0e7 - _0x1f3449) + _0x1f3449);
    }
    ["arrNull"](_0x6d3cf1) {
      var _0x174201 = _0x6d3cf1.filter(_0x16aa71 => {
        return _0x16aa71 && _0x16aa71.trim();
      });
      return _0x174201;
    }
    ["nowtime"]() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
    }
    ["timecs"]() {
      let _0x5d55e4 = $.nowtime();
      if (JSON.stringify(_0x5d55e4).indexOf(" ") >= 0) {
        _0x5d55e4 = _0x5d55e4.replace(" ", "T");
      }
      return new Date(_0x5d55e4).getTime() - 8 * 60 * 60 * 1000;
    }
    ["rtjson"](_0x445962, _0xca5773, _0x3e793c, _0x14af75) {
      return _0x14af75 == 0 ? JSON.stringify(_0x445962.split(_0xca5773).reduce((_0x9c17d4, _0x3acdc8) => {
        let _0xcda882 = _0x3acdc8.split(_0x3e793c);
        _0x9c17d4[_0xcda882[0].trim()] = _0xcda882[1].trim();
        return _0x9c17d4;
      }, {})) : _0x445962.split(_0xca5773).reduce((_0x3ea8da, _0x1d3e72) => {
        let _0x37c04f = _0x1d3e72.split(_0x3e793c);
        _0x3ea8da[_0x37c04f[0].trim()] = _0x37c04f[1].trim();
        return _0x3ea8da;
      }, {});
    }
    ["MD5Encrypt"](_0x287fd7, _0xbb70a4) {
      if (_0x287fd7 == 0) {
        return this.CryptoJS.MD5(_0xbb70a4).toString().toLowerCase();
      } else {
        if (_0x287fd7 == 1) {
          return this.CryptoJS.MD5(_0xbb70a4).toString().toUpperCase();
        } else {
          if (_0x287fd7 == 2) {
            return this.CryptoJS.MD5(_0xbb70a4).toString().substring(8, 24).toLowerCase();
          } else {
            if (_0x287fd7 == 3) {
              return this.CryptoJS.MD5(_0xbb70a4).toString().substring(8, 24).toUpperCase();
            }
          }
        }
      }
    }
    ["SHA_Encrypt"](_0x3e797b, _0x5b617f, _0x2cf153) {
      return _0x3e797b == 0 ? this.CryptoJS[_0x5b617f](_0x2cf153).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x5b617f](_0x2cf153).toString();
    }
    ["HmacSHA_Encrypt"](_0xc79ef0, _0x448853, _0x15d381, _0x50a64c) {
      if (_0xc79ef0 == 0) {
        return this.CryptoJS[_0x448853](_0x15d381, _0x50a64c).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x448853](_0x15d381, _0x50a64c).toString();
      }
    }
    ["Base64"](_0x4a1d33, _0x52e1ac) {
      return _0x4a1d33 == 0 ? this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x52e1ac)) : this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x52e1ac));
    }
    ["DecryptCrypto"](_0x17ebd2, _0x12cd45, _0x32932c, _0x342d93, _0x2aa320, _0x30d5ef, _0x2aba4e) {
      if (_0x17ebd2 == 0) {
        const _0x49926a = this.CryptoJS[_0x12cd45].encrypt(this.CryptoJS.enc.Utf8.parse(_0x2aa320), this.CryptoJS.enc.Utf8.parse(_0x30d5ef), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x2aba4e),
          mode: this.CryptoJS.mode[_0x32932c],
          padding: this.CryptoJS.pad[_0x342d93]
        });
        return _0x49926a.toString();
      } else {
        const _0x5b01a8 = this.CryptoJS[_0x12cd45].decrypt(_0x2aa320, this.CryptoJS.enc.Utf8.parse(_0x30d5ef), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x2aba4e),
          mode: this.CryptoJS.mode[_0x32932c],
          padding: this.CryptoJS.pad[_0x342d93]
        });
        return _0x5b01a8.toString(this.CryptoJS.enc.Utf8);
      }
    }
    ["RSA"](_0x321c60, _0x559493) {
      const _0x2f2ac5 = require("node-rsa");
      let _0x1388be = new _0x2f2ac5("-----BEGIN PUBLIC KEY-----\n" + _0x559493 + "\n-----END PUBLIC KEY-----");
      _0x1388be.setOptions({
        encryptionScheme: "pkcs1"
      });
      return _0x1388be.encrypt(_0x321c60, "base64", "utf8");
    }
    ["getSHA1withRSA"](_0x2af650) {
      const _0xdb4758 = rs.KEYUTIL.getKey(privateKeyString),
        _0x1d9e5c = new rs.KJUR.crypto.Signature({
          alg: "SHA1withRSA"
        });
      _0x1d9e5c.init(_0xdb4758);
      _0x1d9e5c.updateString(_0x2af650);
      const _0x336ab4 = _0x1d9e5c.sign(),
        _0x4e5fd5 = rs.hextob64u(_0x336ab4);
      return _0x4e5fd5;
    }
    ["hexToBase64"](_0x13ff80) {
      const _0x571a9a = [];
      for (let _0x282a8e = 0; _0x282a8e < _0x13ff80.length; _0x282a8e += 2) {
        _0x571a9a.push(parseInt(_0x13ff80.substr(_0x282a8e, 2), 16));
      }
      const _0x48f3a4 = btoa(String.fromCharCode(..._0x571a9a));
      return _0x48f3a4;
    }
    ["Sha1withRsa"](_0x16d6cd) {
      const {
          KEYUTIL: _0x4c3c7b,
          KJUR: _0x49831d,
          b64utoutf8: _0x1756b1,
          utf8tob64: _0xdad9de
        } = require("jsrsasign"),
        _0x39ee74 = _0x4c3c7b.getKey(Key),
        _0x5b6c21 = new _0x49831d.crypto.Signature({
          alg: "SHA1withRSA"
        });
      _0x5b6c21.init(_0x39ee74);
      _0x5b6c21.updateString(_0x16d6cd);
      const _0x3bf165 = _0x5b6c21.sign();
      let _0x446ece = $.hexToBase64(_0x3bf165);
      return _0x446ece;
    }
  }();
}