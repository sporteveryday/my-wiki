// 最长回文字串 扩散法
function longestPalindrome(s) {
  if (s.length === 0 || !s) return "";
  let start = 0;
  let maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      let currentLength = right - left + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        start = left;
      }
      left--;
      right++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);
    expandAroundCenter(i, i + 1);
  }
  return s.substring(start, start + maxLength);
}

// 最高温度
function maxTemperature(temperatures) {
  let stack = [];
  const n = temperatures.length;
  let answer = new Array(n).fill(0);
  for (let cur = 0; cur < n; cur++) {
    while (
      stack.length > 0 &&
      temperatures[stack[stack.length - 1]] < temperatures[cur]
    ) {
      let prev = stack.pop();
      answer[prev] = cur - prev;
    }
    stack.push(cur);
  }
  return answer;
}
