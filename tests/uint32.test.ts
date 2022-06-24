import { assertEquals, fail, AssertionError } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import Uint32 from '../src/uint32.ts';

Deno.test({
    name: 'class.uint32.prototype.valueOf().return.type',
    fn: () => {
        assertEquals(typeof new Uint32(3432).valueOf() === 'number', true, `class.uint32.prototype.valueOf() is not returning type "number"`)
    }
});

Deno.test({
    name: 'class.uint32.prototype.valueOf().return.isEqual.toString()',
    fn: () => {
        const n = new Uint32(3432);
        assertEquals(n.valueOf(), Number(n.toString()), `return value of class.uint32.prototype.toString() is not equal to return value of class.uint32.prototype.valueOf()`)
    }
});

Deno.test({
    name: 'class.uint32.prototype.toString().return.type',
    fn: () => {
        assertEquals(typeof new Uint32(3432).toString() === 'string', true, `class.uint32.prototype.toString() is not returning type "string"`)
    }
});

Deno.test({
    name: 'class.uint32.prototype.toString().return.isEqual.valueOf()',
    fn: () => {
        const n = new Uint32(3432);
        assertEquals(n.toString(), `${n.valueOf()}`, `return value of class.uint32.prototype.valueOf() is not equal to return value of class.uint32.prototype.toString()`)
    }
});

Deno.test({
    name: 'class.uint32.constructor().arg.n.underflow',
    fn: () => {
        try {
            new Uint32(-32);
            fail('constructor did not throw an error when argument is below Uint32.MIN');
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, 'constructor.arg.n.underflow errored, but did not throw a RangeError');
        }
    }
});

Deno.test({
    name: 'class.uint32.constructor().arg.n.overflow',
    fn: () => {
        try {
            new Uint32(42949897295);
            fail('constructor did not throw an error when argument is below Uint32.MAX');
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, 'constructor.arg.n.overflow errored, but did not throw a RangeError');
        }
    }
});

Deno.test({
    name: 'class.uint32.isUint32().args.n.underflow.returnsFalse',
    fn: () => {
        assertEquals(Uint32.isUint32(-32), false);
    }
});

Deno.test({
    name: 'class.uint32.isUint32().args.n.overflow.returnsFalse',
    fn: () => {
        assertEquals(Uint32.isUint32(42949897295), false);
    }
});

Deno.test({
    name: 'class.uint32.isUint32().returns.correct',
    fn: () => {
        assertEquals(Uint32.isUint32(5123512), true);
    }
});

Deno.test({
    name: 'class.uint32.toUint8Array().args.n.underflow',
    fn: () => {
        try {
            Uint32.toUint8Array(-32);
            fail('toUint8Array() did not throw an error when argument is below Uint32.MIN');
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, 'toUint8Array() errored, but did not throw a RangeError');
        }
    }
});

Deno.test({
    name: 'class.uint32.toUint8Array().args.n.overflow',
    fn: () => {
        try {
            Uint32.toUint8Array(42949897295);
            fail('toUint8Array() did not throw an error when argument is below Uint32.MAX');
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, 'toUint8Array() errored, but did not throw a RangeError');
        }
    }
});

Deno.test({
    name: 'class.uint32.toUint8Array().return.type',
    fn: () => {
        assertEquals(Uint32.toUint8Array(5123) instanceof Uint8Array, true, `toUint8Array() did not return a value with type "Uint8Array"`);
    }
});

Deno.test({
    name: 'class.uint32.toUint8Array().return.length',
    fn: () => {
        assertEquals(Uint32.toUint8Array(5123).length, Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT, `toUint8Array() did not return a value with length of Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT`);
    }
});

Deno.test({
    name: 'class.uint32.toUint8Array().return.value',
    fn: () => {
        assertEquals(Uint32.toUint8Array(588842), new Uint8Array([0,8,252,42]));
        assertEquals(Uint32.toUint8Array(4874611), new Uint8Array([0,74,97,115]));
    }
});

Deno.test({
    name: 'class.uint32.toUint8Array().return.isEqual.fromUint8Array()',
    fn: () => {
        const v = new Uint8Array([3,44,255,0]);
        const u = Uint32.fromUint8Array(v);
        const a = Uint32.toUint8Array(+u);
        assertEquals(v, a)
    }
});

Deno.test({
    name: 'class.uint32.fromUint8Array().args.a.underflow',
    fn: () => {
        try {
            Uint32.fromUint8Array(new Uint8Array(2))
            fail(`fromUint8Array() did not throw an error when arguement is below Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `fromUint8Array() errored, but did not throw a RangeError`);
        }
    }
});

Deno.test({
    name: 'class.uint32.fromUint8Array().args.a.overflow',
    fn: () => {
        try {
            Uint32.fromUint8Array(new Uint8Array(5))
            fail(`fromUint8Array() did not throw an error when arguement is above Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `fromUint8Array() errored, but did not throw a RangeError`);
        }
    }
});

Deno.test({
    name: 'class.uint32.fromUint8Array().return.type',
    fn: () => {
        assertEquals(Uint32.fromUint8Array(new Uint8Array([3,2,3,5])) instanceof Uint32, true, `fromUint8Array() is not returning type "Uint32"`);
    }
});

Deno.test({
    name: 'class.uint32.fromUint8Array().return.value',
    fn: () => {
        assertEquals(Uint32.fromUint8Array(new Uint8Array([0,8,252,42])), new Uint32(588842));
        assertEquals(Uint32.fromUint8Array(new Uint8Array([0,74,97,115])), new Uint32(4874611));
    }
});

Deno.test({
    name: 'class.uint32.fromUint8Array().return.isEqual.toUint8Array()',
    fn: () => {
        const v = 324234;
        const a = Uint32.toUint8Array(v);
        const u = Uint32.fromUint8Array(a);
        assertEquals(v, +u)
    }
});

Deno.test({
    name: 'class.uint32.instance.toUint8Array().return.value',
    fn: () => {
        assertEquals(new Uint32(588842).toUint8Array(), new Uint8Array([0,8,252,42]));
        assertEquals(new Uint32(4874611).toUint8Array(), new Uint8Array([0,74,97,115]));
    }
});

Deno.test({
    name: 'class.uint32.instance.Deno.inspect().isEqual.class.uint32.prototype.toString()',
    fn: () => {
        const n = new Uint32(420);
        assertEquals(Deno.inspect(n), n.toString());
    }
});