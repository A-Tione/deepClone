const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
chai.use(sinonChai);

const assert = chai.assert
const deepClone = require("../src/index")

describe("deepClone", ()=>{
    it('是一个函数', ()=>{
        assert.isFunction(deepClone)
    })
    it('测试深拷贝基础类型', ()=>{
        const number = 123
        const number2 = deepClone(number)
        assert(number === number2)
        const string = '字符串'
        const string2 = deepClone(string)
        assert(string === string2)
        const boolean = true
        const boolean2 = deepClone(boolean)
        assert(boolean === boolean2)
        const un = undefined
        const un2 = deepClone(un)
        assert(un === un2)
        const nu = null
        const nu2 = deepClone(nu)
        assert(nu === nu2)
        const sym = Symbol()
        const sym2 = deepClone(sym)
        assert(sym === sym2)
    })
})

describe('对象', ()=>{
    it('能够复制普通对象', ()=> {
        const a = {name:'yy', child:{name: 'yyy'}}
        const a2 = deepClone(a)
        assert(a !== a2)
        assert(a.name === a2.name)
        assert(a.child !== a2.child)
        assert(a.child.name === a2.child.name)
    });
    it('能够复制数组对象', ()=> {
        const a = [[11,12,13],[21,22,23],[31,32,33]]
        const a2 = deepClone(a)
        assert(a !== a2)
        assert.deepEqual(a, a2) //检测2个数组中的每个值
    });
    it('能够复制函数', ()=> {
        const a = function fn(a, b) {
            return a+b
        }
        a.xx = {yy: {zz: 1}}
        const a2 = deepClone(a)
        assert(a.xx !== a2.xx)
        assert(a.xx.yy !== a2.xx.yy)
        assert(a.xx.yy.zz === a2.xx.yy.zz)
        assert(a !== a2)
        assert(a(1,2) === a2(1,2))
    });
})

