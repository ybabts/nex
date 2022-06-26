import { assertEquals, fail, AssertionError } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import Uint64 from '../../src/types/uint64.ts';

Deno.test({
    name: 'Uint64.toUint8Array().args.n.underflow',
    fn: () => {
        try {
            Uint64.toUint8Array(-32n);
            fail(`Uint64.${Uint64.toUint8Array.name}() did not throw an error when arg n is below ${Uint64.MIN} (Uint64.MIN)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint64.${Uint64.toUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint64.toUint8Array().args.n.overflow',
    fn: () => {
        try {
            Uint64.toUint8Array(18446744373709551615n);
            fail(`Uint64.${Uint64.toUint8Array.name}() did not throw an error when arg n is above ${Uint64.MAX} (Uint64.MAX)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint64.${Uint64.toUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint64.toUint8Array().return.type',
    fn: () => {
        assertEquals(Uint64.toUint8Array(4312n) instanceof Uint8Array, true, `Uint64.${Uint64.toUint8Array.name}() did not return a value of the correct type`);
    }
});

Deno.test({
    name: 'Uint64.toUint8Array().return.length',
    fn: () => {
        assertEquals(Uint64.toUint8Array(4312n).length, 8, `Uint64.${Uint64.toUint8Array.name}() did not return a value of the correct length`);
    }
});

Deno.test({
    name: 'Uint64.toUint8Array().return.value',
    fn: () => {
        assertEquals(Uint64.toUint8Array(588842n), new Uint8Array([0,0,0,0,0,8,252,42]));
        assertEquals(Uint64.toUint8Array(1511745616851n), new Uint8Array([0,0,1,95,251,15,123,211]));
    }
});

Deno.test({
    name: 'Uint64.toUint8Array().return = Uint64.fromUint8Array().return',
    fn: () => {
        const v = new Uint8Array([0,0,1,95,251,15,123,211]);
        const u = Uint64.fromUint8Array(v);
        const a = Uint64.toUint8Array(u);
        assertEquals(v, a);
    }
});

Deno.test({
    name: 'Uint64.is().args.n.underflow.return.value',
    fn: () => {
        assertEquals(Uint64.is(-5123n), false)
    }
});

Deno.test({
    name: 'Uint64.is().args.n.overflow.return.value',
    fn: () => {
        assertEquals(Uint64.is(18446746073709551615n), false)
    }
});

Deno.test({
    name: 'Uint64.is().args.n.correct.return.value',
    fn: () => {
        assertEquals(Uint64.is(5123512n), true)
    }
});

Deno.test({
    name: 'Uint64.fromUint8Array().args.a.length.underflow',
    fn: () => {
        try {
            Uint64.fromUint8Array(new Uint8Array([45,15]));
            fail(`Uint64.${Uint64.fromUint8Array.name}() did not throw an error when arg a is below ${Uint64.BYTES / Uint8Array.BYTES_PER_ELEMENT} (Uint64.BYTES / Uint8Array.BYTES_PER_ELEMENT)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint64.${Uint64.fromUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint64.fromUint8Array().args.a.length.overflow',
    fn: () => {
        try {
            Uint64.fromUint8Array(new Uint8Array([45,153,51,51,35,6]));
            fail(`Uint64.${Uint64.fromUint8Array.name}() did not throw an error when arg a is above ${Uint64.BYTES / Uint8Array.BYTES_PER_ELEMENT} (Uint64.BYTES / Uint8Array.BYTES_PER_ELEMENT)`);
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, `Uint64.${Uint64.fromUint8Array.name}() threw an error, but was not a ${RangeError.name}`);
        }
    }
});

Deno.test({
    name: 'Uint64.fromUint8Array().return.type',
    fn: () => {
        assertEquals(typeof Uint64.fromUint8Array(new Uint8Array([52,51,55,0,35,255,0,12])), 'bigint', `Uint64.${Uint64.fromUint8Array.name}() did not return a value of the correct type`);
    }
});

Deno.test({
    name: 'Uint64.fromUint8Array().return.value',
    fn: () => {
        assertEquals(Uint64.fromUint8Array(new Uint8Array([0x00, 0x20, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00])), 9007199254740992n);
        assertEquals(Uint64.fromUint8Array(new Uint8Array([0x00, 0x1f, 0xff, 0xff,  0xff, 0xff, 0xff, 0xff])), 9007199254740991n);
    }
});

Deno.test({
    name: 'Uint64.fromUint8Array().return.value.endian',
    fn: () => {
        assertEquals(Uint64.fromUint8Array(new Uint8Array([0xff, 0xff, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00]), true), 65535n);
        assertEquals(Uint64.fromUint8Array(new Uint8Array([0xff, 0xff, 0xff, 0xff,  0x00, 0x00, 0x00, 0x00]), true), 4294967295n);
    }
});

Deno.test({
    name: 'Uint64.fromUint8Array().return = Uint64.toUint8Array().return',
    fn: () => {
        const v = 324234n;
        const a = Uint64.toUint8Array(v);
        const u = Uint64.fromUint8Array(a);
        assertEquals(v, u)
    }
});

Deno.test({
    name: 'Uint64.prototype.valueOf().return.type',
    fn: () => {
        assertEquals(typeof new Uint64(3432n).valueOf() === 'bigint', true, `Uint64.prototype.valueOf() is not returning type "bigint"`)
    }
});

Deno.test({
    name: 'Uint64.prototype.valueOf().return.isEqual.toString()',
    fn: () => {
        const n = new Uint64(3432n);
        assertEquals(n.valueOf(), BigInt(n.toString()), `return value of Uint64.prototype.toString() is not equal to return value of Uint64.prototype.valueOf()`)
    }
});

Deno.test({
    name: 'Uint64.prototype.toString().return.type',
    fn: () => {
        assertEquals(typeof new Uint64(3432n).toString() === 'string', true, `Uint64.prototype.toString() is not returning type "string"`)
    }
});

Deno.test({
    name: 'Uint64.prototype.toString().return.isEqual.valueOf()',
    fn: () => {
        const n = new Uint64(3432n);
        assertEquals(n.toString(), `${n.valueOf()}`, `return value of Uint64.prototype.valueOf() is not equal to return value of Uint64.prototype.toString()`)
    }
});

Deno.test({
    name: 'Uint64.constructor().arg.n.underflow',
    fn: () => {
        try {
            new Uint64(-32n);
            fail('constructor did not throw an error when argument is below Uint64.MIN');
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, 'constructor.arg.n.underflow errored, but did not throw a RangeError');
        }
    }
});

Deno.test({
    name: 'Uint64.constructor().arg.n.overflow',
    fn: () => {
        try {
            new Uint64(184467440737095510915n);
            fail('constructor did not throw an error when argument is above Uint64.MAX');
        } catch(e) {
            if(e instanceof AssertionError) throw e;
            assertEquals(e instanceof RangeError, true, 'constructor.arg.n.overflow errored, but did not throw a RangeError');
        }
    }
});

Deno.test({
    name: 'Uint64.instance.toUint8Array().return.value',
    fn: () => {
        assertEquals(new Uint64(588842n).toUint8Array(), new Uint8Array([0,0,0,0,0,8,252,42]));
        assertEquals(new Uint64(1511745616851n).toUint8Array(), new Uint8Array([0,0,1,95,251,15,123,211]));
    }
});

Deno.test({
    name: 'Uint64.instance.toUint8Array().return.value.endian',
    fn: () => {
        assertEquals(new Uint64(4294967295n).toUint8Array(true), new Uint8Array([0xff, 0xff, 0xff, 0xff,  0x00, 0x00, 0x00, 0x00]));
        assertEquals(new Uint64(255n).toUint8Array(true), new Uint8Array([0xff, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00]));
    }
});

Deno.test({
    name: 'Uint64.instance.Deno.inspect().isEqual.Uint64.prototype.toString()',
    fn: () => {
        const n = new Uint64(420n);
        assertEquals(Deno.inspect(n), n.toString());
    }
});