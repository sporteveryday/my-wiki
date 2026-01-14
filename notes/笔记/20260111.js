// node 浏览器 宏任务 微任务 执行顺序及
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
//输出
//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2

// 数组扁平化
const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
const newArr = Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {
  return a - b;
});
console.log(newArr);

for (var i = 0; i < 10; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

var a = {
  i: 0,
  valueOf() {
    return ++this.i;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}

var a = {
  value: 0,
  toString() {
    return ++this.value;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}

// 第 45 题：HTTPS 握手过程中，客户端如何验证证书的合法性
// 1. 校验证书的颁发机构是否受客户端信任。
// 2. 通过 CRL 或 OCSP 的方式校验证书是否被吊销。
// 3. 3 对比系统时间，校验证书是否在有效期内。
// 4. 通过校验对方是否存在证书的私钥，判断证书的网站域名是否与证书颁
// 发的域名一致。

var obj = {
  2: 3,
  3: 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push,
};
obj.push(1);
obj.push(2);
console.log(obj);

// （百度）实现 (5).add(3).minus(2) 功能。
// 例： 5 + 3 - 2，结果为 6
// 答：
Number.prototype.add = function (n) {
  return this.valueOf() + n;
};
Number.prototype.minus = function (n) {
  return this.valueOf() - n;
};

// 实现promise.finally
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

// 数组向右移动k位
function rotate(arr, k) {
  const len = arr.length;
  const step = k % len;
  return arr.slice(-step).concat(arr.slice(0, len - step));
}

// 0-10000取所有对称数
[...Array(10000).keys()].filter((x) => {
  return (
    x.toString().length > 1 &&
    x === Number(x.toString().split("").reverse().join(""))
  );
});

// 判断输入是否是正确的网址
function isUrl(url) {
  const a = document.createElement("a");
  a.href = url;
  return (
    [
      /^(http|https):$/.test(a.protocol),
      a.host,
      a.pathname !== url,
      a.pathname !== `/${url}`,
    ].find((x) => !x) === undefined
  );
}

// 实现promise.race
Promise._race = (promises) =>
  new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject);
    });
  });

Promise.myrace = function (iterator) {
  return new Promise((resolve, reject) => {
    try {
      let it = iterator[Symbol.iterator]();
      while (true) {
        let res = it.next();
        console.log(res);
        if (res.done) break;
        if (res.value instanceof Promise) {
          res.value.then(resolve, reject);
        } else {
          resolve(res.value);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com";
  o = new Object();
  o.siteUrl = "http://www.google.com";
}
let webSite = new Object();
console.log(webSite);
changeObjProperty(webSite);
console.log(webSite.siteUrl);

// 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入
// 整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，
// 输入函数必须只有一个参数传入，必须返回字符串。
function fun(num) {
  let num1 = num / 10;
  let num2 = num % 10;
  if (num1 < 1) {
    return num;
  } else {
    num1 = Math.floor(num1);
    return `${num2}${fun(num1)}`;
  }
}
var a = fun(12345);
console.log(a);
console.log(typeof a);

// 写出打印顺序
function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo.prototype.a = function () {
  console.log(3);
};
Foo.a = function () {
  console.log(4);
};
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
