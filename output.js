//Sat May 17 2025 08:00:03 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
NAME = "上海长宁";
VALY = ["shcnck"];
LOGS = 0;
CK = "";
var 蛋炒饭_0x4bef37 = [];
usid = 0;
const 蛋炒饭_0x405a09 = require("fs"),
  {
    v4: 蛋炒饭_0x598d87
  } = require("uuid");
DCFHOST = process.env.DCFHOST;
dcfkey = encodeURIComponent(process.env.dcfkey);
IP = "";
IPCITY = "";
class 蛋炒饭_0x1bc893 {
  constructor(_0x25cb37) {
    this.o = _0x25cb37;
  }
  async ["user"]() {
    const _0x171d50 = {
      "log-header": "I am the log request header.",
      token: this.o
    };
    let _0x9c4e47 = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/personal/get", _0x171d50);
    this.name = _0x9c4e47.data.nickname;
    console.log("用户名：【" + this.name + "】==>现有积分：" + _0x9c4e47.data.score);
  }
  async ["list"]() {
    const _0x26c0c0 = {
      "log-header": "I am the log request header.",
      token: this.o
    };
    let _0x126324 = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/personal/score/info", _0x26c0c0),
      _0x4a208b = _0x126324.data.jobs,
      _0x4aab41 = _0x4a208b[7].progress,
      _0x2b08c4 = _0x4a208b[7].totalProgress,
      _0x5e7517 = _0x4a208b[2].progress,
      _0x3ce9f7 = _0x4a208b[2].totalProgress,
      _0x3e3c3c = _0x4a208b[3].progress,
      _0xdb6875 = _0x4a208b[3].totalProgress,
      _0x52b634 = _0x4a208b[5].progress,
      _0x14d7c2 = _0x4a208b[5].totalProgress,
      _0x124c54 = _0x4a208b[6].progress,
      _0x5a6293 = _0x4a208b[6].totalProgress;
    if (_0x126324.data.jobs) {
      if (_0x4a208b[1].status == 0) {
        await this.signin();
      } else {
        console.log("【" + this.name + "】签到任务已完成，请勿重复运行脚本");
      }
      if (_0x4a208b[2].status == 0) {
        for (let _0x330ee0 = _0x5e7517; _0x330ee0 < _0x3ce9f7; _0x330ee0++) {
          await this.read();
        }
      } else {
        console.log("【" + this.name + "】阅读任务已完成，请勿重复运行脚本");
      }
      if (_0x4a208b[3].status == 0) {
        for (let _0xa40b46 = _0x3e3c3c; _0xa40b46 < _0xdb6875; _0xa40b46++) {
          await this.video();
        }
      } else {
        console.log("【" + this.name + "】视频任务已完成，请勿重复运行脚本");
      }
      if (_0x4a208b[5].status == 0) {
        for (let _0x43ae55 = _0x52b634; _0x43ae55 < _0x14d7c2; _0x43ae55++) {
          await this.favor();
        }
      } else {
        console.log("【" + this.name + "】收藏任务已完成，请勿重复运行脚本");
      }
      if (_0x4a208b[6].status == 0) {
        for (let _0x2f6618 = _0x124c54; _0x2f6618 < _0x5a6293; _0x2f6618++) {
          await this.comment();
        }
      } else {
        console.log("【" + this.name + "】评论任务已完成，请勿重复运行脚本");
      }
      if (_0x4a208b[7].status == 0) {
        for (let _0x385987 = _0x4aab41; _0x385987 < _0x2b08c4; _0x385987++) {
          await this.share();
        }
      } else {
        console.log("【" + this.name + "】分享任务已完成，请勿重复运行脚本");
      }
    } else {
      console.log("【" + this.name + "】未找到任务列表，请检查变量是否正确");
    }
  }
  async ["readlist"]() {
    const _0x17bb86 = {
      "log-header": "I am the log request header.",
      token: this.o
    };
    let _0x5a8ab5 = "{\"channel\":{\"id\":\"fc83f7ef2a6f4c9d826cba3702adcc78\"},\"pageNo\":" + 蛋炒饭_0x310e07(1, 212) + ",\"pageSize\":20,\"orderBy\":\"release_desc\",\"requestType\":\"1\",\"siteId\":\"310105\"}",
      _0x255930 = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/news/content/list", _0x17bb86, _0x5a8ab5);
    this.bb = _0x255930.data.records;
  }
  async ["read"]() {
    const _0x1939f8 = {
      token: this.o
    };
    let _0x541acc = "{}",
      _0x1e7315 = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/points/read/add", _0x1939f8, _0x541acc);
    _0x1e7315.code == 0 ? (console.log("【" + this.name + "】阅读 成功"), await 蛋炒饭_0x1113c1(15000)) : (console.log("【" + this.name + "】阅读 " + _0x1e7315.msg), await 蛋炒饭_0x1113c1(5000));
  }
  async ["video"]() {
    const _0xe63a91 = {
      token: this.o
    };
    let _0x45dd7e = "{}",
      _0x31e7cc = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/points/video/add", _0xe63a91, _0x45dd7e);
    if (_0x31e7cc.code == 0) {
      console.log("【" + this.name + "】看视频 成功");
      await 蛋炒饭_0x1113c1(15000);
    } else {
      console.log("【" + this.name + "】看视频 " + _0x31e7cc.msg);
      await 蛋炒饭_0x1113c1(5000);
    }
  }
  async ["share"]() {
    const _0x2b0bbb = {
      token: this.o
    };
    let _0x129b25 = "{}",
      _0x2ddb9e = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/points/share/add", _0x2b0bbb, _0x129b25);
    _0x2ddb9e.code == 0 ? (console.log("【" + this.name + "】分享文章 成功"), await 蛋炒饭_0x1113c1(15000)) : (console.log("【" + this.name + "】分享文章 " + _0x2ddb9e.msg), await 蛋炒饭_0x1113c1(5000));
  }
  async ["favor"]() {
    let _0x1f2c9c = this.bb[蛋炒饭_0x310e07(0, 19)].id,
      _0x250b5f = this.bb[蛋炒饭_0x310e07(0, 19)].title,
      _0x411b52 = {
        "log-header": "I am the log request header.",
        token: this.o
      },
      _0x50628b = "{\"liveStatus\":\"\",\"topLevel\":0,\"id\":\"" + _0x1f2c9c + "\"}",
      _0x1c5955 = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/news/content/favor", _0x411b52, _0x50628b);
    _0x1c5955.code == 0 ? (console.log("【" + this.name + "】收藏【" + _0x250b5f + "】成功"), await 蛋炒饭_0x1113c1(5000)) : (console.log("【" + this.name + "】收藏 " + _0x1c5955.msg), await 蛋炒饭_0x1113c1(5000));
  }
  async ["comment"]() {
    let _0x57311e = this.bb[蛋炒饭_0x310e07(0, 19)].id,
      _0x2d806f = this.bb[蛋炒饭_0x310e07(0, 19)].title,
      _0x3f1af6 = {
        "log-header": "I am the log request header.",
        token: this.o
      },
      _0x4bb1ed = "{\"content\":\"每天看长宁新闻，每次都有新知识，继续加油哦" + (1 + 蛋炒饭_0x310e07(56, 7463829)) + "\",\"displayResources\":[],\"targetId\":\"" + _0x57311e + "\",\"targetType\":\"content\"}",
      _0x9a1a10 = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/common/comment/add", _0x3f1af6, _0x4bb1ed);
    _0x9a1a10.code == 0 ? (console.log("【" + this.name + "】评论【" + _0x2d806f + "】成功"), await 蛋炒饭_0x1113c1(30000)) : (console.log("【" + this.name + "】评论 " + _0x9a1a10.msg), await 蛋炒饭_0x1113c1(5000));
  }
  async ["signin"]() {
    const _0x5f158f = {
      "log-header": "I am the log request header.",
      token: this.o
    };
    let _0x2e7cea = "{}",
      _0x3272a4 = await 蛋炒饭_0x32b176("post", "https://cnapi.shmedia.tech/media-basic-port/api/app/personal/score/sign", _0x5f158f, _0x2e7cea);
    _0x3272a4.code == 0 ? (console.log("【" + this.name + "】 签到 成功"), await 蛋炒饭_0x1113c1(5000)) : (console.log("【" + this.name + "】签到 " + _0x3272a4.msg), await 蛋炒饭_0x1113c1(5000));
  }
}
!(async () => {
  console.log("正在运行脚本：【" + NAME + "】V1.03");
  console.log("📢 请认真阅读以下声明\n 【免责声明】   \n📌 脚本文件仅用于测试和学习研究   \n📌 脚本文件任何人不得用于商业以及非法用途   \n📌 禁止任何公众号、自媒体进行任何形式的转发   \n📌 脚本文件请在下载试用后24小时内自行删除   \n📌 因使用脚本造成软件平台的一切损失皆由使用者承担   \n📌 脚本文件如有不慎被破解或修改由破解或修改者承担   \n📌 如不接受此条款请立即删除脚本文件");
  let _0x4f76c8 = await 蛋炒饭_0x2da9a3(),
    _0xe819ca = await 蛋炒饭_0x3fc86c();
  if (_0x4f76c8.dcfkey) {
    _0x4f76c8.Notify != "" && console.log(_0x4f76c8.Notify);
    TSdata = 蛋炒饭_0x36105e();
    if (_0x4f76c8.MAC == null) {
      console.log("请提交正确的MAC地址后再运行脚本！");
      return;
    } else {
      if (_0x4f76c8.MAC != null) {
        if (_0x4f76c8.MAC != _0xe819ca) {
          let _0x1935e8 = require("path"),
            _0x38153a = _0x1935e8.basename(__filename);
          console.log("本次MAC地址与数据库记录不匹配，停止运行文件[" + _0x38153a + "]");
          return;
        }
      }
    }
    if (_0x4f76c8.Delete == 1) {
      let _0x339a02 = require("path"),
        _0xe778fd = _0x339a02.basename(__filename);
      console.log("关闭服务器跑路啦，帮你删除脚本文件[" + _0xe778fd + "]");
      蛋炒饭_0x405a09.unlink(_0xe778fd, _0x2a7980 => {});
      return;
    }
    if (TSdata <= _0x4f76c8.Data) {
      console.log("尊贵的" + _0x4f76c8.UserName + "小主,您的卡密有效期到：" + _0x4f76c8.DataTime);
    } else {
      let _0x70ec8b = require("path"),
        _0x42850b = _0x70ec8b.basename(__filename);
      console.log("卡密已过期，帮你删除脚本文件[" + _0x42850b + "]");
      蛋炒饭_0x405a09.unlink(_0x42850b, _0x4c1e66 => {});
      return;
    }
    蛋炒饭_0x36bcd4();
    for (let _0xf26b08 of 蛋炒饭_0x4bef37) {
      await _0xf26b08.user();
      await _0xf26b08.readlist();
      await _0xf26b08.list();
    }
  } else {
    if (_0x4f76c8.message == "更新成功") {
      console.log("数据更新成功，请重新运行脚本");
      return;
    } else {
      let _0x1d911d = require("path"),
        _0x3378e4 = _0x1d911d.basename(__filename);
      console.log("无效卡密，停止运行文件[" + _0x3378e4 + "]");
      return;
    }
  }
})().catch(_0x197f5e => {
  console.log(_0x197f5e);
}).finally(() => {});
function 蛋炒饭_0x310e07(_0x1ec710, _0x3f2efd) {
  return Math.round(Math.random() * (_0x3f2efd - _0x1ec710) + _0x1ec710);
}
function 蛋炒饭_0x42904b(_0x480585) {
  if (_0x480585 == 10) {
    let _0x14304a = Math.round(new Date().getTime() / 1000).toString();
    return _0x14304a;
  } else {
    let _0x3eda18 = new Date().getTime();
    return _0x3eda18;
  }
}
async function 蛋炒饭_0x32b176(_0x5462ab, _0x3d7170, _0x84e6c3, _0x554451) {
  if (_0x5462ab == "delete") {
    _0x5462ab = _0x5462ab.toUpperCase();
  } else {
    _0x5462ab = _0x5462ab;
  }
  const _0x42220a = require("request");
  if (_0x5462ab == "post") {
    delete _0x84e6c3["content-type"];
    delete _0x84e6c3["Content-type"];
    delete _0x84e6c3["content-Type"];
    if (蛋炒饭_0x3275d0(_0x554451)) {
      _0x84e6c3["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      _0x84e6c3["Content-Type"] = "application/x-www-form-urlencoded";
    }
    _0x554451 && (_0x84e6c3["Content-Length"] = 蛋炒饭_0x4a9d39(_0x554451));
  }
  _0x84e6c3.Host = _0x3d7170.replace("//", "/").split("/")[1];
  const _0x1dbbeb = {
    url: _0x3d7170,
    headers: _0x84e6c3,
    body: _0x554451
  };
  if (_0x5462ab.indexOf("T") < 0) {
    var _0x33612b = _0x1dbbeb;
  } else {
    var _0x33612b = {
      url: _0x3d7170,
      headers: _0x84e6c3,
      form: JSON.parse(_0x554451)
    };
  }
  return new Promise(async _0x353d39 => {
    _0x42220a[_0x5462ab.toLowerCase()](_0x33612b, (_0x178621, _0x9f838f, _0x5a031c) => {
      try {
        LOGS == 1 && (console.log("==================请求=================="), console.log(_0x33612b), console.log("==================返回=================="), console.log(JSON.parse(_0x5a031c)));
      } catch (_0x1811a0) {} finally {
        !_0x178621 ? 蛋炒饭_0x3275d0(_0x5a031c) ? _0x5a031c = JSON.parse(_0x5a031c) : _0x5a031c = _0x5a031c : _0x5a031c = _0x3d7170 + "   API请求失败，请检查网络重试\n" + _0x178621;
        return _0x353d39(_0x5a031c);
      }
    });
  });
}
function 蛋炒饭_0x5d4062(_0x17d932) {
  _0x17d932 = _0x17d932 || 32;
  var _0xd612e2 = "1234567890",
    _0x259754 = _0xd612e2.length,
    _0x36c0d1 = "";
  for (i = 0; i < _0x17d932; i++) {
    _0x36c0d1 += _0xd612e2.charAt(Math.floor(Math.random() * _0x259754));
  }
  return _0x36c0d1;
}
function 蛋炒饭_0x1e6ded(_0x234a33) {
  _0x234a33 = _0x234a33 || 32;
  var _0x5b4b5b = "abcdefghijklmnopqrstuvwxyz1234567890",
    _0xd404f9 = _0x5b4b5b.length,
    _0x164083 = "";
  for (i = 0; i < _0x234a33; i++) {
    _0x164083 += _0x5b4b5b.charAt(Math.floor(Math.random() * _0xd404f9));
  }
  return _0x164083;
}
function 蛋炒饭_0x3275d0(_0x4718dc) {
  try {
    if (typeof JSON.parse(_0x4718dc) == "object") {
      return true;
    }
  } catch (_0xff595f) {
    return false;
  }
}
async function 蛋炒饭_0x3fc86c() {
  const _0x5449ec = "uuid.txt";
  await 蛋炒饭_0x45001c(_0x5449ec);
  try {
    const _0x100117 = 蛋炒饭_0x405a09.readFileSync(_0x5449ec, "utf8"),
      _0x2deae3 = _0x100117.trim();
    return _0x2deae3;
  } catch (_0x357dfe) {
    return null;
  }
}
async function 蛋炒饭_0x45001c(_0x1737f3) {
  if (蛋炒饭_0x405a09.existsSync(_0x1737f3)) {
    return;
  }
  const _0x4405b5 = 蛋炒饭_0x598d87();
  蛋炒饭_0x405a09.writeFile(_0x1737f3, _0x4405b5, "utf8", _0x487a41 => {
    if (_0x487a41) {
      console.error("写入文件出错: " + _0x487a41.message);
      return;
    }
  });
}
async function 蛋炒饭_0x2da9a3() {
  let _0x26f31a = await 蛋炒饭_0x3fc86c();
  await 蛋炒饭_0x2e4542();
  await 蛋炒饭_0x10455c();
  let _0x2bd32e = await 蛋炒饭_0x32b176("get", "http://" + DCFHOST + "/querys?DCFKEY=" + dcfkey + "&MAC=" + _0x26f31a + "&JSHOST=" + IP + "&JSCITY=" + IPCITY, {});
  return _0x2bd32e;
}
async function 蛋炒饭_0x10455c() {
  let _0x4cbabb = await 蛋炒饭_0x32b176("get", "http://ip-api.com/json/" + IP + "?lang=zh-CN", {}),
    _0x4f104d = _0x4cbabb.regionName + _0x4cbabb.city;
  IPCITY = encodeURIComponent(_0x4f104d);
}
async function 蛋炒饭_0x2e4542() {
  let _0x10f9bf = await 蛋炒饭_0x32b176("get", "https://httpbin.org/ip", {});
  IP = _0x10f9bf.origin;
}
function 蛋炒饭_0x36105e() {
  return Math.round(new Date().getTime()).toString();
}
function 蛋炒饭_0x4a9d39(_0x5f517c) {
  let _0x152efc = encodeURIComponent(_0x5f517c).match(/%[89ABab]/g);
  return _0x5f517c.length + (_0x152efc ? _0x152efc.length : 0);
}
async function 蛋炒饭_0x36bcd4() {
  let _0x216c32 = process.env[VALY] || CK,
    _0x2ec7aa = 0;
  if (_0x216c32) {
    for (let _0x3e1d28 of _0x216c32.split("&").filter(_0x494625 => !!_0x494625)) {
      蛋炒饭_0x4bef37.push(new 蛋炒饭_0x1bc893(_0x3e1d28));
    }
    _0x2ec7aa = 蛋炒饭_0x4bef37.length;
  } else {
    console.log("\n【" + NAME + "】：未填写变量: " + VALY);
  }
  console.log("共找到" + _0x2ec7aa + "个账号");
  return 蛋炒饭_0x4bef37;
}
function 蛋炒饭_0x1113c1(_0x5d8c55) {
  return new Promise(_0x3b0fde => setTimeout(_0x3b0fde, _0x5d8c55));
}
function 蛋炒饭_0x294099(_0x59c9f2) {
  var _0x47a226 = Buffer.from(_0x59c9f2).toString("base64");
  return _0x47a226;
}
function 蛋炒饭_0x10c727(_0x413793, _0x49feec, _0x4268cb, _0x58e252, _0x571efc, _0x6685ef) {
  const _0x4b3d4c = require("crypto-js"),
    _0x1f55ab = _0x4b3d4c.enc.Utf8.parse(_0x58e252),
    _0x5e07bc = _0x4b3d4c.enc.Utf8.parse(_0x6685ef),
    _0x58f2b0 = _0x4b3d4c.enc.Utf8.parse(_0x571efc),
    _0x578ab8 = _0x4b3d4c[_0x413793].encrypt(_0x1f55ab, _0x58f2b0, {
      iv: _0x5e07bc,
      mode: _0x4b3d4c.mode[_0x49feec],
      padding: _0x4b3d4c.pad[_0x4268cb]
    });
  return _0x578ab8.toString();
}
function 蛋炒饭_0x33cb3d(_0x577da3, _0x4b1a37, _0x223612, _0x5cb617, _0x4f0f88, _0x1d11ba) {
  const _0x33e98f = require("crypto-js"),
    _0x583ccd = _0x33e98f.enc.Utf8.parse(_0x1d11ba),
    _0x703489 = _0x33e98f.enc.Utf8.parse(_0x4f0f88),
    _0x3232a2 = _0x33e98f[_0x577da3].decrypt(_0x5cb617, _0x703489, {
      iv: _0x583ccd,
      mode: _0x33e98f.mode[_0x4b1a37],
      padding: _0x33e98f.pad[_0x223612]
    });
  return _0x3232a2.toString(_0x33e98f.enc.Utf8);
}
function 蛋炒饭_0x2cecfd(_0x8669c8, _0x1a0f5b) {
  const _0x1381a8 = require("node-rsa");
  let _0x19e05a = new _0x1381a8("-----BEGIN PUBLIC KEY-----\n" + _0x1a0f5b + "\n-----END PUBLIC KEY-----");
  _0x19e05a.setOptions({
    encryptionScheme: "pkcs1"
  });
  return _0x19e05a.encrypt(_0x8669c8, "base64", "utf8");
}
function 蛋炒饭_0x33f1b9(_0x41a5df) {
  return CryptoJS.SHA1(_0x41a5df).toString();
}
function 蛋炒饭_0x21ba2f(_0x1087eb) {
  const _0x45d97b = 8,
    _0x4af119 = 0;
  function _0x4c53f8(_0x1b4f57, _0x24cfab) {
    const _0x242ffd = (65535 & _0x1b4f57) + (65535 & _0x24cfab);
    return (_0x1b4f57 >> 16) + (_0x24cfab >> 16) + (_0x242ffd >> 16) << 16 | 65535 & _0x242ffd;
  }
  function _0x13a1f9(_0x1bc69f, _0xb0af6f) {
    return _0x1bc69f >>> _0xb0af6f | _0x1bc69f << 32 - _0xb0af6f;
  }
  function _0xd48ac4(_0x1d1a27, _0x5b94ba) {
    return _0x1d1a27 >>> _0x5b94ba;
  }
  function _0x27f659(_0x31c2ca, _0x131d32, _0x58a238) {
    return _0x31c2ca & _0x131d32 ^ ~_0x31c2ca & _0x58a238;
  }
  function _0x47303d(_0x89b8e9, _0x50f79f, _0x4023b0) {
    return _0x89b8e9 & _0x50f79f ^ _0x89b8e9 & _0x4023b0 ^ _0x50f79f & _0x4023b0;
  }
  function _0x5688f1(_0x3eeddb) {
    return _0x13a1f9(_0x3eeddb, 2) ^ _0x13a1f9(_0x3eeddb, 13) ^ _0x13a1f9(_0x3eeddb, 22);
  }
  function _0xda6863(_0xf4fe8) {
    return _0x13a1f9(_0xf4fe8, 6) ^ _0x13a1f9(_0xf4fe8, 11) ^ _0x13a1f9(_0xf4fe8, 25);
  }
  function _0x5ab345(_0x20cb0e) {
    return _0x13a1f9(_0x20cb0e, 7) ^ _0x13a1f9(_0x20cb0e, 18) ^ _0xd48ac4(_0x20cb0e, 3);
  }
  return function (_0xb2186b) {
    const _0x3910ac = _0x4af119 ? "0123456789ABCDEF" : "0123456789abcdef";
    let _0x3c2f8f = "";
    for (let _0x54ce82 = 0; _0x54ce82 < 4 * _0xb2186b.length; _0x54ce82++) {
      _0x3c2f8f += _0x3910ac.charAt(_0xb2186b[_0x54ce82 >> 2] >> 8 * (3 - _0x54ce82 % 4) + 4 & 15) + _0x3910ac.charAt(_0xb2186b[_0x54ce82 >> 2] >> 8 * (3 - _0x54ce82 % 4) & 15);
    }
    return _0x3c2f8f;
  }(function (_0x1f1b08, _0x5e7600) {
    const _0x15f5d1 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
      _0x40772c = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
      _0x1b8ee1 = new Array(64);
    let _0x27aa63, _0x1b0597, _0x50f434, _0x2bbdea, _0xea48c6, _0x404c77, _0x57fb27, _0x3ca04b, _0x228b8a, _0x260b8e, _0x5c9bfc, _0x2a57f7;
    for (_0x1f1b08[_0x5e7600 >> 5] |= 128 << 24 - _0x5e7600 % 32, _0x1f1b08[15 + (_0x5e7600 + 64 >> 9 << 4)] = _0x5e7600, _0x228b8a = 0; _0x228b8a < _0x1f1b08.length; _0x228b8a += 16) {
      for (_0x27aa63 = _0x40772c[0], _0x1b0597 = _0x40772c[1], _0x50f434 = _0x40772c[2], _0x2bbdea = _0x40772c[3], _0xea48c6 = _0x40772c[4], _0x404c77 = _0x40772c[5], _0x57fb27 = _0x40772c[6], _0x3ca04b = _0x40772c[7], _0x260b8e = 0; _0x260b8e < 64; _0x260b8e++) {
        _0x1b8ee1[_0x260b8e] = _0x260b8e < 16 ? _0x1f1b08[_0x260b8e + _0x228b8a] : _0x4c53f8(_0x4c53f8(_0x4c53f8(_0x13a1f9(_0x1c5b11 = _0x1b8ee1[_0x260b8e - 2], 17) ^ _0x13a1f9(_0x1c5b11, 19) ^ _0xd48ac4(_0x1c5b11, 10), _0x1b8ee1[_0x260b8e - 7]), _0x5ab345(_0x1b8ee1[_0x260b8e - 15])), _0x1b8ee1[_0x260b8e - 16]);
        _0x5c9bfc = _0x4c53f8(_0x4c53f8(_0x4c53f8(_0x4c53f8(_0x3ca04b, _0xda6863(_0xea48c6)), _0x27f659(_0xea48c6, _0x404c77, _0x57fb27)), _0x15f5d1[_0x260b8e]), _0x1b8ee1[_0x260b8e]);
        _0x2a57f7 = _0x4c53f8(_0x5688f1(_0x27aa63), _0x47303d(_0x27aa63, _0x1b0597, _0x50f434));
        _0x3ca04b = _0x57fb27;
        _0x57fb27 = _0x404c77;
        _0x404c77 = _0xea48c6;
        _0xea48c6 = _0x4c53f8(_0x2bbdea, _0x5c9bfc);
        _0x2bbdea = _0x50f434;
        _0x50f434 = _0x1b0597;
        _0x1b0597 = _0x27aa63;
        _0x27aa63 = _0x4c53f8(_0x5c9bfc, _0x2a57f7);
      }
      _0x40772c[0] = _0x4c53f8(_0x27aa63, _0x40772c[0]);
      _0x40772c[1] = _0x4c53f8(_0x1b0597, _0x40772c[1]);
      _0x40772c[2] = _0x4c53f8(_0x50f434, _0x40772c[2]);
      _0x40772c[3] = _0x4c53f8(_0x2bbdea, _0x40772c[3]);
      _0x40772c[4] = _0x4c53f8(_0xea48c6, _0x40772c[4]);
      _0x40772c[5] = _0x4c53f8(_0x404c77, _0x40772c[5]);
      _0x40772c[6] = _0x4c53f8(_0x57fb27, _0x40772c[6]);
      _0x40772c[7] = _0x4c53f8(_0x3ca04b, _0x40772c[7]);
    }
    var _0x1c5b11;
    return _0x40772c;
  }(function (_0x14a1ab) {
    const _0x59202e = [],
      _0x2319fb = (1 << _0x45d97b) - 1;
    for (let _0x5e0017 = 0; _0x5e0017 < _0x14a1ab.length * _0x45d97b; _0x5e0017 += _0x45d97b) {
      _0x59202e[_0x5e0017 >> 5] |= (_0x14a1ab.charCodeAt(_0x5e0017 / _0x45d97b) & _0x2319fb) << 24 - _0x5e0017 % 32;
    }
    return _0x59202e;
  }(_0x1087eb = function (_0x296166) {
    _0x296166 = _0x296166.replace(/\r\n/g, "\n");
    let _0x4e441c = "";
    for (let _0x46a94b = 0; _0x46a94b < _0x296166.length; _0x46a94b++) {
      const _0x465213 = _0x296166.charCodeAt(_0x46a94b);
      _0x465213 < 128 ? _0x4e441c += String.fromCharCode(_0x465213) : _0x465213 > 127 && _0x465213 < 2048 ? (_0x4e441c += String.fromCharCode(_0x465213 >> 6 | 192), _0x4e441c += String.fromCharCode(63 & _0x465213 | 128)) : (_0x4e441c += String.fromCharCode(_0x465213 >> 12 | 224), _0x4e441c += String.fromCharCode(_0x465213 >> 6 & 63 | 128), _0x4e441c += String.fromCharCode(63 & _0x465213 | 128));
    }
    return _0x4e441c;
  }(_0x1087eb)), _0x1087eb.length * _0x45d97b));
}
function 蛋炒饭_0x54b3e5(_0x2d0622) {
  function _0x3ec92b(_0x3521d6, _0x4dc833) {
    return _0x3521d6 << _0x4dc833 | _0x3521d6 >>> 32 - _0x4dc833;
  }
  function _0x4e3e27(_0x3a2c81, _0x1a7918) {
    var _0x925323, _0x2d678d, _0x46a00b, _0x554437, _0x2fa300;
    _0x46a00b = 2147483648 & _0x3a2c81;
    _0x554437 = 2147483648 & _0x1a7918;
    _0x925323 = 1073741824 & _0x3a2c81;
    _0x2d678d = 1073741824 & _0x1a7918;
    _0x2fa300 = (1073741823 & _0x3a2c81) + (1073741823 & _0x1a7918);
    return _0x925323 & _0x2d678d ? 2147483648 ^ _0x2fa300 ^ _0x46a00b ^ _0x554437 : _0x925323 | _0x2d678d ? 1073741824 & _0x2fa300 ? 3221225472 ^ _0x2fa300 ^ _0x46a00b ^ _0x554437 : 1073741824 ^ _0x2fa300 ^ _0x46a00b ^ _0x554437 : _0x2fa300 ^ _0x46a00b ^ _0x554437;
  }
  function _0x35e377(_0x476e15, _0x2a406c, _0x7e586b, _0x43066e, _0x784f23, _0x24e28d, _0x25eceb) {
    var _0x1e7ef5, _0x356947;
    _0x476e15 = _0x4e3e27(_0x476e15, _0x4e3e27(_0x4e3e27((_0x1e7ef5 = _0x2a406c) & (_0x356947 = _0x7e586b) | ~_0x1e7ef5 & _0x43066e, _0x784f23), _0x25eceb));
    return _0x4e3e27(_0x3ec92b(_0x476e15, _0x24e28d), _0x2a406c);
  }
  function _0x335f30(_0x362f63, _0x1beeae, _0x482abe, _0x4d11c5, _0x529ec8, _0x2eac3c, _0x3cb468) {
    var _0x553712, _0xd85811, _0x2c3f01;
    _0x362f63 = _0x4e3e27(_0x362f63, _0x4e3e27(_0x4e3e27((_0x553712 = _0x1beeae, _0xd85811 = _0x482abe, _0x553712 & (_0x2c3f01 = _0x4d11c5) | _0xd85811 & ~_0x2c3f01), _0x529ec8), _0x3cb468));
    return _0x4e3e27(_0x3ec92b(_0x362f63, _0x2eac3c), _0x1beeae);
  }
  function _0x5573fa(_0x4fffb0, _0x5e222f, _0x2b6bc3, _0x4f873c, _0x5eacf5, _0x439b10, _0x830114) {
    var _0x49f46e, _0x3dbba4;
    _0x4fffb0 = _0x4e3e27(_0x4fffb0, _0x4e3e27(_0x4e3e27((_0x49f46e = _0x5e222f) ^ (_0x3dbba4 = _0x2b6bc3) ^ _0x4f873c, _0x5eacf5), _0x830114));
    return _0x4e3e27(_0x3ec92b(_0x4fffb0, _0x439b10), _0x5e222f);
  }
  function _0x26689a(_0x4ed4b3, _0x4bb85a, _0x1d302a, _0x3b1020, _0xcbd08d, _0x4fd3f4, _0x5b0174) {
    var _0x2abeed, _0x722a3;
    _0x4ed4b3 = _0x4e3e27(_0x4ed4b3, _0x4e3e27(_0x4e3e27((_0x2abeed = _0x4bb85a, (_0x722a3 = _0x1d302a) ^ (_0x2abeed | ~_0x3b1020)), _0xcbd08d), _0x5b0174));
    return _0x4e3e27(_0x3ec92b(_0x4ed4b3, _0x4fd3f4), _0x4bb85a);
  }
  function _0x4624b9(_0x5b0a38) {
    var _0x170092,
      _0xbd5815 = "",
      _0x3f20a2 = "";
    for (_0x170092 = 0; 3 >= _0x170092; _0x170092++) {
      _0xbd5815 += (_0x3f20a2 = "0" + (_0x5b0a38 >>> 8 * _0x170092 & 255).toString(16)).substr(_0x3f20a2.length - 2, 2);
    }
    return _0xbd5815;
  }
  var _0x3707d7,
    _0x3e5f03,
    _0x4e5c22,
    _0x95ac4f,
    _0x5be059,
    _0x562550,
    _0x3e9af6,
    _0x505981,
    _0xa4092b,
    _0x5e4cfa = [];
  for (_0x5e4cfa = function (_0x116fd2) {
    for (var _0x226904, _0x587714 = _0x116fd2.length, _0x34424f = _0x587714 + 8, _0x5f31ae = 16 * ((_0x34424f - _0x34424f % 64) / 64 + 1), _0x2e1555 = Array(_0x5f31ae - 1), _0x4f2e1c = 0, _0x5d2b5b = 0; _0x587714 > _0x5d2b5b;) {
      _0x226904 = (_0x5d2b5b - _0x5d2b5b % 4) / 4;
      _0x4f2e1c = _0x5d2b5b % 4 * 8;
      _0x2e1555[_0x226904] = _0x2e1555[_0x226904] | _0x116fd2.charCodeAt(_0x5d2b5b) << _0x4f2e1c;
      _0x5d2b5b++;
    }
    _0x226904 = (_0x5d2b5b - _0x5d2b5b % 4) / 4;
    _0x4f2e1c = _0x5d2b5b % 4 * 8;
    _0x2e1555[_0x226904] = _0x2e1555[_0x226904] | 128 << _0x4f2e1c;
    _0x2e1555[_0x5f31ae - 2] = _0x587714 << 3;
    _0x2e1555[_0x5f31ae - 1] = _0x587714 >>> 29;
    return _0x2e1555;
  }(_0x2d0622 = function (_0x4b1923) {
    _0x4b1923 = _0x4b1923.replace(/\r\n/g, "\n");
    for (var _0x5e0012 = "", _0x3cae61 = 0; _0x3cae61 < _0x4b1923.length; _0x3cae61++) {
      var _0x41c558 = _0x4b1923.charCodeAt(_0x3cae61);
      128 > _0x41c558 ? _0x5e0012 += String.fromCharCode(_0x41c558) : _0x41c558 > 127 && 2048 > _0x41c558 ? (_0x5e0012 += String.fromCharCode(_0x41c558 >> 6 | 192), _0x5e0012 += String.fromCharCode(63 & _0x41c558 | 128)) : (_0x5e0012 += String.fromCharCode(_0x41c558 >> 12 | 224), _0x5e0012 += String.fromCharCode(_0x41c558 >> 6 & 63 | 128), _0x5e0012 += String.fromCharCode(63 & _0x41c558 | 128));
    }
    return _0x5e0012;
  }(_0x2d0622)), _0x562550 = 1732584193, _0x3e9af6 = 4023233417, _0x505981 = 2562383102, _0xa4092b = 271733878, _0x3707d7 = 0; _0x3707d7 < _0x5e4cfa.length; _0x3707d7 += 16) {
    _0x3e5f03 = _0x562550;
    _0x4e5c22 = _0x3e9af6;
    _0x95ac4f = _0x505981;
    _0x5be059 = _0xa4092b;
    _0x562550 = _0x35e377(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 0], 7, 3614090360);
    _0xa4092b = _0x35e377(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 1], 12, 3905402710);
    _0x505981 = _0x35e377(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 2], 17, 606105819);
    _0x3e9af6 = _0x35e377(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 3], 22, 3250441966);
    _0x562550 = _0x35e377(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 4], 7, 4118548399);
    _0xa4092b = _0x35e377(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 5], 12, 1200080426);
    _0x505981 = _0x35e377(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 6], 17, 2821735955);
    _0x3e9af6 = _0x35e377(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 7], 22, 4249261313);
    _0x562550 = _0x35e377(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 8], 7, 1770035416);
    _0xa4092b = _0x35e377(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 9], 12, 2336552879);
    _0x505981 = _0x35e377(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 10], 17, 4294925233);
    _0x3e9af6 = _0x35e377(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 11], 22, 2304563134);
    _0x562550 = _0x35e377(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 12], 7, 1804603682);
    _0xa4092b = _0x35e377(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 13], 12, 4254626195);
    _0x505981 = _0x35e377(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 14], 17, 2792965006);
    _0x3e9af6 = _0x35e377(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 15], 22, 1236535329);
    _0x562550 = _0x335f30(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 1], 5, 4129170786);
    _0xa4092b = _0x335f30(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 6], 9, 3225465664);
    _0x505981 = _0x335f30(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 11], 14, 643717713);
    _0x3e9af6 = _0x335f30(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 0], 20, 3921069994);
    _0x562550 = _0x335f30(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 5], 5, 3593408605);
    _0xa4092b = _0x335f30(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 10], 9, 38016083);
    _0x505981 = _0x335f30(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 15], 14, 3634488961);
    _0x3e9af6 = _0x335f30(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 4], 20, 3889429448);
    _0x562550 = _0x335f30(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 9], 5, 568446438);
    _0xa4092b = _0x335f30(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 14], 9, 3275163606);
    _0x505981 = _0x335f30(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 3], 14, 4107603335);
    _0x3e9af6 = _0x335f30(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 8], 20, 1163531501);
    _0x562550 = _0x335f30(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 13], 5, 2850285829);
    _0xa4092b = _0x335f30(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 2], 9, 4243563512);
    _0x505981 = _0x335f30(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 7], 14, 1735328473);
    _0x3e9af6 = _0x335f30(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 12], 20, 2368359562);
    _0x562550 = _0x5573fa(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 5], 4, 4294588738);
    _0xa4092b = _0x5573fa(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 8], 11, 2272392833);
    _0x505981 = _0x5573fa(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 11], 16, 1839030562);
    _0x3e9af6 = _0x5573fa(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 14], 23, 4259657740);
    _0x562550 = _0x5573fa(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 1], 4, 2763975236);
    _0xa4092b = _0x5573fa(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 4], 11, 1272893353);
    _0x505981 = _0x5573fa(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 7], 16, 4139469664);
    _0x3e9af6 = _0x5573fa(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 10], 23, 3200236656);
    _0x562550 = _0x5573fa(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 13], 4, 681279174);
    _0xa4092b = _0x5573fa(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 0], 11, 3936430074);
    _0x505981 = _0x5573fa(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 3], 16, 3572445317);
    _0x3e9af6 = _0x5573fa(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 6], 23, 76029189);
    _0x562550 = _0x5573fa(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 9], 4, 3654602809);
    _0xa4092b = _0x5573fa(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 12], 11, 3873151461);
    _0x505981 = _0x5573fa(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 15], 16, 530742520);
    _0x3e9af6 = _0x5573fa(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 2], 23, 3299628645);
    _0x562550 = _0x26689a(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 0], 6, 4096336452);
    _0xa4092b = _0x26689a(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 7], 10, 1126891415);
    _0x505981 = _0x26689a(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 14], 15, 2878612391);
    _0x3e9af6 = _0x26689a(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 5], 21, 4237533241);
    _0x562550 = _0x26689a(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 12], 6, 1700485571);
    _0xa4092b = _0x26689a(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 3], 10, 2399980690);
    _0x505981 = _0x26689a(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 10], 15, 4293915773);
    _0x3e9af6 = _0x26689a(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 1], 21, 2240044497);
    _0x562550 = _0x26689a(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 8], 6, 1873313359);
    _0xa4092b = _0x26689a(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 15], 10, 4264355552);
    _0x505981 = _0x26689a(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 6], 15, 2734768916);
    _0x3e9af6 = _0x26689a(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 13], 21, 1309151649);
    _0x562550 = _0x26689a(_0x562550, _0x3e9af6, _0x505981, _0xa4092b, _0x5e4cfa[_0x3707d7 + 4], 6, 4149444226);
    _0xa4092b = _0x26689a(_0xa4092b, _0x562550, _0x3e9af6, _0x505981, _0x5e4cfa[_0x3707d7 + 11], 10, 3174756917);
    _0x505981 = _0x26689a(_0x505981, _0xa4092b, _0x562550, _0x3e9af6, _0x5e4cfa[_0x3707d7 + 2], 15, 718787259);
    _0x3e9af6 = _0x26689a(_0x3e9af6, _0x505981, _0xa4092b, _0x562550, _0x5e4cfa[_0x3707d7 + 9], 21, 3951481745);
    _0x562550 = _0x4e3e27(_0x562550, _0x3e5f03);
    _0x3e9af6 = _0x4e3e27(_0x3e9af6, _0x4e5c22);
    _0x505981 = _0x4e3e27(_0x505981, _0x95ac4f);
    _0xa4092b = _0x4e3e27(_0xa4092b, _0x5be059);
  }
  return (_0x4624b9(_0x562550) + _0x4624b9(_0x3e9af6) + _0x4624b9(_0x505981) + _0x4624b9(_0xa4092b)).toLowerCase();
}