```typescript
Function.prototype.myCall = function (context) {
  // 先判断调用myCall是不是一个函数
  // 这里的this就是调用myCall的
  if (typeof this !== "function") {
    throw new TypeError("Not a Function");
  }

  // 不传参数默认为window
  context = context || window;

  // 保存this
  context.fn = this;

  // 保存参数
  let args = Array.from(arguments).slice(1); //Array.from 把伪数组对象转为数组

  // 调用函数
  let result = context.fn(...args);

  delete context.fn;

  return result;
};

Function.prototype.myApply = function (context) {
  // 判断this是不是函数
  if (typeof this !== "function") {
    throw new TypeError("Not a Function");
  }

  let result;

  // 默认是window
  context = context || window;

  // 保存this
  context.fn = this;

  // 是否传参
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;

  return result;
};

Function.prototype.myBind = function (context) {
  // 判断是否是一个函数
  if (typeof this !== "function") {
    throw new TypeError("Not a Function");
  }
  // 保存调用bind的函数
  const _this = this;
  // 保存参数
  const args = Array.prototype.slice.call(arguments, 1);
  // 返回一个函数
  return function F() {
    // 判断是不是new出来的
    if (this instanceof F) {
      // 如果是new出来的
      // 返回一个空对象，且使创建出来的实例的__proto__指向_this的prototype，且完成函数柯里化
      return new _this(...args, ...arguments);
    } else {
      // 如果不是new出来的改变this指向，且完成函数柯里化
      return _this.apply(context, args.concat(...arguments));
    }
  };
};

// call和apply实现思路主要是：
// 判断是否是函数调用，若非函数调用抛异常
// 通过新对象（context）来调用函数
// 给context创建一个fn设置为需要调用的函数
// 结束调用完之后删除fn
Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Not a Function");
  }

  context = context || window;
  context.fn = this;
  let args = Array.from(arguments).slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
//  浅拷贝
function shallowClone(obj) {
  let cloneObj = {};

  for (let i in obj) {
    cloneObj[i] = obj[i];
  }

  return cloneObj;
}
// 深拷贝
function deepCopy(obj) {
  if (typeof obj === "object") {
    var result = obj.constructor === Array ? [] : {};

    for (var i in obj) {
      result[i] = typeof obj[i] === "object" ? deepCopy(obj[i]) : obj[i];
    }
  } else {
    var result = obj;
  }

  return result;
}
// 内存优化的几种常见方法

// 1. 及时清理引用
function getLargeData() {
  const largeArray = new Array(1e6).fill(0);
  return largeArray;
}
let largeData = getLargeData();
// 使用完后...
largeData = null;

// 2. 使用弱引用（如果需要）
const weakMap = new WeakMap();
weakMap.set({ key: "object" }, "value"); // 键对象可以被回收

// 3. 批量操作 DOM
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  fragment.appendChild(div);
}
document.body.appendChild(); // 一次重绘

// 4. 使用事件委托
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".dynamic-button")) {
    handleButtonClick(e);
  }
});

// 数组扁平化
// 方法一：使用递归
function flatten(arr, result = []) {
  if (!Array.isArray(arr)) return result;
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flatten(item, result); // 直接把子结果累积到同一个 result，避免重复拷贝
    } else {
      result.push(item);
    }
  });
  return result;
}

// 方法二：使用reduce和递归（一行代码）
const flattenReduceOneLine = (arr) =>
  arr.reduce(
    (acc, cur) =>
      acc.concat(Array.isArray(cur) ? flattenReduceOneLine(cur) : cur),
    []
  );
const a = flattenReduceOneLine([1, [2, [3, 4], 5], 6]); // [1, 2, 3, 4, 5, 6]
console.log(a); // 输出 [1, 2, 3, 4, 5, 6]

// 柯里化函数
function curry(fn) {
  // 获取原函数的参数个数
  const arity = fn.length;

  // 返回一个柯里化后的函数
  return function curried(...args) {
    // 如果传入的参数个数大于等于原函数参数个数，直接执行原函数
    if (args.length >= arity) {
      return fn.apply(this, args);
    } else {
      // 否则，返回一个接受剩余参数的函数
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}
// 防抖 函数
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
// 节流 函数
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
// 在 [0, 600] 之间随机取三个数，要求两两之间差大于 100
function getRandomNumbers() {
  const result = new Set();
  while (result.size < 3) {
    const num = Math.floor(Math.random() * 601);
    let isValid = true;
    for (let existingNum of result) {
      if (Math.abs(existingNum - num) <= 100) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      result.add(num);
    }
  }
  return Array.from(result);
}
// 实现一个栈
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }
  peek() {
    if (this.isEmpty()) {
      return "No elements in Stack";
    }
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
  print() {
    console.log(this.items.toString());
  }
}
// 爬楼梯
function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }
  return second;
}
// 二分查找
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // 未找到
}

//返回最长不重复子字符串
function lengthOfLongestSubstring(s) {
  let map = new Map();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(map.get(s[right]) + 1, left);
    }
    map.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
// 最长回文子串
function longestPalindrome(s) {
  if (s.length < 1) return "";
  let start = 0,
    end = 0;
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(i, i);
    const len2 = expandAroundCenter(i, i + 1);
    const len = Math.max(len1, len2);

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
}

// 使用迭代的方式实现 flatten 函数
function flattenIterative(arr) {
  const result = [];
  const stack = [...arr]; // 使用扩展运算符创建栈的副本
  while (stack.length) {
    const next = stack.pop(); // 从栈中取出最后一个元素
    if (Array.isArray(next)) {
      // 如果是数组，则将其元素压入栈中
      stack.push(...next);
    } else {
      // 如果不是数组，则将其添加到结果中
      result.push(next);
    }
  }
  return result.reverse();
}
```
