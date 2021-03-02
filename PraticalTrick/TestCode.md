## 目录
1. [复制文本](#复制文本)
2. [轮询查询支付状态](#轮询查询支付状态)
3. [验证码60秒倒计时](#验证码60秒倒计时)
4. [获取图表的总数和](#获取图表的总数和)
5. [获取上传视频信息](#获取上传视频信息)
6. [对比两个对象，找出不同](#对比两个对象，找出不同)
7. [获取邀请区间](#获取邀请区间)
8. [产生随机数据](#产生随机数据)
9. [级联属性](#级联属性)

### 复制文本

```
  const aux = document.createElement('input')
  aux.id = 'test'
  aux.setAttribute('value', text)
  const clipboard = new ClipboardJS('#test')
  document.body.appendChild(aux)
  aux.select()
  try {
     if (document.execCommand('copy')) {
     		console.log('复制成功！')
     } else {
     		console.log('复制失败！')
     }
     document.body.removeChild(aux)
   } catch (e) {
     console.log('复制出现报错，信息为:', e)
   }


```

### 轮询查询支付状态

```
  let timer
  let countTimes = 6
  let waitingTime = 1000
  timer = setInterval(() => {
    checkOrderStatus(orderNo).then(({ data }) => {
      if (data === 'succeed' || countTimes === 0) {
          console.log('执行完毕')
          console.log('countTimes', countTimes)
          clearInterval(this.timer)
      } else {
          countTimes--
          waitingTime += 2000
      }
    })
  }, waitingTime)
```

### 验证码60秒倒计时

```
let seconds = 59
let countdownText
let smsSending = true
let timer
timer = setInterval(() => {
  countdownText = `重新获取(${seconds})`
  seconds--
  if (seconds <= 0) {
    countdownText = '重新获取'
    smsSending = false
    clearInterval(timer)
 }
}, 1000)
```

### 获取图表的总数和

```
const newArray = JSON.parse(JSON.stringify(olderArray))
// 插入数组的总数数据
const sum = {
  total: 0,
  iosTotal: 0,
  androidTotal: 0,
  orderTotal: 0,
  iosOrder: 0,
  androidOrder: 0,
  webOrder: 0
}
// 获取对象的键名
const objectKeys = Object.keys(newArray[0])
// 遍历对象的值，计算得到总数
objectKeys.forEach((item) => {
  const cur = newArray.reduce(function (prev, cur) {
    return cur[item] + prev
  }, 0)
  sum[item] = this.doubleFloat(cur)
})
sum['orderStat'] = '总计'
newArray.push(sum)
return newArray

```

### 获取上传视频信息

```
private getVideoInfo (file: File) {
    const video = document.createElement('video')
    const mediaSize = file.size
    video.src = URL.createObjectURL(file)
    video.onloadedmetadata = () => {
      this.displayDuration = parseInt(video.duration.toString())
      this.info.duration = parseInt(video.duration.toString()).toString()
      this.info.width = video.videoWidth
      this.info.height = video.videoHeight
    }
  }
```

### 对比两个对象，找出不同

```
// 比较两个数组，是否相等
export function arrayNotMath<T extends unknown> (oldArr: [T], newArr: [T]): boolean {
  return oldArr.length !== newArr.length ||
  JSON.stringify(oldArr) !== JSON.stringify(newArr)
}

// 获取值的类型,用Object.prototype.toString.call来检查类型，比typeof更准确
// https://gomakethings.com/true-type-checking-with-vanilla-js/
export function getType (val): string {
  return Object.prototype.toString.call(val)
}

// 比较两个变量的类型
export function sameType (oldVal, newVal): boolean {
  return getType(oldVal) === getType(newVal)
}

// 比较两个对象，返回有改动的属性，及对象的一级属性
export function diffObj (oldObj: Record<string, any>, newObj: Record<string, any>): Record<string, any> {
  // 比较两个值
  const compare = function compare (oldVal: any, newVal: any, key: any, diffs: any) {
    const oldType = getType(oldVal)
    const newType = getType(newVal)

    if (!sameType(oldVal, newVal)) { // 如果二者值类型不相同, 直接用新值覆盖
      diffs[key] = newVal
    } else if (newType === '[object Undefined]') { // 如果新的值类型为undefined,代表该值被移除了
      diffs[key] = null
    } else if (oldType === '[object Object]') { // 如果旧值为对象，使用递归
      const ojbDiff = diffObj(oldVal, newVal)
      if (Object.keys(ojbDiff).length > 0) {
        diffs[key] = ojbDiff
      }
    } else if (oldType === '[object Array]') { // 如果旧值为数组，比较二者数组
      if (arrayNotMath(oldVal, newVal)) {
        diffs[key] = newVal
      }
    } else if (oldType !== '[object Function]' && oldVal !== newVal) { // 为除了函数之外的其他基本类型就直接进行比较
      diffs[key] = newVal
    }
  }

  if (!sameType(oldObj, newObj)) return newObj
  const diffs: any = {}

  // 遍历旧对象，找出变动的地方
  for (const key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      compare(oldObj[key], newObj[key], key, diffs)
    }
  }

  // 如果新对象有新增属性，旧属性没有，这种情况下也需要遍历新对象
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (!oldObj[key] && oldObj[key] !== newObj[key]) {
        diffs[key] = newObj[key]
      }
    }
  }
  return diffs
}
```

### 获取邀请区间

```
// 获取邀请最大的奖励梯度的最大邀请人数
    private get maxInvitePeople () {
      if (this.inviteList.inviteRewards) {
        const inviteRewards = this.inviteList.inviteRewards
        const isExist = inviteRewards[inviteRewards.length - 1].maxPeople
        return isExist || undefined
      }
    }

    // 判断当前奖励为哪个区间
    private get inviteNumber () {
      const targetArray = this.inviteList.inviteRewards // 奖励梯度区间数组
      const inviteFriends: number = this.sumInfo.friends // 当前用户邀请的好友数量
      const firstExist = this.inviteList.firstReward // // 判读中台设置了首次的邀请额外奖励为不为0

      let number = -2 // 初始化参数

      if (!targetArray) return // 如果页面开始还没有获取响应的数据时，不做任何操作

      // 遍历区间数据，找到对应的区间
      const findArea = (inviteNumber: number) => {
        targetArray.forEach((item, index) => {
          if (inviteNumber >= item.minPeople && inviteNumber <= item.maxPeople) {
            number = index
          }
        })
        // 如果遍历奖励梯度都没有找到对应的区间所在的索引，说明实际邀请的好友大于最大的奖励梯度，取最后一个的索引
        if (number === -2) {
          number = targetArray.length - 1
        }
      }

      // 如果没有设置最大的奖励梯度的最大邀请人数，邀请奖励均以最高梯度计算，上不封顶
      const noMaxPeople = () => {
        if (inviteFriends === 0 || !this.loginStatus) {
          firstExist ? number = -1 : number = 0 // 判断中台是否设置了首次邀请额外奖励
        } else {
          findArea(inviteFriends)
        }
      }

      // 如果设置了最大奖励梯度的最大邀请人数，抵达最高梯度且满额之后，邀请奖励重新以最低梯度计算（若首邀奖励不为0，则循环后的第一次邀请可再次获得首邀奖励）
      const hasMaxPeople = () => {
        if (this.maxInvitePeople) {
          if (inviteFriends === 0 || !this.loginStatus || inviteFriends % this.maxInvitePeople === 0) {
            firstExist ? number = -1 : number = 0 // 判断中台是否设置了首次邀请额外奖励
          } else if (inviteFriends <= this.maxInvitePeople) {
            findArea(inviteFriends)
          } else if (inviteFriends > this.maxInvitePeople) {
            const copyNumber = inviteFriends % this.maxInvitePeople
            findArea(copyNumber)
          }
        }
      }

      if (!this.maxInvitePeople) {
        noMaxPeople()
      } else {
        hasMaxPeople()
      }
      return number
    }
```

### 产生随机数据

```
// 获取随机的尾部字符
const randomEndText = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const firstCharacter = chars[Math.floor(Math.random() * chars.length)]
  const secondCharacter = chars[Math.floor(Math.random() * chars.length)]
  return firstCharacter + secondCharacter
}

// 获取随机邀请数量和已提现金额
const randomNumber = () => {
  // 获得随机邀请数量
  const number = Math.floor(Math.random() * (31 - 5) + 5)
  // 获得随机的价格区间，5-8之间
  const randomPrice = Math.random() * (8 - 5) + 5
  // 获得随机的小数位，为0.36或者00
  const randomDecimal = Math.round(Math.random() * (2 - 1) + 1) === 1 ? '.36' : '.00'
  // 转化为10的整数
  const randomInteger = Math.floor(number * randomPrice).toString().split('')
  randomInteger[randomInteger.length - 1] = '0'
  const amount = randomInteger.join('') + randomDecimal
  return {
    number,
    amount
  }
}

// 产生随机的假数据
export const randomGenerator = (listNumber) => {
  const mockDataList: {name: string; number: number; amount: any}[] = []
  for (let i = 0; i < listNumber; i++) {
    const name = randomLastName() + randomHiddenText() + randomEndText()
    const { number, amount } = randomNumber()
    mockDataList.push({ name, number, amount })
  }
  return mockDataList
}
```

### 级联属性
```
const hours = 1000 * 60 * 60;
const days = hours * 24;
const weeks = days * 7;
const UNIT_TO_NUM = { hours, days, weeks };

class Duration {
  constructor(num, unit) {
    this.number = num;
    this.unit = unit;
  }
  toNumber() {
    return UNIT_TO_NUM[this.unit] * this.number;
  }
  get ago() {
    return new Date(Date.now() - this.toNumber());
  }
  get later() {
    return new Date(Date.now() + this.toNumber());
  }
}
Object.keys(UNIT_TO_NUM).forEach(unit => {
  Object.defineProperty(Number.prototype, unit, {
    get() {
      return new Duration(this, unit);
    }
  });
});
```
