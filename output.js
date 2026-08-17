//Mon Aug 17 2026 08:36:15 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const $ = new Env("南方Plus");
const version = "V1.0.0";
const appName = "nfpapp";
let nfpapp = $.getjson(appName, []);
const fs = $.isNode() ? require("fs") : "";
const WebSocket = $.isNode() ? require("ws") : "";
const file = "david_cookies.js";
$.isNode() && !fs.existsSync(file) && ($.log("🔔 外挂ck文件不存在，开始创建模版>>>"), fs.writeFileSync("./david_cookies.js", "//独立CK文件，主要用来处理多账号大数据量CK,注意JRTTAPP外边不用加引号，依葫芦画瓢。\n//今日头条(三个账号)\nlet JRTTAPP = [{},{},{}]\n//番茄小说(一个账号)\nlet FQXSAPP = [{}]\n//抖音极速版(两个账号)\nlet DYJSBAPP = [{},{}]\n    \nlet APPS = {\n    JRTT: JRTTAPP,\n    FQXS: FQXSAPP,\n    DYJSB: DYJSBAPP\n}\n\nmodule.exports = APPS", U => {}));
const http = $.isNode() ? require("http") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const COOKIES = $.isNode() ? require("./david_cookies") : "";
let userId = $.getdata("tguserid") || 1;
let activeCode = $.getdata("nfpactivecode") || 0;
let nfpuserck = $.getval("nfpuserck") || 1;
let apiHost = $.getval("apiHost") || "http://106.15.104.124:8080";
$.getval("apiHosts") && (apiHost = $.getval("apiHosts"));
let flushCash = $.getval("cleanCache") || false;
const debug = 0;
let tz = $.getval("tz") || "1";
let helpUtils = undefined;
let CryptoJS = undefined;
let saveFile = false;
let wechatMiniAppId = "wxfb0905b0787971ad";
let nfp_ck_file = "nfp_cookies.json";
var hour = "";
var minute = "";
let sendlogs = "";
let nfplogs = [];
let additional_Params = {};
let wss = [];
let channels_status = [];
let reconectCounts = [];
let requestObjects = [];
let requestSigns = [];
let codes = [];
let articleIds = [];
let videoIds = [];
let httpResult = "";
let userAuth = "";
let scriptAuth = "";
let newest_version = "";
let runAuth = "";
let systemNotify = "";
let vipAuth = "";
let isCharge = "";
let multiAccount = 1;
let buyCount = 1;
let runTotalCounts = 1;
let runedCounts = 1;
let userRank = "";
let invicode = "";
let numbers = 3;
let vipDate = "";
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
    {
      await getCk();
    }
  } else {
    {
      if (!nfpapp) {
        {
          $.log("📢 很抱歉，😭 没有找到账号信息！你确定配置账号信息了吗？");
          return;
        }
      }
      $.log("📢 开始检测服务器接口状态>>>");
      let l = false;
      const z = apiHost.split("&");
      const N = z.length;
      for (let C = 0; C < N; C++) {
        {
          if ($.isNode()) {
            l = await checkAddress("" + z[C], 2500);
          } else {
            $.isSurge() || $.isLoon() ? l = await httpClientRequest("" + z[C], 2500) : l = await fetchRequest("" + z[C], 2500);
          }
          if (l == true) {
            {
              apiHost = z[C];
              $.log("📢 接口" + (C + 1) + "[" + z[C] + "]服务器接口正常! 🎉");
              break;
            }
          }
          if (C == N - 1 && l == false) {
            {
              $.log("📢 抱歉，所有接口都不可用, 请前往交流群置顶获取最新的接口地址! 😭");
              $.msg($.name, "所有接口都不可用, 请尽快前往交流群置顶获取最新的接口地址!");
              return;
            }
          }
        }
      }
      if (!activeCode || !userId || userId == 1 || activeCode == 0 || activeCode.length != 32) {
        {
          $.log("❗️ 抱歉，你没有权限运行此脚本, 请关注电报机器人: https://t.me/DavidLoveBot");
          return;
        }
      }
      await getScriptAuth(appName, userId, activeCode);
      $.log("📢 " + systemNotify);
      $.log("🔔 当前脚本版本号: " + version + "，最新版本号: " + newest_version);
      if (vipDate != "") {
        {
          let Z = new Date(vipDate).getTime();
          let Y = new Date().getTime();
          if (Y > Z) {
            {
              $.log("❗️ 抱歉，VIP到期了，请及时付费。");
              return;
            }
          }
        }
      }
      if (version < newest_version) {
        {
          $.log("❗️ 当前脚本版本号低于服务器版本，请更新脚本吧！");
          sendMsg("🔔 当前脚本版本号低于服务器版本，请更新脚本吧！");
          return;
        }
      }
      if (scriptAuth != true) {
        {
          $.log("❗️ 抱歉, 此脚本已停用。");
          return;
        }
      }
      if (userRank != true) {
        {
          $.log("❗️ 抱歉, 用户不合法，请先私聊机器人加入交流区。 https://t.me/DavidLoveBot");
          return;
        }
      }
      if (userAuth != true) {
        {
          $.log("❗️ 抱歉，你没有权限运行此脚本, 请关注电报机器人: https://t.me/DavidLoveBot");
          return;
        }
      }
      isCharge == true ? $.log("🔔 此脚本采用付费模式。🔒") : $.log("🔔 此脚本采用免费模式。🔓");
      if (vipDate != "") {
        {
          if (isCharge == true) {
            {
              let y = new Date(vipDate).getTime();
              let R = new Date().getTime();
              if (R > y) {
                {
                  $.log("❗️ 抱歉，VIP到期了，请及时付费。");
                  return;
                }
              } else {
                $.log("🔔 尊敬的会员：您好，你是VIP用户！🔐");
              }
            }
          }
        }
      } else {
        {
          if (isCharge == true) {
            {
              if (vipAuth != true) {
                {
                  $.log("❗️ 抱歉，你不是付费用户, 你没有权限运行此脚本, 需要使用请查看使用说明。");
                  return;
                }
              } else {
                $.log("🔔 尊敬的会员：您好，你是付费用户！🔐");
              }
            }
          }
        }
      }
      multiAccount > 1 && $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一次可以运行" + numbers * multiAccount + "个账号。");
      if (buyCount > 1) {
        {
          $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一共可以运行" + runTotalCounts + "次, 已经运行了" + runedCounts + "次。");
        }
      }
      if (runAuth != true) {
        {
          $.log("❗️ 抱歉,  该用户今天可能已经达到最大运行次数，明天再试吧！");
          return;
        }
      }
      if (nfpapp.length > numbers * multiAccount) {
        {
          $.log("❗️ 当前用户一次最多运行" + numbers * multiAccount + "个账号，需要增加账号请查看置顶说明。");
          return;
        }
      }
      if (nfpapp.length == 0) {
        {
          $.log("先抓取账号ck，再运行脚本吧！");
          return;
        }
      }
      if (runedCounts + nfpapp.length > runTotalCounts) {
        {
          $.log("📢 一共发现了" + nfpapp.length + "个账号");
          $.log("❗️ 当前用户运行次数剩余" + (runTotalCounts - runedCounts) + "次，还可以运行" + (runTotalCounts - runedCounts) + "个账号，还需要" + (nfpapp.length - (runTotalCounts - runedCounts)) + "次，可以通过赞赏后增加运行次数！");
          return;
        }
      }
      if (vipDate != "") {
        {
          $.log("📢 你的会员有效期到： " + vipDate);
        }
      }
      $.log("📢 一共发现了" + nfpapp.length + "个账号");
      if ($.isNode()) {
        {
          if (!fs.existsSync(nfp_ck_file)) {
            nfp_cks = {};
          } else {
            {
              nfp_cks = JSON.parse(fs.readFileSync(nfp_ck_file, "utf8"));
            }
          }
        }
      }
      let W = [];
      let c = nfpapp.length;
      let Q = 0;
      if ($.isNode() && process.env.NFP_THREAD_COUNT) {
        {
          Q = parseInt(process.env.NFP_THREAD_COUNT);
        }
      } else {
        {
          Q = c;
        }
      }
      let M = nfpapp.length;
      if (Q >= c) {
        {
          Q = c;
          M = 1;
          $.log("📢 你设置的线程数是" + Q + "，账号个数是" + c + "，" + M + "次可全部跑完。");
          for (let U2 = 0; U2 < nfpapp.length; U2++) {
            {
              W.push(runMultiTasks(U2));
              nfplogs[U2] = "";
              if ($.isNode()) {
                {
                  channels_status[U2] = 0;
                  await init_ws(U2);
                }
              } else {
                {
                  channels_status[U2] = 1;
                }
              }
            }
          }
          await Promise.allSettled(W).then(U6 => {
            {
              if ($.isNode() && saveFile) {
                {
                  $.log("[温馨提醒]: 即将本地化token，这样可以有效降低登录次数");
                  fs.writeFileSync(nfp_ck_file, JSON.stringify(nfp_cks, null, 2));
                }
              }
              $.log("日志整理功能如下：");
              $.log("---------------日志整理开始--------------");
              for (let U9 = 0; U9 < nfpapp.length; U9++) {
                {
                  $.log(nfplogs[U9]);
                  sendlogs += nfplogs[U9];
                }
              }
              $.log("---------------日志整理结束--------------");
              sendMsg(sendlogs);
            }
          });
        }
      } else {
        {
          M = Math.ceil(c / Q);
          $.log("📢 你设置的线程数是" + Q + "，账号个数是" + c + "，计算后分" + M + "次执行，一次可执行" + Q + "个账号，最后一次如果不够" + Q + "个账号，剩多少个账号就跑几个账号。");
          for (let U7 = 0; U7 < M; U7++) {
            {
              for (let U9 = U7 * Q; U9 < Q * (U7 + 1) && U9 < c; U9++) {
                W.push(runMultiTasks(U9));
                nfplogs[U9] = "";
                channels_status[U9] = 0;
                await init_ws(U9);
              }
              await Promise.allSettled(W).then(Up => {
                {
                  W = [];
                  if (U7 == M - 1) {
                    {
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
                  }
                }
              });
            }
          }
        }
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
  const p = {
    uBSJr: function (f, l) {
      return f + l;
    },
    PVbzB: function (f) {
      return f();
    },
    yfLsk: "application/json",
    CHKOV: function (f, l) {
      return f === l;
    },
    uVCgi: "QbZDo",
    TWwNX: function (f, l) {
      return f < l;
    },
    QCxMI: function (f, l) {
      return f + l;
    },
    mCBiw: function (f, l) {
      return f + l;
    },
    etNdF: function (f, l) {
      return f + l;
    },
    RINgB: function (f, l) {
      return f !== l;
    },
    bCnLK: "pRSWW",
    WoHwA: "hBcIP",
    ndEtR: function (f, l) {
      return f < l;
    },
    jPbsv: function (f, l) {
      return f + l;
    },
    xJakV: function (f, l) {
      return f(l);
    },
    JYZZi: function (f, l) {
      return f === l;
    },
    pQSMC: "ndoto",
    eorva: function (f, l) {
      return f < l;
    },
    GBDMO: function (f, l) {
      return f <= l;
    },
    mXbnS: "VObjB",
    RLnzA: function (f) {
      return f();
    },
    okOgl: "anBLq",
    UnhPZ: function (f, l) {
      return f > l;
    },
    DohMl: "PfVQH",
    PJFLo: function (f, l) {
      return f + l;
    },
    rRgko: "http",
    OWhRP: "open",
    RkHDR: "close",
    ZhMaZ: "error"
  };
  if ($.isNode()) {
    {
      if (reconectCounts[U] > 0) {
        {
          $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 尝试重新连接服务器>>>>>>");
        }
      }
      wss[U] = new WebSocket(apiHost.replace("http", "ws") + "/ws");
      wss[U].on("open", function l() {
        {
          $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 签名通道已连接");
        }
      });
      wss[U].on("close", function z() {
        {
          $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 签名通道已关闭，原因是任务已处理完成");
        }
      });
      wss[U].on("error", function N() {
        const W = {
          fdSpP: function (c, Q) {
            return c(Q);
          }
        };
        {
          $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 签名通道已关闭，原因是出现错误");
          channels_status[U] = 1;
          reconectCounts[U]++;
          if (reconectCounts[U] <= 3) {
            {
              init_ws(U);
            }
          }
        }
      });
    }
  }
}
async function runSubTask(U, p) {
  if ($.isNode()) {
    {
      await $.wait(3000, 5000);
    }
  }
  await userInfo(p);
  await pointV2(p);
  await aticleList(p);
  if (hour > 10) {
    {
      await videoList(p);
    }
  }
  await taskList(p);
  if ($.isNode()) {
    {
      await wss[p].close();
    }
  }
  await runComplete(appName, userId);
  U();
}
async function getCk() {
  if ($request.url.match(/\/passport\/UnionLogin/)) {
    {
      const z = $request.body;
      let N = nfpuserck - 1;
      if (nfpapp[N]) {
        {
          nfpapp[N].token_body = z;
        }
      } else {
        {
          const c = {
            token_body: z
          };
          nfpapp[N] = c;
        }
      }
      $.setdata(JSON.stringify(nfpapp, null, 2), "nfpapp");
      $.msg($.name, "快音账号" + (N + 1) + "Token获取成功！🎉");
    }
  }
}
async function userInfo(U) {
  const p = {
    OEYoP: "function *\\( *\\)",
    hRQtM: "\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)",
    pJTHi: function (N, W) {
      return N(W);
    },
    usZEE: "init",
    UbYTU: function (N, W) {
      return N + W;
    },
    nVndc: "chain",
    AgGvp: "input",
    QjooP: function (N) {
      return N();
    },
    BdMFu: function (N, W, c) {
      return N(W, c);
    },
    wapny: function (N, W, c, Q) {
      return N(W, c, Q);
    },
    uAcXz: function (N, W, c, Q) {
      return N(W, c, Q);
    },
    dKccP: "post",
    LUguu: function (N) {
      return N();
    },
    JLcEV: function (N, W) {
      return N != W;
    },
    XlrZU: function (N, W) {
      return N == W;
    },
    lQbqM: function (N, W) {
      return N !== W;
    },
    lvFEx: "xvHWj",
    yKTmE: "pjjUG",
    uOrqf: function (N, W) {
      return N < W;
    },
    yFlMy: function (N, W) {
      return N + W;
    },
    rfVNG: function (N, W) {
      return N < W;
    },
    BsECS: function (N, W) {
      return N + W;
    },
    bVQkm: function (N, W) {
      return N < W;
    },
    qXxhW: function (N, W) {
      return N + W;
    },
    nTGtw: function (N, W) {
      return N + W;
    },
    bQhob: function (N, W) {
      return N < W;
    },
    wtGse: function (N, W) {
      return N + W;
    },
    RAaUU: function (N, W) {
      return N + W;
    },
    mLTfD: function (N, W) {
      return N + W;
    },
    EUqoa: function (N, W) {
      return N === W;
    },
    aOcTs: "vEXNJ",
    aGMxn: "sRNhu",
    oAeRY: function (N, W) {
      return N < W;
    },
    wMUlk: function (N, W) {
      return N + W;
    },
    YFMQQ: function (N, W) {
      return N + W;
    },
    sPiZi: function (N, W) {
      return N + W;
    }
  };
  const f = "https://member.nfnews.com/ucapi/login/newDeviceCheckLogin?uuid=" + nfpapp[U].uuid + "&deviceId=" + nfpapp[U].deviceId;
  let l = "";
  await getReqObject(f, l, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let z = httpResult;
  if (z != null && z.code == 200) {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户名=> " + z.data.userName);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户名=> " + z.data.userName + "\n";
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 手机号=> " + z.data.phone);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 手机号=> " + z.data.phone + "\n";
    }
  } else {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + z.msg);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + z.msg + "\n";
    }
  }
}
async function pointV2(U) {
  const f = "https://hdapi.nfnews.com/nfplus-points-api/user/points/myPointsV2";
  const l = helpUtils.ts13();
  await selectChannel(U, "{\"userUuid\":\"" + nfpapp[U].uuid + "\",\"timestamp\":" + l + "}@sign@one");
  let z = requestSigns[U];
  await getReqObject(f, z, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 积分=> " + N.data.redeemablePoints);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 积分=> " + N.data.redeemablePoints + "\n";
  } else {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 账户信息=> " + N.msg);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 账户信息=> " + N.msg + "\n";
    }
  }
}
async function clickAticle(U, p) {
  const f = {
    bgyaS: function (c) {
      return c();
    },
    rsNaH: "application/json",
    ibhUh: function (c, Q, M) {
      return c(Q, M);
    },
    vCPYh: function (c, Q, M, v) {
      return c(Q, M, v);
    },
    ojnPM: function (c, Q, M, v) {
      return c(Q, M, v);
    },
    SJalo: "post",
    lrEFr: function (c) {
      return c();
    },
    kxCuz: function (c, Q) {
      return c != Q;
    },
    wqVyK: function (c, Q) {
      return c == Q;
    },
    YMLsP: function (c, Q) {
      return c === Q;
    },
    Wyoue: "nBVwt",
    bpcqr: function (c, Q) {
      return c < Q;
    },
    HMFCH: function (c, Q) {
      return c + Q;
    },
    pyfQE: function (c, Q) {
      return c + Q;
    },
    oNsBA: function (c, Q) {
      return c < Q;
    },
    roFfu: function (c, Q) {
      return c + Q;
    },
    AcALg: function (c, Q) {
      return c + Q;
    },
    TaEgH: function (c, Q) {
      return c + Q;
    },
    dBQre: "EvkzJ",
    aJTXW: "jsNBb",
    ypwWn: function (c, Q) {
      return c < Q;
    },
    bAmMd: function (c, Q) {
      return c + Q;
    },
    ijJao: function (c, Q) {
      return c + Q;
    },
    ZlmYR: function (c, Q) {
      return c + Q;
    },
    PqJtQ: function (c, Q) {
      return c < Q;
    }
  };
  const l = "https://hdapi.nfnews.com/nfplus-points-api/task/execute/clickPushArticle";
  const z = helpUtils.ts13();
  await selectChannel(U, "{\"articleId\":" + p + ",\"userUuid\":\"" + nfpapp[U].uuid + "\",\"timestamp\":\"" + z + "\"}@sign@two");
  let N = requestSigns[U];
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  if (W != null && W.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> 完成");
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> 完成\n";
  } else {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> " + W.msg);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读推送文章[" + p + "]=> " + W.msg + "\n";
    }
  }
}
async function login(U) {
  const p = {
    hjUuZ: function (W, c) {
      return W == c;
    },
    DhiUY: function (W, c) {
      return W > c;
    },
    RMNMP: function (W, c, Q) {
      return W(c, Q);
    },
    XrtHT: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    FWpyq: "post",
    gpgYh: function (W) {
      return W();
    },
    msmog: function (W, c) {
      return W != c;
    },
    emLJp: function (W, c) {
      return W == c;
    },
    YALKK: function (W, c) {
      return W === c;
    },
    nsrrD: "QXMdV",
    kBJFi: function (W, c) {
      return W < c;
    },
    CYciI: function (W, c) {
      return W + c;
    },
    gLhLf: "xZxMI",
    pzRBa: function (W, c) {
      return W + c;
    },
    GUBoz: function (W, c) {
      return W + c;
    },
    VPygx: function (W, c) {
      return W + c;
    },
    bOsmp: function (W, c) {
      return W + c;
    },
    sWEOd: function (W, c) {
      return W + c;
    }
  };
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
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 登录签到=> " + N.msg);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 登录签到=> " + N.msg + "\n";
    }
  }
}
async function doArticleTimeTask(p, f, l) {
  const z = {
    CIMCF: function (C, u, O, r) {
      return C(u, O, r);
    },
    hXHUi: function (C, u) {
      return C(u);
    },
    bWqXV: function (C, u, O) {
      return C(u, O);
    },
    dkRpm: function (C, u, O, r) {
      return C(u, O, r);
    },
    npFAd: "post",
    hQdqV: function (C) {
      return C();
    },
    Kntmw: function (C, u) {
      return C != u;
    },
    RWIZx: function (C, u) {
      return C == u;
    },
    UDSgN: function (C, u) {
      return C === u;
    },
    kJYmM: "xdLyY",
    GxpjS: function (C, u) {
      return C < u;
    },
    LTVzY: function (C, u) {
      return C + u;
    },
    RSUuS: function (C, u) {
      return C !== u;
    },
    EsDuk: "BPXBU",
    LsuWT: "cbXJI",
    KtWzN: function (C, u) {
      return C < u;
    },
    lhqgg: function (C, u) {
      return C + u;
    },
    FziSu: function (C, u) {
      return C + u;
    },
    DDAeW: function (C, u) {
      return C + u;
    },
    UWOqm: function (C, u) {
      return C + u;
    },
    QmumI: function (C, u) {
      return C + u;
    },
    AHsqV: function (C, u) {
      return C + u;
    }
  };
  const N = "https://hdapi.nfnews.com/nfplus-points-api/task/execute/submitSelectArticle";
  const W = helpUtils.ts13();
  let Q = {
    userUuid: nfpapp[p].uuid,
    articleId: f,
    timestamp: W,
    second: 60
  };
  await selectChannel(p, JSON.stringify(Q) + "@sign@two");
  let M = requestSigns[p];
  await getReqObject(N, M, p);
  await httpRequest("post", requestObjects[p], printCaller());
  let v = httpResult;
  if (v != null && v.code == 200) {
    {
      $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 阅读新闻[" + f + "]时长奖励(" + l + ")=> 完成");
    }
  } else {
    $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 阅读新闻[" + f + "]时长奖励=> " + v.msg);
    nfplogs[p] += "[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 阅读新闻[" + f + "]时长奖励=> " + v.msg + "\n";
  }
}
async function doVideoTimeTask(p, f, l) {
  const N = "https://hdapi.nfnews.com/nfplus-points-api/task/execute/submitMediaRead";
  const W = helpUtils.ts13();
  let Q = {
    userUuid: nfpapp[p].uuid,
    articleId: f,
    timestamp: W,
    second: 60
  };
  await selectChannel(p, JSON.stringify(Q) + "@sign@two");
  let M = requestSigns[p];
  await getReqObject(N, M, p);
  await httpRequest("post", requestObjects[p], printCaller());
  let v = httpResult;
  if (v != null && v.code == 200) {
    {
      $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 观看或者听新闻[" + f + "]时长奖励(" + l + ")=> 完成");
    }
  } else {
    $.log("[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 观看或者听新闻[" + f + "]时长奖励=> " + v.msg);
    nfplogs[p] += "[账号" + (p + 1 < 10 ? "0" + (p + 1) : p + 1) + "]: 观看或者听新闻[" + f + "]时长奖励=> " + v.msg + "\n";
  }
}
async function taskList(U) {
  const p = {
    MtbHq: function (W, c) {
      return W == c;
    },
    uYRNJ: "{\"detail\":\"Not Found\"}",
    ZJWAt: function (W, c) {
      return W(c);
    },
    QUOkp: function (W, c) {
      return W(c);
    },
    qrwGQ: function (W, c) {
      return W < c;
    },
    NFnyc: function (W, c) {
      return W + c;
    },
    aYLOl: function (W, c) {
      return W + c;
    },
    hRIXL: function (W, c) {
      return W + c;
    },
    QnnMM: function (W, c) {
      return W + c;
    },
    KZlTq: function (W, c) {
      return W + c;
    },
    KjPoc: "POST",
    xxaQD: "application/pdf",
    XckDZ: "image/gif",
    GkTjI: "image/png",
    RVvOz: "image/jpg",
    ODnsB: function (W, c) {
      return W === c;
    },
    GitSa: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f34) NetType/WIFI Language/zh_CN",
    SXLap: function (W, c) {
      return W != c;
    },
    rgLrb: "application/x-www-form-urlencoded",
    HSlDd: "Utils_Code",
    PcnFB: function (W, c) {
      return W(c);
    },
    JGCNh: function (W) {
      return W();
    },
    dESBu: "http://script.david2025.top/scripts/tools/JS-Utils.js",
    SzGGr: function (W, c) {
      return W > c;
    },
    KFKTl: function (W, c) {
      return W === c;
    },
    eiQVY: "Quantumult X",
    WNUcU: function (W, c) {
      return W + c;
    },
    wHfem: function (W, c) {
      return W === c;
    },
    mqDPt: "Loon",
    XWEdc: "undefined",
    rLAMy: "surge-version",
    uAXbt: "Surge",
    zSgKc: "stash-version",
    zooId: "Stash",
    HKnmA: "Node.js",
    EJPIV: function (W, c) {
      return W != c;
    },
    SILeo: function (W, c) {
      return W != c;
    },
    INNkq: "Shadowrocket",
    sDjEn: function (W, c) {
      return W - c;
    },
    iDpZP: "nfpapp",
    SuItn: function (W, c) {
      return W + c;
    },
    OKgvT: "NFPlus/12.6.0 (iPhone; iOS 16.6.1; Scale/3.00)",
    nAoFM: function (W, c) {
      return W != c;
    },
    zZyXR: function (W, c) {
      return W(c);
    },
    jiaPW: "application/json",
    nnKDV: "LS0=",
    tpBEe: "QXBwbGU=",
    JIFLV: "MTIuNi4w",
    JeSNa: "aU9T",
    PIzMH: "aVBob25lMTAsMg==",
    gjMVA: "aVBob25lIDggUGx1cw==",
    uzudM: "MTYuNi4x",
    rldqt: function (W) {
      return W();
    },
    TSlba: "@chavy_boxjs_userCfgs.httpapi",
    vIbzI: "@chavy_boxjs_userCfgs.httpapi_timeout",
    PAhGX: function (W, c) {
      return W * c;
    },
    HNKbw: "cron",
    QswUB: "*/*",
    WcndT: function (W, c, Q) {
      return W(c, Q);
    },
    WorXy: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    IOTPD: "post",
    mMCVA: "jcIPQ",
    EEYLi: "mqpfj",
    TiTPs: function (W, c) {
      return W === c;
    },
    cRyAl: "FQroG",
    bNpaz: "AVqhL",
    aDrKD: "xttAO",
    lMJhb: "mAudk",
    VQAnC: function (W, c) {
      return W == c;
    },
    mqdsS: "每日登录",
    Sizgd: function (W, c) {
      return W === c;
    },
    ehARE: "pxtjw",
    eBffT: "mSUot",
    AAFba: function (W, c) {
      return W < c;
    },
    RKWXU: function (W, c) {
      return W - c;
    },
    mOFHz: function (W, c) {
      return W === c;
    },
    NoWCJ: "OXUUZ",
    ybBbj: "ZTJcx",
    DiNnm: function (W, c) {
      return W(c);
    },
    NMaAN: function (W, c) {
      return W == c;
    },
    HyNpp: "选读文章",
    LVwpK: function (W, c) {
      return W < c;
    },
    HhUPG: function (W, c) {
      return W === c;
    },
    vKGey: "kaBQC",
    xxUZY: function (W, c) {
      return W > c;
    },
    UgrpI: function (W, c) {
      return W - c;
    },
    XqBcf: function (W, c) {
      return W === c;
    },
    kSvuU: "oxZTv",
    Rooyz: function (W, c) {
      return W < c;
    },
    kyeUo: "iBfJH",
    FbMvt: "uUEXq",
    hpdAO: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    UdZeU: "LYchz",
    uTBYT: function (W, c) {
      return W === c;
    },
    jcfwu: "kuwHK",
    zKCyz: function (W, c, Q) {
      return W(c, Q);
    },
    EnJsr: "视听播报",
    HVHzq: function (W, c) {
      return W < c;
    },
    poHhP: function (W, c) {
      return W !== c;
    },
    noyNt: "rOrjn",
    pfnYV: "wWzlp",
    XQDMV: function (W, c) {
      return W !== c;
    },
    tIAZT: "vNLGR",
    inkOd: "zFsMg",
    NYWun: function (W, c) {
      return W - c;
    },
    wSYaF: "AQMVf",
    EkUdK: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    iQwRS: function (W, c) {
      return W + c;
    },
    eIiKk: function (W, c) {
      return W + c;
    },
    fetGI: "VJCFz",
    auCul: "abFAr",
    ighKc: function (W, c) {
      return W - c;
    },
    jaIkh: function (W, c) {
      return W !== c;
    },
    ylYJY: "pnzzj",
    SHLpI: "UcKon",
    dPZdT: function (W, c, Q) {
      return W(c, Q);
    },
    pySxK: function (W, c) {
      return W == c;
    },
    vumNX: "分享文章",
    Gyici: function (W, c) {
      return W < c;
    },
    pTRtO: "bUneI",
    IEYoU: function (W, c) {
      return W - c;
    },
    YRkYa: "tplMk",
    adxsS: "odvBp",
    gZTXK: function (W, c) {
      return W == c;
    },
    IZMOB: "订阅南方号",
    evPlD: function (W, c) {
      return W !== c;
    },
    aaUwv: "tpIfW",
    OqqvF: "CSbil",
    zKNmM: "AjQeM",
    WJtYR: function (W, c, Q) {
      return W(c, Q);
    },
    VxNZf: function (W, c) {
      return W == c;
    },
    GlrxJ: "订阅频道",
    HgDft: function (W, c) {
      return W < c;
    },
    kxHob: "rXEUh",
    wSHIO: "Auphe",
    ycdvS: function (W, c, Q) {
      return W(c, Q);
    },
    PrAns: "44147",
    LMBeg: function (W, c) {
      return W == c;
    },
    VbdGl: "发表观点",
    hBgjT: function (W, c) {
      return W < c;
    },
    NWKFD: "weFuQ",
    GwCLz: "ZSoLD",
    jvMHa: function (W, c) {
      return W < c;
    },
    ikZrD: "MTJfk",
    xwFvy: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    DrUVO: function (W, c) {
      return W + c;
    },
    wgVGx: function (W, c) {
      return W == c;
    },
    FNvVp: "阅读推送文章",
    cmJNN: function (W, c) {
      return W < c;
    },
    jyeYQ: function (W, c) {
      return W !== c;
    },
    VCYJb: "BFhPe",
    YqwOU: function (W, c) {
      return W < c;
    },
    nOwCv: function (W, c) {
      return W === c;
    },
    KkCHU: "mOjRZ",
    mYAOI: "fkCjP",
    mhVxh: function (W, c, Q) {
      return W(c, Q);
    },
    riUqm: function (W, c) {
      return W !== c;
    },
    zbDlu: "TRJvD",
    TyiAS: function (W, c) {
      return W + c;
    },
    kPmDT: function (W, c) {
      return W + c;
    },
    nemBR: function (W, c) {
      return W < c;
    },
    SkKhL: function (W, c) {
      return W + c;
    },
    biNqa: function (W, c) {
      return W + c;
    }
  };
  const f = "https://hdapi.nfnews.com/nfplus-points-api/task/userPointsTasCatList";
  const l = helpUtils.ts13();
  await selectChannel(U, "{\"userUuid\":\"" + nfpapp[U].uuid + "\",\"timestamp\":" + l + "}@sign@one");
  let z = requestSigns[U];
  await getReqObject(f, z, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    {
      await selectChannel(U, N.data + "@unSign@one");
      let c = JSON.parse(requestSigns[U]);
      let Q = c.list.find(M => M.catName == "每日任务");
      if (Q) {
        {
          let v = Q.list;
          for (let C of v) {
            {
              if (C.taskName == "每日登录" && C.finishNum < C.taskLimitTimes) {
                {
                  for (let r = 0; r < C.taskLimitTimes - C.finishNum; r++) {
                    await login(U);
                  }
                }
              }
              if (C.taskName == "选读文章" && (C.finishNum < C.taskLimitTimes || C.subTaskList[0].finishNum < C.subTaskList[0].taskLimitTimes)) {
                {
                  if (C.taskLimitTimes - C.finishNum > C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum) {
                    {
                      for (let g = 0; g < C.taskLimitTimes - C.finishNum; g++) {
                        {
                          await reportTask(U, articleIds[U][g]);
                          await $.wait(helpUtils.randomNum(30000, 60000));
                          await doArticleTimeTask(U, articleIds[U][g], C.finishNum + g + 1 + "/" + C.taskLimitTimes);
                        }
                      }
                    }
                  } else {
                    {
                      for (let t = 0; t < C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum; t++) {
                        await reportTask(U, articleIds[U][t]);
                        await $.wait(helpUtils.randomNum(30000, 60000));
                        await doArticleTimeTask(U, articleIds[U][t]);
                      }
                    }
                  }
                }
              }
              if (C.taskName == "视听播报" && (C.finishNum < C.taskLimitTimes || C.subTaskList[0].finishNum < C.subTaskList[0].taskLimitTimes)) {
                {
                  if (C.taskLimitTimes - C.finishNum > C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum) {
                    {
                      for (let j = 0; j < C.taskLimitTimes - C.finishNum; j++) {
                        {
                          await reportTask(U, videoIds[U][j]);
                          await $.wait(helpUtils.randomNum(30000, 60000));
                          await doVideoTimeTask(U, videoIds[U][j], C.finishNum + j + 1 + "/" + C.taskLimitTimes);
                        }
                      }
                    }
                  } else {
                    {
                      for (let G = 0; G < C.subTaskList[0].taskLimitTimes - C.subTaskList[0].finishNum; G++) {
                        await reportTask(U, videoIds[U][G]);
                        await $.wait(helpUtils.randomNum(30000, 60000));
                        await doVideoTimeTask(U, videoIds[U][G]);
                      }
                    }
                  }
                }
              }
              if (C.taskName == "分享文章" && C.finishNum < C.taskLimitTimes) {
                {
                  for (let q = 0; q < C.taskLimitTimes - C.finishNum; q++) {
                    {
                      await reportShareTask(U, articleIds[U][q], C.finishNum + q + 1 + "/" + C.taskLimitTimes);
                      await $.wait(helpUtils.randomNum(5000, 10000));
                    }
                  }
                }
              }
              if (C.taskName == "订阅南方号" && C.finishNum < C.taskLimitTimes) {
                {
                  for (let w = 0; w < C.taskLimitTimes - C.finishNum; w++) {
                    {
                      await getNfhList(U, C.taskLimitTimes - C.finishNum);
                    }
                  }
                }
              }
              if (C.taskName == "订阅频道" && C.finishNum < C.taskLimitTimes) {
                {
                  await reportSubChannelTask(U, "44147");
                }
              }
              if (C.taskName == "发表观点" && C.finishNum < C.taskLimitTimes) {
                {
                  for (let a = 0; a < C.taskLimitTimes - C.finishNum; a++) {
                    {
                      await reportLikeTask(U, articleIds[U][a], C.finishNum + a + 1 + "/" + C.taskLimitTimes);
                      await $.wait(helpUtils.randomNum(5000, 10000));
                    }
                  }
                }
              }
              if (C.taskName == "阅读推送文章" && C.finishNum < C.taskLimitTimes) {
                {
                  for (let S = 0; S < C.taskLimitTimes - C.finishNum; S++) {
                    await clickAticle(U, articleIds[U][S]);
                    await $.wait(helpUtils.randomNum(5000, 10000));
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + N.msg);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 用户信息=> " + N.msg + "\n";
    }
  }
}
async function aticleList(U) {
  const p = {
    JrHkt: "set-cookie",
    WYZhb: "(((.+)+)+)+$",
    QQQNF: function (W) {
      return W();
    },
    aUKQf: function (W, c) {
      return W < c;
    },
    JrXrH: function (W, c) {
      return W + c;
    },
    DyYal: function (W, c) {
      return W <= c;
    },
    IyWhH: function (W, c) {
      return W(c);
    },
    nYFII: function (W, c) {
      return W > c;
    },
    zCkrq: function (W, c) {
      return W !== c;
    },
    IQRMC: "hSYyU",
    FGSyH: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    Owwnd: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    wwnZu: "get",
    NEdlh: function (W, c) {
      return W != c;
    },
    DMYeS: function (W, c) {
      return W == c;
    },
    OCECp: "uKBtO",
    Iadls: "ddTIm",
    FapHs: function (W, c) {
      return W !== c;
    },
    LWxCD: "tcRbp",
    OwtTR: function (W, c) {
      return W === c;
    },
    fMvBr: "VLuZj",
    HFnDF: "YSEiU",
    kckJe: function (W, c) {
      return W === c;
    },
    wwQLx: "QPibJ",
    EGUpO: "bwCMX",
    dNZrv: "KUrPO",
    yCfIy: function (W, c) {
      return W < c;
    },
    dPCFi: function (W, c) {
      return W + c;
    },
    HPdyv: function (W, c) {
      return W + c;
    }
  };
  let f = 1;
  if (hour > 10) {
    {
      f = 2;
    }
  }
  const l = "https://nfplusapi.nfnews.com/nfplus-manuscript-web/article/list?columnId=14&deviceId=" + nfpapp[U].deviceId + "&livePromotion=1&location=%E5%B9%BF%E5%B7%9E&nfhSubCount=0&pageNum=" + f + "&pageSize=100&service=1&userUuid=" + nfpapp[U].uuid;
  let z = "";
  await getReqObject(l, z, U);
  await httpRequest("get", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    {
      if (N.data.list.length > 0) {
        {
          articleIds[U] = [];
          videoIds[U] = [];
          for (let Q of N.data.list) {
            {
              let M = Q.articleId;
              if (Q.videoInfo) {
                videoIds[U].push(M);
              } else {
                {
                  articleIds[U].push(M);
                }
              }
            }
          }
        }
      }
    }
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg + "\n";
  }
}
async function videoList(U) {
  const p = {
    rTzCC: "0123456789ABCDEF",
    evmuA: function (W, c) {
      return W * c;
    },
    VaKko: function (W, c) {
      return W == c;
    },
    FmqIr: function (W, c) {
      return W(c);
    },
    aZUwY: function (W, c) {
      return W(c);
    },
    CIsWG: function (W, c) {
      return W > c;
    },
    cCFjp: function (W, c) {
      return W > c;
    },
    gncjI: function (W, c) {
      return W !== c;
    },
    byZJA: "VQBjc",
    XGDCf: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    ibIkt: "get",
    yVTJd: function (W) {
      return W();
    },
    FMReZ: function (W, c) {
      return W != c;
    },
    tlFJo: "XmfQC",
    FMMnV: function (W, c) {
      return W !== c;
    },
    WMMLo: "hoUob",
    yZvjt: "CxKbJ",
    GJAbe: function (W, c) {
      return W === c;
    },
    anPrs: "jyanV",
    rPBWU: "zhoyv",
    DpPdp: function (W, c) {
      return W !== c;
    },
    pPzSt: "iNiiy",
    dykLI: "qIftr",
    TSzrW: function (W, c) {
      return W < c;
    },
    JZoiT: function (W, c) {
      return W + c;
    },
    XBvbC: function (W, c) {
      return W < c;
    },
    rHDkg: function (W, c) {
      return W + c;
    },
    RXzxA: function (W, c) {
      return W + c;
    }
  };
  let f = 1;
  if (hour > 19) {
    {
      f = 2;
    }
  }
  const l = "https://api.nfnews.com/nanfang_if/recommend/article/v1/getVideoRecommend?deviceId=" + nfpapp[U].deviceId + "&userUuid=" + nfpapp[U].uuid + "&pageNo=" + f + "&pageSize=20&city=%E5%B9%BF%E5%B7%9E&horiVideo=0";
  let z = "";
  await getReqObject(l, z, U);
  await httpRequest("get", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null && N.code == 200) {
    {
      if (N.data.length > 0) {
        {
          videoIds[U] = [];
          for (let Q of N.data) {
            {
              let v = Q.fileId;
              videoIds[U].push(v);
            }
          }
        }
      }
    }
  } else {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 视频列表=> " + N.msg);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 视频列表=> " + N.msg + "\n";
    }
  }
}
async function getNfhList(U, p) {
  const f = {
    RGMUR: function (W, c) {
      return W(c);
    },
    YEsVZ: function (W, c) {
      return W === c;
    },
    cPWUv: "Stash",
    rnTOO: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    pDWZp: "content-type",
    BOIQD: "application/x-www-form-urlencoded",
    CbPyB: function (W, c, Q, M) {
      return W(c, Q, M);
    },
    SJeJb: "post",
    ftOUa: function (W) {
      return W();
    },
    ptlyh: function (W, c) {
      return W != c;
    },
    CpCwe: function (W, c) {
      return W !== c;
    },
    MYTkB: "kTqXj",
    NtyXD: "weTkI",
    gUIeq: function (W, c) {
      return W > c;
    },
    mRIFc: function (W, c) {
      return W !== c;
    },
    YABbC: "TVZvN",
    OicsX: "Usqiv",
    hzFwB: function (W, c) {
      return W !== c;
    },
    MYATO: "tuvWp",
    xqglq: function (W, c) {
      return W == c;
    },
    vvRbH: function (W, c) {
      return W === c;
    },
    Ohcxp: "fAnvP",
    xxAYc: "THtrD",
    IhLeR: function (W, c, Q) {
      return W(c, Q);
    },
    rzYss: "bhEXy",
    EpPby: function (W, c) {
      return W < c;
    },
    MRlYU: function (W, c) {
      return W + c;
    },
    sziQS: function (W, c) {
      return W + c;
    },
    xUHSQ: function (W, c) {
      return W + c;
    },
    WPqSo: function (W, c) {
      return W < c;
    },
    ZCdvw: function (W, c) {
      return W + c;
    },
    bSjoA: function (W, c) {
      return W + c;
    },
    SJEDQ: function (W, c) {
      return W + c;
    }
  };
  const l = "https://api.nfnews.com/nanfang_if/nfh/getNfhList";
  let z = "colId=23&page=1&size=20";
  await getReqObject(l, z, U);
  requestObjects[U].headers["content-type"] = "application/x-www-form-urlencoded";
  await httpRequest("post", requestObjects[U], printCaller());
  let N = httpResult;
  if (N != null) {
    {
      if (N.columns.length > 0) {
        {
          articleIds[U] = [];
          let W = 0;
          for (let c of N.columns) {
            {
              if (W == p) {
                {
                  break;
                }
              }
              let M = c.columnId;
              await reportSubTask(U, M);
              await $.wait(helpUtils.randomNum(5000, 10000));
              W++;
            }
          }
        }
      }
    }
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 文章列表=> " + N.msg + "\n";
  }
}
async function reportTask(U, p) {
  const l = "https://analyticsapi.nfnews.com/analytics/sendRecords";
  const z = helpUtils.ts13();
  let N = "[{\n\t\"actionTime\": \"" + z + "\",\n\t\"discussNum\": \"7\",\n\t\"enterColumnId\": \"8967\",\n\t\"recommendSource\": \"2\",\n\t\"dataType\": \"1000005\",\n\t\"origin\": \"video\",\n\t\"articleID\": \"" + p + "\",\n\t\"recommendReason\": \"8\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"operator\": \"--\",\n\t\"recallLevel\": \"10\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"isAutoPlay\": \"1\"\n}]";
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  W != null && W.code == 200 ? $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读新闻[" + p + "]=> 完成") : ($.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读新闻[" + p + "]=> " + W.msg), nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 阅读新闻[" + p + "]=> " + W.msg + "\n");
}
async function reportShareTask(U, p, f) {
  const l = {
    zybvF: function (Q, M) {
      return Q(M);
    },
    MSZAS: "请求超时",
    sBKRn: function (Q, M, v, C) {
      return Q(M, v, C);
    },
    gHcYp: function (Q, M, v, C) {
      return Q(M, v, C);
    },
    meSeg: "post",
    XknsS: function (Q) {
      return Q();
    },
    ygwKO: function (Q, M) {
      return Q != M;
    },
    qlEyf: function (Q, M) {
      return Q == M;
    },
    HtcSr: function (Q, M) {
      return Q === M;
    },
    KXfWy: "ftQXl",
    BRbxM: "LAZOe",
    kVZrO: function (Q, M) {
      return Q < M;
    },
    XIWzR: function (Q, M) {
      return Q + M;
    },
    EeqOZ: function (Q, M) {
      return Q + M;
    },
    rODbR: function (Q, M) {
      return Q !== M;
    },
    oGzLK: "QgGDj",
    CIYNf: "GnFDS",
    TIkDC: function (Q, M) {
      return Q + M;
    },
    yOduI: function (Q, M) {
      return Q + M;
    },
    ahsBG: function (Q, M) {
      return Q < M;
    },
    FgOav: function (Q, M) {
      return Q + M;
    },
    BLElr: function (Q, M) {
      return Q + M;
    }
  };
  const z = "https://analyticsapi.nfnews.com/analytics/sendRecords";
  const N = helpUtils.ts13();
  let W = "[{\n\t\"origin\": \"14\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"dataType\": \"1000009\",\n\t\"action\": \"1\",\n\t\"operator\": \"--\",\n\t\"shareChanel\": \"1\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"actionTime\":  \"" + N + "\",\n\t\"articleID\": \"" + p + "\",\n\t\"url\": \"https://static.nfnews.com/content/202507/12/c11500401.html?colID=14&firstColID=27700&appversion=12600&from=weChatMessage&enterColumnId=14\"\n}]";
  await getReqObject(z, W, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let c = httpResult;
  c != null && c.code == 200 ? $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 分享新闻[" + p + "]任务(" + f + ")=> 完成") : ($.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 分享新闻[" + p + "]任务=> " + c.msg), nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 分享新闻[" + p + "]任务=> " + c.msg + "\n");
}
async function reportSubTask(U, p) {
  const l = "https://analyticsapi.nfnews.com/analytics/sendRecords";
  const z = helpUtils.ts13();
  let N = "[{\n\t\"origin\": \"9\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"dataType\": \"1000025\",\n\t\"operator\": \"--\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"actionTime\": \"" + z + "\",\n\t\"columnId\": " + p + ",\n\t\"isSuccess\": \"1\"\n}]";
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  if (W != null && W.code == 200) {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅[" + p + "]任务=> 完成");
  } else {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅[" + p + "]任务=> " + W.msg);
      nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅[" + p + "]任务=> " + W.msg + "\n";
    }
  }
}
async function reportSubChannelTask(U, p) {
  const l = "https://analyticsapi.nfnews.com/analytics/sendRecords";
  const z = helpUtils.ts13();
  let N = "[{\n\t\"origin\": \"2\",\n\t\"deviceid\": \"" + nfpapp[U].deviceId + "\",\n\t\"dataType\": \"1000039\",\n\t\"operator\": \"--\",\n\t\"userUuid\": \"" + nfpapp[U].uuid + "\",\n\t\"actionTime\": \"" + z + "\",\n\t\"columnId\": \"" + p + "\"\n}]";
  await getReqObject(l, N, U);
  await httpRequest("post", requestObjects[U], printCaller());
  let W = httpResult;
  W != null && W.code == 200 ? $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅频道[" + p + "]任务=> 完成") : ($.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅频道[" + p + "]任务=> " + W.msg), nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 订阅频道[" + p + "]任务=> " + W.msg + "\n");
}
async function reportLikeTask(U, p, f) {
  let z = "[{\"articleId\":" + p + ",\"recommendTime\":\"\",\"grade\":\"\",\"reason\":\"\",\"recallLevel\":\"\",\"recommendScheme\":\"\"}]";
  const N = "https://analyticsapi.nfnews.com/analytics/sendRecord?deviceid=" + nfpapp[U].deviceId + "&articleID=" + p + "&dataType=1000002&origin=14&advId=&advType=0&recommendReason=&recommendTime=&recommendGrade=&recallLevel=&recommendScheme=&recInfo=" + encodeURIComponent(z);
  const W = helpUtils.ts13();
  let c = "";
  await getReqObject(N, c, U);
  await httpRequest("get", requestObjects[U], printCaller());
  let Q = httpResult;
  if (Q != null && Q.code == 200) {
    {
      $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 点赞新闻[" + p + "]任务(" + f + ")=> 完成");
    }
  } else {
    $.log("[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 点赞新闻[" + p + "]任务=> " + Q.msg);
    nfplogs[U] += "[账号" + (U + 1 < 10 ? "0" + (U + 1) : U + 1) + "]: 点赞新闻[" + p + "]任务=> " + Q.msg + "\n";
  }
}
function getScriptAuth(U, p, f) {
  const i = {
    kiUVo: function (l, z) {
      return l(z);
    },
    fqNIF: function (l) {
      return l();
    },
    glXVD: "application/json",
    sBSoR: function (l, z) {
      return l <= z;
    },
    vomeU: function (l, z) {
      return l > z;
    },
    anbyB: function (l, z) {
      return l < z;
    },
    TngVV: function (l, z) {
      return l + z;
    },
    fErem: function (l, z) {
      return l + z;
    },
    CYKEu: function (l, z) {
      return l + z;
    },
    GhMoL: function (l, z) {
      return l(z);
    },
    GkDlb: function (l, z) {
      return l === z;
    },
    JldBl: "vojHn",
    JISBY: function (l, z) {
      return l != z;
    },
    eDmwc: function (l, z) {
      return l !== z;
    },
    WEqBF: "SYijr",
    GapVv: "wJCWv",
    pCZli: "RaHtK",
    jsUjt: "RRFlK",
    gzbtc: "10|5|8|0|13|9|2|6|11|4|7|3|1|12|14",
    tdiIn: "bxuZj",
    Hbdhw: "UgaxS",
    xApgZ: "pptlS",
    MglDd: "OBDAH",
    FTliq: "请求服务器接口出现错误，请检查网络连接情况",
    rUICm: function (l) {
      return l();
    },
    OkBjK: "HpFla",
    DjxpM: "qyYKF"
  };
  return new Promise((l, z) => {
    const N = {
      FAcll: function (W) {
        return W();
      },
      MhNdY: "application/json",
      aAFdB: function (W, c) {
        return W <= c;
      },
      MPDCH: function (W, c) {
        return W > c;
      },
      honUn: function (W, c) {
        return W < c;
      },
      TvQmz: function (W, c) {
        return W + c;
      },
      MEBli: function (W, c) {
        return W + c;
      },
      xazGB: function (W, c) {
        return W + c;
      },
      LhqjT: function (W, c) {
        return W + c;
      },
      cspqD: function (W, c) {
        return W(c);
      },
      NIKEp: function (W, c) {
        return W === c;
      },
      WAoSr: "vojHn",
      ggSmi: function (W, c) {
        return W != c;
      },
      KqlPl: function (W, c) {
        return W !== c;
      },
      cpyxO: "SYijr",
      DIKjk: "wJCWv",
      deqap: function (W, c) {
        return W(c);
      },
      MfKjv: function (W, c) {
        return W === c;
      },
      qAnGk: "RaHtK",
      QsTos: "RRFlK",
      fDdYV: "10|5|8|0|13|9|2|6|11|4|7|3|1|12|14",
      otkOm: function (W, c) {
        return W !== c;
      },
      xWxFS: "bxuZj",
      rdiPe: "UgaxS",
      vxclp: "pptlS",
      LFrDY: "OBDAH",
      tgQlP: "请求服务器接口出现错误，请检查网络连接情况",
      FYezB: function (W) {
        return W();
      }
    };
    {
      const W = apiHost + "/script/permissions/lastest";
      const Q = {
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
        body: JSON.stringify(Q)
      };
      $.post(v, async (C, u, O) => {
        {
          if (O && O != null && O.replace(/\"/g, "").length > 50) {
            {
              const r = O.replace(/\"/g, "").slice(34);
              helpUtils = await loadUtils(flushCash);
              CryptoJS = helpUtils.createCryptoJS();
              result = JSON.parse(CryptoJS.enc.Base64.parse(r).toString(CryptoJS.enc.Utf8));
              try {
                {
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
                }
              } catch (L) {
                $.log(L);
              }
            }
          } else {
            $.log("请求服务器接口出现错误，请检查网络连接情况");
          }
          l();
        }
      });
    }
  });
}
function runComplete(U, p) {
  const f = {
    wwVzR: function (i, l) {
      return i !== l;
    },
    OeiWX: "ouWwF",
    emDxX: function (i) {
      return i();
    },
    GMdMe: function (i, l) {
      return i + l;
    },
    RaUNJ: function (i, l) {
      return i + l;
    },
    BLzmu: function (i, l) {
      return i(l);
    },
    tzMkl: function (i, l) {
      return i === l;
    },
    hDWMl: "hhlVh",
    iEllv: "mszJU",
    RDdWa: "application/json"
  };
  return new Promise((i, l) => {
    const z = {
      YKTDq: function (N, W) {
        return N + W;
      },
      uimzB: function (N, W) {
        return N + W;
      },
      VUinZ: function (N) {
        return N();
      },
      ukoXk: function (N, W) {
        return N(W);
      }
    };
    {
      const W = apiHost + "/script/run/add";
      const Q = {
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
        body: JSON.stringify(Q)
      };
      $.post(v, async (C, u, O) => {
        i();
      });
    }
  });
}
function loadToken(p) {
  const l = {
    LoplR: function (N, W) {
      return N === W;
    },
    DWULl: "WYGXv",
    WqISC: "OxCwh",
    gvvci: function (N, W) {
      return N !== W;
    },
    QICSG: "ZMsgu",
    cZSZu: "eHsas"
  };
  let z = nfpapp[p].mobile;
  nfp_item = nfp_cks["" + z];
  if (nfp_item) {
    {
      nfpapp[p].refreshToken = nfp_item.refreshToken;
      nfpapp[p].accessToken = nfp_item.accessToken;
      return true;
    }
  } else {
    {
      return false;
    }
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
    {
      $.log("📢 缓存中存在JS-Utils");
      eval(f);
      return creatUtils();
    }
  }
  $.log("📢 开始初始化JS-Utils");
  return new Promise(async l => {
    {
      $.getScript("http://script.david2025.top/scripts/tools/JS-Utils.js").then(W => {
        $.setdata(W, "Utils_Code");
        eval(W);
        $.log("📢 JS-Utils加载成功");
        l(creatUtils());
      });
    }
  });
}
function checkAddress(U, p) {
  const f = {
    lmTSk: function (i, l) {
      return i === l;
    },
    wfhqn: "tLuZF",
    ispmM: function (i, l) {
      return i(l);
    },
    HuDib: function (i, l) {
      return i + l;
    },
    ooWsT: function (i, l) {
      return i < l;
    },
    iTIlb: function (i, l) {
      return i + l;
    },
    yiGnn: function (i, l) {
      return i - l;
    },
    BOMAK: function (i, l) {
      return i(l);
    },
    ezcwQ: function (i, l) {
      return i === l;
    },
    lbSYY: "XtnYn",
    ttDXR: function (i, l) {
      return i(l);
    },
    cVGNA: function (i, l) {
      return i !== l;
    },
    OoAFi: "FXVwv",
    csgik: "BkJWA",
    gPXkz: function (i, l) {
      return i(l);
    },
    pEncm: "atNrA",
    dvUpp: "IEdKB",
    sRJws: function (i, l) {
      return i(l);
    },
    RXKsr: function (i, l) {
      return i >= l;
    },
    XztzH: function (i, l) {
      return i - l;
    },
    afgAN: "...",
    aQqke: function (i, l) {
      return i === l;
    },
    kOQCM: "DYmSZ",
    tydDc: function (i, l) {
      return i(l);
    },
    FgtqC: function (i, l) {
      return i === l;
    },
    COoSL: "vcLlu",
    OpsjU: "请求超时",
    MpmTE: "set-cookie",
    LmKqp: function (i, l) {
      return i > l;
    },
    lCKNE: "CYnen",
    HPqsq: "wKppN",
    TyZlQ: function (i, l, z) {
      return i(l, z);
    },
    DTMXj: "error",
    yqqai: "timeout"
  };
  return new Promise((i, l) => {
    {
      const N = setTimeout(() => {
        i(false);
      }, p);
      const W = http.get(U, c => {
        const Q = {
          gAlcu: function (M, v) {
            return M + v;
          },
          OwJRw: function (M, v) {
            return M < v;
          },
          DRpwN: function (M, v) {
            return M + v;
          },
          UHgiy: function (M, v) {
            return M - v;
          },
          YWovr: function (M, v) {
            return M(v);
          }
        };
        {
          clearTimeout(N);
          if (c.statusCode === 404) {
            {
              i(true);
            }
          } else {
            {
              i(false);
            }
          }
        }
      });
      W.on("error", c => {
        const Q = {
          VMewA: function (M, v) {
            return M + v;
          },
          xeCjy: function (M, v) {
            return M >= v;
          },
          vSUIH: function (M, v) {
            return M + v;
          },
          kZhdU: function (M, v) {
            return M - v;
          },
          PJoEP: "..."
        };
        {
          clearTimeout(N);
          i(false);
        }
      });
      W.on("timeout", () => {
        {
          W.abort();
          l(new Error("请求超时"));
        }
      });
    }
  });
}
async function fetchRequest(U, p = 3000) {
  const f = {
    XLmOn: "[DEBUG] ",
    mJHls: "[INFO] ",
    ftjIT: "[WARN] ",
    YLNRm: "[ERROR] ",
    GQquq: "info",
    mJfix: "box.dat",
    Yedfb: "utf-8",
    IcWxK: function (i, l) {
      return i === l;
    },
    KWlRg: "qSYJP",
    wKYkt: "KnCtm",
    wfmBd: function (i, l) {
      return i(l);
    },
    FbStS: "LfEsO",
    ATACB: function (i, l) {
      return i == l;
    },
    CDncQ: "AZxDd",
    KHLOT: function (i, l) {
      return i(l);
    },
    dPlpt: function (i, l) {
      return i !== l;
    },
    VhisY: "mCtDi",
    tzeVT: "ramnm",
    yXrIM: function (i, l) {
      return i == l;
    },
    UFJde: "string",
    dgjIS: "POST",
    yBuzO: "Shadowrocket",
    RdIvf: function (i, l) {
      return i === l;
    },
    AnWSU: "ShhEF",
    wAkfu: "hqlFe",
    Rgriy: function (i, l) {
      return i + l;
    },
    LdvPk: "/docs",
    HVfmI: function (i, l, z) {
      return i(l, z);
    }
  };
  return new Promise((i, l) => {
    const z = {
      nDPQs: function (N, W) {
        return N(W);
      },
      pnaEC: function (N, W) {
        return N == W;
      },
      tBcqk: "string",
      BBwqf: function (N, W) {
        return N === W;
      },
      Mxpqu: "POST",
      nypbw: function (N, W) {
        return N === W;
      },
      IIUZj: "Shadowrocket"
    };
    {
      const W = {
        url: U + "/docs"
      };
      setTimeout(() => {
        const Q = {
          xVBVe: "[DEBUG] ",
          uWxNc: "[INFO] ",
          UviDk: "[WARN] ",
          QnVcL: "[ERROR] ",
          DOEsE: "info",
          vzIar: "box.dat",
          LzTzH: "utf-8"
        };
        {
          i(false);
        }
      }, p);
      $.get(W, async (c, Q, M) => {
        {
          if (Q.status == 401) {
            {
              i(true);
            }
          } else {
            {
              i(false);
            }
          }
        }
      });
    }
  });
}
async function httpClientRequest(U, p = 3000) {
  const f = {
    MwTNO: function (i, l) {
      return i === l;
    },
    Dwyel: "XhoEw",
    XGQKr: "UBTyJ",
    ocMfI: function (i, l) {
      return i(l);
    },
    YExJV: function (i) {
      return i();
    },
    QONRE: "application/json",
    PPOmI: function (i, l) {
      return i + l;
    },
    EoWly: function (i, l) {
      return i - l;
    },
    LXrir: "...",
    wvkaV: "LvKZz",
    iROEp: "vtFGI",
    PgwZH: function (i, l) {
      return i == l;
    },
    hHoYx: "{\"detail\":\"Not Found\"}",
    tWWxY: "urZMb",
    ZdofU: "nDQmz",
    emWjR: function (i, l) {
      return i !== l;
    },
    oDhIM: "CwGex",
    ceBKq: function (i, l) {
      return i === l;
    },
    RrPwD: "UXaGS",
    zBflq: function (i, l, z) {
      return i(l, z);
    }
  };
  return new Promise((i, l) => {
    const z = {
      heccx: function (N) {
        return N();
      },
      hfEzW: "application/json",
      xqRhS: function (N, W) {
        return N + W;
      },
      uUVlD: function (N, W) {
        return N - W;
      },
      jSHRu: "...",
      cTLzF: function (N, W) {
        return N === W;
      },
      muNVI: "LvKZz",
      LyKej: "vtFGI",
      pbYkX: function (N, W) {
        return N == W;
      },
      TxPIX: "{\"detail\":\"Not Found\"}",
      qQHpb: "urZMb",
      rBxdA: "nDQmz",
      DyCMb: function (N, W) {
        return N(W);
      },
      leaGn: function (N, W) {
        return N !== W;
      },
      nebJu: "CwGex"
    };
    {
      const N = {
        url: U + "/"
      };
      setTimeout(() => {
        {
          i(false);
        }
      }, p);
      $httpClient.get(N, async (W, c, Q) => {
        const M = {
          EiZrQ: "application/json",
          KYwgP: function (v, C) {
            return v + C;
          },
          QwxfC: function (v, C) {
            return v - C;
          },
          FBBgC: "..."
        };
        {
          if (Q == "{\"detail\":\"Not Found\"}") {
            {
              i(true);
            }
          } else {
            {
              i(false);
            }
          }
        }
      });
    }
  });
}
async function redisGet(U, p, f) {
  const l = {
    RAVqx: function (z, N) {
      return z + N;
    },
    WAfow: "debu",
    Mnqwu: "gger",
    POHVv: "stateObject",
    SYABz: function (z, N) {
      return z === N;
    },
    iZMjm: "meoIr",
    fKJvC: "IHJyA",
    viVwa: function (z) {
      return z();
    },
    FBrvv: function (z, N) {
      return z === N;
    },
    AmOEq: "nYpxi",
    yeRzl: "Mdhop",
    fTjCp: "application/json"
  };
  return new Promise((z, N) => {
    {
      const Q = apiHost + "/redis/hash/get/" + p + "/" + f;
      const M = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
      const C = {
        url: Q,
        headers: M
      };
      $.get(C, async (u, O, r) => {
        {
          const H = r.replace(/\"/g, "");
          answerTexts[U] = H;
          z();
        }
      });
    }
  });
}
function redisSet(U, p, f) {
  return new Promise((l, z) => {
    {
      const c = apiHost + "/redis/hash/set";
      const M = {
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
        body: JSON.stringify(M)
      };
      $.post(C, async (u, O, r) => {
        {
          const A = r.replace(/\"/g, "");
          l();
        }
      });
    }
  });
}
function redisPop(U) {
  return new Promise((f, i) => {
    const l = {
      uoKia: function (z, N) {
        return z < N;
      },
      cNilr: function (z, N) {
        return z + N;
      },
      hfkkN: function (z, N) {
        return z + N;
      },
      RuFaV: function (z, N) {
        return z + N;
      },
      tENHl: function (z, N) {
        return z !== N;
      },
      KibDH: "Yzkuw",
      eQMCf: function (z) {
        return z();
      }
    };
    {
      const N = apiHost + "/redis/set/pop/" + U;
      const W = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
      const Q = {
        url: N,
        headers: W
      };
      $.get(Q, async (M, v, C) => {
        {
          const O = C.replace(/\"/g, "");
          popCookie = O;
          f();
        }
      });
    }
  });
}
function getWxCode(U) {
  return new Promise((f, l) => {
    const z = {
      uMEjG: function (N, W) {
        return N < W;
      },
      SCqUX: function (N, W) {
        return N + W;
      },
      AOfRC: function (N, W) {
        return N + W;
      },
      RDzAw: function (N, W) {
        return N + W;
      },
      AAhqG: function (N, W) {
        return N + W;
      },
      XOqbS: function (N, W) {
        return N + W;
      }
    };
    {
      const W = apiHost + "/wechat/mini/code";
      const Q = {
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
        body: JSON.stringify(Q)
      };
      $.post(v, async (C, u, O) => {
        {
          const g = O.replace(/\"/g, "");
          codes[U] = g;
          f();
        }
      });
    }
  });
}
async function getReqObject(U, p, f) {
  const l = {
    oEPiS: function (c, Q) {
      return c < Q;
    },
    MpYKL: function (c, Q) {
      return c + Q;
    },
    ftWAY: function (c, Q) {
      return c + Q;
    },
    Pvmlj: function (c, Q) {
      return c + Q;
    },
    sTmnN: function (c, Q, M, v) {
      return c(Q, M, v);
    },
    RLfMb: "NFPlus/12.6.0 (iPhone; iOS 16.6.1; Scale/3.00)",
    sGLZC: function (c, Q) {
      return c != Q;
    },
    MwFaD: function (c, Q) {
      return c !== Q;
    },
    VzmUB: "XmsUf",
    UsurK: function (c, Q) {
      return c(Q);
    },
    bSUwl: "application/json",
    rOetM: "LS0=",
    iDmFn: "QXBwbGU=",
    JssNL: "MTIuNi4w",
    ZqOoo: "aU9T",
    HpTFR: "aVBob25lMTAsMg==",
    GMfhQ: "aVBob25lIDggUGx1cw==",
    fTbjg: "MTYuNi4x",
    nWCHP: function (c, Q) {
      return c === Q;
    },
    DuwhB: "dthHQ",
    dMtCE: "BAYfo"
  };
  let z = "NFPlus/12.6.0 (iPhone; iOS 16.6.1; Scale/3.00)";
  nfpapp[f].ua && nfpapp[f].ua != "" && (z = nfpapp[f].ua);
  let N = getHostname(U);
  let W = {
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
    {
      W.body = p;
    }
  }
  requestObjects[f] = W;
  return W;
}
function getReqObject_(f, l, z) {
  const N = {
    kbfBX: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f34) NetType/WIFI Language/zh_CN",
    LgHrt: function (C, u) {
      return C != u;
    },
    MrEvv: function (C, u) {
      return C !== u;
    },
    uRneS: "QYoqj",
    BABLP: "LifoW",
    upksz: function (C, u) {
      return C(u);
    },
    YaqHq: "application/x-www-form-urlencoded",
    IfTYd: function (C, u) {
      return C !== u;
    },
    DOCQA: "hZAmN"
  };
  let W = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f34) NetType/WIFI Language/zh_CN";
  if (nfpapp[z].ua && nfpapp[z].ua != "") {
    {
      W = nfpapp[z].ua;
    }
  }
  let c = getHostname(f);
  const Q = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": W,
    Authorization: nfpapp[z].auth,
    Host: c
  };
  let v = {
    url: f,
    headers: Q
  };
  l && (v.body = l);
  requestObjects[z] = v;
  return v;
}
async function httpRequest(U, p, f) {
  const i = {
    uETQy: function (l) {
      return l();
    },
    RoxHP: "application/json",
    phSrR: function (l, z, N, W, c) {
      return l(z, N, W, c);
    },
    npuFH: function (l, z) {
      return l < z;
    },
    yQKNO: function (l, z) {
      return l + z;
    },
    zdzAn: function (l, z) {
      return l + z;
    },
    ycxmO: function (l, z, N, W) {
      return l(z, N, W);
    },
    pBMMx: function (l, z) {
      return l + z;
    },
    EBwiT: "debu",
    aSWGv: "gger",
    LjmZT: "action",
    YnqSX: function (l, z) {
      return l === z;
    },
    xHCqS: "EbVZf",
    UpxDT: function (l, z) {
      return l !== z;
    },
    ECEiK: "NPHDm",
    xXyXC: "qfbvX",
    WATdI: function (l, z) {
      return l === z;
    },
    kYHFh: "cecDu",
    OUKNG: function (l, z) {
      return l(z);
    },
    banKQ: "XcfZn",
    HahvC: function (l, z) {
      return l == z;
    },
    gkzzw: "wgcGl",
    XOeGt: "zZzEy",
    JcdkY: "xYhtz",
    vXRKl: "fcita",
    uBucL: "eVwlg",
    fWiKe: "OecuR"
  };
  httpResult = null;
  return new Promise(l => {
    const z = {
      eWEpM: function (N) {
        return N();
      },
      KaesT: "application/json",
      qAcJo: function (N, W, c, Q, M) {
        return N(W, c, Q, M);
      },
      YyPti: function (N, W) {
        return N < W;
      },
      lkucU: function (N, W) {
        return N + W;
      },
      ErfyU: function (N, W) {
        return N + W;
      },
      RVUqb: function (N, W) {
        return N + W;
      },
      ilNpc: function (N, W) {
        return N + W;
      },
      MyMtQ: function (N, W) {
        return N + W;
      },
      PzfOk: function (N, W, c, Q) {
        return N(W, c, Q);
      },
      MPEos: function (N, W) {
        return N + W;
      },
      miMmx: "debu",
      WQkQW: "gger",
      NqjHe: "action",
      SOqIp: function (N, W) {
        return N + W;
      },
      yIfrO: function (N, W) {
        return N === W;
      },
      Rjzfn: "EbVZf",
      pNSDi: function (N, W) {
        return N !== W;
      },
      eAYYr: "NPHDm",
      nVAZE: function (N, W) {
        return N === W;
      },
      AnKuC: "qfbvX",
      stNQH: function (N, W) {
        return N === W;
      },
      BfGkU: "cecDu",
      PtSmW: function (N, W) {
        return N(W);
      },
      TaheR: "XcfZn",
      PWBhV: function (N, W) {
        return N == W;
      },
      NAleU: function (N, W) {
        return N === W;
      },
      rXWKz: "wgcGl",
      aRluo: "zZzEy",
      LVQcD: function (N, W) {
        return N === W;
      },
      NylDZ: "xYhtz",
      GWnsu: function (N, W) {
        return N !== W;
      },
      MQzKz: "fcita",
      VbukK: function (N, W) {
        return N !== W;
      },
      sljRw: "eVwlg"
    };
    $[U](p, async (W, c, Q) => {
      const M = {
        yGPGV: function (v, C) {
          return v + C;
        },
        BuQZl: "debu",
        YZoNd: "gger",
        fTchG: "action",
        pCDDQ: function (v) {
          return v();
        },
        gZjFp: function (v, C) {
          return v < C;
        },
        mppRR: function (v, C) {
          return v + C;
        },
        ejvwP: function (v, C) {
          return v + C;
        },
        bIpLB: function (v, C) {
          return v + C;
        }
      };
      {
        try {
          {
            if (W) {
              {
                $.log(f + ": " + U + "请求失败");
                $.log(JSON.stringify(W));
                $.logErr(W);
              }
            } else {
              {
                if (safeGet(Q)) {
                  {
                    httpResult = JSON.parse(Q);
                    debug == 1 && $.log(httpResult);
                  }
                } else {
                  {
                    const r = new URL(p.url);
                    $.log(r.pathname + "发起" + U + "请求时，出现错误，请处理");
                  }
                }
              }
            }
          }
        } catch (H) {
          {
            $.logErr(H, c);
          }
        } finally {
          l(httpResult);
        }
      }
    });
  });
}
async function selectChannel(U, p) {
  if (channels_status[U] == 0) {
    {
      await getSign_(U, p);
    }
  } else {
    {
      await getSign(U, p);
    }
  }
}
function getSign_(U, p) {
  const f = {
    xXUjV: function (l, z) {
      return l !== z;
    },
    IxeYY: "pTBdT",
    jLEMz: "nrEYq",
    Pzoit: "KeztJ",
    wFsWU: "DmCsB",
    YBfyk: function (l, z) {
      return l(z);
    },
    yNhBs: function (l, z) {
      return l(z);
    },
    JQWOI: function (l, z) {
      return l - z;
    },
    piOip: "nfpapp",
    DWtgG: function (l, z) {
      return l + z;
    },
    ySygo: function (l, z) {
      return l(z);
    },
    ZHiyY: function (l, z) {
      return l === z;
    },
    xEZOk: "vcUQE",
    HqxYh: "WOYbK",
    IVZqV: "utf8",
    DQDHQ: "message",
    ljOsf: "set-cookie",
    eDsRT: "dZawo",
    vvjwe: function (l, z) {
      return l === z;
    },
    jIouA: function (l, z) {
      return l !== z;
    },
    EDnjn: "dMDkn",
    AElaB: "EyxOM",
    kuYNK: function (l, z) {
      return l !== z;
    },
    sEtjN: "FYscG",
    xaOvx: function (l, z, N) {
      return l(z, N);
    }
  };
  return new Promise((l, z) => {
    const N = {
      ZBjbO: function (W, c) {
        return W(c);
      },
      HnVsZ: function (W, c) {
        return W === c;
      },
      MniDY: "vcUQE",
      SFyqY: "WOYbK",
      ebthq: "utf8",
      FOqyS: "message",
      gjCEn: function (W, c) {
        return W(c);
      },
      OTCvc: "set-cookie"
    };
    {
      function c(Q) {
        {
          let v = Q.toString("utf8");
          requestSigns[U] = v;
          wss[U].removeListener("message", c);
          l(v);
        }
      }
      wss[U].on("message", c);
      if (wss[U].readyState === 1) {
        {
          const Q = {
            method: appName,
            params: {}
          };
          Q.params.content = p;
          Q.params.appName = appName;
          Q.params.uuid = userId;
          wss[U].send(JSON.stringify(Q), M => {
            {
              M && z(M);
            }
          });
        }
      } else {
        {
          l(getSign(U, p));
          wss[U].removeListener("message", c);
        }
      }
    }
  });
}
function getSign(U, p) {
  return new Promise((l, z) => {
    const N = {
      raeEL: function (W, c) {
        return W === c;
      },
      PjOxh: "pzWfH",
      YUztc: "CswiE",
      oreiF: function (W) {
        return W();
      }
    };
    {
      const W = apiHost + "/sign/nfp";
      const Q = {
        content: p,
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
        body: JSON.stringify(Q)
      };
      $.post(v, async (C, u, O) => {
        {
          const A = O.replace(/\"/g, "");
          requestSigns[U] = A;
          l();
        }
      });
    }
  });
}
function sortUrlParams(U, p, f) {
  const l = url2obj(U);
  p.forEach(W => {
    delete l[W];
  });
  Object.assign(l, f);
  const z = Object.keys(l).sort();
  const N = z.map(W => W + "=" + l[W]).join("&");
  return N;
}
function url2obj(p) {
  p = p.replace(/\"/g, "");
  var z;
  var N = {};
  var W = p.slice(p.indexOf("?") + 1).split("&");
  for (var c = 0; c < W.length; c++) {
    {
      z = W[c].split("=");
      N[z[0]] = z[1];
    }
  }
  return N;
}
function convertStringToJson(U) {
  const f = U.replace(/[{} ]/g, "");
  const i = f.split(",");
  const l = {};
  i.forEach(z => {
    {
      const [W, c] = z.split("=");
      l[W] = c;
    }
  });
  return l;
}
function getHostname(p) {
  let l = p.substr(p.indexOf("//") + 2);
  let z = l.substr(0, l.indexOf("/"));
  let N = "";
  let W = z.indexOf(":");
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
  const f = {
    waKfQ: function (W, c) {
      return W(c);
    },
    eyRNK: function (W, c) {
      return W != c;
    },
    kxERc: function (W) {
      return W();
    },
    lueqG: "AT_6BZsE2IyJuVLPp3mcOkKvpoF245GR9xn",
    UnpfT: "快手答题余额通知",
    wbXCj: "application/json",
    OfMUz: "apiHosts",
    lNRWx: function (W, c) {
      return W == c;
    },
    zXPYI: "object",
    hCcJf: function (W, c) {
      return W <= c;
    },
    wUDlL: function (W, c) {
      return W * c;
    },
    UaUSy: function (W, c) {
      return W === c;
    },
    wSNiG: "GGYFa",
    CumdY: "yQTWJ",
    uguka: function (W, c) {
      return W < c;
    },
    VpAXc: "oReWy",
    AqQES: "NJeZp",
    MnNUY: function (W, c) {
      return W + c;
    },
    GAfGJ: function (W, c) {
      return W > c;
    },
    cikPr: function (W, c) {
      return W !== c;
    },
    giBcl: "TywBM",
    guAja: function (W, c) {
      return W + c;
    },
    wyXMO: function (W, c) {
      return W >= c;
    },
    umCPM: function (W, c) {
      return W === c;
    },
    NGnGX: "YErsZ",
    GbRkp: function (W, c) {
      return W - c;
    },
    DQwqy: "...",
    sowPD: "shYqu",
    VUQDF: "QWIFw",
    rfMmP: "gAdCi",
    texkE: "MRbyu",
    SixYr: function (W, c) {
      return W + c;
    }
  };
  if (U.length * 2 <= p) {
    {
      return U;
    }
  }
  var l = 0;
  var z = "";
  for (var N = 0; N < U.length; N++) {
    {
      z = z + U.charAt(N);
      if (U.charCodeAt(N) > 128) {
        {
          l = l + 2;
          if (l >= p) {
            {
              return z.substring(0, z.length - 1) + "...";
            }
          }
        }
      } else {
        {
          l = l + 1;
          if (l >= p) {
            return z.substring(0, z.length - 2) + "...";
          }
        }
      }
    }
  }
  return z;
}
function printCaller() {
  return new Error().stack.split("\n")[3].split("@")[0];
}
function safeGet(U) {
  const p = {
    wjFPY: function (f, i) {
      return f === i;
    },
    rrMOh: "Node.js",
    xMPLn: function (f, i) {
      return f(i);
    },
    jgamC: function (f, i) {
      return f == i;
    },
    guyll: function (f, i) {
      return f === i;
    },
    lbkTd: "JDZfu",
    wgAhV: function (f, i) {
      return f == i;
    },
    NValV: "object",
    asNgQ: function (f, i) {
      return f !== i;
    },
    kOpaF: "rxedk",
    AMGeU: "jwfyB",
    ZHDtd: "gMDVJ",
    FErko: "TwZAf"
  };
  try {
    {
      if (typeof JSON.parse(U) == "object") {
        return true;
      }
    }
  } catch (l) {
    {
      console.log(l);
      console.log("服务器访问数据为空，请检查自身设备网络情况");
      return false;
    }
  }
}
function jsonToUrl(U) {
  var f = Object.keys(U).map(function (i) {
    const l = {
      OPycQ: function (z, N) {
        return z(N);
      },
      ofQdx: "path"
    };
    {
      return encodeURIComponent(i) + "=" + encodeURIComponent(U[i]);
    }
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
    {
      f += String.fromCharCode(U.charCodeAt(l) - f.charCodeAt(l - 1));
    }
  }
  return f;
}
function randomMac() {
  return "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
    {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
    }
  });
}
function txt_api(U) {
  return new Promise((f, l) => {
    {
      const z = "https://v1.hitokoto.cn/?c=e";
      const N = {
        accept: "application/json"
      };
      const c = {
        url: z,
        headers: N
      };
      $.get(c, async (Q, M, v) => {
        {
          let u = JSON.parse(v);
          let O = u.hitokoto;
          contents[U] = O + " " + O;
          f();
        }
      });
    }
  });
}
function getTime_8() {
  return new Promise((p, f) => {
    {
      const l = "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp";
      const N = {
        url: l
      };
      $.get(N, async (W, c, Q) => {
        {
          p(Q);
        }
      });
    }
  });
}
function message() {
  tz == 1 && $.msg($.name, "", $.message);
}
async function sendMsg(U) {
  if (hour == 9 || hour == 12 || hour == 18) {
    {
      if (tz == 1) {
        {
          if ($.isNode()) {
            {
              await notify.sendNotify($.name, U);
            }
          } else {
            {
              $.msg($.name, "", U);
            }
          }
        }
      } else {
        $.log(U);
      }
    }
  }
}
async function wxPush(U, p, f) {
  return new Promise((z, N) => {
    const W = {
      IFDGG: function (c, Q) {
        return c < Q;
      },
      nuhcx: function (c, Q) {
        return c + Q;
      },
      CIakt: function (c, Q) {
        return c + Q;
      },
      abkUl: function (c, Q) {
        return c !== Q;
      },
      pcwlT: "SWJJI",
      MKUhb: "vMtSH",
      SeVCK: function (c) {
        return c();
      }
    };
    {
      const c = "https://wxpusher.zjiecode.com/api/send/message";
      const M = {
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
        body: JSON.stringify(M)
      };
      $.post(C, async (u, O, r) => {
        z();
      });
    }
  });
}
function Env(U, p) {
  const f = {
    zsPzz: function (l, z) {
      return l < z;
    },
    StqFF: function (l, z) {
      return l(z);
    },
    UTPdE: function (l, z) {
      return l === z;
    },
    HQEtq: "TUXle",
    pEDrU: function (l, z) {
      return l - z;
    },
    uayrB: function (l, z) {
      return l + z;
    },
    NEMhb: function (l, z) {
      return l === z;
    },
    nvCdm: "CuNYJ",
    QRKNJ: "hLYse",
    FLIjZ: function (l) {
      return l();
    },
    ANxZA: "application/json",
    eoUKY: function (l, z) {
      return l !== z;
    },
    TUPVd: "HBKiH",
    RYxIH: "CONmr",
    HdJgW: "aGLLj",
    SnUQd: function (l, z) {
      return l == z;
    },
    sHoAj: "string",
    ysfjz: "POST",
    vSgUh: "mYNxK",
    ooDWE: "WULyN",
    YMHil: function (l, z) {
      return l + z;
    },
    HAzhe: function (l, z) {
      return l < z;
    },
    ObULO: function (l, z) {
      return l + z;
    },
    TdXIy: function (l, z) {
      return l + z;
    },
    Biwrz: function (l, z) {
      return l + z;
    },
    QiHuV: "cWpyI",
    jrKlf: "SXAvI",
    alIbi: "vsqjP",
    Nsbjg: "[DEBUG] ",
    dipkt: "[INFO] ",
    ftdqU: "[WARN] ",
    MBPWN: "[ERROR] ",
    FKQCS: "info",
    VIcLe: "box.dat",
    iKNqZ: "utf-8",
    aALxI: function (l, z) {
      return l + z;
    },
    nPLDz: "fhrLV",
    mRzuQ: function (l, z) {
      return l != z;
    },
    pTCNB: "undefined",
    Pwgij: "surge-version",
    jeoqF: "Surge",
    UMqgz: "stash-version",
    iXskg: "Stash",
    YcMCy: function (l, z) {
      return l != z;
    },
    YQyfN: "Node.js",
    rEDeF: "Quantumult X",
    eNZNG: function (l, z) {
      return l != z;
    },
    EIDwZ: "Loon",
    DHOGI: function (l, z) {
      return l != z;
    },
    uuBVw: "Shadowrocket",
    YwABm: "@chavy_boxjs_userCfgs.httpapi",
    MVMna: "@chavy_boxjs_userCfgs.httpapi_timeout",
    uwsas: function (l, z) {
      return l * z;
    },
    NMNZo: "cron",
    jqWfD: "*/*",
    caUzw: "KdEIr",
    baMfG: "sUwRZ",
    FezjP: function (l, z) {
      return l !== z;
    },
    CMzZY: "jnUXw",
    PvIIp: "LLeSp",
    NqEZN: function (l, z) {
      return l === z;
    },
    RRMuW: function (l, z) {
      return l === z;
    },
    ODRvo: "yUqmq",
    QQqdI: "rRxPF",
    cJmFL: function (l, z) {
      return l === z;
    },
    VnbEF: function (l, z) {
      return l > z;
    },
    pfHbc: "BCZcp",
    bGfrA: "FCUIO",
    nWamk: "application/pdf",
    gjGQw: "image/gif",
    yNpeW: "image/png",
    wVYyn: "image/jpg",
    VoELy: function (l, z) {
      return l === z;
    },
    VfpGP: "aUyFd",
    EeuUA: "CPLQc",
    AGXGc: function (l, z) {
      return l + z;
    },
    kwZzL: function (l, z, N) {
      return l(z, N);
    },
    qubwt: "RRytk",
    CENDZ: "NNFrT",
    SUZyv: function (l, z) {
      return l + z;
    },
    NSGzQ: function (l, z) {
      return l(z);
    },
    WqPyo: "ZxibY",
    pXnee: function (l, z) {
      return l === z;
    },
    xsNCG: "TBZng",
    GIYPM: "sYLUl",
    Swuqv: function (l, z) {
      return l !== z;
    },
    vYCzF: "XJvzO",
    tyuir: "VmIau",
    hYMgJ: "cGMqc",
    nMyIB: "cLDam",
    ZcrUw: function (l, z) {
      return l !== z;
    },
    kEBIE: "daMSZ",
    fKxIs: function (l, z) {
      return l + z;
    },
    HrfZO: function (l, z) {
      return l - z;
    },
    MVBWC: "...",
    QxgiM: "1|2|0|4|5|3",
    ZqATP: function (l, z) {
      return l < z;
    },
    xxlPG: function (l, z) {
      return l !== z;
    },
    JsihO: "KjGme",
    wHzQs: "zfBnM",
    DnAZO: function (l, z) {
      return l !== z;
    },
    EFTpA: "onQAC",
    tFzfd: "open-url",
    PUKpH: "media-url",
    FMZxG: "http",
    fiEii: "naPGM",
    fxSuX: function (l, z) {
      return l === z;
    },
    reUhy: "cFint",
    OybSk: "TzWaq",
    CpLpK: function (l, z) {
      return l !== z;
    },
    XwVhZ: "aTbKA",
    VbZSK: "jgJQN",
    SIyuK: "data:",
    KveCk: "KMjob",
    iNvII: "fYYdq",
    CQlBy: function (l, z) {
      return l(z);
    },
    TwWMU: function (l, z) {
      return l(z);
    },
    sVbCx: "lEeoc",
    MBTyk: "SnUfH",
    bENlj: "wgYUW",
    mHflS: "Teukq",
    tEGlV: function (l, z) {
      return l(z);
    },
    VejHX: function (l, z) {
      return l(z);
    },
    AszuL: "8|10|12|3|2|13|5|11|1|0|4|14|9|7|6",
    OtPUv: function (l, z) {
      return l + z;
    },
    UTABo: function (l, z) {
      return l + z;
    },
    qHdpT: function (l, z) {
      return l + z;
    },
    USLcr: function (l, z) {
      return l < z;
    },
    mCQlW: function (l, z) {
      return l + z;
    },
    TXwGY: function (l) {
      return l();
    },
    okTUh: "sjBCG",
    XMlmW: "bGBUx",
    wBqak: function (l, z) {
      return l(z);
    },
    aBhIv: "path",
    MTxTP: function (l, z) {
      return l && z;
    },
    xOmRg: function (l, z) {
      return l === z;
    },
    VSSEO: "qmUpm",
    cwhtR: "QsqBH",
    NmxpL: function (l, z) {
      return l !== z;
    },
    qSGfE: "aWZZy",
    PazRf: function (l, z) {
      return l !== z;
    },
    sSySO: "ptByV",
    OEDsr: function (l, z) {
      return l == z;
    },
    WYmEa: "object",
    WcKlF: function (l, z) {
      return l !== z;
    },
    TUlVV: "iBqkc",
    ugrnX: "nPFXz",
    LEwds: function (l, z) {
      return l !== z;
    },
    zZWOq: "WeBRo",
    UiDHy: "igKVO",
    cLREy: function (l, z) {
      return l === z;
    },
    IcFJx: "stMuX",
    Zebcn: "APqaV",
    TVYJy: ".$1",
    xwHBt: function (l, z) {
      return l(z);
    },
    HukVI: "hOsNT",
    roFoS: "PKdnf",
    kRuEf: function (l, z) {
      return l === z;
    },
    MuyId: function (l, z) {
      return l(z);
    },
    NxYOp: function (l, z) {
      return l <= z;
    },
    SzYML: "QwlYx",
    LySVG: function (l, z) {
      return l !== z;
    },
    QeqDw: "zqxVy",
    yjIHk: function (l, z) {
      return l === z;
    },
    BWecz: "dqMPd",
    phSPq: "BCPzF",
    NNCIQ: function (l, z) {
      return l(z);
    },
    NOnie: "got",
    Lxmzk: "tough-cookie",
    aexGg: function (l, z) {
      return l === z;
    },
    giQmb: function (l, z) {
      return l === z;
    },
    DmoFm: "WnvYT",
    scjlg: "iehbG",
    hCoVd: "ZsHfO",
    nTcUU: "teYmJ",
    CvhOd: function (l, z) {
      return l === z;
    },
    FwphZ: "null",
    PYOdv: function (l, z) {
      return l || z;
    },
    jnEhi: "elSEl",
    hJorW: function (l, z) {
      return l === z;
    },
    PvYEw: "rJSxP",
    efqus: function (l, z) {
      return l === z;
    },
    xayvN: "TgBhb",
    rtopT: function (l, z) {
      return l !== z;
    },
    BQCdY: "UhsCD",
    KiWUT: "Eebbm",
    Uirux: "while (true) {}",
    XTTeA: "counter",
    moiHQ: function (l, z) {
      return l !== z;
    },
    cZPBp: "BTmeL",
    aHoSF: function (l, z) {
      return l === z;
    },
    Tmjlh: function (l, z) {
      return l < z;
    },
    MYQmb: function (l, z) {
      return l + z;
    },
    GQEnq: function (l, z) {
      return l + z;
    },
    dLyTA: function (l, z) {
      return l + z;
    },
    MoywQ: function (l, z) {
      return l + z;
    },
    zOYea: function (l, z) {
      return l + z;
    },
    oSWpT: function (l, z) {
      return l + z;
    },
    wdths: function (l, z) {
      return l + z;
    },
    LFgAw: "qAUAn",
    oHULU: "UoyLU",
    uwYEB: function (l, z, N, W, c) {
      return l(z, N, W, c);
    },
    ZGeQu: function (l, z) {
      return l < z;
    },
    WEauC: function (l, z) {
      return l + z;
    },
    kvMRn: function (l, z) {
      return l + z;
    },
    miBsQ: function (l, z) {
      return l < z;
    },
    Elldh: function (l, z) {
      return l + z;
    },
    uBhHP: function (l, z) {
      return l + z;
    },
    DiDHx: function (l, z) {
      return l + z;
    },
    gMTLk: function (l, z) {
      return l < z;
    },
    abngy: function (l, z) {
      return l + z;
    },
    xullU: "GAgyl",
    wPzps: "cZZWS",
    zpCGP: "set-cookie",
    RLefY: "WvOie",
    cpWQT: "vzoDM",
    vAOvx: "JEcVt",
    OFbSt: function (l, z) {
      return l ?? z;
    },
    VQSMm: function (l, z) {
      return l === z;
    },
    uTELL: "nVWPp",
    FSyKt: "VNhMw",
    INRoN: function (l, z) {
      return l && z;
    },
    gFCJV: function (l, z, N, W) {
      return l(z, N, W);
    },
    Qfsnv: function (l, z) {
      return l === z;
    },
    Cxaug: "ItuSb",
    NuIlv: "xtqbg",
    CsqLM: function (l, z) {
      return l !== z;
    },
    Uygxf: "NSNTB",
    EPVDo: "nSasl",
    rwCVd: "Content-Type",
    JmEEO: "Content-Length",
    netgO: "content-type",
    YdXSN: "content-length",
    uDBcZ: function (l, z) {
      return l + z;
    },
    FAmYl: function (l, z) {
      return l === z;
    },
    oswUe: "auto-redirect",
    hKKUE: function (l, z) {
      return l(z);
    },
    gOgiX: "iconv-lite",
    yYbGZ: "redirect",
    pEXwc: "ghETN",
    KtBMY: "MrWGh",
    TMcxX: function (l, z) {
      return l && z;
    },
    dbpjs: function (l, z, N, W) {
      return l(z, N, W);
    },
    NkXwm: "QLwWU",
    GJJuR: "ZPESE",
    JZODu: function (l, z, N, W, c) {
      return l(z, N, W, c);
    },
    emgpr: function (l, z, N, W) {
      return l(z, N, W);
    },
    qHqWC: "post",
    htUIZ: "application/x-www-form-urlencoded",
    oepST: function (l, z) {
      return l(z);
    },
    reXqn: function (l, z) {
      return l / z;
    },
    CetlX: function (l, z) {
      return l != z;
    },
    wcTsA: function (l, z) {
      return l == z;
    },
    TLcSE: function (l, z) {
      return l - z;
    },
    aAAod: function (l, z) {
      return l === z;
    },
    kMycb: "update-pasteboard",
    fnfst: "clipboard",
    zFkKL: function (l, z) {
      return l ?? z;
    },
    xWFQs: "auto-dismiss",
    qEtgO: function (l, z, N, W, c) {
      return l(z, N, W, c);
    },
    RVbxS: function (l, z) {
      return l(z);
    },
    FLDyt: "==============📣系统通知📣==============",
    FvMDF: function (l, z) {
      return l <= z;
    },
    CuFhe: function (l, z) {
      return l <= z;
    },
    KzIob: function (l, z) {
      return l > z;
    },
    nobFx: function (l, z) {
      return l <= z;
    },
    wZFUn: function (l, z) {
      return l > z;
    },
    Wlgtz: function (l, z) {
      return l > z;
    },
    VaxAt: function (l, z) {
      return l !== z;
    },
    UHTvT: function (l, z) {
      return l(z);
    }
  };
  class i {
    constructor(l) {
      {
        this.env = l;
      }
    }
    send(l, z = "GET") {
      {
        l = "string" == typeof l ? {
          url: l
        } : l;
        let c = this.get;
        "POST" === z && (c = this.post);
        return new Promise((Q, M) => {
          const v = {
            xXOZi: function (C) {
              return C();
            },
            jfmmJ: "application/json"
          };
          {
            c.call(this, l, (u, O, r) => {
              const A = {
                KeDcu: function (g, H) {
                  return g < H;
                },
                mcTur: function (g, H) {
                  return g + H;
                },
                fheNA: function (g, H) {
                  return g < H;
                },
                rcNrb: function (g, H) {
                  return g + H;
                },
                iyKSF: function (g, H) {
                  return g + H;
                }
              };
              u ? M(u) : Q(O);
            });
          }
        });
      }
    }
    get(l) {
      {
        return this.send.call(this.env, l);
      }
    }
    post(l) {
      {
        return this.send.call(this.env, l, "POST");
      }
    }
  }
  return new class {
    constructor(l, z) {
      {
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
        this.isMute = false;
        this.isNeedRewrite = false;
        this.logSeparator = "\n";
        this.encoding = "utf-8";
        this.startTime = new Date().getTime();
        Object.assign(this, z);
        this.log("", "🔔 " + this.name + ", 开始!");
      }
    }
    getEnv() {
      {
        return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : undefined;
      }
    }
    isNode() {
      {
        return "Node.js" === this.getEnv();
      }
    }
    isQuanX() {
      {
        return "Quantumult X" === this.getEnv();
      }
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      {
        return "Loon" === this.getEnv();
      }
    }
    isShadowrocket() {
      {
        return "Shadowrocket" === this.getEnv();
      }
    }
    isStash() {
      {
        return "Stash" === this.getEnv();
      }
    }
    toObj(l, z = null) {
      const N = {
        zNmQE: function (W, c) {
          return W < c;
        },
        mrAgj: function (W, c) {
          return W + c;
        },
        aayIv: function (W, c) {
          return W + c;
        },
        skkNs: function (W, c) {
          return W + c;
        },
        KvvDN: function (W, c, Q) {
          return W(c, Q);
        }
      };
      {
        try {
          return JSON.parse(l);
        } catch {
          {
            return z;
          }
        }
      }
    }
    toStr(l, z = null, ...N) {
      {
        try {
          {
            return JSON.stringify(l, ...N);
          }
        } catch {
          {
            return z;
          }
        }
      }
    }
    getjson(l, z) {
      const N = {
        SbNyI: function (W, c) {
          return W + c;
        },
        BpZZf: function (W, c) {
          return W - c;
        },
        vBBLk: "...",
        VQemW: "1|2|0|4|5|3",
        ELWgt: function (W, c) {
          return W < c;
        }
      };
      {
        let W = z;
        if (this.getdata(l)) {
          try {
            {
              W = JSON.parse(this.getdata(l));
            }
          } catch {}
        }
        return W;
      }
    }
    setjson(l, z) {
      {
        try {
          return this.setdata(JSON.stringify(l), z);
        } catch {
          {
            return false;
          }
        }
      }
    }
    getScript(l) {
      const z = {
        GqziR: "data:",
        VEoKq: function (N, W) {
          return N !== W;
        },
        sMcKh: "KMjob"
      };
      {
        return new Promise(N => {
          {
            const c = {
              url: l
            };
            this.get(c, (Q, M, v) => N(v));
          }
        });
      }
    }
    runScript(l, z) {
      {
        return new Promise(N => {
          {
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
            const [v, C] = c.split("@");
            const u = {
              url: "http://" + C + "/v1/scripting/evaluate",
              body: M,
              headers: {
                "X-Key": v,
                Accept: "*/*"
              },
              timeout: Q
            };
            this.post(u, (O, A, g) => N(g));
          }
        }).catch(N => this.logErr(N));
      }
    }
    loaddata() {
      {
        if (!this.isNode()) {
          return {};
        }
        {
          {
            this.fs = this.fs ? this.fs : require("fs");
            this.path = this.path ? this.path : require("path");
            const N = this.path.resolve(this.dataFile);
            const W = this.path.resolve(process.cwd(), this.dataFile);
            const c = this.fs.existsSync(N);
            const Q = !c && this.fs.existsSync(W);
            if (!c && !Q) {
              return {};
            }
            {
              {
                const v = c ? N : W;
                try {
                  {
                    return JSON.parse(this.fs.readFileSync(v));
                  }
                } catch (u) {
                  {
                    return {};
                  }
                }
              }
            }
          }
        }
      }
    }
    writedata() {
      {
        if (this.isNode()) {
          {
            this.fs = this.fs ? this.fs : require("fs");
            this.path = this.path ? this.path : require("path");
            const z = this.path.resolve(this.dataFile);
            const N = this.path.resolve(process.cwd(), this.dataFile);
            const W = this.fs.existsSync(z);
            const c = !W && this.fs.existsSync(N);
            const Q = JSON.stringify(this.data);
            W ? this.fs.writeFileSync(z, Q) : c ? this.fs.writeFileSync(N, Q) : this.fs.writeFileSync(z, Q);
          }
        }
      }
    }
    lodash_get(l, z, N) {
      {
        const c = z.replace(/\[(\d+)\]/g, ".$1").split(".");
        let Q = l;
        for (const M of c) if (Q = Object(Q)[M], undefined === Q) {
          return N;
        }
        return Q;
      }
    }
    lodash_set(l, z, N) {
      {
        Object(l) !== l || (Array.isArray(z) || (z = z.toString().match(/[^.[\]]+/g) || []), z.slice(0, -1).reduce((W, c, Q) => Object(W[c]) === W[c] ? W[c] : W[c] = Math.abs(z[Q + 1]) >> 0 == +z[Q + 1] ? [] : {}, l)[z[z.length - 1]] = N);
        return l;
      }
    }
    getdata(l) {
      const z = {
        GbmeY: function (N, W) {
          return N <= W;
        },
        smZtY: function (N, W) {
          return N > W;
        }
      };
      {
        let N = this.getval(l);
        if (/^@/.test(l)) {
          {
            const [, c, Q] = /^@(.*?)\.(.*?)$/.exec(l);
            const M = c ? this.getval(c) : "";
            if (M) {
              try {
                {
                  const v = JSON.parse(M);
                  N = v ? this.lodash_get(v, Q, "") : N;
                }
              } catch (u) {
                N = "";
              }
            }
          }
        }
        return N;
      }
    }
    setdata(l, z) {
      {
        let W = false;
        if (/^@/.test(z)) {
          {
            const [, Q, M] = /^@(.*?)\.(.*?)$/.exec(z);
            const v = this.getval(Q);
            const C = Q ? "null" === v ? null : v || "{}" : "{}";
            try {
              {
                const O = JSON.parse(C);
                this.lodash_set(O, M, l);
                W = this.setval(JSON.stringify(O), Q);
              }
            } catch (A) {
              {
                const g = {};
                this.lodash_set(g, M, l);
                W = this.setval(JSON.stringify(g), Q);
              }
            }
          }
        } else {
          W = this.setval(l, z);
        }
        return W;
      }
    }
    getval(l) {
      {
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
    }
    setval(l, z) {
      {
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
            return true;
          default:
            return this.data && this.data[z] || null;
        }
      }
    }
    initGotEnv(l) {
      {
        this.got = this.got ? this.got : require("got");
        this.cktough = this.cktough ? this.cktough : require("tough-cookie");
        this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
        l && (l.headers = l.headers ? l.headers : {}, l && (l.headers = l.headers ? l.headers : {}, undefined === l.headers.cookie && undefined === l.headers.Cookie && undefined === l.cookieJar && (l.cookieJar = this.ckjar)));
      }
    }
    get(l, z = () => {}) {
      {
        const c = {
          redirection: false
        };
        switch (l.headers && (delete l.headers["Content-Type"], delete l.headers["Content-Length"], delete l.headers["content-type"], delete l.headers["content-length"]), l.params && (l.url += "?" + this.queryStr(l.params)), undefined === l.followRedirect || l.followRedirect || ((this.isSurge() || this.isLoon()) && (l["auto-redirect"] = false), this.isQuanX() && (l.opts ? l.opts.redirection = false : l.opts = c)), this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            const Q = {
              "X-Surge-Skip-Scripting": false
            };
            this.isSurge() && this.isNeedRewrite && (l.headers = l.headers || {}, Object.assign(l.headers, Q));
            $httpClient.get(l, (C, u, O) => {
              {
                !C && u && (u.body = O, u.statusCode = u.status ? u.status : u.statusCode, u.status = u.statusCode);
                z(C, u, O);
              }
            });
            break;
          case "Quantumult X":
            const M = {
              hints: false
            };
            this.isNeedRewrite && (l.opts = l.opts || {}, Object.assign(l.opts, M));
            $task.fetch(l).then(C => {
              {
                const {
                  statusCode: u,
                  statusCode: O,
                  headers: A,
                  body: g,
                  bodyBytes: H
                } = C;
                const L = {
                  status: u,
                  statusCode: O,
                  headers: A,
                  body: g,
                  bodyBytes: H
                };
                z(null, L, g, H);
              }
            }, C => z(C && C.error || "UndefinedError"));
            break;
          case "Node.js":
            let v = require("iconv-lite");
            this.initGotEnv(l);
            this.got(l).on("redirect", (C, u) => {
              const O = {
                ZEcpn: function (r, A) {
                  return r < A;
                },
                tUtnu: function (r, A) {
                  return r + A;
                },
                GkbHs: function (r, A) {
                  return r + A;
                },
                BNWwy: function (r, A) {
                  return r < A;
                },
                QmZra: function (r, A) {
                  return r + A;
                },
                CcBGx: function (r, A) {
                  return r + A;
                },
                ALdbF: function (r, A) {
                  return r + A;
                },
                zdJyT: function (r, A) {
                  return r + A;
                },
                HPrWf: function (r, A, g, H, L) {
                  return r(A, g, H, L);
                },
                kdqaU: function (r, A) {
                  return r + A;
                },
                RjltX: function (r, A) {
                  return r + A;
                },
                HSNFz: function (r, A) {
                  return r + A;
                },
                TNYyH: function (r, A) {
                  return r + A;
                },
                dmBAF: function (r, A) {
                  return r < A;
                },
                qLocp: function (r, A) {
                  return r + A;
                },
                xCUTa: function (r, A) {
                  return r + A;
                },
                VUQZS: function (r, A) {
                  return r + A;
                }
              };
              {
                try {
                  {
                    if (C.headers["set-cookie"]) {
                      {
                        const g = C.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        g && this.ckjar.setCookieSync(g, null);
                        u.cookieJar = this.ckjar;
                      }
                    }
                  }
                } catch (L) {
                  this.logErr(L);
                }
              }
            }).then(C => {
              {
                const {
                  statusCode: O,
                  statusCode: A,
                  headers: g,
                  rawBody: H
                } = C;
                const L = v.decode(H, this.encoding);
                const Z = {
                  status: O,
                  statusCode: A,
                  headers: g,
                  rawBody: H,
                  body: L
                };
                z(null, Z, L);
              }
            }, C => {
              {
                const {
                  message: O,
                  response: r
                } = C;
                z(O, r, r && v.decode(r.rawBody, this.encoding));
              }
            });
            break;
        }
      }
    }
    post(l, z = () => {}) {
      const W = l.method ? l.method.toLocaleLowerCase() : "post";
      const c = {
        redirection: false
      };
      switch (l.body && l.headers && !l.headers["Content-Type"] && !l.headers["content-type"] && (l.headers["content-type"] = "application/x-www-form-urlencoded"), l.headers && (delete l.headers["Content-Length"], delete l.headers["content-length"]), undefined === l.followRedirect || l.followRedirect || ((this.isSurge() || this.isLoon()) && (l["auto-redirect"] = false), this.isQuanX() && (l.opts ? l.opts.redirection = false : l.opts = c)), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          const Q = {
            "X-Surge-Skip-Scripting": false
          };
          this.isSurge() && this.isNeedRewrite && (l.headers = l.headers || {}, Object.assign(l.headers, Q));
          $httpClient[W](l, (O, A, g) => {
            {
              !O && A && (A.body = g, A.statusCode = A.status ? A.status : A.statusCode, A.status = A.statusCode);
              z(O, A, g);
            }
          });
          break;
        case "Quantumult X":
          const M = {
            hints: false
          };
          l.method = W;
          this.isNeedRewrite && (l.opts = l.opts || {}, Object.assign(l.opts, M));
          $task.fetch(l).then(O => {
            {
              const {
                statusCode: A,
                statusCode: g,
                headers: H,
                body: L,
                bodyBytes: Z
              } = O;
              const Y = {
                status: A,
                statusCode: g,
                headers: H,
                body: L,
                bodyBytes: Z
              };
              z(null, Y, L, Z);
            }
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
            } = O;
            const Z = v.decode(L, this.encoding);
            const Y = {
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
          case undefined:
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
                    let X;
                    let G;
                    let K;
                    if (O.startsWith("http")) {
                      X = O;
                    } else {
                      if (O.startsWith("data:")) {
                        const [k] = O.split(";");
                        const [, I] = O.split(",");
                        G = I;
                        K = k.replace("data:", "");
                      } else {
                        G = O;
                        K = (P => {
                          const y = {
                            JVBERi0: "application/pdf",
                            R0lGODdh: "image/gif",
                            R0lGODlh: "image/gif",
                            iVBORw0KGgo: "image/png",
                            "/9j/": "image/jpg"
                          };
                          for (var R in y) if (0 === P.indexOf(R)) {
                            return y[R];
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
          this.log("", "❗️" + this.name + ", 错误!", z, undefined !== l.message ? l.message : l, l.stack);
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