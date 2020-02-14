class deepCloner {
    constructor() {
        this.cache = []
    }
    clone(source) {
        if (source instanceof Object) {
            const cacheDist = this.findCache(source)
            if (cacheDist) {
                return cacheDist
            } else {
                let dist
                if (source instanceof Array) {// 数组的情况
                    dist = new Array()
                } else if (source instanceof Function) {// 函数的情况
                    dist = function() {
                        return source.apply(this, arguments)
                    }
                } else if (source instanceof Date) {// date的情况
                    dist = new Date(source)
                } else if (source instanceof RegExp) {// RegExp的情况
                    dist = new RegExp(source.source, source.flags)// 分别截取正则的前后段
                } else {
                    dist = new Object()
                }
                this.cache.push([source, dist]);// 环的情况
                for (let key in source) {
                    dist[key] = this.clone(source[key])
                }
                return dist
            }
        }
        return source
    }

    findCache(source) {
        for (let i=0; i<this.cache.length; i++) {
            if (this.cache[i][0] === source) {
                return this.cache[i][1]
            }
        }
        return undefined
    }
}

module.exports = deepCloner