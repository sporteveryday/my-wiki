// 两个数组排序
const merge = (nums1, m, nums2, n) => {
    nums1.splice(m, n, ...nums2);
    nums1.sort((a, b) => a - b);
}
// 哈希 两数之和
const twoNum = (nums, target) => {
    let map = new Map();
    if (Array.isArray(nums)) {
        nums.forEach((ele, i) => {
            if (map.has(target - ele)) {
                const arr = [i, map.get(target - ele)]
                return arr
            } else {
                map.set(ele, i);
            }
        })
    }
}
//三数之和
// 双指针法
var threeSum = function (nums) {
    let res = [];
    //排序
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        //如果当前第一个数大于0直接返回res
        if (nums[i] > 0) {
            return res;
        }
        //对第一个元素去重
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        let l = i + 1;
        let r = nums.length - 1;
        while (l < r) {
            if (nums[i] + nums[l] + nums[r] > 0) {
                r--;
            } else if (nums[i] + nums[l] + nums[r] < 0) {
                l++;
            } else {
                res.push([nums[i], nums[l], nums[r]]);
                // 对第2、3个元素去重
                while (l < r && nums[l] === nums[l + 1]) {
                    l++;
                }
                while (l < r && nums[r] === nums[r - 1]) {
                    r--;
                }
                l++;
                r--;
            }
        }
    }
    return res;
};
// 反转链表

// 1.双指针法，只需要改变链表的next指针的指向
var reverseList = function (head) {
    let p = null;
    let q = head;
    let tmp = null; //保存下一个节点
    while (q) {
        tmp = q.next;
        q.next = p;
        p = q;
        q = tmp;
    }
    return p;
};

// 2.递归法
var reverseList = function (head) {
    var reverse = function (p, q) {
        if (q === null) {
            return p;
        }
        let tmp = q.next;
        q.next = p;
        p = q;
        return reverse(p, tmp); //注意这里必须return
    }
    return reverse(null, head);
};
// 全排列

// 回溯
var permute = function (nums) {
    let res = [];
    let path = [];
    var bt = function (used) {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            //used数组，记录此时path里已经选择的元素,一个排列里一个元素只能使用一次
            if (used[i] === 1) {
                continue;
            }
            path.push(nums[i]);
            used[i] = 1;
            bt(used);
            used[i] = 0;
            path.pop();
        }
    };
    bt([]);
    return res;
};
// 有效的括号 只能判断左括号？ arr.pop() 删除最后一个元素并返回该元素的值，改变原数组
var isValid = function (s) {
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(")");
        } else if (s[i] === "{") {
            stack.push("}");
        } else if (s[i] === "[") {
            stack.push("]");
        } else {
            //栈为空，说明多了右括号
            if (stack.length === 0 || stack.pop() !== s[i]) {
                return false;
            }
        }
    }
    //遍历结束栈还有元素，说明多了左括号
    let flag = stack.length !== 0 ? false : true
    return flag;
};
// 二叉树的中序遍历
// 1.递归法
var preorderTraversal = function (root) {
    let res = [];
    var dfs = function (root) {
        if (!root) {
            return;
        }
        dfs(root.left); //左
        res.push(root.val); //中
        dfs(root.right); //右
    };
    dfs(root);
    return res;
};

// 2.迭代法（重点）
var inorderTraversal = function (root) {
    if (!root) {
        return [];
    }
    let res = [];
    let stack = [];
    //定义一个指针，指向当前遍历节点
    let cur = root;
    while (cur || stack.length) {
        if (cur) {
            //一直遍历到左下
            stack.push(cur);
            cur = cur.left;
        } else {
            cur = stack.pop();
            res.push(cur.val);
            cur = cur.right;
        }
    }
    return res;
};
// 最长递增子序列
// 二分查找
function lengthOfLIS(nums) {
    const tails = [];

    for (let num of nums) {
        let left = 0, right = tails.length;
        // 使用二分查找，找出当前数字应该插入的位置
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // 如果插入的位置等于 tails 数组的长度，表示 num 比所有尾部元素都大，可以扩展 LIS
        if (left === tails.length) {
            tails.push(num);
        } else {
            // 否则，替换当前位置的元素，使得 tails 保持最小的尾部元素
            tails[left] = num;
        }
    }

    return tails.length; // tails 数组的长度即为最长递增子序列的长度
}
// 冒泡排序
function bubbleSort(arr) {
    let length = arr.length;
    // 外层循环用控制 排序进行多少轮
    for (let i = 0; i < length; i++) {
        // 内层循环用于每一轮的数据比较
        // 注意j的长度范围 length - i - 1
        for (let j = 0; j < length - i - 1; j++) {
            // 相邻元素，大的放到后面
            if (arr[j] > arr[j + 1]) {
                // 交换位置
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
const arrList = [0, 45, 4, 5, 23, 5, 3];
// 快速排序
function MergeSort(array) {
    let len = array.length;

    // 当每个子序列中仅有1个元素时返回
    if (len <= 1) {
        return array;
    }
    // 将给定的列表分为两半
    let num = Math.floor(len / 2);
    let left = MergeSort(array.slice(0, num));
    let right = MergeSort(array.slice(num, array.length));
    return merge(left, right);

    function merge(left, right) {
        let [l, r] = [0, 0];
        let result = [];
        // 从 left 和 right 区域中各个取出第一个元素，比较它们的大小
        while (l < left.length && r < right.length) {
            // 将较小的元素添加到result中，然后从较小元素所在的区域内取出下一个元素，继续进行比较；
            if (left[l] < right[r]) {
                result.push(left[l]);
                l++;
            } else {
                result.push(right[r]);
                r++;
            }
        }
        // 如果 left 或者 right 有一方为空，则直接将另一方的所有元素依次添加到result中
        result = result.concat(left.slice(l, left.length));
        result = result.concat(right.slice(r, right.length));
        return result;
    }
}
// 拼多多笔试
//最长公共子序列
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }   
        }
    }
    return dp[m][n];
}

// promise.any
function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        let rejections = [];
        let pendingCount = promises.length;
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    resolve(value); 
                })
                .catch(error => {
                    rejections[index] = error; 
                    pendingCount--;
                    if (pendingCount === 0) {
                        reject(new AggregateError(rejections, 'All promises were rejected'));
                    }
                });
        });
    }); 
}

// 写一个简单的模板引擎
function templateEngine(template, data) {
    const regex = /\{\{(\w+)\}\}/g;
    let result = template;
    let match;
    while ((match = regex.exec(template)) !== null) {
        const placeholder = match[0];
        const key = match[1];   
        if (data.hasOwnProperty(key)) {
            result = result.replace(placeholder, data[key]);
        }
    }
    return result;
}