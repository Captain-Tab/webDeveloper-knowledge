/**
 * chain of responsibility
 */
const Chain = function (fn) {
    this.fn = fn
    this.setNext = function (obj) {
        if(this.next) {
            return this.next.setNext(obj)
        }
        this.next = obj
        return this.next
    }
    this.run = function (param){
        this.fn(param)
        if(this.next){
            this.next.run(param)
        }
    }
}

const applyDevice = function (param){
    console.log('applyDevice', param)
}
const chainApplyDevice = new Chain(applyDevice)

const selectAddress = function (param){
    console.log('selectAddress', param)
}
const chainSelectAddress = new Chain(selectAddress)

const selectChecker = function (param){
    console.log('selectChecker', param)
}
const chainSelectChecker = new Chain(selectChecker)

chainApplyDevice.setNext(chainSelectAddress).setNext(chainSelectChecker)
chainApplyDevice.run('hello Tab')
