//Thu Aug 28 2025 12:28:11 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("南方Plus"),
  version = "V1.0.0",
  appName = "nfpapp";
let nfpapp = $.getjson(appName, []);
const fs = $.isNode() ? require("fs") : "";
const WebSocket = $.isNode() ? require("ws") : "",
  file = "david_cookies.js";
$.isNode() && !fs.existsSync(file) && ($.log("🔔 外挂ck文件不存在，开始创建模版>>>"), fs.writeFileSync("./david_cookies.js", "//独立CK文件，主要用来处理多账号大数据量CK,注意JRTTAPP外边不用加引号，依葫芦画瓢。\n//今日头条(三个账号)\nlet JRTTAPP = [{},{},{}]\n//番茄小说(一个账号)\nlet FQXSAPP = [{}]\n//抖音极速版(两个账号)\nlet DYJSBAPP = [{},{}]\n    \nlet APPS = {\n    JRTT: JRTTAPP,\n    FQXS: FQXSAPP,\n    DYJSB: DYJSBAPP\n}\n\nmodule.exports = APPS", U => {}));
const http = $.isNode() ? require("http") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  COOKIES = $.isNode() ? require("./david_cookies") : "";
let userId = $.getdata("tguserid") || 1;
let activeCode = $.getdata("nfpactivecode") || 0,
  nfpuserck = $.getval("nfpuserck") || 1,
  apiHost = $.getval("apiHost") || "http://106.15.104.124:8080";
$.getval("apiHosts") && (apiHost = $.getval("apiHosts"));
let flushCash = $.getval("cleanCache") || false;
const debug = 0;
let tz = $.getval("tz") || "1",
  helpUtils = undefined,
  CryptoJS = undefined,
  saveFile = false,
  wechatMiniAppId = "wxfb0905b0787971ad";
let nfp_ck_file = "nfp_cookies.json";
var hour = "",
  minute = "";
let sendlogs = "",
  nfplogs = [],
  wss = [],
  channels_status = [],
  reconectCounts = [],
  requestObjects = [],
  requestSigns = [],
  codes = [],
  articleIds = [],
  videoIds = [],
  httpResult = "",
  userAuth = "";
let scriptAuth = "",
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
  process.env.NFPAPP ? nfpapp = JSON.parse(process.env.NFPAPP) : nfpapp = COOKIES.NFP;
  userId = process.env.TGUSERID;
  activeCode = process.env.NFPACTIVECODE;
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
    if (!nfpapp) {
      $.log("📢 很抱歉，😭 没有找到账号信息！你确定配置账号信息了吗？");
      return;
    }
    $.log("📢 开始检测服务器接口状态>>>");
    let l = false;
    const z = apiHost.split("&"),
      N = z.length;
    for (let C = 0; C < N; C++) {
      if ($.isNode()) {
        l = await checkAddress("" + z[C], 2500);
      } else {
        $.isSurge() || $.isLoon() ? l = await httpClientRequest("" + z[C], 2500) : l = await fetchRequest("" + z[C], 2500);
      }
      if (l == true) {
        apiHost = z[C];
        $.log("📢 接口" + (C + 1) + "[" + z[C] + "]服务器接口正常! 🎉");
        break;
      }
      if (C == N - 1 && l == false) {
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
      let Z = new Date(vipDate).getTime(),
        Y = new Date().getTime();
      if (Y > Z) {
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
    isCharge == true ? $.log("🔔 此脚本采用付费模式。🔒") : $.log("🔔 此脚本采用免费模式。🔓");
    if (vipDate != "") {
      if (isCharge == true) {
        let y = new Date(vipDate).getTime(),
          R = new Date().getTime();
        if (R > y) {
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
    multiAccount > 1 && $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一次可以运行" + numbers * multiAccount + "个账号。");
    if (buyCount > 1) {
      $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一共可以运行" + runTotalCounts + "次, 已经运行了" + runedCounts + "次。");
    }
    if (runAuth != true) {
      $.log("❗️ 抱歉,  该用户今天可能已经达到最大运行次数，明天再试吧！");
      return;
    }
    if (nfpapp.length > numbers * multiAccount) {
      $.log("❗️ 当前用户一次最多运行" + numbers * multiAccount + "个账号，需要增加账号请查看置顶说明。");
      return;
    }
    if (nfpapp.length == 0) {
      $.log("先抓取账号ck，再运行脚本吧！");
      return;
    }
    if (runedCounts + nfpapp.length > runTotalCounts) {
      $.log("📢 一共发现了" + nfpapp.length + "个账号");
      $.log("❗️ 当前用户运行次数剩余" + (runTotalCounts - runedCounts) + "次，还可以运行" + (runTotalCounts - runedCounts) + "个账号，还需要" + (nfpapp.length - (runTotalCounts - runedCounts)) + "次，可以通过赞赏后增加运行次数！");
      return;
    }
    if (vipDate != "") {
      $.log("📢 你的会员有效期到： " + vipDate);
    }
    $.log("📢 一共发现了" + nfpapp.length + "个账号");
    if ($.isNode()) {
      if (!fs.existsSync(nfp_ck_file)) {
        nfp_cks = {};
      } else {
        nfp_cks = JSON.parse(fs.readFileSync(nfp_ck_file, "utf8"));
      }
    }
    let W = [],
      c = nfpapp.length,
      Q = 0;
    if ($.isNode() && process.env.NFP_THREAD_COUNT) {
      Q = parseInt(process.env.NFP_THREAD_COUNT);
    } else {
      Q = c;
    }
    let M = nfpapp.length;
    if (Q >= c) {
      Q = c;
      M = 1;
      $.log("📢 你设置的线程数是" + Q + "，账号个数是" + c + "，" + M + "次可全部跑完。");
      for (let U2 = 0; U2 < nfpapp.length; U2++) {
        W.push(runMultiTasks(U2));
        nfplogs[U2] = "";
        if ($.isNode()) {
          channels_status[U2] = 0;
          await init_ws(U2);
        } else {
          channels_status[U2] = 1;
        }
      }
      await Promise.allSettled(W).then(U6 => {
        if ($.isNode() && saveFile) {
          $.log("[温馨提醒]: 即将本地化token，这样可以有效降低登录次数");
          fs.writeFileSync(nfp_ck_file, JSON.stringify(nfp_cks, null, 2));
        }
        $.log("日志整理功能如下：");
        $.log("---------------日志整理开始--------------");
        for (let U9 = 0; U9 < nfpapp.length; U9++) {
          $.log(nfplogs[U9]);
          sendlogs += nfplogs[U9];
        }
        $.log("---------------日志整理结束--------------");
        sendMsg(sendlogs);
      });
    } else {
      M = Math.ceil(c / Q);
      $.log("📢 你设置的线程数是" + Q + "，账号个数是" + c + "，计算后分" + M + "次执行，一次可执行" + Q + "个账号，最后一次如果不够" + Q + "个账号，剩多少个账号就跑几个账号。");
      for (let U7 = 0; U7 < M; U7++) {
        for (let U9 = U7 * Q; U9 < Q * (U7 + 1) && U9 < c; U9++) {
          W.push(runMultiTasks(U9));
          nfplogs[U9] = "";
          channels_status[U9] = 0;
          await init_ws(U9);
        }
        await Promise.allSettled(W).then(Up => {
          W = [];
          if (U7 == M - 1) {
            $.isNode() && saveFile && ($.log("[温馨提醒]: 即将本地化token，这样可以有效降低登录次数"), fs.writeFileSync(nfp_ck_file, JSON.stringify(nfp_cks, null, 2)));
            $.log("日志整理功能如下：");
            $.log("---------------日志整理开始--------------");
            for (let Uz = 0; Uz < nfpapp.length; Uz++) {
              $.log(nfplogs[Uz]);
              sendlogs += nfplogs[Uz];
            }
            $.log("---------------日志整理结束--------------");
            sendMsg(sendlogs);
          }
        });
      }
    }
  }
})().catch(U => $.logErr(U)).finally(() => $.done());
async function runMultiTasks(U) {
  return new Promise((f, l) => {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 开始执行 working......");
    runSubTask(f, U);
  });
}
async function init_ws(U) {
  if ($.isNode()) {
    if (reconectCounts[U] > 0) {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 尝试重新连接服务器>>>>>>");
    }
    wss[U] = new WebSocket(apiHost.replace("http", "ws") + "/ws");
    wss[U].on("open", function l() {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 签名通道已连接");
    });
    wss[U].on("close", function z() {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 签名通道已关闭，原因是任务已处理完成");
    });
    wss[U].on("error", function N() {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 签名通道已关闭，原因是出现错误");
      channels_status[U] = 1;
      reconectCounts[U]++;
      if (reconectCounts[U] <= 3) {
        init_ws(U);
      }
    });
  }
}
async function runSubTask(U, p) {
  if ($.isNode()) {
    await $.wait(3000, 5000);
  }
  await userInfo(p);
  await pointV2(p);
  await aticleList(p);
  if (hour > 10) {
    await videoList(p);
  }
  await taskList(p);
  if ($.isNode()) {
    await wss[p].close();
  }
  await runComplete(appName, userId);
  U();
}
async function getCk() {
  if ($request.url.match(/\/passport\/UnionLogin/)) {
    const z = $request.body;
    let N = nfpuserck - 1;
    if (nfpapp[N]) {
      nfpapp[N].token_body = z;
    } else {
      const c = {
        token_body: z
      };
      nfpapp[N] = c;
    }
    $.setdata(JSON.stringify(nfpapp, null, 2), "nfpapp");
    $.msg($.name, "快音账号" + (N + 1) + "Token获取成功！🎉");
  }
}
async function userInfo(U) {
  const f = "https://member.nfnews.com/ucapi/login/newDeviceCheckLogin?uuid=" + nfpapp[U].uuid + "&deviceId=" + nfpapp[U].deviceId;
  let l = "";
  await getReqObject(f, l, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let z = httpResult;
  if (z != null && z.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户名=> " + z.data.userName);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户名=> " + z.data.userName + "\n";
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 手机号=> " + z.data.phone);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 手机号=> " + z.data.phone + "\n";
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + z.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + z.msg + "\n";
  }
}
async function pointV2(U) {
  const f = "https://hdapi.nfnews.com/nfplus-points-api/user/points/myPointsV2",
    l = helpUtils.ts13();
  await selectChannel(U, "{\"userUuid\":\"" + nfpapp[U].uuid + "\",\"timestamp\":" + l + "}@sign@one");
  let z = requestSigns[U];
  await getReqObject(f, z, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 积分=> " + N.data.redeemablePoints);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 积分=> " + N.data.redeemablePoints + "\n";
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 账户信息=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 账户信息=> " + N.msg + "\n";
  }
}
async function clickAticle(U, p) {
  const l = "https://hdapi.nfnews.com/nfplus-points-api/task/execute/clickPushArticle",
    z = helpUtils.ts13();
  await selectChannel(U, "{\"articleId\":" + p + ",\"userUuid\":\"" + nfpapp[U].uuid + "\",\"timestamp\":\"" + z + "\"}@sign@two");
  let N = requestSigns[U];
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  if (W != null && W.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> 完成");
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> 完成\n";
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> " + W.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> " + W.msg + "\n";
  }
}
async function login(U) {
  const f = "https://hdapi.nfnews.com/nfplus-points-api/task/execute/login";
  const l = helpUtils.ts13();
  await selectChannel(U, "{\"userUuid\":\"" + nfpapp[U].uuid + "\",\"timestamp\":" + l + "}@sign@two");
  let z = requestSigns[U];
  await getReqObject(f, z, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 登录签到=> 完成");
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 登录签到=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 登录签到=> " + N.msg + "\n";
  }
}
async function doArticleTimeTask(p, f, l) {
  const N = "https://hdapi.nfnews.com/nfplus-points-api/task/execute/submitSelectArticle",
    W = helpUtils.ts13(),
    c = {
      userUuid: nfpapp[p].uuid,
      articleId: f,
      timestamp: W,
      second: 60
    };
  await selectChannel(p, JSON.stringify(c) + "@sign@two");
  let M = requestSigns[p];
  await getReqObject(N, M, p);
  await httpRequest("post", requestObjects[p], printCaller());
  let v = httpResult;
  if (v != null && v.code == 200) {
    $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 阅读新闻[" + f + "]时长奖励(" + l + ")=> 完成");
  } else {
    $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 阅读新闻[" + f + "]时长奖励=> " + v.msg);
    nfplogs[p] += "[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 阅读新闻[" + f + "]时长奖励=> " + v.msg + "\n";
  }
}
async function doVideoTimeTask(p, f, l) {
  const N = "https://hdapi.nfnews.com/nfplus-points-api/task/execute/submitMediaRead";
  const W = helpUtils.ts13();
  const c = {
    userUuid: nfpapp[p].uuid,
    articleId: f,
    timestamp: W,
    second: 60
  };
  await selectChannel(p, JSON.stringify(c) + "@sign@two");
  let M = requestSigns[p];
  await getReqObject(N, M, p);
  await httpRequest("post", requestObjects[p], printCaller());
  let v = httpResult;
  if (v != null && v.code == 200) {
    $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 观看或者听新闻[" + f + "]时长奖励(" + l + ")=> 完成");
  } else {
    $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 观看或者听新闻[" + f + "]时长奖励=> " + v.msg);
    nfplogs[p] += "[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 观看或者听新闻[" + f + "]时长奖励=> " + v.msg + "\n";
  }
}
async function taskList(U) {
  const f = "https://hdapi.nfnews.com/nfplus-points-api/task/userPointsTasCatList";
  const l = helpUtils.ts13();
  await selectChannel(U, "{\"userUuid\":\"" + nfpapp[U].uuid + "\",\"timestamp\":" + l + "}@sign@one");
  let z = requestSigns[U];
  await getReqObject(f, z, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    await selectChannel(U, N.data + "@unSign@one");
    let c = JSON.parse(requestSigns[U]),
      Q = c.list.find(M => M.catName == "每日任务");
    if (Q) {
      let v = Q.list;
      for (let C of v) {
        if (C.taskName == "每日登录" && C.finishNum < C.taskLimitTimes) {
          for (let r = 0; r < C.taskLimitTimes - C.finishNum; r++) {
            await login(U);
          }
        }
        if (C.taskName == "选读文章" && (C.finishNum < C.taskLimitTimes || C.subTaskList[0].finishNum < C.subTaskList[0].taskLimitTimes)) {
          if (C.taskLimitTimes - C.finishNum > C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum) {
            for (let g = 0; g < C.taskLimitTimes - C.finishNum; g++) {
              await reportTask(U, articleIds[U][g]);
              await $.wait(helpUtils.randomNum(30000, 60000));
              await doArticleTimeTask(U, articleIds[U][g], C.finishNum + g + 1 + "/" + C.taskLimitTimes);
            }
          } else {
            for (let t = 0; t < C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum; t++) {
              await reportTask(U, articleIds[U][t]);
              await $.wait(helpUtils.randomNum(30000, 60000));
              await doArticleTimeTask(U, articleIds[U][t]);
            }
          }
        }
        if (C.taskName == "视听播报" && (C.finishNum < C.taskLimitTimes || C.subTaskList[0].finishNum < C.subTaskList[0].taskLimitTimes)) {
          if (C.taskLimitTimes - C.finishNum > C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum) {
            for (let j = 0; j < C.taskLimitTimes - C.finishNum; j++) {
              await reportTask(U, videoIds[U][j]);
              await $.wait(helpUtils.randomNum(30000, 60000));
              await doVideoTimeTask(U, videoIds[U][j], C.finishNum + j + 1 + "/" + C.taskLimitTimes);
            }
          } else {
            for (let G = 0; G < C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum; G++) {
              await reportTask(U, videoIds[U][G]);
              await $.wait(helpUtils.randomNum(30000, 60000));
              await doVideoTimeTask(U, videoIds[U][G]);
            }
          }
        }
        if (C.taskName == "分享文章" && C.finishNum < C.taskLimitTimes) {
          for (let q = 0; q < C.taskLimitTimes - C.finishNum; q++) {
            await reportShareTask(U, articleIds[U][q], C.finishNum + q + 1 + "/" + C.taskLimitTimes);
            await $.wait(helpUtils.randomNum(5000, 10000));
          }
        }
        if (C.taskName == "订阅南方号" && C.finishNum < C.taskLimitTimes) {
          for (let w = 0; w < C.taskLimitTimes - C.finishNum; w++) {
            await getNfhList(U, C.taskLimitTimes - C.finishNum);
          }
        }
        if (C.taskName == "订阅频道" && C.finishNum < C.taskLimitTimes) {
          await reportSubChannelTask(U, "44147");
        }
        if (C.taskName == "发表观点" && C.finishNum < C.taskLimitTimes) {
          for (let a = 0; a < C.taskLimitTimes - C.finishNum; a++) {
            await reportLikeTask(U, articleIds[U][a], C.finishNum + a + 1 + "/" + C.taskLimitTimes);
            await $.wait(helpUtils.randomNum(5000, 10000));
          }
        }
        if (C.taskName == "阅读推送文章" && C.finishNum < C.taskLimitTimes) {
          for (let S = 0; S < C.taskLimitTimes - C.finishNum; S++) {
            await clickAticle(U, articleIds[U][S]);
            await $.wait(helpUtils.randomNum(5000, 10000));
          }
        }
      }
    }
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + N.msg + "\n";
  }
}
async function aticleList(U) {
  let f = 1;
  if (hour > 10) {
    f = 2;
  }
  const l = "https://nfplusapi.nfnews.com/nfplus-manuscript-web/article/list?columnId=14&deviceId=" + nfpapp[U].deviceId + "&livePromotion=1&location=%E5%B9%BF%E5%B7%9E&nfhSubCount=0&pageNum=" + f + "&pageSize=100&service=1&userUuid=" + nfpapp[U].uuid;
  let z = "";
  await getReqObject(l, z, U);
  await httpRequest("get", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    if (N.data.list.length > 0) {
      articleIds[U] = [];
      videoIds[U] = [];
      for (let Q of N.data.list) {
        let M = Q.articleId;
        if (Q.videoInfo) {
          videoIds[U].push(M);
        } else {
          articleIds[U].push(M);
        }
      }
    }
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg + "\n";
  }
}
async function videoList(U) {
  let f = 1;
  if (hour > 19) {
    f = 2;
  }
  const l = "https://api.nfnews.com/nanfang_if/recommend/article/v1/getVideoRecommend?deviceId=" + nfpapp[U].deviceId + "&userUuid=" + nfpapp[U].uuid + "&pageNo=" + f + "&pageSize=20&city=%E5%B9%BF%E5%B7%9E&horiVideo=0";
  let z = "";
  await getReqObject(l, z, U);
  await httpRequest("get", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    if (N.data.length > 0) {
      videoIds[U] = [];
      for (let Q of N.data) {
        let v = Q.fileId;
        videoIds[U].push(v);
      }
    }
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 视频列表=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 视频列表=> " + N.msg + "\n";
  }
}
async function getNfhList(U, p) {
  const l = "https://api.nfnews.com/nanfang_if/nfh/getNfhList";
  let z = "colId=23&page=1&size=20";
  await getReqObject(l, z, U);
  requestObjects[U].headers["content-type"] = "application/x-www-form-urlencoded";
  await httpRequest("post", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null) {
    if (N.columns.length > 0) {
      articleIds[U] = [];
      let W = 0;
      for (let c of N.columns) {
        if (W == p) {
          break;
        }
        let M = c.columnId;
        await reportSubTask(U, M);
        await $.wait(helpUtils.randomNum(5000, 10000));
        W++;
      }
    }
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg + "\n";
  }
}
async function reportTask(U, p) {
  const l = "https://analyticsapi.nfnews.com/analytics/sendRecords",
    z = helpUtils.ts13();
  let N = "[{\n\t\"actionTime\": \"" + z + "\",\n\t\"discussNum\": \"7\",\n\t\"enterColumnId\": \"8967\",\n\t\"recommendSource\": \"2\",\n\t\"dataType\": \"1000005\",\n\t\"origin\": \"video\",\n\t\"articleID\": \"" + p + "\",\n\t\"recommendReason\": \"8\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"operator\": \"--\",\n\t\"recallLevel\": \"10\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"isAutoPlay\": \"1\"\n}]";
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  W != null && W.code == 200 ? $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读新闻[" + p + "]=> 完成") : ($.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读新闻[" + p + "]=> " + W.msg), nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读新闻[" + p + "]=> " + W.msg + "\n");
}
async function reportShareTask(U, p, f) {
  const z = "https://analyticsapi.nfnews.com/analytics/sendRecords";
  const N = helpUtils.ts13();
  let W = "[{\n\t\"origin\": \"14\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"dataType\": \"1000009\",\n\t\"action\": \"1\",\n\t\"operator\": \"--\",\n\t\"shareChanel\": \"1\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"actionTime\":  \"" + N + "\",\n\t\"articleID\": \"" + p + "\",\n\t\"url\": \"https://static.nfnews.com/content/202507/12/c11500401.html?colID=14&firstColID=27700&appversion=12600&from=weChatMessage&enterColumnId=14\"\n}]";
  await getReqObject(z, W, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let c = httpResult;
  c != null && c.code == 200 ? $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 分享新闻[" + p + "]任务(" + f + ")=> 完成") : ($.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 分享新闻[" + p + "]任务=> " + c.msg), nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 分享新闻[" + p + "]任务=> " + c.msg + "\n");
}
async function reportSubTask(U, p) {
  const l = "https://analyticsapi.nfnews.com/analytics/sendRecords",
    z = helpUtils.ts13();
  let N = "[{\n\t\"origin\": \"9\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"dataType\": \"1000025\",\n\t\"operator\": \"--\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"actionTime\": \"" + z + "\",\n\t\"columnId\": " + p + ",\n\t\"isSuccess\": \"1\"\n}]";
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  if (W != null && W.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅[" + p + "]任务=> 完成");
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅[" + p + "]任务=> " + W.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅[" + p + "]任务=> " + W.msg + "\n";
  }
}
async function reportSubChannelTask(U, p) {
  const l = "https://analyticsapi.nfnews.com/analytics/sendRecords",
    z = helpUtils.ts13();
  let N = "[{\n\t\"origin\": \"2\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"dataType\": \"1000039\",\n\t\"operator\": \"--\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"actionTime\": \"" + z + "\",\n\t\"columnId\": \"" + p + "\"\n}]";
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  W != null && W.code == 200 ? $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅频道[" + p + "]任务=> 完成") : ($.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅频道[" + p + "]任务=> " + W.msg), nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅频道[" + p + "]任务=> " + W.msg + "\n");
}
async function reportLikeTask(U, p, f) {
  let z = "[{\"articleId\":" + p + ",\"recommendTime\":\"\",\"grade\":\"\",\"reason\":\"\",\"recallLevel\":\"\",\"recommendScheme\":\"\"}]";
  const N = "https://analyticsapi.nfnews.com/analytics/sendRecord?deviceid=" + nfpapp[U].deviceId + "&articleID=" + p + "&dataType=1000002&origin=14&advId=&advType=0&recommendReason=&recommendTime=&recommendGrade=&recallLevel=&recommendScheme=&recInfo=" + encodeURIComponent(z);
  let c = "";
  await getReqObject(N, c, U);
  await httpRequest("get", requestObjects[U], printCaller());
  let Q = httpResult;
  if (Q != null && Q.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 点赞新闻[" + p + "]任务(" + f + ")=> 完成");
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 点赞新闻[" + p + "]任务=> " + Q.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 点赞新闻[" + p + "]任务=> " + Q.msg + "\n";
  }
}
function getScriptAuth(U, p, f) {
  return new Promise((l, z) => {
    const W = apiHost + "/script/permissions/lastest",
      c = {
        appName: U,
        userId: p,
        activityCode: f,
        version: version
      };
    const M = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const v = {
      url: W,
      headers: M,
      body: JSON.stringify(c)
    };
    $.post(v, async (C, u, O) => {
      if (O && O != null && O.replace(/\"/g, "").length > 50) {
        const r = O.replace(/\"/g, "").slice(34);
        helpUtils = await loadUtils(flushCash);
        CryptoJS = helpUtils.createCryptoJS();
        result = JSON.parse(CryptoJS.enc.Base64.parse(r).toString(CryptoJS.enc.Utf8));
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
        } catch (L) {
          $.log(L);
        }
      } else {
        $.log("请求服务器接口出现错误，请检查网络连接情况");
      }
      l();
    });
  });
}
function runComplete(U, p) {
  return new Promise((i, l) => {
    const W = apiHost + "/script/run/add",
      c = {
        appName: U,
        userId: p,
        activityCode: activeCode,
        version: version
      };
    const M = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const v = {
      url: W,
      headers: M,
      body: JSON.stringify(c)
    };
    $.post(v, async (C, u, O) => {
      i();
    });
  });
}
function loadToken(p) {
  let z = nfpapp[p].mobile;
  nfp_item = nfp_cks["" + z];
  if (nfp_item) {
    nfpapp[p].refreshToken = nfp_item.refreshToken;
    nfpapp[p].accessToken = nfp_item.accessToken;
    return true;
  } else {
    return false;
  }
}
function saveToken(U) {
  nfp_cks[nfpapp[U].mobile] = {
    refreshToken: nfpapp[U].refreshToken,
    accessToken: nfpapp[U].accessToken,
    ts: ts13()
  };
}
async function loadUtils(U) {
  let f = $.getdata("Utils_Code") || "";
  if (!U && f && Object.keys(f).length) {
    $.log("📢 缓存中存在JS-Utils");
    eval(f);
    return creatUtils();
  }
  $.log("📢 开始初始化JS-Utils");
  return new Promise(async l => {
    $.getScript("http://script.david2025.top/scripts/tools/JS-Utils.js").then(W => {
      $.setdata(W, "Utils_Code");
      eval(W);
      $.log("📢 JS-Utils加载成功");
      l(creatUtils());
    });
  });
}
function checkAddress(U, p) {
  return new Promise((i, l) => {
    const N = setTimeout(() => {
        i(false);
      }, p),
      W = http.get(U, c => {
        clearTimeout(N);
        if (c.statusCode === 404) {
          i(true);
        } else {
          i(false);
        }
      });
    W.on("error", c => {
      clearTimeout(N);
      i(false);
    });
    W.on("timeout", () => {
      W.abort();
      l(new Error("请求超时"));
    });
  });
}
async function fetchRequest(U, p = 3000) {
  return new Promise((i, l) => {
    const W = {
      url: U + "/docs"
    };
    setTimeout(() => {
      i(false);
    }, p);
    $.get(W, async (c, Q, M) => {
      if (Q.status == 401) {
        i(true);
      } else {
        i(false);
      }
    });
  });
}
async function httpClientRequest(U, p = 3000) {
  return new Promise((i, l) => {
    const N = {
      url: U + "/"
    };
    setTimeout(() => {
      i(false);
    }, p);
    $httpClient.get(N, async (W, c, Q) => {
      if (Q == "{\"detail\":\"Not Found\"}") {
        i(true);
      } else {
        i(false);
      }
    });
  });
}
async function redisGet(U, p, f) {
  return new Promise((z, N) => {
    const Q = apiHost + "/redis/hash/get/" + p + "/" + f,
      M = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
    const v = {
      url: Q,
      headers: M
    };
    $.get(v, async (u, O, r) => {
      const H = r.replace(/\"/g, "");
      answerTexts[U] = H;
      z();
    });
  });
}
function redisSet(U, p, f) {
  return new Promise((l, z) => {
    const c = apiHost + "/redis/hash/set",
      Q = {
        key: U,
        hashKey: p,
        hashValue: f
      };
    const v = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const C = {
      url: c,
      headers: v,
      body: JSON.stringify(Q)
    };
    $.post(C, async (u, O, r) => {
      l();
    });
  });
}
function redisPop(U) {
  return new Promise((f, i) => {
    const N = apiHost + "/redis/set/pop/" + U,
      W = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
    const c = {
      url: N,
      headers: W
    };
    $.get(c, async (M, v, C) => {
      const O = C.replace(/\"/g, "");
      popCookie = O;
      f();
    });
  });
}
function getWxCode(U) {
  return new Promise((f, l) => {
    const W = apiHost + "/wechat/mini/code",
      c = {
        content: nfpapp[U].key + "@" + wechatMiniAppId,
        appName: appName,
        uuid: userId
      };
    const M = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const v = {
      url: W,
      headers: M,
      body: JSON.stringify(c)
    };
    $.post(v, async (C, u, O) => {
      const g = O.replace(/\"/g, "");
      codes[U] = g;
      f();
    });
  });
}
async function getReqObject(U, p, f) {
  let z = "NFPlus/12.6.0 (iPhone; iOS 16.6.1; Scale/3.00)";
  nfpapp[f].ua && nfpapp[f].ua != "" && (z = nfpapp[f].ua);
  let N = getHostname(U),
    W = {
      url: U,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": z,
        Host: N,
        operator: "LS0=",
        brand: "QXBwbGU=",
        version: "MTIuNi4w",
        os: "aU9T",
        sid: "aVBob25lMTAsMg==",
        deviceid: CryptoJS.enc.Utf8.parse(nfpapp[f].deviceId).toString(CryptoJS.enc.Base64),
        model: "aVBob25lIDggUGx1cw==",
        osversion: "MTYuNi4x",
        useruuid: CryptoJS.enc.Utf8.parse(nfpapp[f].uuid).toString(CryptoJS.enc.Base64)
      }
    };
  if (p) {
    W.body = p;
  }
  requestObjects[f] = W;
  return W;
}
function getReqObject_(f, l, z) {
  let W = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f34) NetType/WIFI Language/zh_CN";
  if (nfpapp[z].ua && nfpapp[z].ua != "") {
    W = nfpapp[z].ua;
  }
  let c = getHostname(f);
  const Q = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": W,
    Authorization: nfpapp[z].auth,
    Host: c
  };
  const M = {
    url: f,
    headers: Q
  };
  l && (M.body = l);
  requestObjects[z] = M;
  return M;
}
async function httpRequest(U, p, f) {
  httpResult = null;
  return new Promise(l => {
    $[U](p, async (W, c, Q) => {
      try {
        if (W) {
          $.log(f + ": " + U + "请求失败");
          $.log(JSON.stringify(W));
          $.logErr(W);
        } else {
          if (safeGet(Q)) {
            httpResult = JSON.parse(Q);
            debug == 1 && $.log(httpResult);
          } else {
            const r = new URL(p.url);
            $.log(r.pathname + "发起" + U + "请求时，出现错误，请处理");
          }
        }
      } catch (H) {
        $.logErr(H, c);
      } finally {
        l(httpResult);
      }
    });
  });
}
async function selectChannel(U, p) {
  if (channels_status[U] == 0) {
    await getSign_(U, p);
  } else {
    await getSign(U, p);
  }
}
function getSign_(U, p) {
  return new Promise((l, z) => {
    function c(Q) {
      let v = Q.toString("utf8");
      requestSigns[U] = v;
      wss[U].removeListener("message", c);
      l(v);
    }
    wss[U].on("message", c);
    if (wss[U].readyState === 1) {
      const Q = {};
      Q.method = appName;
      Q.params = {};
      Q.params.content = p;
      Q.params.appName = appName;
      Q.params.uuid = userId;
      wss[U].send(JSON.stringify(Q), M => {
        M && z(M);
      });
    } else {
      l(getSign(U, p));
      wss[U].removeListener("message", c);
    }
  });
}
function getSign(U, p) {
  return new Promise((l, z) => {
    const W = apiHost + "/sign/nfp",
      c = {
        content: p,
        appName: appName,
        uuid: userId
      };
    const M = {};
    M["Content-Type"] = "application/json";
    M.accept = "application/json";
    const v = {
      url: W,
      headers: M,
      body: JSON.stringify(c)
    };
    $.post(v, async (C, u, O) => {
      const A = O.replace(/\"/g, "");
      requestSigns[U] = A;
      l();
    });
  });
}
function sortUrlParams(U, p, f) {
  const l = url2obj(U);
  p.forEach(W => {
    delete l[W];
  });
  Object.assign(l, f);
  const z = Object.keys(l).sort(),
    N = z.map(W => W + "=" + l[W]).join("&");
  return N;
}
function url2obj(p) {
  p = p.replace(/\"/g, "");
  var z,
    N = {};
  var W = p.slice(p.indexOf("?") + 1).split("&");
  for (var c = 0; c < W.length; c++) {
    z = W[c].split("=");
    N[z[0]] = z[1];
  }
  return N;
}
function convertStringToJson(U) {
  const f = U.replace(/[{} ]/g, "");
  const i = f.split(","),
    l = {};
  i.forEach(z => {
    const [W, c] = z.split("=");
    l[W] = c;
  });
  return l;
}
function getHostname(p) {
  let l = p.substr(p.indexOf("//") + 2),
    z = l.substr(0, l.indexOf("/")),
    N = "",
    W = z.indexOf(":");
  W > 0 ? N = z.substr(0, W) : N = z;
  return N;
}
function calculateTimeDifference(p, f) {
  var M = new Date(p);
  var Q = new Date(f);
  var c = Q - M;
  var W = Math.floor(c / 1000);
  return W;
}
function cutString(U, p) {
  if (U.length * 2 <= p) {
    return U;
  }
  var l = 0,
    z = "";
  for (var N = 0; N < U.length; N++) {
    z = z + U.charAt(N);
    if (U.charCodeAt(N) > 128) {
      l = l + 2;
      if (l >= p) {
        return z.substring(0, z.length - 1) + "...";
      }
    } else {
      l = l + 1;
      if (l >= p) {
        return z.substring(0, z.length - 2) + "...";
      }
    }
  }
  return z;
}
function printCaller() {
  return new Error().stack.split("\n")[3].split("@")[0];
}
function safeGet(U) {
  try {
    if (typeof JSON.parse(U) == "object") {
      return true;
    }
  } catch (l) {
    console.log(l);
    console.log("服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function jsonToUrl(U) {
  var f = Object.keys(U).map(function (i) {
    return encodeURIComponent(i) + "=" + encodeURIComponent(U[i]);
  }).join("&");
  return f;
}
function compileStr(U) {
  var f = String.fromCharCode(U.charCodeAt(0) + U.length);
  for (var l = 1; l < U.length; l++) {
    f += String.fromCharCode(U.charCodeAt(l) + U.charCodeAt(l - 1));
  }
  return escape(f);
}
function uncompileStr(U) {
  U = unescape(U);
  var f = String.fromCharCode(U.charCodeAt(0) - U.length);
  for (var l = 1; l < U.length; l++) {
    f += String.fromCharCode(U.charCodeAt(l) - f.charCodeAt(l - 1));
  }
  return f;
}
function randomMac() {
  return "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
  });
}
function txt_api(U) {
  return new Promise((f, l) => {
    const z = "https://v1.hitokoto.cn/?c=e",
      N = {
        accept: "application/json"
      };
    const W = {
      url: z,
      headers: N
    };
    $.get(W, async (Q, M, v) => {
      let u = JSON.parse(v),
        O = u.hitokoto;
      contents[U] = O + " " + O;
      f();
    });
  });
}
function getTime_8() {
  return new Promise((p, f) => {
    const l = "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
      z = {
        url: l
      };
    $.get(z, async (W, c, Q) => {
      p(Q);
    });
  });
}
function message() {
  tz == 1 && $.msg($.name, "", $.message);
}
async function sendMsg(U) {
  if (hour == 9 || hour == 12 || hour == 18) {
    if (tz == 1) {
      if ($.isNode()) {
        await notify.sendNotify($.name, U);
      } else {
        $.msg($.name, "", U);
      }
    } else {
      $.log(U);
    }
  }
}
async function wxPush(U, p, f) {
  return new Promise((z, N) => {
    const c = "https://wxpusher.zjiecode.com/api/send/message",
      Q = {
        appToken: "AT_6BZsE2IyJuVLPp3mcOkKvpoF245GR9xn",
        content: p,
        summary: "快手答题余额通知",
        contentType: 1,
        uids: [f],
        verifyPay: false
      };
    const v = {
      "Content-Type": "application/json"
    };
    const C = {
      url: c,
      headers: v,
      body: JSON.stringify(Q)
    };
    $.post(C, async (u, O, r) => {
      z();
    });
  });
}
function Env(U, p) {
  class i {
    constructor(l) {
      this.env = l;
    }
    send(l, z = "GET") {
      l = "string" == typeof l ? {
        url: l
      } : l;
      let c = this.get;
      "POST" === z && (c = this.post);
      return new Promise((Q, M) => {
        c.call(this, l, (u, O, r) => {
          u ? M(u) : Q(O);
        });
      });
    }
    get(l) {
      return this.send.call(this.env, l);
    }
    post(l) {
      return this.send.call(this.env, l, "POST");
    }
  }
  return new class {
    constructor(l, z) {
      const N = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      const W = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevels = N;
      this.logLevelPrefixs = W;
      this.logLevel = "info";
      this.name = l;
      this.http = new i(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, z);
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
    toObj(l, z = null) {
      try {
        return JSON.parse(l);
      } catch {
        return z;
      }
    }
    toStr(l, z = null, ...N) {
      try {
        return JSON.stringify(l, ...N);
      } catch {
        return z;
      }
    }
    getjson(l, z) {
      let W = z;
      if (this.getdata(l)) {
        try {
          W = JSON.parse(this.getdata(l));
        } catch {}
      }
      return W;
    }
    setjson(l, z) {
      try {
        return this.setdata(JSON.stringify(l), z);
      } catch {
        return !1;
      }
    }
    getScript(l) {
      return new Promise(N => {
        const c = {
          url: l
        };
        this.get(c, (Q, M, v) => N(v));
      });
    }
    runScript(l, z) {
      return new Promise(N => {
        let c = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        c = c ? c.replace(/\n/g, "").trim() : c;
        let Q = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        Q = Q ? 1 * Q : 20;
        Q = z && z.timeout ? z.timeout : Q;
        const M = {
          script_text: l,
          mock_type: "cron",
          timeout: Q
        };
        const [v, C] = c.split("@"),
          u = {
            url: "http://" + C + "/v1/scripting/evaluate",
            body: M,
            headers: {
              "X-Key": v,
              Accept: "*/*"
            },
            timeout: Q
          };
        this.post(u, (O, A, g) => N(g));
      }).catch(N => this.logErr(N));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const N = this.path.resolve(this.dataFile),
          W = this.path.resolve(process.cwd(), this.dataFile),
          c = this.fs.existsSync(N),
          Q = !c && this.fs.existsSync(W);
        if (!c && !Q) {
          return {};
        }
        {
          const v = c ? N : W;
          try {
            return JSON.parse(this.fs.readFileSync(v));
          } catch (u) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const z = this.path.resolve(this.dataFile),
          N = this.path.resolve(process.cwd(), this.dataFile),
          W = this.fs.existsSync(z),
          c = !W && this.fs.existsSync(N),
          Q = JSON.stringify(this.data);
        W ? this.fs.writeFileSync(z, Q) : c ? this.fs.writeFileSync(N, Q) : this.fs.writeFileSync(z, Q);
      }
    }
    lodash_get(l, z, N) {
      const c = z.replace(/\[(\d+)\]/g, ".$1").split(".");
      let Q = l;
      for (const M of c) if (Q = Object(Q)[M], void 0 === Q) {
        return N;
      }
      return Q;
    }
    lodash_set(l, z, N) {
      Object(l) !== l || (Array.isArray(z) || (z = z.toString().match(/[^.[\]]+/g) || []), z.slice(0, -1).reduce((W, c, Q) => Object(W[c]) === W[c] ? W[c] : W[c] = Math.abs(z[Q + 1]) >> 0 == +z[Q + 1] ? [] : {}, l)[z[z.length - 1]] = N);
      return l;
    }
    getdata(l) {
      let N = this.getval(l);
      if (/^@/.test(l)) {
        const [, c, Q] = /^@(.*?)\.(.*?)$/.exec(l),
          M = c ? this.getval(c) : "";
        if (M) {
          try {
            const v = JSON.parse(M);
            N = v ? this.lodash_get(v, Q, "") : N;
          } catch (u) {
            N = "";
          }
        }
      }
      return N;
    }
    setdata(l, z) {
      let W = !1;
      if (/^@/.test(z)) {
        const [, Q, M] = /^@(.*?)\.(.*?)$/.exec(z),
          v = this.getval(Q),
          C = Q ? "null" === v ? null : v || "{}" : "{}";
        try {
          const O = JSON.parse(C);
          this.lodash_set(O, M, l);
          W = this.setval(JSON.stringify(O), Q);
        } catch (A) {
          const g = {};
          this.lodash_set(g, M, l);
          W = this.setval(JSON.stringify(g), Q);
        }
      } else {
        W = this.setval(l, z);
      }
      return W;
    }
    getval(l) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(l);
        case "Quantumult X":
          return $prefs.valueForKey(l);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[l];
        default:
          return this.data && this.data[l] || null;
      }
    }
    setval(l, z) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(l, z);
        case "Quantumult X":
          return $prefs.setValueForKey(l, z);
        case "Node.js":
          this.data = this.loaddata();
          this.data[z] = l;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[z] || null;
      }
    }
    initGotEnv(l) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      l && (l.headers = l.headers ? l.headers : {}, l && (l.headers = l.headers ? l.headers : {}, void 0 === l.headers.cookie && void 0 === l.headers.Cookie && void 0 === l.cookieJar && (l.cookieJar = this.ckjar)));
    }
    get(l, z = () => {}) {
      const c = {
        redirection: !1
      };
      switch (l.headers && (delete l.headers["Content-Type"], delete l.headers["Content-Length"], delete l.headers["content-type"], delete l.headers["content-length"]), l.params && (l.url += "?" + this.queryStr(l.params)), void 0 === l.followRedirect || l.followRedirect || ((this.isSurge() || this.isLoon()) && (l["auto-redirect"] = !1), this.isQuanX() && (l.opts ? l.opts.redirection = !1 : l.opts = c)), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          const Q = {
            "X-Surge-Skip-Scripting": !1
          };
          this.isSurge() && this.isNeedRewrite && (l.headers = l.headers || {}, Object.assign(l.headers, Q));
          $httpClient.get(l, (C, u, O) => {
            !C && u && (u.body = O, u.statusCode = u.status ? u.status : u.statusCode, u.status = u.statusCode);
            z(C, u, O);
          });
          break;
        case "Quantumult X":
          const M = {};
          M.hints = !1;
          this.isNeedRewrite && (l.opts = l.opts || {}, Object.assign(l.opts, M));
          $task.fetch(l).then(C => {
            const {
                statusCode: u,
                statusCode: O,
                headers: A,
                body: g,
                bodyBytes: H
              } = C,
              L = {
                status: u,
                statusCode: O,
                headers: A,
                body: g,
                bodyBytes: H
              };
            z(null, L, g, H);
          }, C => z(C && C.error || "UndefinedError"));
          break;
        case "Node.js":
          let v = require("iconv-lite");
          this.initGotEnv(l);
          this.got(l).on("redirect", (C, u) => {
            try {
              if (C.headers["set-cookie"]) {
                const g = C.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                g && this.ckjar.setCookieSync(g, null);
                u.cookieJar = this.ckjar;
              }
            } catch (L) {
              this.logErr(L);
            }
          }).then(C => {
            const {
                statusCode: O,
                statusCode: A,
                headers: g,
                rawBody: H
              } = C,
              L = v.decode(H, this.encoding),
              Z = {
                status: O,
                statusCode: A,
                headers: g,
                rawBody: H,
                body: L
              };
            z(null, Z, L);
          }, C => {
            const {
              message: O,
              response: r
            } = C;
            z(O, r, r && v.decode(r.rawBody, this.encoding));
          });
          break;
      }
    }
    post(l, z = () => {}) {
      const W = l.method ? l.method.toLocaleLowerCase() : "post",
        c = {
          redirection: !1
        };
      switch (l.body && l.headers && !l.headers["Content-Type"] && !l.headers["content-type"] && (l.headers["content-type"] = "application/x-www-form-urlencoded"), l.headers && (delete l.headers["Content-Length"], delete l.headers["content-length"]), void 0 === l.followRedirect || l.followRedirect || ((this.isSurge() || this.isLoon()) && (l["auto-redirect"] = !1), this.isQuanX() && (l.opts ? l.opts.redirection = !1 : l.opts = c)), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          const Q = {
            "X-Surge-Skip-Scripting": !1
          };
          this.isSurge() && this.isNeedRewrite && (l.headers = l.headers || {}, Object.assign(l.headers, Q));
          $httpClient[W](l, (O, A, g) => {
            !O && A && (A.body = g, A.statusCode = A.status ? A.status : A.statusCode, A.status = A.statusCode);
            z(O, A, g);
          });
          break;
        case "Quantumult X":
          const M = {};
          M.hints = !1;
          l.method = W;
          this.isNeedRewrite && (l.opts = l.opts || {}, Object.assign(l.opts, M));
          $task.fetch(l).then(O => {
            const {
                statusCode: A,
                statusCode: g,
                headers: H,
                body: L,
                bodyBytes: Z
              } = O,
              Y = {
                status: A,
                statusCode: g,
                headers: H,
                body: L,
                bodyBytes: Z
              };
            z(null, Y, L, Z);
          }, O => z(O && O.error || "UndefinedError"));
          break;
        case "Node.js":
          let v = require("iconv-lite");
          this.initGotEnv(l);
          const {
            url: C,
            ...u
          } = l;
          this.got[W](C, u).then(O => {
            const {
                statusCode: A,
                statusCode: g,
                headers: H,
                rawBody: L
              } = O,
              Z = v.decode(L, this.encoding),
              Y = {
                status: A,
                statusCode: g,
                headers: H,
                rawBody: L,
                body: Z
              };
            z(null, Y, Z);
          }, O => {
            const {
              message: A,
              response: g
            } = O;
            z(A, g, g && v.decode(g.rawBody, this.encoding));
          });
          break;
      }
    }
    time(l, z = null) {
      const N = z ? new Date(z) : new Date();
      let W = {
        "M+": N.getMonth() + 1,
        "d+": N.getDate(),
        "H+": N.getHours(),
        "m+": N.getMinutes(),
        "s+": N.getSeconds(),
        "q+": Math.floor((N.getMonth() + 3) / 3),
        S: N.getMilliseconds()
      };
      /(y+)/.test(l) && (l = l.replace(RegExp.$1, (N.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let c in W) new RegExp("(" + c + ")").test(l) && (l = l.replace(RegExp.$1, 1 == RegExp.$1.length ? W[c] : ("00" + W[c]).substr(("" + W[c]).length)));
      return l;
    }
    queryStr(l) {
      let z = "";
      for (const N in l) {
        let W = l[N];
        null != W && "" !== W && ("object" == typeof W && (W = JSON.stringify(W)), z += N + "=" + W + "&");
      }
      z = z.substring(0, z.length - 1);
      return z;
    }
    msg(l = U, z = "", N = "", W = {}) {
      const Q = M => {
        const {
          $open: C,
          $copy: u,
          $media: O,
          $mediaMime: A
        } = M;
        switch (typeof M) {
          case void 0:
            return M;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                const g = {
                  url: M
                };
                return g;
              case "Loon":
              case "Shadowrocket":
                return M;
              case "Quantumult X":
                const H = {
                  "open-url": M
                };
                return H;
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
                  const L = {};
                  let Z = M.openUrl || M.url || M["open-url"] || C;
                  Z && Object.assign(L, {
                    action: "open-url",
                    url: Z
                  });
                  let Y = M["update-pasteboard"] || M.updatePasteboard || u;
                  if (Y && Object.assign(L, {
                    action: "clipboard",
                    text: Y
                  }), O) {
                    let X, G, K;
                    if (O.startsWith("http")) {
                      X = O;
                    } else {
                      if (O.startsWith("data:")) {
                        const [k] = O.split(";"),
                          [, I] = O.split(",");
                        G = I;
                        K = k.replace("data:", "");
                      } else {
                        G = O;
                        K = (P => {
                          const q = {
                            JVBERi0: "application/pdf",
                            R0lGODdh: "image/gif",
                            R0lGODlh: "image/gif",
                            iVBORw0KGgo: "image/png",
                            "/9j/": "image/jpg"
                          };
                          for (var R in q) if (0 === P.indexOf(R)) {
                            return q[R];
                          }
                          return null;
                        })(O);
                      }
                    }
                    Object.assign(L, {
                      "media-url": X,
                      "media-base64": G,
                      "media-base64-mime": A ?? K
                    });
                  }
                  const j = {
                    "auto-dismiss": M["auto-dismiss"],
                    sound: M.sound
                  };
                  Object.assign(L, j);
                  return L;
                }
              case "Loon":
                {
                  const P = {};
                  let q = M.openUrl || M.url || M["open-url"] || C;
                  q && Object.assign(P, {
                    openUrl: q
                  });
                  let y = M.mediaUrl || M["media-url"];
                  O?.["startsWith"]("http") && (y = O);
                  y && Object.assign(P, {
                    mediaUrl: y
                  });
                  console.log(JSON.stringify(P));
                  return P;
                }
              case "Quantumult X":
                {
                  const R = {};
                  let w = M["open-url"] || M.url || M.openUrl || C;
                  w && Object.assign(R, {
                    "open-url": w
                  });
                  let D = M["media-url"] || M.mediaUrl;
                  O?.["startsWith"]("http") && (D = O);
                  D && Object.assign(R, {
                    "media-url": D
                  });
                  let B = M["update-pasteboard"] || M.updatePasteboard || u;
                  B && Object.assign(R, {
                    "update-pasteboard": B
                  });
                  console.log(JSON.stringify(R));
                  return R;
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
            $notification.post(l, z, N, Q(W));
            break;
          case "Quantumult X":
            $notify(l, z, N, Q(W));
            break;
          case "Node.js":
            break;
        }
      }
      if (!this.isMuteLog) {
        let M = ["", "==============📣系统通知📣=============="];
        M.push(l);
        z && M.push(z);
        N && M.push(N);
        console.log(M.join("\n"));
        this.logs = this.logs.concat(M);
      }
    }
    debug(...l) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (l.length > 0 && (this.logs = [...this.logs, ...l]), console.log("" + this.logLevelPrefixs.debug + l.map(z => z ?? String(z)).join(this.logSeparator)));
    }
    info(...l) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (l.length > 0 && (this.logs = [...this.logs, ...l]), console.log("" + this.logLevelPrefixs.info + l.map(z => z ?? String(z)).join(this.logSeparator)));
    }
    warn(...l) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (l.length > 0 && (this.logs = [...this.logs, ...l]), console.log("" + this.logLevelPrefixs.warn + l.map(z => z ?? String(z)).join(this.logSeparator)));
    }
    error(...l) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (l.length > 0 && (this.logs = [...this.logs, ...l]), console.log("" + this.logLevelPrefixs.error + l.map(z => z ?? String(z)).join(this.logSeparator)));
    }
    log(...l) {
      l.length > 0 && (this.logs = [...this.logs, ...l]);
      console.log(l.map(z => z ?? String(z)).join(this.logSeparator));
    }
    logErr(l, z) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", "❗️" + this.name + ", 错误!", z, l);
          break;
        case "Node.js":
          this.log("", "❗️" + this.name + ", 错误!", z, void 0 !== l.message ? l.message : l, l.stack);
          break;
      }
    }
    wait(l) {
      return new Promise(z => setTimeout(z, l));
    }
    done(l = {}) {
      const z = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", "🔔" + this.name + ", 结束! 🕛 " + z + " 秒"), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(l);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(U, p);
}