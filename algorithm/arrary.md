### 两数求和
描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

>
示例: 给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

几乎所有的求和问题，都可以转化为求差问题
```
// 存储对象
const obj = {
  2: 0; // 2为值，0为索引值
}
```


```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  const diffObj = {} // 新建缓存对象

  for(let i = 0; i < nums.length; i++) {
    const result = diffObj[target - nums[i]]  // 获得差值
    if( result !== undefined ) { // 差值存在于缓存对象， 则返回对应数组索引
      return [result, i]
    }
    diffObj[nums[i]] = i  // 差值不存在于缓存对象，则在对象新建属性值
  }
}

const arr = [2, 11, 7, 15]
const sumsResult = twoSum(arr, 9)

```

### 合并两个有序数组
真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

>
示例: 输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3
输出: [1,2,2,3,5,6]

标准解法就是双指针法。首先我们定义两个指针，各指向两个数组生效部分的尾部

由于 nums1 的有效部分和 nums2 并不一定是一样长的。我们还需要考虑其中一个提前到头的这种情况：

1. 如果提前遍历完的是 nums1 的有效部分，剩下的是 nums2。那么这时意味着 nums1 的头部空出来了，直接把 nums2 整个补到 nums1 前面去即可。

2. 如果提前遍历完的是 nums2，剩下的是 nums1。由于容器本身就是 nums1，所以此时不必做任何额外的操作
```

const nums1 = [1, 2, 3, 0, 0, 0]

const nums2 = [2, 5, 6]

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n -1
  while(i >= 0 && j >= 0) {
    if(nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i]
      i--
      k--
    } else {
      nums1[k] = nums2[j]
      j--
      k--
    }
  }

  while(j >= 0) {
    nums1[k] = nums2[j]
    k--
    j--
  }
}

```

### 三数求和
真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。

>
示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

每次指针移动一次位置，就计算一下两个指针指向数字之和加上固定的那个数之后，是否等于0。如果是，那么我们就得到了一个目标组合；否则，分两种情况来看：

1. 相加之和大于0，说明右侧的数偏大了，右指针左移

2. 相加之和小于0，说明左侧的数偏小了，左指针右移

```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
  let res = []
  nums = nums.sort((a,b)=> a - b)
  const arrLength = nums.length

  for(let i = 0; i < arrLength-2; i ++) {
    let j = i + 1
    let k = arrLength  - 1
    if(i > 0 && nums[i] === nums[i-1]) {
      continue
    }
    while(j < k) {
      if(nums[i] + nums[j] + nums[k] < 0) {
        j++
        while(j < k && nums[j] === nums[j-1]) {
          j++
        }
      } else if(nums[i] + nums[j] + nums[k] > 0) {
        k--
        while(j < k && nums[k] === nums[k+1]) {
          k--
        }
      } else {
        res.push([nums[i], nums[j], nums[k]])

        j++
        k--

        while(j < k && nums[j] === nums[j-1]) {
          j++
        }
         while(j < k && nums[k] === nums[k+1]) {
          k--
        }
      }

    }

  }

  return res
}

const nums = [-1, 0, 1, 2, -1, -4]
const result = threeSum(nums)
```