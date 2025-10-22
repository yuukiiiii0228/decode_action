//Wed Oct 22 2025 15:39:53 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("喜马拉雅极速版"),
  version = "V1.0.6",
  appName = "xmlyjsbapp";
let xmlyjsbapp = $.getjson(appName, []);
const fs = $.isNode() ? require("fs") : "",
  WebSocket = $.isNode() ? require("ws") : "",
  file = "david_cookies.js";
$.isNode() && !fs.existsSync(file) && ($.log("🔔 外挂ck文件不存在，开始创建模版>>>"), fs.writeFileSync("./david_cookies.js", "//独立CK文件，主要用来处理多账号大数据量CK,注意JRTTAPP外边不用加引号，依葫芦画瓢。\n//今日头条(三个账号)\nlet JRTTAPP = [{},{},{}]\n//番茄小说(一个账号)\nlet FQXSAPP = [{}]\n//抖音极速版(两个账号)\nlet DYJSBAPP = [{},{}]\n    \nlet APPS = {\n    JRTT: JRTTAPP,\n    FQXS: FQXSAPP,\n    DYJSB: DYJSBAPP\n}\n\nmodule.exports = APPS", m => {}));
const http = $.isNode() ? require("http") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  COOKIES = $.isNode() ? require("./david_cookies") : "";
let userId = $.getdata("tguserid") || 1,
  activeCode = $.getdata("xmlyjsbactivecode") || 0,
  xmlyjsbuserck = $.getval("xmlyjsbuserck") || 1,
  apiHost = $.getval("apiHost") || "http://106.15.104.124:8080";
$.getval("apiHosts") && (apiHost = $.getval("apiHosts"));
let flushCash = $.getval("cleanCache") || false;
const debug = 0;
let tz = $.getval("tz") || "1",
  helpUtils = undefined,
  CryptoJS = undefined,
  saveFile = false,
  xmlyjsb_ck_file = "xmlyjsb_cookies.json";
var hour = "",
  minute = "";
let sendlogs = "",
  xmlyjsblogs = [],
  wss = [],
  channels_status = [],
  reconectCounts = [],
  requestObjects = [],
  requestSigns = [],
  redisGetInfos = [],
  httpResult = "",
  userAuth = "",
  scriptAuth = "",
  newest_version = "",
  runAuth = "",
  systemNotify = "",
  vipAuth = "",
  isCharge = "",
  multiAccount = 1,
  buyCount = 1,
  runTotalCounts = 1,
  runedCounts = 1,
  userRank = "",
  invicode = "",
  numbers = 3,
  vipDate = "";
if ($.isNode()) {
  process.env.XMLYJSBAPP ? xmlyjsbapp = JSON.parse(process.env.XMLYJSBAPP) : xmlyjsbapp = COOKIES.XMLYJSB;
  userId = process.env.TGUSERID;
  activeCode = process.env.XMLYJSBACTIVECODE;
  process.env.APIHOST && (apiHost = process.env.APIHOST);
  process.env.APIHOSTS && (apiHost = process.env.APIHOSTS);
  process.env.CLEANCACHE && (flushCash = JSON.parse(process.env.CLEANCACHE));
  hour = new Date(new Date().getTime()).getHours();
  minute = new Date(new Date().getTime()).getMinutes();
  $.log("🔔 当前环境: Node, 当前时间：" + hour + "点");
} else {
  hour = new Date().getHours();
  minute = new Date().getMinutes();
  $.log("🔔 当前环境: 手机代理, 当前时间：" + hour + "点");
}
!(async () => {
  if (typeof $request !== "undefined") {
    await getCk();
  } else {
    if (!xmlyjsbapp) {
      $.log("📢 很抱歉，😭 没有找到账号信息！你确定配置账号信息了吗？");
      return;
    }
    $.log("📢 开始检测服务器接口状态>>>");
    let a = false;
    const P = apiHost.split("&"),
      J = P.length;
    for (let d = 0; d < J; d++) {
      if ($.isNode()) {
        a = await checkAddress("" + P[d], 2500);
      } else {
        if ($.isSurge() || $.isLoon()) {
          a = await httpClientRequest("" + P[d], 2500);
        } else {
          a = await fetchRequest("" + P[d], 2500);
        }
      }
      if (a == true) {
        apiHost = P[d];
        $.log("📢 接口" + (d + 1) + "[" + P[d] + "]服务器接口正常! 🎉");
        break;
      }
      if (d == J - 1 && a == false) {
        $.log("📢 抱歉，所有接口都不可用, 请前往交流群置顶获取最新的接口地址! 😭");
        $.msg($.name, "所有接口都不可用, 请尽快前往交流群置顶获取最新的接口地址!");
        return;
      }
    }
    if (!activeCode || !userId || userId == 1 || activeCode == 0 || activeCode.length != 32) {
      $.log("❗️ 抱歉，你没有权限运行此脚本, 请关注电报机器人: https://t.me/DavidLoveBot");
      return;
    }
    await getScriptAuth(appName, userId, activeCode);
    $.log("📢 " + systemNotify);
    $.log("🔔 当前脚本版本号: " + version + "，最新版本号: " + newest_version);
    if (vipDate != "") {
      let h = new Date(vipDate).getTime(),
        R = new Date().getTime();
      if (R > h) {
        $.log("❗️ 抱歉，VIP到期了，请及时付费。");
        return;
      }
    }
    if (version < newest_version) {
      $.log("❗️ 当前脚本版本号低于服务器版本，请更新脚本吧！");
      sendMsg("🔔 当前脚本版本号低于服务器版本，请更新脚本吧！");
      return;
    }
    if (scriptAuth != true) {
      $.log("❗️ 抱歉, 此脚本已停用。");
      return;
    }
    if (userRank != true) {
      $.log("❗️ 抱歉, 用户不合法，请先私聊机器人加入交流区。 https://t.me/DavidLoveBot");
      return;
    }
    if (userAuth != true) {
      $.log("❗️ 抱歉，你没有权限运行此脚本, 请关注电报机器人: https://t.me/DavidLoveBot");
      return;
    }
    if (isCharge == true) {
      $.log("🔔 此脚本采用付费模式。🔒");
    } else {
      $.log("🔔 此脚本采用免费模式。🔓");
    }
    if (vipDate != "") {
      if (isCharge == true) {
        let g = new Date(vipDate).getTime(),
          K = new Date().getTime();
        if (K > g) {
          $.log("❗️ 抱歉，VIP到期了，请及时付费。");
          return;
        } else {
          $.log("🔔 尊敬的会员：您好，你是VIP用户！🔐");
        }
      }
    } else {
      if (isCharge == true) {
        if (vipAuth != true) {
          $.log("❗️ 抱歉，你不是付费用户, 你没有权限运行此脚本, 需要使用请查看使用说明。");
          return;
        } else {
          $.log("🔔 尊敬的会员：您好，你是付费用户！🔐");
        }
      }
    }
    if (multiAccount > 1) {
      $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一次可以运行" + numbers * multiAccount + "个账号。");
    }
    buyCount > 1 && $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一共可以运行" + runTotalCounts + "次, 已经运行了" + runedCounts + "次。");
    if (runAuth != true) {
      $.log("❗️ 抱歉,  该用户今天可能已经达到最大运行次数，明天再试吧！");
      return;
    }
    if (xmlyjsbapp.length > numbers * multiAccount) {
      $.log("❗️ 当前用户一次最多运行" + numbers * multiAccount + "个账号，需要增加账号请查看置顶说明。");
      return;
    }
    if (xmlyjsbapp.length == 0) {
      $.log("先抓取账号ck，再运行脚本吧！");
      return;
    }
    if (runedCounts + xmlyjsbapp.length > runTotalCounts) {
      $.log("📢 一共发现了" + xmlyjsbapp.length + "个账号");
      $.log("❗️ 当前用户运行次数剩余" + (runTotalCounts - runedCounts) + "次，还可以运行" + (runTotalCounts - runedCounts) + "个账号，还需要" + (xmlyjsbapp.length - (runTotalCounts - runedCounts)) + "次，可以通过赞赏后增加运行次数！");
      return;
    }
    vipDate != "" && $.log("📢 你的会员有效期到： " + vipDate);
    $.log("📢 一共发现了" + xmlyjsbapp.length + "个账号");
    if ($.isNode()) {
      if (!fs.existsSync(xmlyjsb_ck_file)) {
        xmlyjsb_cks = {};
      } else {
        xmlyjsb_cks = JSON.parse(fs.readFileSync(xmlyjsb_ck_file, "utf8"));
      }
    }
    let I = [],
      U = xmlyjsbapp.length,
      C = 0;
    if ($.isNode() && process.env.XMLYJSB_THREAD_COUNT) {
      C = parseInt(process.env.XMLYJSB_THREAD_COUNT);
    } else {
      C = U;
    }
    let z = xmlyjsbapp.length;
    if (C >= U) {
      C = U;
      z = 1;
      $.log("📢 你设置的线程数是" + C + "，账号个数是" + U + "，" + z + "次可全部跑完。");
      for (let m0 = 0; m0 < xmlyjsbapp.length; m0++) {
        I.push(runMultiTasks(m0));
        xmlyjsblogs[m0] = "";
        if ($.isNode()) {
          channels_status[m0] = 0;
          await init_ws(m0);
        } else {
          channels_status[m0] = 1;
        }
      }
      await Promise.allSettled(I).then(m4 => {
        if ($.isNode() && saveFile) {
          $.log("[温馨提醒]: 即将本地化token，这样可以有效降低登录次数");
          fs.writeFileSync(xmlyjsb_ck_file, JSON.stringify(xmlyjsb_cks, null, 2));
        }
        $.log("日志整理功能如下：");
        $.log("---------------日志整理开始--------------");
        for (let m7 = 0; m7 < xmlyjsbapp.length; m7++) {
          $.log(xmlyjsblogs[m7]);
          sendlogs += xmlyjsblogs[m7];
        }
        $.log("---------------日志整理结束--------------");
        sendMsg(sendlogs);
      });
    } else {
      z = Math.ceil(U / C);
      $.log("📢 你设置的线程数是" + C + "，账号个数是" + U + "，计算后分" + z + "次执行，一次可执行" + C + "个账号，最后一次如果不够" + C + "个账号，剩多少个账号就跑几个账号。");
      for (let m6 = 0; m6 < z; m6++) {
        for (let m7 = m6 * C; m7 < C * (m6 + 1) && m7 < U; m7++) {
          I.push(runMultiTasks(m7));
          xmlyjsblogs[m7] = "";
          channels_status[m7] = 1;
          await init_ws(m7);
        }
        await Promise.allSettled(I).then(m9 => {
          I = [];
          if (m6 == z - 1) {
            if ($.isNode() && saveFile) {
              $.log("[温馨提醒]: 即将本地化token，这样可以有效降低登录次数");
              fs.writeFileSync(xmlyjsb_ck_file, JSON.stringify(xmlyjsb_cks, null, 2));
            }
            $.log("日志整理功能如下：");
            $.log("---------------日志整理开始--------------");
            for (let mP = 0; mP < xmlyjsbapp.length; mP++) {
              $.log(xmlyjsblogs[mP]);
              sendlogs += xmlyjsblogs[mP];
            }
            $.log("---------------日志整理结束--------------");
            sendMsg(sendlogs);
          }
        });
      }
    }
  }
})().catch(m => $.logErr(m)).finally(() => $.done());
async function runMultiTasks(m) {
  return new Promise((a, P) => {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 开始执行 working......");
    runSubTask(a, m);
  });
}
async function init_ws(m) {
  if ($.isNode()) {
    if (reconectCounts[m] > 0) {
      $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 尝试重新连接服务器>>>>>>");
    }
    wss[m] = new WebSocket(apiHost.replace("http", "ws") + "/ws");
    wss[m].on("open", function P() {
      $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签名通道已连接");
    });
    wss[m].on("close", function J() {
      $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签名通道已关闭，原因是任务已处理完成");
    });
    wss[m].on("error", function I() {
      $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签名通道已关闭，原因是出现错误");
      channels_status[m] = 1;
      reconectCounts[m]++;
      if (reconectCounts[m] <= 3) {
        init_ws(m);
      }
    });
  }
}
async function runSubTask(m, v) {
  $.isNode() && (await $.wait(3000, 5000));
  await userInfo(v);
  await account(v);
  if (hour > 5) {
    await cashPageInfo(v);
  }
  if (minute < 10) {
    await addListenTime(v, 375 * (hour + 1) + helpUtils.randomNum(3, 60));
  }
  await listenInfo(v);
  await signInfo(v);
  await drinkInfo(v);
  await topicInfo(v);
  await redPacketInfo(v);
  await doTasks(v);
  $.isNode() && (await wss[v].close());
  await runComplete(appName, userId);
  m();
}
async function getCk() {
  if ($request.url.match(/\/task\/record/)) {
    const J = $request.headers.Cookie;
    let I = xmlyjsbuserck - 1;
    if (xmlyjsbapp[I]) {
      xmlyjsbapp[I].cookie = J;
    } else {
      const C = {
        cookie: J
      };
      xmlyjsbapp[I] = C;
    }
    $.setdata(JSON.stringify(xmlyjsbapp, null, 2), "xmlyjsbapp");
    $.msg($.name, "喜马拉雅极速版账号" + (I + 1) + "Cookie获取成功！🎉");
  }
}
async function userInfo(m) {
  const a = "https://passport.ximalaya.com/web/login/user";
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null && J.ret == 0) {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 用户名=> " + J.nickname);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 用户名=> " + J.nickname + "\n";
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 手机号=> " + J.mobile);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 手机号=> " + J.mobile + "\n";
    xmlyjsbapp[m].uid = J.uid;
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 用户名信息=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 用户名信息=> " + J.msg + "\n";
  }
}
async function account(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/account/coin";
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null) {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 金币=> " + J.total);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 金币=> " + J.total + "\n";
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 余额=> " + (J.total / 10000).toFixed(2) + "元");
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 余额=> " + (J.total / 10000).toFixed(2) + "元 \n";
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 账户信息=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 账户信息=> " + J.msg + "\n";
  }
}
async function refreshToken(m) {
  const a = "https://passport.ximalaya.com/user-http-app/v1/token/refresh";
  let P = "";
  await getReqObject(a, P, m);
  requestObjects[m].headers["Content-Type"] = "application/x-www-form-urlencoded";
  await httpRequest("post", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null && J.ret == 0) {
    if (J.newToken != null) {
      $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 刷新token=> " + J.data.newToken);
    }
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 刷新token=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 刷新token=> " + J.msg + "\n";
  }
}
async function addListenTime(m, v) {
  const P = "https://mobwsa.ximalaya.com/pizza-category/ball/saveListenTime";
  let J = helpUtils.ts13(),
    I = CryptoJS.MD5("currenttimemillis=" + J + "&listentime=" + v + "&uid=" + xmlyjsbapp[m].uid + "&q35435432sadks2i3546p2ndkcaqiwurhqfebt4kn").toString();
  let U = "activtyId=listenAward&currentTimeMillis=" + J + "&listenTime=" + v + "&nativeListenTime=" + v + "&signature=" + I + "&uid=" + xmlyjsbapp[m].uid;
  await getReqObject(P, U, m);
  requestObjects[m].headers["Content-Type"] = "application/x-www-form-urlencoded";
  await httpRequest("post", requestObjects[m], printCaller());
  let C = httpResult;
  C != null ? ($.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 阅读时长增加到=> " + (C.nativeListenTime / 60).toFixed(1) + "分钟"), xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 阅读时长增加到=> " + (C.nativeListenTime / 60).toFixed(1) + "分钟\n") : ($.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 阅读时长增加=> " + C.msg), xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 阅读时长增加=> " + C.msg + "\n");
}
async function doTasks(v) {
  const P = "https://m.ximalaya.com/speed/web-earn/task/record?taskLabels=1,2";
  let J = "";
  await getReqObject(P, J, v);
  await httpRequest("get", requestObjects[v], printCaller());
  let I = httpResult;
  if (I != null) {
    let C = I.taskList;
    for (let z = 0; z < C.length; z++) {
      let d = C[z];
      if (d.taskId == 65) {
        let F = d.step - d.process;
        for (let y = 0; y < F; y++) {
          let E = await getToken(v);
          await $.wait(helpUtils.randomNum(10000, 15000));
          await getScore(v, E, 2, d.title + "(" + (d.process + y + 1) + "/" + d.step + ")");
        }
      }
    }
  } else {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 任务中心=> " + I.msg);
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 任务中心=> " + I.msg + "\n";
  }
}
async function signInfo(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/check-in/record?time=" + helpUtils.ts13();
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null) {
    let U = J.receivedToday;
    if (U == null || U == false) {
      let C = J.checkInDetails[J.thatDay - 1];
      await signIn(m, C.checkInAward);
    }
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签到记录=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签到记录=> " + J.msg + "\n";
  }
}
async function signIn(m, v) {
  const P = "https://m.ximalaya.com/speed/web-earn/check-in/check";
  let J = helpUtils.createDayjs(),
    I = J().format("YYYYMMDD");
  await selectChannel(m, "date=" + I + "&uid=" + xmlyjsbapp[m].uid);
  let U = requestSigns[m];
  let C = "{\"checkData\":\"" + U + "\",\"makeUp\":false}";
  await getReqObject(P, C, m);
  await httpRequest("post", requestObjects[m], printCaller());
  let z = httpResult;
  if (z != null) {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签到=> 签到成功，获得" + v + "金币");
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签到=> 签到成功，获得" + v + "金币\n";
    let B = await getToken(m);
    await $.wait(helpUtils.randomNum(10000, 15000));
    await getScore(m, B, 1, "每日签到看广告奖励");
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签到=> " + z.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 签到=> " + z.msg + "\n";
  }
}
async function getToken(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/ad/token";
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null) {
    return J.id;
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 获取广告token=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 获取广告token=> " + J.msg + "\n";
  }
}
async function getScore(m, v, a, P) {
  const I = "https://m.ximalaya.com/speed/web-earn/ad/score";
  let U = CryptoJS.MD5("businesstype=" + a + "&token=" + v + "&uid=" + xmlyjsbapp[m].uid + "&q35435432sadks2i3546p2ndkcaqiwurhqfebt4kn").toString(),
    C = "{\"sign\":\"" + U + "\",\"businessType\":" + a + "}";
  await getReqObject(I, C, m);
  await httpRequest("post", requestObjects[m], printCaller());
  let z = httpResult;
  if (z != null) {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: " + P + "=> " + z.coin + "金币");
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: " + P + "=> " + z.coin + "金币\n";
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: " + P + "=> " + z.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: " + P + "=> " + z.msg + "\n";
  }
}
async function redPacketInfo(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/redPacket/config";
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null && J.code == 0) {
    if (J.data.waitTime == 0) {
      let U = J.data.stageId;
      await receiveRedPacketReward(m, 1, U);
      await $.wait(helpUtils.randomNum(10000, 15000));
      await receiveRedPacketReward(m, 2, U);
    }
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 宝箱信息=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 宝箱信息=> " + J.msg + "\n";
  }
}
async function receiveRedPacketReward(v, a, P) {
  const I = "https://m.ximalaya.com/speed/web-earn/redPacket/receive/v2";
  let U = helpUtils.ts13();
  await selectChannel(v, "stageId=" + P + "&receiveType=" + a + "&timestamp=" + U + "&uid=" + xmlyjsbapp[v].uid);
  let C = requestSigns[v];
  const z = {
    receiveType: a,
    signature: C,
    timestamp: U,
    stageId: P
  };
  await getReqObject(I, JSON.stringify(z), v);
  await httpRequest("post", requestObjects[v], printCaller());
  let d = httpResult;
  if (d != null && d.code == 0) {
    a == 1 ? ($.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 打开宝箱=> 获得" + d.data.score + "金币"), xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 打开宝箱=> 获得" + d.data.score + "金币\n") : ($.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 开宝箱看广告得双倍奖励=> 获得" + d.data.score + "金币"), xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 开宝箱看广告得双倍奖励=> 获得" + d.data.score + "金币\n");
  } else {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 宝箱奖励=> " + d.msg);
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 宝箱奖励=> " + d.msg + "\n";
  }
}
async function topicInfo(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/topic/user";
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null && J.code == 0) {
    if (J.data.stamina > 0) {
      await startQuestion(m);
    }
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 宝箱信息=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 宝箱信息=> " + J.msg + "\n";
  }
}
async function startQuestion(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/topic/start";
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null && J.code == 0) {
    let I = J.data.paperId,
      U = J.data.topics.length,
      C = J.data.topics[U - 1].topicId;
    await $.wait(helpUtils.randomNum(10000, 15000));
    await receiveQuestionReward(m, 1, I, C, U);
    await $.wait(helpUtils.randomNum(10000, 15000));
    await receiveQuestionReward(m, 2, I, C, U);
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 宝箱信息=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 宝箱信息=> " + J.msg + "\n";
  }
}
async function receiveQuestionReward(v, a, P, J, I) {
  const C = "https://m.ximalaya.com/speed/web-earn/topic/reward/v2";
  let z = helpUtils.ts13();
  await selectChannel(v, "lastTopicId=" + J + "&numOfAnswers=" + I + "&receiveType=" + a + "&timestamp=" + z + "&uid=" + xmlyjsbapp[v].uid);
  let B = requestSigns[v];
  const d = {
    numOfAnswers: I,
    paperId: P,
    signature: B,
    timestamp: z,
    receiveType: a,
    lastTopicId: J
  };
  await getReqObject(C, JSON.stringify(d), v);
  await httpRequest("post", requestObjects[v], printCaller());
  let F = httpResult;
  if (F != null && F.code == 0) {
    if (a == 1) {
      $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 答题成功=> 获得" + F.data.reward + "金币");
      xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 答题成功=> " + F.data.reward + "金币\n";
    } else {
      $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 答题成功看广告=> 翻了" + F.data.multiple + "倍，获得" + F.data.reward + "金币");
      xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 答题成功看广告=> 翻了" + F.data.multiple + "倍，获得" + F.data.reward + "金币\n";
    }
  } else {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 答题奖励=> " + F.msg);
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 答题奖励=> " + F.msg + "\n";
  }
}
async function drinkInfo(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/drink/detail?timestamp=" + helpUtils.ts13();
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null && J.code == 0) {
    let U = J.data.drinks;
    for (let C = 0; C < U.length; C++) {
      let B = U[C];
      if (B.receiveStatus == 2) {
        await receiveDrinkReward(m, B, 1);
        await $.wait(helpUtils.randomNum(10000, 15000));
        await receiveDrinkReward(m, B, 2);
      } else {
        if (B.receiveStatus == 4) {
          await $.wait(helpUtils.randomNum(10000, 15000));
          await receiveDrinkReward(m, B, 3);
        }
      }
    }
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 每日喝水信息=> " + J.msg);
    xmlyjsblogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 每日喝水信息=> " + J.msg + "\n";
  }
}
async function receiveDrinkReward(v, a, P) {
  const I = "https://m.ximalaya.com/speed/web-earn/drink/receive/v2";
  let U = helpUtils.ts13();
  await selectChannel(v, "stageId=" + a.stageId + "&isDouble=" + P + "&timestamp=" + U + "&uid=" + xmlyjsbapp[v].uid);
  let C = requestSigns[v];
  const z = {
    isDouble: P,
    timestamp: U,
    signature: C,
    stageId: a.stageId
  };
  await getReqObject(I, JSON.stringify(z), v);
  await httpRequest("post", requestObjects[v], printCaller());
  let d = httpResult;
  if (d != null && d.code == 0) {
    if (P == 1) {
      $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "(" + a.description + ")=> 获得" + d.data.score + "金币");
      xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "(" + a.description + ")=> " + d.data.score + "金币\n";
    } else {
      if (P == 2) {
        $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "_看广告=> 获得" + d.data.score + "金币");
        xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "_看广告=> 获得" + d.data.score + "金币\n";
      } else {
        $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "_(补)=> 获得" + d.data.score + "金币");
        xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "_(补)=> 获得" + d.data.score + "金币\n";
      }
    }
  } else {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "=> " + d.msg);
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "=> " + d.msg + "\n";
  }
}
async function listenInfo(v) {
  const P = "https://m.ximalaya.com/speed/web-earn/listen/b/coin/config?ts=" + helpUtils.ts13();
  let J = "";
  await getReqObject(P, J, v);
  await httpRequest("get", requestObjects[v], printCaller());
  let I = httpResult;
  if (I != null && I.code == 0) {
    let U = I.data.coinList,
      C = I.data.positionList;
    const z = {
      videoAdType: 1,
      positionId: 0,
      positionName: "",
      coinSceneId: 0
    };
    let d = C.find(y => y.positionName == "sub_listentime_double_video"),
      e = C.find(y => y.positionName == "sub_listentime_video"),
      F = 375 * (hour + 1);
    for (let y = 0; y < U.length; y++) {
      let E = U[y];
      if (E.coinStatus == 1 && F >= E.listenTime) {
        if (y == U.length - 1) {
          await receiveListenReward(v, E, I.data.priodId, e);
          await $.wait(helpUtils.randomNum(10000, 15000));
          await receiveListenReward(v, E, I.data.priodId, d);
          await $.wait(helpUtils.randomNum(5000, 10000));
        } else {
          await receiveListenReward(v, E, I.data.priodId, z);
          await $.wait(helpUtils.randomNum(10000, 15000));
          await receiveListenReward(v, E, I.data.priodId, d);
          await $.wait(helpUtils.randomNum(5000, 10000));
        }
      } else {
        if (E.coinStatus == 3 && E.hasDouble == false) {
          await receiveListenReward(v, E, I.data.priodId, d);
        }
      }
    }
  } else {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 听书奖励信息=> " + I.msg);
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 听书奖励信息=> " + I.msg + "\n";
  }
}
async function receiveListenReward(v, a, P, J) {
  const U = "https://m.ximalaya.com/speed/web-earn/listen/b/award";
  let C = helpUtils.ts13(),
    z = "priodId=" + P + "&stageId=" + a.stageId + "&listenTime=" + a.listenTime + "&coinSceneId=" + J.coinSceneId + "&positionId=" + J.positionId + "&positionName=" + J.positionName + "&timestamp=" + C + "&randomDouble=" + J.videoAdType;
  await selectChannel(v, z);
  let B = requestSigns[v];
  const d = {
    stageId: a.stageId,
    positionName: J.positionName,
    randomDouble: J.videoAdType,
    priodId: P,
    signature: B,
    positionId: J.positionId,
    coinSceneId: J.coinSceneId,
    timestamp: C,
    listenTime: a.listenTime
  };
  await getReqObject(U, JSON.stringify(d), v);
  await httpRequest("post", requestObjects[v], printCaller());
  let F = httpResult;
  if (F != null && F.code == 0) {
    if (J.videoAdType == 1) {
      $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "(" + a.comment + ")=> 获得" + F.data.coinNum + "金币");
      xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "(" + a.comment + ")=> " + F.data.coinNum + "金币\n";
    } else {
      J.videoAdType == 2 && ($.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "_看广告=> 获得" + F.data.coinNum + "金币"), xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "_看广告=> 获得" + F.data.coinNum + "金币\n");
    }
  } else {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "=> " + F.msg);
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: " + a.title + "=> " + F.msg + "\n";
  }
}
async function receiveYesterdayReward(v, a) {
  let J = helpUtils.ts13();
  const I = "https://m.ximalaya.com/speed/web-earn/account/showAward/receive?ts=" + J;
  await selectChannel(v, "stageId=" + a + "&timestamp=" + J + "&uid=" + xmlyjsbapp[v].uid);
  let U = requestSigns[v];
  const C = {
    stageId: a,
    signature: U,
    timestamp: J
  };
  await getReqObject(I, JSON.stringify(C), v);
  await httpRequest("post", requestObjects[v], printCaller());
  let B = httpResult;
  if (B != null && B.ret == 0) {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 昨日盈利奖励=> " + B.data.extraAward + "金币");
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 昨日盈利奖励=> " + B.data.extraAward + "金币\n";
  } else {
    $.log("[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 昨日盈利奖励=> " + B.msg);
    xmlyjsblogs[v] += "[账号" + (v + 1 < 10 ? "0" + (v + 1) : v + 1) + "]: 昨日盈利奖励=> " + B.msg + "\n";
  }
}
async function thirdAccountInfo(m) {
  const a = "https://m.ximalaya.com/speed/web-earn/account/third-pay-account/3";
  let P = "",
    J = null;
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let I = httpResult;
  if (I != null && I.code == 0) {
    let C = I.data;
    C.length > 0 && (J = C[0]);
    return J;
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 账户信息=> " + I.msg);
    qjxslogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 账户信息=> " + I.msg + "\n";
  }
}
async function withdraw(m, v) {
  const P = "https://m.ximalaya.com/speed/web-earn/account/take-out";
  let J = await thirdAccountInfo(m);
  if (J == null) {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 账户信息=> 请绑定支付宝，再尝试提现");
    qjxslogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 账户信息=> 请绑定支付宝，再尝试提现\n";
    return;
  }
  let I = helpUtils.ts13(),
    U = "accountType=" + J.accountType + "&accountNumber=" + J.accountNumber + "&amount=" + v + "&timestamp=" + I + "&uid=" + xmlyjsbapp[m].uid;
  await selectChannel(m, U);
  let C = requestSigns[m],
    z = {
      signature: C,
      timestamp: parseInt(I),
      name: J.name,
      accountType: J.accountType,
      accountNumber: J.accountNumber,
      amount: v,
      takeOutType: 2
    };
  await getReqObject(P, JSON.stringify(z), m);
  await httpRequest("post", requestObjects[m], printCaller());
  let B = httpResult;
  if (B != null && B.code == 0) {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 提现=> 成功提现" + v + "元");
    qjxslogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 提现=> 成功提现" + v + "元\n";
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 提现结果=> " + B.msg);
    qjxslogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 提现结果=> " + B.msg + "\n";
  }
}
async function cashPageInfo(m) {
  const a = "https://m.ximalaya.com/growth-ssr-speed-welfare-center/page/withdraw?_full_with_transparent_bar=1";
  let P = "";
  await getReqObject(a, P, m);
  await httpRequest("get", requestObjects[m], printCaller());
  let J = httpResult;
  if (J != null) {
    const U = helpUtils.createCheerio(),
      C = U.load(J);
    let z = JSON.parse(C("#__NEXT_DATA__").text()),
      B = z.props.pageProps.config.continuousDays,
      d = z.props.pageProps.coin.total,
      e = z.props.pageProps.config.alipayTakeOutInfo.activityTakeOutInfo.activityList,
      y = e.find(S => S.amount == 20),
      E = e.find(S => S.amount == 50);
    if (E && E.takeOutTimes > 0 && E.leastContinuousDays <= B && d >= 500000) {
      await withdraw(m, 50);
    } else {
      if (y && y.takeOutTimes > 0 && y.leastContinuousDays <= B && d >= 200000) {
        await withdraw(m, 20);
      }
    }
  } else {
    $.log("[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 提现页面信息=> " + J.msg);
    qjxslogs[m] += "[账号" + (m + 1 < 10 ? "0" + (m + 1) : m + 1) + "]: 提现页面信息=> " + J.msg + "\n";
  }
}
function getScriptAuth(m, v, a) {
  return new Promise((J, I) => {
    const C = apiHost + "/script/permissions/lastest",
      z = {
        appName: m,
        userId: v,
        activityCode: a,
        version: version
      };
    const d = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const e = {
      url: C,
      headers: d,
      body: JSON.stringify(z)
    };
    $.post(e, async (F, y, E) => {
      if (E && E != null && E.replace(/\"/g, "").length > 50) {
        const c = E.replace(/\"/g, "").slice(34);
        helpUtils = await loadUtils(flushCash);
        CryptoJS = helpUtils.createCryptoJS();
        result = JSON.parse(CryptoJS.enc.Base64.parse(c).toString(CryptoJS.enc.Utf8));
        try {
          newest_version = result.version;
          userAuth = result.userAuth;
          scriptAuth = result.scriptAuth;
          runAuth = result.runAuth;
          systemNotify = result.notify;
          vipAuth = result.vipAuth;
          isCharge = result.isCharge;
          multiAccount = result.runAcounts;
          buyCount = result.buyCount;
          runedCounts = result.runedCounts;
          runTotalCounts = result.runTotalCounts;
          userRank = result.userRank;
          invicode = result.invicate;
          numbers = result.accountNumbers;
          vipDate = result.vipDate;
        } catch (t) {
          $.log(t);
        }
      } else {
        $.log("请求服务器接口出现错误，请检查网络连接情况");
      }
      J();
    });
  });
}
function runComplete(m, v) {
  return new Promise((P, J) => {
    const U = apiHost + "/script/run/add",
      C = {
        appName: m,
        userId: v,
        activityCode: activeCode,
        version: version
      };
    const B = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const d = {
      url: U,
      headers: B,
      body: JSON.stringify(C)
    };
    $.post(d, async (e, F, y) => {
      P();
    });
  });
}
function loadToken(v) {
  let J = xmlyjsbapp[v].mobile;
  xmlyjsb_item = xmlyjsb_cks["" + J];
  if (xmlyjsb_item) {
    xmlyjsbapp[v].refreshToken = xmlyjsb_item.refreshToken;
    xmlyjsbapp[v].accessToken = xmlyjsb_item.accessToken;
    return true;
  } else {
    return false;
  }
}
function saveToken(m) {
  xmlyjsb_cks[xmlyjsbapp[m].mobile] = {
    refreshToken: xmlyjsbapp[m].refreshToken,
    accessToken: xmlyjsbapp[m].accessToken,
    ts: ts13()
  };
}
async function loadUtils(m) {
  await redisGet(0, "fee_script_path", "address");
  let a = redisGetInfos[0],
    P = $.getdata("Utils_Code") || "";
  if (!m && P && Object.keys(P).length) {
    $.log("📢 缓存中存在JS-Utils");
    eval(P);
    return creatUtils();
  }
  $.log("📢 开始初始化JS-Utils");
  return new Promise(async I => {
    $.getScript(a + "/scripts/tools/JS-Utils.js").then(C => {
      $.setdata(C, "Utils_Code");
      eval(C);
      $.log("📢 JS-Utils加载成功");
      I(creatUtils());
    });
  });
}
function checkAddress(m, v) {
  return new Promise((P, J) => {
    const U = setTimeout(() => {
        P(false);
      }, v),
      C = http.get(m, z => {
        clearTimeout(U);
        if (z.statusCode === 404) {
          P(true);
        } else {
          P(false);
        }
      });
    C.on("error", z => {
      clearTimeout(U);
      P(false);
    });
    C.on("timeout", () => {
      C.abort();
      J(new Error("请求超时"));
    });
  });
}
async function fetchRequest(m, v = 3000) {
  return new Promise((P, J) => {
    const C = {
      url: m + "/docs"
    };
    setTimeout(() => {
      P(false);
    }, v);
    $.get(C, async (z, B, d) => {
      B.status == 401 ? P(true) : P(false);
    });
  });
}
async function httpClientRequest(m, v = 3000) {
  return new Promise((P, J) => {
    const I = {
      url: m + "/"
    };
    setTimeout(() => {
      P(false);
    }, v);
    $httpClient.get(I, async (U, C, z) => {
      if (z == "{\"detail\":\"Not Found\"}") {
        P(true);
      } else {
        P(false);
      }
    });
  });
}
async function redisGet(m, v, a) {
  return new Promise((J, I) => {
    const z = apiHost + "/redis/hash/get/" + v + "/" + a,
      B = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
    const d = {
      url: z,
      headers: B
    };
    $.get(d, async (F, y, E) => {
      const S = E.replace(/\"/g, "");
      redisGetInfos[m] = S;
      J();
    });
  });
}
function redisSet(m, v, a) {
  return new Promise((J, I) => {
    const U = apiHost + "/redis/hash/set",
      C = {
        key: m,
        hashKey: v,
        hashValue: a
      };
    const B = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const d = {
      url: U,
      headers: B,
      body: JSON.stringify(C)
    };
    $.post(d, async (e, F, y) => {
      J();
    });
  });
}
function redisPop(m) {
  return new Promise((a, P) => {
    const J = apiHost + "/redis/set/pop/" + m,
      I = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
    const U = {
      url: J,
      headers: I
    };
    $.get(U, async (z, B, d) => {
      const y = d.replace(/\"/g, "");
      popCookie = y;
      a();
    });
  });
}
async function getReqObject(a, P, J) {
  let U = "ting_v3.0.31_c5(CFNetwork, iOS 16.6.1, iPhone10,2) ;xmly(lite)/3.0.31/ios_1";
  xmlyjsbapp[J].ua && xmlyjsbapp[J].ua != "" && (U = xmlyjsbapp[J].ua);
  let C = getHostname(a);
  const z = {};
  z["Content-Type"] = "application/json";
  z["User-Agent"] = U;
  z.Cookie = xmlyjsbapp[J].cookie;
  z.Host = C;
  const B = {};
  B.url = a;
  B.headers = z;
  let d = B;
  if (P) {
    d.body = P;
  }
  requestObjects[J] = d;
  return d;
}
function getReqObject_(a, P, J) {
  let U = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f34) NetType/WIFI Language/zh_CN";
  if (xmlyjsbapp[J].ua && xmlyjsbapp[J].ua != "") {
    U = xmlyjsbapp[J].ua;
  }
  let C = getHostname(a);
  const z = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": U,
    Authorization: xmlyjsbapp[J].auth,
    Host: C
  };
  const B = {
    url: a,
    headers: z
  };
  if (P) {
    B.body = P;
  }
  requestObjects[J] = B;
  return B;
}
async function httpRequest(m, v, a) {
  httpResult = null;
  return new Promise(J => {
    $[m](v, async (U, C, z) => {
      try {
        if (U) {
          $.log(a + ": " + m + "请求失败");
          $.log(JSON.stringify(U));
          $.logErr(U);
        } else {
          const i = new URL(v.url);
          if (i.pathname.indexOf("page/withdraw") != -1) {
            httpResult = z;
          } else {
            if (safeGet(z)) {
              httpResult = JSON.parse(z);
            } else {
              const t = new URL(v.url);
              $.log(t.pathname + "发起" + m + "请求时，出现错误，请处理");
            }
          }
        }
      } catch (G) {
        $.logErr(G, C);
      } finally {
        J(httpResult);
      }
    });
  });
}
async function selectChannel(m, v) {
  if (channels_status[m] == 0) {
    await getSign_(m, v);
  } else {
    await getSign(m, v);
  }
}
function getSign_(m, v) {
  return new Promise((P, J) => {
    function C(z) {
      let d = z.toString("utf8");
      requestSigns[m] = d;
      wss[m].removeListener("message", C);
      P(d);
    }
    wss[m].on("message", C);
    if (wss[m].readyState === 1) {
      const B = {
        method: appName,
        params: {}
      };
      B.params.content = v;
      B.params.appName = appName;
      B.params.uuid = userId;
      wss[m].send(JSON.stringify(B), d => {
        if (d) {
          J(d);
        }
      });
    } else {
      P(getSign(m, v));
      wss[m].removeListener("message", C);
    }
  });
}
function getSign(m, v) {
  return new Promise((P, J) => {
    const U = apiHost + "/sign/xmly",
      C = {
        content: v,
        appName: appName,
        uuid: userId
      };
    const B = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const d = {
      url: U,
      headers: B,
      body: JSON.stringify(C)
    };
    $.post(d, async (e, F, y) => {
      const S = y.replace(/\"/g, "");
      requestSigns[m] = S;
      P();
    });
  });
}
function sortUrlParams(m, v, a) {
  const J = url2obj(m);
  v.forEach(C => {
    delete J[C];
  });
  Object.assign(J, a);
  const I = Object.keys(J).sort(),
    U = I.map(C => C + "=" + J[C]).join("&");
  return U;
}
function url2obj(v) {
  v = v.replace(/\"/g, "");
  var J;
  var I = {},
    U = v.slice(v.indexOf("?") + 1).split("&");
  for (var C = 0; C < U.length; C++) {
    J = U[C].split("=");
    I[J[0]] = J[1];
  }
  return I;
}
function convertStringToJson(v) {
  const J = v.replace(/[{} ]/g, "");
  const I = J.split(","),
    U = {};
  I.forEach(C => {
    const [B, d] = C.split("=");
    U[B] = d;
  });
  return U;
}
function getHostname(v) {
  let J = v.substr(v.indexOf("//") + 2),
    I = J.substr(0, J.indexOf("/"));
  let U = "",
    C = I.indexOf(":");
  if (C > 0) {
    U = I.substr(0, C);
  } else {
    U = I;
  }
  return U;
}
function calculateTimeDifference(v, a) {
  var C = new Date(v);
  var d = new Date(a);
  var z = d - C;
  var B = Math.floor(z / 1000);
  return B;
}
function cutString(v, a) {
  if (v.length * 2 <= a) {
    return v;
  }
  var I = 0,
    U = "";
  for (var C = 0; C < v.length; C++) {
    U = U + v.charAt(C);
    if (v.charCodeAt(C) > 128) {
      I = I + 2;
      if (I >= a) {
        return U.substring(0, U.length - 1) + "...";
      }
    } else {
      I = I + 1;
      if (I >= a) {
        return U.substring(0, U.length - 2) + "...";
      }
    }
  }
  return U;
}
function printCaller() {
  return new Error().stack.split("\n")[3].split("@")[0];
}
function safeGet(m) {
  try {
    if (typeof JSON.parse(m) == "object") {
      return true;
    }
  } catch (J) {
    console.log(J);
    console.log("服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function jsonToUrl(m) {
  var a = Object.keys(m).map(function (P) {
    return encodeURIComponent(P) + "=" + encodeURIComponent(m[P]);
  }).join("&");
  return a;
}
function compileStr(m) {
  var a = String.fromCharCode(m.charCodeAt(0) + m.length);
  for (var P = 1; P < m.length; P++) {
    a += String.fromCharCode(m.charCodeAt(P) + m.charCodeAt(P - 1));
  }
  return escape(a);
}
function uncompileStr(m) {
  m = unescape(m);
  var a = String.fromCharCode(m.charCodeAt(0) - m.length);
  for (var P = 1; P < m.length; P++) {
    a += String.fromCharCode(m.charCodeAt(P) - a.charCodeAt(P - 1));
  }
  return a;
}
function randomMac() {
  return "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
  });
}
function txt_api(m) {
  return new Promise((a, P) => {
    const U = "https://v1.hitokoto.cn/?c=e",
      C = {
        accept: "application/json"
      };
    const z = {
      url: U,
      headers: C
    };
    $.get(z, async (d, e, F) => {
      let S = JSON.parse(F),
        c = S.hitokoto;
      contents[m] = c + " " + c;
      a();
    });
  });
}
function getTime_8() {
  return new Promise((v, a) => {
    const J = "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
      I = {
        url: J
      };
    $.get(I, async (C, z, B) => {
      v(B);
    });
  });
}
function message() {
  tz == 1 && $.msg($.name, "", $.message);
}
async function sendMsg(v) {
  if (hour == 9 || hour == 12 || hour == 18) {
    if (tz == 1) {
      if ($.isNode()) {
        await notify.sendNotify($.name, v);
      } else {
        $.msg($.name, "", v);
      }
    } else {
      $.log(v);
    }
  }
}
async function wxPush(m, v, a) {
  return new Promise((J, I) => {
    const C = "https://wxpusher.zjiecode.com/api/send/message",
      z = {
        appToken: "AT_6BZsE2IyJuVLPp3mcOkKvpoF245GR9xn",
        content: v,
        summary: "快手答题余额通知",
        contentType: 1,
        uids: [a],
        verifyPay: false
      };
    const d = {
      "Content-Type": "application/json"
    };
    const e = {
      url: C,
      headers: d,
      body: JSON.stringify(z)
    };
    $.post(e, async (F, y, E) => {
      J();
    });
  });
}
function Env(m, v) {
  class P {
    constructor(J) {
      this.env = J;
    }
    send(J, I = "GET") {
      J = "string" == typeof J ? {
        url: J
      } : J;
      let z = this.get;
      "POST" === I && (z = this.post);
      return new Promise((B, d) => {
        z.call(this, J, (y, E, S) => {
          y ? d(y) : B(E);
        });
      });
    }
    get(J) {
      return this.send.call(this.env, J);
    }
    post(J) {
      return this.send.call(this.env, J, "POST");
    }
  }
  return new class {
    constructor(J, I) {
      const U = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      const C = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevels = U;
      this.logLevelPrefixs = C;
      this.logLevel = "info";
      this.name = J;
      this.http = new P(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, I);
      this.log("", "🔔 " + this.name + ", 开始!");
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(J, I = null) {
      try {
        return JSON.parse(J);
      } catch {
        return I;
      }
    }
    toStr(J, I = null, ...U) {
      try {
        return JSON.stringify(J, ...U);
      } catch {
        return I;
      }
    }
    getjson(J, I) {
      let C = I;
      if (this.getdata(J)) {
        try {
          C = JSON.parse(this.getdata(J));
        } catch {}
      }
      return C;
    }
    setjson(J, I) {
      try {
        return this.setdata(JSON.stringify(J), I);
      } catch {
        return !1;
      }
    }
    getScript(J) {
      return new Promise(U => {
        const z = {
          url: J
        };
        this.get(z, (B, d, F) => U(F));
      });
    }
    runScript(J, I) {
      return new Promise(U => {
        let z = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        z = z ? z.replace(/\n/g, "").trim() : z;
        let B = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        B = B ? 1 * B : 20;
        B = I && I.timeout ? I.timeout : B;
        const d = {
          script_text: J,
          mock_type: "cron",
          timeout: B
        };
        const [F, y] = z.split("@"),
          E = {
            url: "http://" + y + "/v1/scripting/evaluate",
            body: d,
            headers: {
              "X-Key": F,
              Accept: "*/*"
            },
            timeout: B
          };
        this.post(E, (S, c, N) => U(N));
      }).catch(U => this.logErr(U));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const U = this.path.resolve(this.dataFile),
          C = this.path.resolve(process.cwd(), this.dataFile),
          z = this.fs.existsSync(U),
          B = !z && this.fs.existsSync(C);
        if (!z && !B) {
          return {};
        }
        {
          const d = z ? U : C;
          try {
            return JSON.parse(this.fs.readFileSync(d));
          } catch (y) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const I = this.path.resolve(this.dataFile),
          U = this.path.resolve(process.cwd(), this.dataFile),
          C = this.fs.existsSync(I),
          z = !C && this.fs.existsSync(U),
          B = JSON.stringify(this.data);
        C ? this.fs.writeFileSync(I, B) : z ? this.fs.writeFileSync(U, B) : this.fs.writeFileSync(I, B);
      }
    }
    lodash_get(J, I, U) {
      const z = I.replace(/\[(\d+)\]/g, ".$1").split(".");
      let B = J;
      for (const d of z) if (B = Object(B)[d], void 0 === B) {
        return U;
      }
      return B;
    }
    lodash_set(J, I, U) {
      Object(J) !== J || (Array.isArray(I) || (I = I.toString().match(/[^.[\]]+/g) || []), I.slice(0, -1).reduce((C, z, B) => Object(C[z]) === C[z] ? C[z] : C[z] = Math.abs(I[B + 1]) >> 0 == +I[B + 1] ? [] : {}, J)[I[I.length - 1]] = U);
      return J;
    }
    getdata(J) {
      let C = this.getval(J);
      if (/^@/.test(J)) {
        const [, B, d] = /^@(.*?)\.(.*?)$/.exec(J),
          F = B ? this.getval(B) : "";
        if (F) {
          try {
            const E = JSON.parse(F);
            C = E ? this.lodash_get(E, d, "") : C;
          } catch (S) {
            C = "";
          }
        }
      }
      return C;
    }
    setdata(J, I) {
      let U = !1;
      if (/^@/.test(I)) {
        const [, z, B] = /^@(.*?)\.(.*?)$/.exec(I),
          d = this.getval(z),
          F = z ? "null" === d ? null : d || "{}" : "{}";
        try {
          const y = JSON.parse(F);
          this.lodash_set(y, B, J);
          U = this.setval(JSON.stringify(y), z);
        } catch (S) {
          const N = {};
          this.lodash_set(N, B, J);
          U = this.setval(JSON.stringify(N), z);
        }
      } else {
        U = this.setval(J, I);
      }
      return U;
    }
    getval(J) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(J);
        case "Quantumult X":
          return $prefs.valueForKey(J);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[J];
        default:
          return this.data && this.data[J] || null;
      }
    }
    setval(J, I) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(J, I);
        case "Quantumult X":
          return $prefs.setValueForKey(J, I);
        case "Node.js":
          this.data = this.loaddata();
          this.data[I] = J;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[I] || null;
      }
    }
    initGotEnv(J) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      J && (J.headers = J.headers ? J.headers : {}, J && (J.headers = J.headers ? J.headers : {}, void 0 === J.headers.cookie && void 0 === J.headers.Cookie && void 0 === J.cookieJar && (J.cookieJar = this.ckjar)));
    }
    get(J, I = () => {}) {
      const z = {
        redirection: !1
      };
      switch (J.headers && (delete J.headers["Content-Type"], delete J.headers["Content-Length"], delete J.headers["content-type"], delete J.headers["content-length"]), J.params && (J.url += "?" + this.queryStr(J.params)), void 0 === J.followRedirect || J.followRedirect || ((this.isSurge() || this.isLoon()) && (J["auto-redirect"] = !1), this.isQuanX() && (J.opts ? J.opts.redirection = !1 : J.opts = z)), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          const B = {
            "X-Surge-Skip-Scripting": !1
          };
          this.isSurge() && this.isNeedRewrite && (J.headers = J.headers || {}, Object.assign(J.headers, B));
          $httpClient.get(J, (y, E, S) => {
            !y && E && (E.body = S, E.statusCode = E.status ? E.status : E.statusCode, E.status = E.statusCode);
            I(y, E, S);
          });
          break;
        case "Quantumult X":
          const d = {};
          d.hints = !1;
          this.isNeedRewrite && (J.opts = J.opts || {}, Object.assign(J.opts, d));
          $task.fetch(J).then(y => {
            const {
                statusCode: S,
                statusCode: c,
                headers: N,
                body: h,
                bodyBytes: R
              } = y,
              G = {
                status: S,
                statusCode: c,
                headers: N,
                body: h,
                bodyBytes: R
              };
            I(null, G, h, R);
          }, y => I(y && y.error || "UndefinedError"));
          break;
        case "Node.js":
          let F = require("iconv-lite");
          this.initGotEnv(J);
          this.got(J).on("redirect", (y, E) => {
            try {
              if (y.headers["set-cookie"]) {
                const c = y.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                c && this.ckjar.setCookieSync(c, null);
                E.cookieJar = this.ckjar;
              }
            } catch (h) {
              this.logErr(h);
            }
          }).then(y => {
            const {
                statusCode: S,
                statusCode: c,
                headers: N,
                rawBody: h
              } = y,
              R = F.decode(h, this.encoding),
              G = {
                status: S,
                statusCode: c,
                headers: N,
                rawBody: h,
                body: R
              };
            I(null, G, R);
          }, y => {
            const {
              message: E,
              response: S
            } = y;
            I(E, S, S && F.decode(S.rawBody, this.encoding));
          });
          break;
      }
    }
    post(J, I = () => {}) {
      const C = J.method ? J.method.toLocaleLowerCase() : "post";
      const z = {
        redirection: !1
      };
      switch (J.body && J.headers && !J.headers["Content-Type"] && !J.headers["content-type"] && (J.headers["content-type"] = "application/x-www-form-urlencoded"), J.headers && (delete J.headers["Content-Length"], delete J.headers["content-length"]), void 0 === J.followRedirect || J.followRedirect || ((this.isSurge() || this.isLoon()) && (J["auto-redirect"] = !1), this.isQuanX() && (J.opts ? J.opts.redirection = !1 : J.opts = z)), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          const B = {
            "X-Surge-Skip-Scripting": !1
          };
          this.isSurge() && this.isNeedRewrite && (J.headers = J.headers || {}, Object.assign(J.headers, B));
          $httpClient[C](J, (S, c, N) => {
            !S && c && (c.body = N, c.statusCode = c.status ? c.status : c.statusCode, c.status = c.statusCode);
            I(S, c, N);
          });
          break;
        case "Quantumult X":
          const d = {
            hints: !1
          };
          J.method = C;
          this.isNeedRewrite && (J.opts = J.opts || {}, Object.assign(J.opts, d));
          $task.fetch(J).then(S => {
            const {
              statusCode: c,
              statusCode: N,
              headers: h,
              body: R,
              bodyBytes: G
            } = S;
            const q = {
              status: c,
              statusCode: N,
              headers: h,
              body: R,
              bodyBytes: G
            };
            I(null, q, R, G);
          }, S => I(S && S.error || "UndefinedError"));
          break;
        case "Node.js":
          let F = require("iconv-lite");
          this.initGotEnv(J);
          const {
            url: y,
            ...E
          } = J;
          this.got[C](y, E).then(S => {
            const {
                statusCode: c,
                statusCode: N,
                headers: h,
                rawBody: R
              } = S,
              G = F.decode(R, this.encoding),
              q = {
                status: c,
                statusCode: N,
                headers: h,
                rawBody: R,
                body: G
              };
            I(null, q, G);
          }, S => {
            const {
              message: c,
              response: N
            } = S;
            I(c, N, N && F.decode(N.rawBody, this.encoding));
          });
          break;
      }
    }
    time(J, I = null) {
      const U = I ? new Date(I) : new Date();
      let C = {
        "M+": U.getMonth() + 1,
        "d+": U.getDate(),
        "H+": U.getHours(),
        "m+": U.getMinutes(),
        "s+": U.getSeconds(),
        "q+": Math.floor((U.getMonth() + 3) / 3),
        S: U.getMilliseconds()
      };
      /(y+)/.test(J) && (J = J.replace(RegExp.$1, (U.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let z in C) new RegExp("(" + z + ")").test(J) && (J = J.replace(RegExp.$1, 1 == RegExp.$1.length ? C[z] : ("00" + C[z]).substr(("" + C[z]).length)));
      return J;
    }
    queryStr(J) {
      let I = "";
      for (const U in J) {
        let C = J[U];
        null != C && "" !== C && ("object" == typeof C && (C = JSON.stringify(C)), I += U + "=" + C + "&");
      }
      I = I.substring(0, I.length - 1);
      return I;
    }
    msg(J = m, I = "", U = "", C = {}) {
      const z = B => {
        const {
          $open: F,
          $copy: y,
          $media: E,
          $mediaMime: S
        } = B;
        switch (typeof B) {
          case void 0:
            return B;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                const c = {
                  url: B
                };
                return c;
              case "Loon":
              case "Shadowrocket":
                return B;
              case "Quantumult X":
                const N = {
                  "open-url": B
                };
                return N;
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                {
                  const h = {};
                  let R = B.openUrl || B.url || B["open-url"] || F;
                  R && Object.assign(h, {
                    action: "open-url",
                    url: R
                  });
                  let G = B["update-pasteboard"] || B.updatePasteboard || y;
                  if (G && Object.assign(h, {
                    action: "clipboard",
                    text: G
                  }), E) {
                    let A, X, w;
                    if (E.startsWith("http")) {
                      A = E;
                    } else {
                      if (E.startsWith("data:")) {
                        const [L] = E.split(";"),
                          [, g] = E.split(",");
                        X = g;
                        w = L.replace("data:", "");
                      } else {
                        X = E;
                        w = (K => {
                          const T = {
                            JVBERi0: "application/pdf",
                            R0lGODdh: "image/gif",
                            R0lGODlh: "image/gif",
                            iVBORw0KGgo: "image/png",
                            "/9j/": "image/jpg"
                          };
                          for (var M in T) if (0 === K.indexOf(M)) {
                            return T[M];
                          }
                          return null;
                        })(E);
                      }
                    }
                    Object.assign(h, {
                      "media-url": A,
                      "media-base64": X,
                      "media-base64-mime": S ?? w
                    });
                  }
                  const q = {
                    "auto-dismiss": B["auto-dismiss"],
                    sound: B.sound
                  };
                  Object.assign(h, q);
                  return h;
                }
              case "Loon":
                {
                  const K = {};
                  let T = B.openUrl || B.url || B["open-url"] || F;
                  T && Object.assign(K, {
                    openUrl: T
                  });
                  let b = B.mediaUrl || B["media-url"];
                  E?.["startsWith"]("http") && (b = E);
                  b && Object.assign(K, {
                    mediaUrl: b
                  });
                  console.log(JSON.stringify(K));
                  return K;
                }
              case "Quantumult X":
                {
                  const M = {};
                  let k = B["open-url"] || B.url || B.openUrl || F;
                  k && Object.assign(M, {
                    "open-url": k
                  });
                  let Q = B["media-url"] || B.mediaUrl;
                  E?.["startsWith"]("http") && (Q = E);
                  Q && Object.assign(M, {
                    "media-url": Q
                  });
                  let u = B["update-pasteboard"] || B.updatePasteboard || y;
                  u && Object.assign(M, {
                    "update-pasteboard": u
                  });
                  console.log(JSON.stringify(M));
                  return M;
                }
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(J, I, U, z(C));
            break;
          case "Quantumult X":
            $notify(J, I, U, z(C));
            break;
          case "Node.js":
            break;
        }
      }
      if (!this.isMuteLog) {
        let B = ["", "==============📣系统通知📣=============="];
        B.push(J);
        I && B.push(I);
        U && B.push(U);
        console.log(B.join("\n"));
        this.logs = this.logs.concat(B);
      }
    }
    debug(...J) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (J.length > 0 && (this.logs = [...this.logs, ...J]), console.log("" + this.logLevelPrefixs.debug + J.map(I => I ?? String(I)).join(this.logSeparator)));
    }
    info(...J) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (J.length > 0 && (this.logs = [...this.logs, ...J]), console.log("" + this.logLevelPrefixs.info + J.map(I => I ?? String(I)).join(this.logSeparator)));
    }
    warn(...J) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (J.length > 0 && (this.logs = [...this.logs, ...J]), console.log("" + this.logLevelPrefixs.warn + J.map(I => I ?? String(I)).join(this.logSeparator)));
    }
    error(...J) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (J.length > 0 && (this.logs = [...this.logs, ...J]), console.log("" + this.logLevelPrefixs.error + J.map(I => I ?? String(I)).join(this.logSeparator)));
    }
    log(...J) {
      J.length > 0 && (this.logs = [...this.logs, ...J]);
      console.log(J.map(I => I ?? String(I)).join(this.logSeparator));
    }
    logErr(J, I) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", "❗️" + this.name + ", 错误!", I, J);
          break;
        case "Node.js":
          this.log("", "❗️" + this.name + ", 错误!", I, void 0 !== J.message ? J.message : J, J.stack);
          break;
      }
    }
    wait(J) {
      return new Promise(I => setTimeout(I, J));
    }
    done(J = {}) {
      const I = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", "🔔" + this.name + ", 结束! 🕛 " + I + " 秒"), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(J);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(m, v);
}