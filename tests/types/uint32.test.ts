import { assertEquals, fail, AssertionError } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import Uint32 from '../../src/types/uint32.ts';

Deno.test({
    name: 'Uint32.toUint8Array().args.n.underflow',
    fn: () => {
        try {
            Uint32.toUint8Array(-32);
            fail(`Uint32.${Uint32.toUint8Array.name}() did not throw an error when arg n is below ${Uint32.MIN} (Uint32.MIN)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint32.${Uint32.toUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint32.toUint8Array().args.n.overflow',
    fn: () => {
        try {
            Uint32.toUint8Array(42949897295);
            fail(`Uint32.${Uint32.toUint8Array.name}() did not throw an error when arg n is above ${Uint32.MAX} (Uint32.MAX)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint32.${Uint32.toUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint32.toUint8Array().return.type',
    fn: () => {
        assertEquals(Uint32.toUint8Array(4312) instanceof Uint8Array, true, `Uint32.${Uint32.toUint8Array.name}() did not return a value of the correct type`);
    }
});

Deno.test({
    name: 'Uint32.toUint8Array().return.length',
    fn: () => {
        assertEquals(Uint32.toUint8Array(4312).length, 4, `Uint32.${Uint32.toUint8Array.name}() did not return a value of the correct length`);
    }
});

Deno.test({
    name: 'Uint32.toUint8Array().return.value',
    fn: () => {
        assertEquals(Uint32.toUint8Array(588842), new Uint8Array([0,8,252,42]));
        assertEquals(Uint32.toUint8Array(4874611), new Uint8Array([0,74,97,115]));
    }
});

Deno.test({
    name: 'Uint32.toUint8Array().return.value.endian',
    fn: () => {
        assertEquals(Uint32.toUint8Array(255, true), new Uint8Array([0xff, 0x00, 0x00, 0x00]));
        assertEquals(Uint32.toUint8Array(65535, true), new Uint8Array([0xff, 0xff, 0x00, 0x00]));
    }
});

Deno.test({
    name: 'Uint32.toUint8Array().return = Uint32.fromUint8Array().return',
    fn: () => {
        const v = new Uint8Array([3,44,255,0]);
        const u = Uint32.fromUint8Array(v);
        const a = Uint32.toUint8Array(u);
        assertEquals(v, a);
    }
});

Deno.test({
    name: 'Uint32.is().args.n.underflow.return.value',
    fn: () => {
        assertEquals(Uint32.is(-5123), false)
    }
});

Deno.test({
    name: 'Uint32.is().args.n.overflow.return.value',
    fn: () => {
        assertEquals(Uint32.is(42949897295), false)
    }
});

Deno.test({
    name: 'Uint32.is().args.n.correct.return.value',
    fn: () => {
        assertEquals(Uint32.is(5123512), true)
    }
});

Deno.test({
    name: 'Uint32.fromUint8Array().args.a.length.underflow',
    fn: () => {
        try {
            Uint32.fromUint8Array(new Uint8Array([45,15]));
            fail(`Uint32.${Uint32.fromUint8Array.name}() did not throw an error when arg a is below ${Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT} (Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint32.${Uint32.fromUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint32.fromUint8Array().args.a.length.overflow',
    fn: () => {
        try {
            Uint32.fromUint8Array(new Uint8Array([45,153,51,51,35,6]));
            fail(`Uint32.${Uint32.fromUint8Array.name}() did not throw an error when arg a is above ${Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT} (Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint32.${Uint32.fromUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint32.fromUint8Array().return.type',
    fn: () => {
        assertEquals(typeof Uint32.fromUint8Array(new Uint8Array([35,255,0,12])), 'number', `Uint32.${Uint32.fromUint8Array.name}() did not return a value of the correct type`);
    }
});

Deno.test({
    name: 'Uint32.fromUint8Array().return.value',
    fn: () => {
        assertEquals(Uint32.fromUint8Array(new Uint8Array([0,8,252,42])), 588842);
        assertEquals(Uint32.fromUint8Array(new Uint8Array([0,74,97,115])), 4874611);
    }
});

Deno.test({
    name: 'Uint32.fromUint8Array().return.value.endian',
    fn: () => {
        assertEquals(Uint32.fromUint8Array(new Uint8Array([0xff, 0x00, 0x00, 0x00]), true), 255);
        assertEquals(Uint32.fromUint8Array(new Uint8Array([0xff, 0xff, 0x00, 0x00]), true), 65535);
    }
});

Deno.test({
    name: 'Uint32.fromUint8Array().return = Uint32.toUint8Array().return',
    fn: () => {
        const v = 324234;
        const a = Uint32.toUint8Array(v);
        const u = Uint32.fromUint8Array(a);
        assertEquals(v, u)
    }
});

Deno.test({
    name: 'Uint32.prototype.valueOf().return.type',
    fn: () => {
        assertEquals(typeof new Uint32(3432).valueOf() === 'number', true, `Uint32.prototype.valueOf() is not returning type "number"`)
    }
});

Deno.test({
    name: 'Uint32.prototype.valueOf().return.isEqual.toString()',
    fn: () => {
        const n = new Uint32(3432);
        assertEquals(n.valueOf(), Number(n.toString()), `return value of Uint32.prototype.toString() is not equal to return value of Uint32.prototype.valueOf()`)
    }
});

Deno.test({
    name: 'Uint32.prototype.toString().return.type',
    fn: () => {
        assertEquals(typeof new Uint32(3432).toString() === 'string', true, `Uint32.prototype.toString() is not returning type "string"`)
    }
});

Deno.test({
    name: 'Uint32.prototype.toString().return.isEqual.valueOf()',
    fn: () => {
        const n = new Uint32(3432);
        assertEquals(n.toString(), `${n.valueOf()}`, `return value of Uint32.prototype.valueOf() is not equal to return value of Uint32.prototype.toString()`)
    }
});

Deno.test({
    name: 'Uint32.constructor().arg.n.underflow',
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
    name: 'Uint32.constructor().arg.n.overflow',
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
    name: 'Uint32.instance.toUint8Array().return.value',
    fn: () => {
        assertEquals(new Uint32(588842).toUint8Array(), new Uint8Array([0,8,252,42]));
        assertEquals(new Uint32(4874611).toUint8Array(), new Uint8Array([0,74,97,115]));
    }
});

Deno.test({
    name: 'Uint32.instance.Deno.inspect().isEqual.Uint32.prototype.toString()',
    fn: () => {
        const n = new Uint32(420);
        assertEquals(Deno.inspect(n), n.toString());
    }
});