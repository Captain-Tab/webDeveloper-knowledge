class DeepCloneer {
    constructor() {
        this.cache = []
    }
    // find the cache circle
    findCache (origin) {
        for(let i = 0; i < this.cache.length; i++) {
            if(this.cache[i][0] === origin) {
                return this.cache[i][1]
            }
        }
    }
    clone(origin) {
        if(origin instanceof Object) {
            let cachedList = this.findCache(origin)
            if(cachedList) {
                return cachedList
            } else {
                let dist
                if(origin instanceof Array) {
                    dist = []
                } else if (origin instanceof Function) {
                    dist = function () {
                        return origin.apply(this, arguments)
                    }
                } else if (origin instanceof RegExp) {
                    dist = new RegExp(origin.source, origin.flags)
                } else if (origin instanceof Date) {
                    dist = new Date(origin)
                } else {
                    dist = {}
                }
                this.cache.push([origin,dist])
                for (let key in origin) {
                    if(origin.hasOwnProperty(key)) {
                        dist[key] = this.clone(origin[key])
                    }
                }
                return dist
            }
        }
        return origin
    }
}
