const { reactive, effect, computed } = require('./reactivity');

const proxy = reactive({
    a: 1,
    b: 2,
    c: {
        d: {
            e: 3,
        },
    },
});

effect(() => {
    console.log(proxy.a);
});

effect(() => {
    console.log(proxy.c.d.e);
});

const computedObj = computed(() => proxy.b * 2);

// setTimeout(() => {
//     ++proxy.a;
//     ++proxy.b;
//     ++proxy.c.d.e;
//     console.log(computedObj.value);
// }, 1000);

function _new() {
    const [constructor, ...args] = [...arguments];
    // 创建一个空对象，指定原型为constructor.prototype
    const obj = Object.create(constructor.prototype);
    // 执行构造函数，绑定this
    const result = constructor.apply(obj, args);
    // 如果构造函数返回一个对象，那么返回该对象， 如果没有就返回新对象
    return result && result instanceof Object ? result : obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

_new(Person, 'mxin', 18);
// Person {name: "mxin", age: "18"}
//	 age: "18"
//	 name: "mxin"
//	 __proto__:
//		 constructor: ƒ Person(name, age)
//		 __proto__: Object

const mxin = _new(Person, 'mxin', 18);
console.log(JSON.stringify(mxin, null, 4));
console.log(mxin.name, mxin.age);
// mxin,18
