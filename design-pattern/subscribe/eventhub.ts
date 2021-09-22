/**
 * 前端简易版event
 */

class EventEmitter {
    // @ts-ignore
    private event: Map<string, Function[]>
    private readonly maxListeners: number
    private static instance: EventEmitter;

    // 单例模式
    public static get singleInstance (): EventEmitter {
        if (!EventEmitter.instance) {
            EventEmitter.instance = new EventEmitter()
        }
        return EventEmitter.instance
    }

    // 构造函数
    private constructor () {
        // @ts-ignore
        this.event = new Map([])
        this.maxListeners = 10
    }

    // 监听事件
    public on (type: string, listener: Function) {
        const arr = this.event.get(type) as Function[] || []
        console.log('arr', arr)
        if (arr.length >= this.maxListeners) {
            console.error('最大监听对象为10')
            return false
        }
        arr.push(listener)
        this.event.set(type, arr)
        return true
    }

    // 发送监听
    public emit (type: string, ...rest: any[]) {
        if (this.event.has(type)) {
            const arr = this.event.get(type) as Function[]
            arr.map(fn => fn.apply(this, rest))
        }
    }

    // 移除监听器
    public removeListener (type: string) {
        if (this.event.has(type)) {
            this.event.delete(type)
        }
    }

    // 移除所有监听器
    public removeAllListener () {
        // @ts-ignore
        this.event = new Map()
    }
}

export default EventEmitter
