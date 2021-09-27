/**
 * a simple version of eventhub
 */

class EventEmitter {
    // @ts-ignore
    private event: Map<string, Function[]>
    private readonly maxListeners: number
    private static instance: EventEmitter;

    // singleton
    public static get singleInstance (): EventEmitter {
        if (!EventEmitter.instance) {
            EventEmitter.instance = new EventEmitter()
        }
        return EventEmitter.instance
    }

    // constructor
    private constructor () {
        // @ts-ignore
        this.event = new Map([])
        this.maxListeners = 10
    }

    // listen event
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

    // fire event
    public emit (type: string, ...rest: any[]) {
        if (this.event.has(type)) {
            const arr = this.event.get(type) as Function[]
            arr.map(fn => fn.apply(this, rest))
        }
    }

    // remove event
    public removeListener (type: string) {
        if (this.event.has(type)) {
            this.event.delete(type)
        }
    }

    // remove all event
    public removeAllListener () {
        // @ts-ignore
        this.event = new Map()
    }
}

export default EventEmitter
