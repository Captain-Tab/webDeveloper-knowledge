/* eslint-disable @typescript-eslint/no-explicit-any */

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

/** 判断两个值是否完全相等 */
export function hasChanged (oldVal, newVal) {
    // 首先，判断两者类型是否相等
    const typeEqual = sameType(oldVal, newVal)
    if (!typeEqual) return true
    // 高级类型的两个值进行比较
    if (getType(newVal) === '[object Object]' || getType(newVal) === '[object Array]') {
        const checkResult = diffObj(oldVal, newVal)
        return Object.keys(checkResult).length !== 0
    }
    // 基本类型比较
    return oldVal !== newVal
}

/** 深度复制 */
export function deepCopy (obj: object): object {
    return JSON.parse(JSON.stringify(obj))
}
