//Sat May 17 2025 09:23:49 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
NAME = "今日高邮";
VALY = ["jrgyck"];
VER = "1.0.2";
CK = "";
LOGS = 0;
usid = 0;
Notify = 1;
nowhour = Math.round(new Date().getHours()).toString();
PL = ["好", "赞", "学习了", "长见识", "支持", "绝对的好文章", "不错"];
const 蛋炒饭_0x3b6096 = require("fs"),
  {
    v4: 蛋炒饭_0x5d6f3b
  } = require("uuid");
DCFHOST = process.env.DCFHOST;
dcfkey = encodeURIComponent(process.env.dcfkey);
IP = "";
IPCITY = "";
class 蛋炒饭_0x38a5fa {
  constructor(_0x260f58) {
    this.phone = _0x260f58.split("#")[0];
    this.pwd = _0x260f58.split("#")[1];
    this.did = $.udid(1);
    this.PL = $.randomArr(PL);
    this._ = ++usid;
    this.f = "小主 [" + this._ + "] ";
    this.message = "";
    this.logs = true;
  }
  async ["getTT"](_0x43f141) {
    let _0x47d5f3 = await $.readUUID(),
      _0x5e42f4 = encodeURIComponent("jrgy蛋" + _0x43f141),
      _0xba90f8 = await $.task("get", "http://" + DCFHOST + "/check?DCFKEY=" + dcfkey + "&JSHOST=" + IP + "&MAC=" + _0x47d5f3 + "&DATA=" + _0x5e42f4 + "&JSCITY=" + IPCITY, {}),
      _0x3f039e = _0xba90f8.jiamiOutput;
    return _0x3f039e;
  }
  async ["login"]() {
    let _0x162f76 = $.time(10),
      _0x4cd143 = await this.gettoken(),
      _0x5ceb38 = $.MD5Encrypt(1, this.pwd),
      _0x4d33b3 = $.MD5Encrypt(0, "96286a19f38240399ff60f117ee773e4/Auth/Login?AppID=cb4a74f08e7f4aa597942f00ac53e57ccredentials" + this.phone + "password" + _0x5ceb38 + "platform1userNameuserPhotouserThumbnailuuid2e4c868b1f668727" + _0x162f76),
      _0x4b538f = {
        authorization: "Bearer " + _0x4cd143
      },
      _0x2f32cf = "{\"platform\":1,\"credentials\":\"" + this.phone + "\",\"password\":\"" + _0x5ceb38 + "\",\"uuid\":\"2e4c868b1f668727\",\"userName\":\"\",\"userPhoto\":\"\",\"userThumbnail\":\"\"}",
      _0x1ccf0c = await $.task("post", "https://user.cm.jstv.com/Auth/Login?AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=" + _0x4d33b3 + "&TT=432151702", _0x4b538f, _0x2f32cf);
    if (_0x1ccf0c.code == 200) {
      this.token = _0x1ccf0c.data.accessToken;
      console.log("【" + this.f + "】登陆成功");
      await this.getuserinfo();
      this.logs = true;
    } else {
      this.logs = false;
    }
  }
  async ["getuserinfo"]() {
    const _0x269bff = {
      authorization: "Bearer " + this.token
    };
    let _0x3a2814 = await $.task("get", "https://user.cm.jstv.com/PassportUser/userinfo/get?AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=d838b3cef2d3041e4e5466de39b8b065&TT=-723837546", _0x269bff);
    _0x3a2814.code == 200 && (this.uuid = _0x3a2814.data.memberInfo.uid, this.userName = _0x3a2814.data.userName, this.userAvatar = _0x3a2814.data.userPortrait);
  }
  async ["gettoken"]() {
    let _0x294706 = $.time(10),
      _0x4b9b14 = $.MD5Encrypt(0, "96286a19f38240399ff60f117ee773e4/JwtAuth/Token?AppID=cb4a74f08e7f4aa597942f00ac53e57cappIdcb4a74f08e7f4aa597942f00ac53e57ccredentials" + this.did + "platform5uuid" + this.did + _0x294706),
      _0x2e7359 = await this.getTT(_0x294706),
      _0x5dc540 = _0x2e7359.replace(/%0A/g, "%3D"),
      _0x938512 = "{\"platform\":5,\"credentials\":\"" + this.did + "\",\"uuid\":\"" + this.did + "\",\"appId\":\"cb4a74f08e7f4aa597942f00ac53e57c\"}",
      _0x5b34bf = await $.task("post", "https://api-auth.cm.jstv.com/JwtAuth/Token?AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=" + _0x4b9b14 + "&TT=" + _0x5dc540, {}, _0x938512);
    if (_0x5b34bf.code == 200) {
      let _0x4242c1 = _0x5b34bf.data.accessToken;
      return _0x4242c1;
    }
  }
  async ["gettaskcentertoken"]() {
    let _0xd708f2 = $.time(10),
      _0x2346fc = $.MD5Encrypt(0, "96286a19f38240399ff60f117ee773e4/JwtAuth/AppGetWebToken?AppID=cb4a74f08e7f4aa597942f00ac53e57ca1" + _0xd708f2),
      _0x1c4297 = {
        authorization: "Bearer " + this.token
      },
      _0x1f8a41 = "{\"a\":\"1\"}",
      _0x6ab314 = await $.task("post", "https://api-auth.cm.jstv.com/JwtAuth/AppGetWebToken?AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=" + _0x2346fc + "&TT=1774394518", _0x1c4297, _0x1f8a41);
    if (_0x6ab314.code == 200) {
      let _0x4681c6 = _0x6ab314.data.accessToken;
      return _0x4681c6;
    }
  }
  async ["tasklist"]() {
    let _0x215d23 = await this.gettaskcentertoken(),
      _0x249ad2 = {
        authorization: "Bearer " + _0x215d23
      },
      _0x28ef0a = await $.task("get", "https://user.cm.jstv.com/passportuser/userinfo/jifen", _0x249ad2);
    if (_0x28ef0a.code == 200) {
      console.log("【" + this.f + "】获取任务列表成功,当前总积分:" + _0x28ef0a.data.jiFen + ",今日赚取积分:" + _0x28ef0a.data.todayJiFen);
      this.message += "当前总积分:" + _0x28ef0a.data.jiFen + ",今日赚取积分:" + _0x28ef0a.data.todayJiFen;
      for (let _0x332d12 of _0x28ef0a.data.list) {
        if (_0x332d12.dailyQuestType == 10 && _0x332d12.limit > _0x332d12.count) {
          let _0x402330 = _0x332d12.limit - _0x332d12.count;
          await this.Favourite(_0x402330);
        }
        if (_0x332d12.dailyQuestType == 9 && _0x332d12.limit > _0x332d12.count) {
          let _0x1cd31f = _0x332d12.limit - _0x332d12.count;
          await this.comment(_0x1cd31f);
        }
        if (_0x332d12.dailyQuestType == 3 && _0x332d12.limit > _0x332d12.count) {
          let _0x384c3a = _0x332d12.limit - _0x332d12.count;
          await this.video(_0x384c3a);
        }
        if (_0x332d12.dailyQuestType == 2 && _0x332d12.limit > _0x332d12.count) {
          let _0x8c368a = _0x332d12.limit - _0x332d12.count;
          await this.read(_0x8c368a);
        }
      }
    }
  }
  async ["Favourite"](_0x473644) {
    let _0x9daa61 = 0;
    while (_0x9daa61 < _0x473644) {
      let _0x413cc9 = "268" + $.SJS(5, 2),
        _0x3571d = {
          authorization: "Bearer " + this.token
        },
        _0x32843b = "{\"globalId\":\"" + _0x413cc9 + "\",\"isSubscribe\":0}",
        _0x4af798 = await $.task("post", "https://statistic.cm.jstv.com/api/ArticleStatistic/Favourite?globalId=" + _0x413cc9 + "&isSubscribe=0&AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=3eee46cce72b575dcf46cda86b64d6ad&TT=1440354454", _0x3571d, _0x32843b);
      if (_0x4af798.code == 200) {
        console.log("【" + this.f + "】完成收藏任务成功");
        await $.wait(18000, 50000);
        _0x9daa61++;
      } else {
        console.log("【" + this.f + "】完成收藏任务失败，原因:" + _0x4af798.message);
        break;
      }
    }
  }
  async ["readlist"]() {
    const _0x2d8a19 = {
      authorization: "Bearer " + this.token
    };
    let _0x3b3393 = await $.task("get", "https://publish.cm.jstv.com/nav/24619?orderIndex=0&pageSize=10", _0x2d8a19);
    if (_0x3b3393.code == 200) {
      let _0x425c77 = _0x3b3393.data.articles;
      return _0x425c77;
    }
  }
  async ["videolist"]() {
    const _0xf39646 = {
      authorization: "Bearer " + this.token
    };
    let _0x11b384 = await $.task("get", "https://publish.cm.jstv.com/nav/20464?orderIndex=0&pageSize=10", _0xf39646);
    if (_0x11b384.code == 200) {
      let _0x4b05a4 = _0x11b384.data.articles;
      return _0x4b05a4;
    }
  }
  async ["comment"](_0x6d3607) {
    let _0x1d9f78 = await this.readlist();
    for (let _0x39aa70 = 0; _0x39aa70 < _0x6d3607; _0x39aa70++) {
      let _0x31021f = _0x1d9f78[_0x39aa70].globalId,
        _0x559273 = $.time(10),
        _0x14fe8c = $.MD5Encrypt(0, "96286a19f38240399ff60f117ee773e4/api/ArticleStatistic/Comment?AppID=cb4a74f08e7f4aa597942f00ac53e57ccommentContent26805025globalId" + _0x31021f + "userAvatarhttps://image.cm.jstv.com/person-default.pnguserName" + this.userName + _0x559273),
        _0x3a0c69 = await this.getTT(_0x559273),
        _0x530970 = _0x3a0c69.replace(/%0A/g, "%3D"),
        _0x2e6240 = {
          authorization: "Bearer " + this.token
        },
        _0xbc8883 = "{\"globalId\":\"" + _0x31021f + "\",\"commentContent\":\"" + this.PL + "\",\"userName\":\"" + this.userName + "\",\"userAvatar\":\"https://image.cm.jstv.com/person-default.png\"}",
        _0x3718f1 = await $.task("post", "https://statistic.cm.jstv.com/api/ArticleStatistic/Comment?AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=" + _0x14fe8c + "&TT=" + _0x530970, _0x2e6240, _0xbc8883);
      _0x3718f1.code == 200 ? (console.log("【" + this.f + "】完成评论任务成功"), await $.wait(18000, 50000)) : console.log("【" + this.f + "】完成评论任务失败，原因:" + _0x3718f1.message);
    }
  }
  async ["video"](_0x21db2c) {
    let _0x2a0931 = $.SJS(5, 2),
      _0x597950 = $.SJS(5, 2),
      _0x55a25b = await this.videolist();
    for (let _0x509b48 = 0; _0x509b48 < _0x21db2c; _0x509b48++) {
      let _0x428e12 = _0x55a25b[_0x509b48].globalId,
        _0x32e4b4 = $.time(10),
        _0x2f06ac = $.MD5Encrypt(0, "96286a19f38240399ff60f117ee773e4/1.gif?AppID=cb4a74f08e7f4aa597942f00ac53e57cdddat40dbd217dcl0dgi" + _0x428e12 + "drl0dsp0dstdsudub3dddacb4a74f08e7f4aa597942f00ac53e57cdcs81ee9f5b-3495-46b2-8f62-ab1df48c6869dct" + _0x32e4b4 + "di192.168.0.112dla118." + _0x597950 + "dlo31." + _0x2a0931 + "dnwifidu" + this.uuid + _0x32e4b4),
        _0x30d9d3 = await this.getTT(_0x32e4b4),
        _0x4d2836 = _0x30d9d3.replace(/%0A/g, "%3D"),
        _0x7f68ce = {
          authorization: "Bearer " + this.token
        },
        _0x50d6ba = "{\"d\":[{\"dd\":{\"da\":\"cb4a74f08e7f4aa597942f00ac53e57c\",\"di\":\"192.168.0.112\",\"dn\":\"wifi\",\"dct\":" + _0x32e4b4 + ",\"dlo\":31." + _0x2a0931 + ",\"dla\":118." + _0x597950 + ",\"du\":\"" + this.uuid + "\",\"dcs\":\"81ee9f5b-3495-46b2-8f62-ab1df48c6869\"},\"d\":{\"dgi\":\"" + _0x428e12 + "\",\"dub\":3,\"dat\":40,\"dbd\":217,\"dcl\":0,\"drl\":0,\"dsp\":0,\"dsu\":\"\",\"dst\":\"\"}}]}",
        _0xb8267f = await $.task("post", "https://statistic.cm.jstv.com/1.gif?AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=" + _0x2f06ac + "&TT=" + _0x4d2836, _0x7f68ce, _0x50d6ba);
      console.log("【" + this.f + "】完成看视频任务成功" + _0xb8267f);
      await $.wait(18000, 50000);
    }
  }
  async ["read"](_0x1d2a99) {
    let _0x2307a6 = $.SJS(5, 2),
      _0x5b56d9 = $.SJS(5, 2),
      _0x5ab6bd = await this.readlist();
    for (let _0x5aaf2a = 0; _0x5aaf2a < _0x1d2a99; _0x5aaf2a++) {
      let _0x383f93 = _0x5ab6bd[_0x5aaf2a].globalId,
        _0x5236ad = $.time(10),
        _0x4c2312 = $.MD5Encrypt(0, "96286a19f38240399ff60f117ee773e4/1.gif?AppID=cb4a74f08e7f4aa597942f00ac53e57cdddat10dbd3dcl5506dgi" + _0x383f93 + "drl0dsp0dstdsudub2dddacb4a74f08e7f4aa597942f00ac53e57cdcs345de84f-314e-4a8c-96c4-59dbefabcd0cdct" + _0x5236ad + "di192.168.0.112dla118." + _0x5b56d9 + "dlo31." + _0x2307a6 + "dnwifidu" + this.uuid + _0x5236ad),
        _0x4c2be4 = await this.getTT(_0x5236ad),
        _0x12bef7 = _0x4c2be4.replace(/%0A/g, "%3D"),
        _0x3ca02d = {
          authorization: "Bearer " + this.token
        },
        _0x4c19fe = "{\"d\":[{\"dd\":{\"da\":\"cb4a74f08e7f4aa597942f00ac53e57c\",\"di\":\"192.168.0.112\",\"dn\":\"wifi\",\"dct\":" + _0x5236ad + ",\"dlo\":31." + _0x2307a6 + ",\"dla\":118." + _0x5b56d9 + ",\"du\":\"" + this.uuid + "\",\"dcs\":\"345de84f-314e-4a8c-96c4-59dbefabcd0c\"},\"d\":{\"dgi\":\"" + _0x383f93 + "\",\"dub\":2,\"dat\":10,\"dbd\":3,\"dcl\":5506,\"drl\":0,\"dsp\":0,\"dsu\":\"\",\"dst\":\"\"}}]}",
        _0x1f1f11 = await $.task("post", "https://statistic.cm.jstv.com/1.gif?AppID=cb4a74f08e7f4aa597942f00ac53e57c&Sign=" + _0x4c2312 + "&TT=" + _0x12bef7, _0x3ca02d, _0x4c19fe);
      !_0x1f1f11 && (console.log("【" + this.f + "】完成阅读文章任务成功"), await $.wait(18000, 50000));
    }
  }
}
$ = 蛋炒饭_0x37c91b();
!(async () => {
  let _0x42fc7b = await $.task("get", "http://" + DCFHOST + "/download?DCFKEY=" + dcfkey + "&JSMANE=jrgy&VER=" + VER, {});
  if (_0x42fc7b.code == 0) {
    console.log("【" + NAME + "】当前版本号：V" + VER + ",正在更新脚本，请稍等......");
    const _0x2ff6b4 = require("fs").promises,
      _0x527bad = process.argv[1];
    await _0x2ff6b4.writeFile(_0x527bad, _0x42fc7b.scriptData);
    console.log("脚本更新完成，请重新运行脚本");
  } else {
    if (_0x42fc7b.code == 1) {
      console.log("正在运行脚本：【" + NAME + "】V" + VER);
      console.log("📢 请认真阅读以下声明\n 【免责声明】   \n📌 脚本文件仅用于测试和学习研究   \n📌 脚本文件任何人不得用于商业以及非法用途   \n📌 禁止任何公众号、自媒体进行任何形式的转发   \n📌 脚本文件请在下载试用后24小时内自行删除   \n📌 因使用脚本造成软件平台的一切损失皆由使用者承担   \n📌 脚本文件如有不慎被破解或修改由破解或修改者承担   \n📌 如不接受此条款请立即删除脚本文件");
      let _0x4df8b2 = await $.getkami(),
        _0x31b81e = await $.readUUID();
      if (_0x4df8b2.dcfkey) {
        _0x4df8b2.Notify != "" && console.log(_0x4df8b2.Notify);
        TSdata = $.time(13);
        if (_0x4df8b2.MAC == null) {
          console.log("请提交正确的MAC地址后再运行脚本！");
          return;
        } else {
          if (_0x4df8b2.MAC != null) {
            if (_0x4df8b2.MAC != _0x31b81e) {
              let _0x3454cb = require("path"),
                _0x401d50 = _0x3454cb.basename(__filename);
              console.log("本次MAC地址与数据库记录不匹配，停止运行文件[" + _0x401d50 + "]");
              return;
            }
          }
        }
        if (_0x4df8b2.Delete == 1) {
          let _0x504c5c = require("path"),
            _0x40b404 = _0x504c5c.basename(__filename);
          console.log("关闭服务器跑路啦，帮你删除脚本文件[" + _0x40b404 + "]");
          蛋炒饭_0x3b6096.unlink(_0x40b404, _0x56bdd3 => {});
          return;
        }
        if (TSdata <= _0x4df8b2.Data) {
          console.log("尊贵的" + _0x4df8b2.UserName + "小主,您的卡密有效期到：" + _0x4df8b2.DataTime);
        } else {
          let _0x42f94a = require("path"),
            _0x4d9999 = _0x42f94a.basename(__filename);
          console.log("卡密已过期，停止运行文件[" + _0x4d9999 + "]");
          return;
        }
        await $.ExamineCookie();
        await $.Multithreading("login");
        let _0x2a72d4 = $.cookie_list.filter(_0x463792 => _0x463792.logs == true);
        if (_0x2a72d4.length == 0) {
          console.log("Cookie格式错误 或 账号被禁封");
          return;
        } else {
          await $.Multithreading("tasklist");
        }
      } else {
        if (_0x4df8b2.message == "更新成功") {
          console.log("数据更新成功，请重新运行脚本");
          return;
        } else {
          let _0x3f98fd = require("path"),
            _0x1deff5 = _0x3f98fd.basename(__filename);
          console.log("无效卡密，停止运行文件[" + _0x1deff5 + "]");
          return;
        }
      }
    } else {
      console.log("脚本更新失败，不进行覆盖操作，请稍后重试！");
      console.log("正在运行脚本：【" + NAME + "】V" + VER);
      console.log("📢 请认真阅读以下声明\n 【免责声明】   \n📌 脚本文件仅用于测试和学习研究   \n📌 脚本文件任何人不得用于商业以及非法用途   \n📌 禁止任何公众号、自媒体进行任何形式的转发   \n📌 脚本文件请在下载试用后24小时内自行删除   \n📌 因使用脚本造成软件平台的一切损失皆由使用者承担   \n📌 脚本文件如有不慎被破解或修改由破解或修改者承担   \n📌 如不接受此条款请立即删除脚本文件");
      let _0x3ad6a8 = await $.getkami(),
        _0xf00f48 = await $.readUUID();
      if (_0x3ad6a8.dcfkey) {
        if (_0x3ad6a8.Notify != "") {
          console.log(_0x3ad6a8.Notify);
        }
        TSdata = $.time(13);
        if (_0x3ad6a8.MAC == null) {
          console.log("请提交正确的MAC地址后再运行脚本！");
          return;
        } else {
          if (_0x3ad6a8.MAC != null) {
            if (_0x3ad6a8.MAC != _0xf00f48) {
              let _0x4cbde5 = require("path"),
                _0x3b65be = _0x4cbde5.basename(__filename);
              console.log("本次MAC地址与数据库记录不匹配，停止运行文件[" + _0x3b65be + "]");
              return;
            }
          }
        }
        if (_0x3ad6a8.Delete == 1) {
          let _0x1c6d8a = require("path"),
            _0x242c8b = _0x1c6d8a.basename(__filename);
          console.log("关闭服务器跑路啦，帮你删除脚本文件[" + _0x242c8b + "]");
          蛋炒饭_0x3b6096.unlink(_0x242c8b, _0x4fd41f => {});
          return;
        }
        if (TSdata <= _0x3ad6a8.Data) {
          console.log("尊贵的" + _0x3ad6a8.UserName + "小主,您的卡密有效期到：" + _0x3ad6a8.DataTime);
        } else {
          let _0x5b56b = require("path"),
            _0xb8b364 = _0x5b56b.basename(__filename);
          console.log("卡密已过期，停止运行文件[" + _0xb8b364 + "]");
          return;
        }
        await $.ExamineCookie();
        await $.Multithreading("login");
        let _0xe05c77 = $.cookie_list.filter(_0x36695c => _0x36695c.logs == true);
        if (_0xe05c77.length == 0) {
          console.log("Cookie格式错误 或 账号被禁封");
          return;
        } else {
          await $.Multithreading("tasklist");
        }
      } else {
        if (_0x3ad6a8.message == "更新成功") {
          console.log("数据更新成功，请重新运行脚本");
          return;
        } else {
          let _0x37c1e5 = require("path"),
            _0x201f01 = _0x37c1e5.basename(__filename);
          console.log("无效卡密，停止运行文件[" + _0x201f01 + "]");
          return;
        }
      }
    }
  }
  let _0x3e0044 = [];
  for (let _0xf6e604 of $.cookie_list) {
    if (_0xf6e604.message) {
      _0x3e0044.push(_0xf6e604.message);
    }
  }
  if (_0x3e0044.length > 0) {
    await $.SendMsg(_0x3e0044.join("\n"));
  }
})().catch(_0x3a87d4 => {
  console.log(_0x3a87d4);
}).finally(() => {});
function 蛋炒饭_0x37c91b() {
  return new class {
    constructor() {
      this.cookie_list = [];
      this.message = "";
      this.CryptoJS = require("crypto-js");
      this.NodeRSA = require("node-rsa");
      this.request = require("request");
      this.Sha_Rsa = require("jsrsasign");
    }
    async ["Multithreading"](_0x6c00f3, _0x205b22, _0x40c72e) {
      let _0x2c43fb = [];
      !_0x40c72e && (_0x40c72e = 1);
      while (_0x40c72e--) {
        for (let _0x5c6546 of $.cookie_list) {
          _0x2c43fb.push(_0x5c6546[_0x6c00f3](_0x205b22));
        }
      }
      await Promise.allSettled(_0x2c43fb);
    }
    ["ExamineCookie"]() {
      let _0x28fe05 = process.env[VALY] || CK,
        _0x133709 = 0;
      if (_0x28fe05) {
        for (let _0x5962fe of _0x28fe05.split("\n").filter(_0x4a9d6b => !!_0x4a9d6b)) {
          $.cookie_list.push(new 蛋炒饭_0x38a5fa(_0x5962fe));
        }
        _0x133709 = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }
      console.log("共找到" + _0x133709 + "个账号");
      return $.cookie_list;
    }
    ["task"](_0x55a810, _0x22825e, _0x1f53d1, _0x1da663, _0x3ccbdf) {
      if (_0x55a810 == "delete") {
        _0x55a810 = _0x55a810.toUpperCase();
      } else {
        _0x55a810 = _0x55a810;
      }
      if (_0x55a810 == "post") {
        delete _0x1f53d1["content-type"];
        delete _0x1f53d1["Content-type"];
        delete _0x1f53d1["content-Type"];
        if ($.safeGet(_0x1da663)) {
          _0x1f53d1["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0x1f53d1["Content-Type"] = "application/x-www-form-urlencoded";
        }
        _0x1da663 && (_0x1f53d1["Content-Length"] = $.lengthInUtf8Bytes(_0x1da663));
      }
      _0x55a810 == "get" && (delete _0x1f53d1["content-type"], delete _0x1f53d1["Content-type"], delete _0x1f53d1["content-Type"], delete _0x1f53d1["Content-Length"]);
      _0x1f53d1.Host = _0x22825e.replace("//", "/").split("/")[1];
      return new Promise(async _0x5f3b24 => {
        if (_0x55a810.indexOf("T") < 0) {
          var _0x306b95 = {
            url: _0x22825e,
            headers: _0x1f53d1,
            body: _0x1da663,
            proxy: "http://" + _0x3ccbdf
          };
        } else {
          var _0x306b95 = {
            url: _0x22825e,
            headers: _0x1f53d1,
            form: JSON.parse(_0x1da663),
            proxy: "http://" + _0x3ccbdf
          };
        }
        if (!_0x3ccbdf) {
          delete _0x306b95.proxy;
        }
        this.request[_0x55a810.toLowerCase()](_0x306b95, (_0xde833e, _0x1d1acf, _0x57c715) => {
          try {
            _0x57c715 && LOGS == 1 && (console.log("================ 请求 ================"), console.log(_0x306b95), console.log("================ 返回 ================"), $.safeGet(_0x57c715) ? console.log(JSON.parse(_0x57c715)) : console.log(_0x57c715));
          } catch (_0x270775) {
            console.log(_0x270775, _0x22825e + "\n" + _0x1f53d1);
          } finally {
            let _0x46e781 = "";
            if (!_0xde833e) {
              if ($.safeGet(_0x57c715)) {
                _0x46e781 = JSON.parse(_0x57c715);
              } else {
                _0x57c715.indexOf("/") != -1 && _0x57c715.indexOf("+") != -1 ? _0x46e781 = _0x57c715 : _0x46e781 = _0x57c715;
              }
            } else {
              _0x46e781 = _0x22825e + "   API请求失败，请检查网络重试\n" + _0xde833e;
            }
            return _0x5f3b24(_0x46e781);
          }
        });
      });
    }
    ["udid"](_0x3b5b68) {
      function _0x4b9fb9() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }
      let _0xe17e13 = _0x4b9fb9() + _0x4b9fb9() + "-" + _0x4b9fb9() + "-" + _0x4b9fb9() + "-" + _0x4b9fb9() + "-" + _0x4b9fb9() + _0x4b9fb9() + _0x4b9fb9();
      return _0x3b5b68 == 0 ? _0xe17e13.toUpperCase() : _0xe17e13.toLowerCase();
    }
    async ["readUUID"]() {
      const _0x26f5bf = "uuid.txt";
      await $.generateUUID(_0x26f5bf);
      try {
        const _0x4c49bd = 蛋炒饭_0x3b6096.readFileSync(_0x26f5bf, "utf8"),
          _0x41d93d = _0x4c49bd.trim();
        return _0x41d93d;
      } catch (_0x129424) {
        return null;
      }
    }
    ["generateUUID"](_0x7dae54) {
      if (蛋炒饭_0x3b6096.existsSync(_0x7dae54)) {
        return;
      }
      const _0x1632ad = 蛋炒饭_0x5d6f3b();
      蛋炒饭_0x3b6096.writeFile(_0x7dae54, _0x1632ad, "utf8", _0xa0f96 => {
        if (_0xa0f96) {
          console.error("写入文件出错: " + _0xa0f96.message);
          return;
        }
      });
    }
    async ["getkami"]() {
      let _0x47277f = await $.readUUID();
      await $.getCurrentIP();
      await $.getIPCITY();
      let _0x492b48 = await $.task("get", "http://" + DCFHOST + "/querys?DCFKEY=" + dcfkey + "&MAC=" + _0x47277f + "&JSHOST=" + IP + "&JSCITY=" + IPCITY, {});
      return _0x492b48;
    }
    async ["getIPCITY"]() {
      let _0x1f65c4 = await $.task("get", "http://ip-api.com/json/" + IP + "?lang=zh-CN", {}),
        _0x149570 = _0x1f65c4.regionName + _0x1f65c4.city;
      IPCITY = encodeURIComponent(_0x149570);
    }
    async ["getCurrentIP"]() {
      let _0x3806c6 = await $.task("get", "https://httpbin.org/ip", {});
      IP = _0x3806c6.origin;
    }
    async ["SendMsg"](_0x559ea5) {
      if (!_0x559ea5) {
        return;
      }
      if (Notify == 1) {
        var _0x22856e = require("./sendNotify");
        await _0x22856e.sendNotify(NAME, _0x559ea5);
      }
    }
    ["lengthInUtf8Bytes"](_0x5e013d) {
      let _0x34ca83 = encodeURIComponent(_0x5e013d).match(/%[89ABab]/g);
      return _0x5e013d.length + (_0x34ca83 ? _0x34ca83.length : 0);
    }
    ["randomArr"](_0x5c6c07) {
      return _0x5c6c07[parseInt(Math.random() * _0x5c6c07.length, 10)];
    }
    ["wait"](_0x4b0e04) {
      return new Promise(_0x332b62 => setTimeout(_0x332b62, _0x4b0e04));
    }
    ["time"](_0x1d567b) {
      return _0x1d567b == 10 ? Math.round(+new Date() / 1000) : +new Date();
    }
    ["safeGet"](_0x1f4972) {
      try {
        if (typeof JSON.parse(_0x1f4972) == "object") {
          return true;
        }
      } catch (_0x3b4d1d) {
        return false;
      }
    }
    ["SJS"](_0x31b94c, _0x128fee) {
      if (_0x128fee == 0) {
        let _0x4f3cac = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
          _0x3629b3 = _0x4f3cac.length,
          _0x37bdaa = "";
        for (let _0x27b653 = 0; _0x27b653 < _0x31b94c; _0x27b653++) {
          _0x37bdaa += _0x4f3cac.charAt(Math.floor(Math.random() * _0x3629b3));
        }
        return _0x37bdaa;
      } else {
        if (_0x128fee == 1) {
          let _0x2d9890 = "qwertyuiopasdfghjklzxcvbnm0123456789",
            _0x16b3ba = _0x2d9890.length,
            _0x56619b = "";
          for (let _0x106393 = 0; _0x106393 < _0x31b94c; _0x106393++) {
            _0x56619b += _0x2d9890.charAt(Math.floor(Math.random() * _0x16b3ba));
          }
          return _0x56619b;
        } else {
          let _0x50374f = "0123456789",
            _0x4089d2 = _0x50374f.length,
            _0x2d3150 = "";
          for (let _0x37f5c3 = 0; _0x37f5c3 < _0x31b94c; _0x37f5c3++) {
            _0x2d3150 += _0x50374f.charAt(Math.floor(Math.random() * _0x4089d2));
          }
          return _0x2d3150;
        }
      }
    }
    RT(_0x820949, _0x4ebe9d) {
      return Math.round(Math.random() * (_0x4ebe9d - _0x820949) + _0x820949);
    }
    ["MD5Encrypt"](_0x50a8b1, _0x29dc18) {
      if (_0x50a8b1 == 0) {
        return this.CryptoJS.MD5(_0x29dc18).toString().toLowerCase();
      } else {
        if (_0x50a8b1 == 1) {
          return this.CryptoJS.MD5(_0x29dc18).toString().toUpperCase();
        } else {
          if (_0x50a8b1 == 2) {
            return this.CryptoJS.MD5(_0x29dc18).toString().substring(8, 24).toLowerCase();
          } else {
            if (_0x50a8b1 == 3) {
              return this.CryptoJS.MD5(_0x29dc18).toString().substring(8, 24).toUpperCase();
            }
          }
        }
      }
    }
  }();
}