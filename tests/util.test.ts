import { assertEquals, fail } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import * as util from '../src/util.ts';

Deno.test({
    name: 'util.convertUint32toUint8Array.input.underflow',
    fn: () => {
        try {
            util.convertUint32toUint8Array(-1);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.input.overflow',
    fn: () => {
        try {
            util.convertUint32toUint8Array(4294967296);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.output.type',
    fn: () => {
        assertEquals(util.convertUint32toUint8Array(52) instanceof Uint8Array, true);
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.output.length',
    fn: () => {
        assertEquals(util.convertUint32toUint8Array(52).length, 4);
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.output.value',
    fn: () => {
        assertEquals(util.convertUint32toUint8Array(588842), new Uint8Array([0,8,252,42]));
        assertEquals(util.convertUint32toUint8Array(4874611), new Uint8Array([0,74,97,115]));
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.output.isEqualToConvertUint8ArraytoUint32',
    fn: () => {
        const v = new Uint8Array([0,74,97,115]);
        assertEquals(util.convertUint32toUint8Array(util.convertUint8ArraytoUint32(v)), v);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint32.input.length.underflow',
    fn: () => {
        try {
            util.convertUint8ArraytoUint32(new Uint8Array([0,51,23]));
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint32.input.length.overflow',
    fn: () => {
        try {
            util.convertUint8ArraytoUint32(new Uint8Array([0,51,23,33,95]));
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint32.output.type',
    fn: () => {
        assertEquals(typeof util.convertUint8ArraytoUint32(new Uint8Array([5,23,5,0])) === 'number', true);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint32.output.underflow',
    fn: () => {
        assertEquals(util.convertUint8ArraytoUint32(new Uint8Array([5,23,5,0])) >= 0, true);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint32.output.overflow',
    fn: () => {
        assertEquals(util.convertUint8ArraytoUint32(new Uint8Array([5,23,5,0])) <= 4294967295, true);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint32.output',
    fn: () => {
        assertEquals(util.convertUint8ArraytoUint32(new Uint8Array([0,74,97,115])), 4874611);
        assertEquals(util.convertUint8ArraytoUint32(new Uint8Array([0,15,60,13])), 998413);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint32.output.isEqualToConvertUint32toUint8Array',
    fn: () => {
        const v = 77423;
        assertEquals(util.convertUint8ArraytoUint32(util.convertUint32toUint8Array(v)), v);
    }
});

Deno.test({
    name: 'util.concatUint8Arrays.sumOfInputLengthShouldEqualOutputLength',
    fn: () => {
        const v1 = [new Uint8Array([1]),new Uint8Array([4,5]),new Uint8Array([0])]
        const v2 = [new Uint8Array([1,9,2]),new Uint8Array([5]),new Uint8Array([0,1,2])]
        assertEquals(util.concactUint8Arrays(v1).length, v1.reduce((p, c) => p += c.length, 0));
        assertEquals(util.concactUint8Arrays(v2).length, v2.reduce((p, c) => p += c.length, 0));
    }
});

Deno.test({
    name: 'util.concatUint8Arrays.output.type',
    fn: () => {
        assertEquals(util.concactUint8Arrays([]) instanceof Uint8Array, true);
    }
});

Deno.test({
    name: 'util.concatUint8Arrays.output.length',
    fn: () => {
        assertEquals(util.concactUint8Arrays([new Uint8Array([5,2,3]), new Uint8Array([3,5])]), new Uint8Array([5,2,3,3,5]));
        assertEquals(util.concactUint8Arrays([new Uint8Array([0,1]), new Uint8Array([22,234])]), new Uint8Array([0,1,22,234]));
    }
});

Deno.test({
    name: 'util.subsecUint8Array.input.isZero',
    fn: () => {
        try {
            util.subsecUint8Array(new Uint8Array(0),[0]);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.subsecUint8Array.input.isNotEqual',
    fn: () => {
        try {
            util.subsecUint8Array(new Uint8Array([2,0,8,4]),[2,1]);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.subsecUint8Array.inputLengthsEqualtoOutputLengths',
    fn: () => {
        assertEquals(util.subsecUint8Array(new Uint8Array([5,12,5,67]), [2,1,1]).length, 3);
        assertEquals(util.subsecUint8Array(new Uint8Array([5,12,5,67,24,0]), [2,1,1,2]).length, 4);
    }
});

Deno.test({
    name: 'util.subsecUint8Array.inputLengthsEqualtoOutputLengths',
    fn: () => {
        assertEquals(util.subsecUint8Array(new Uint8Array([5,12,5,67]), [2,1,1]).reduce((a,c) => a+= c.length, 0), 4);
        assertEquals(util.subsecUint8Array(new Uint8Array([5,12,5,67,24,0]), [2,1,1,2]).reduce((a,c) => a+= c.length, 0), 6);
    }
});

Deno.test({
    name: 'util.subsecUint8Array.output.value',
    fn: () => {
        assertEquals(util.subsecUint8Array(new Uint8Array([5,12,5,67]), [2,1,1]), [new Uint8Array([5,12]), new Uint8Array([5]), new Uint8Array([67])]);
        assertEquals(util.subsecUint8Array(new Uint8Array([5,12,5,67,24,0]), [2,1,1,2]), [new Uint8Array([5,12]), new Uint8Array([5]), new Uint8Array([67]), new Uint8Array([24,0])]);
    }
});


Deno.test({
    name: 'util.convertUint64toUint8Array.input.underflow',
    fn: () => {
        try {
            util.convertUint64toUint8Array(-1n);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint64toUint8Array.input.overflow',
    fn: () => {
        try {
            util.convertUint64toUint8Array(18446744073709551616n);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint64toUint8Array.output.type',
    fn: () => {
        assertEquals(util.convertUint64toUint8Array(52n) instanceof Uint8Array, true);
    }
});

Deno.test({
    name: 'util.convertUint64toUint8Array.output.length',
    fn: () => {
        assertEquals(util.convertUint64toUint8Array(52n).length, 8);
    }
});

Deno.test({
    name: 'util.convertUint64toUint8Array.output.value',
    fn: () => {
        assertEquals(util.convertUint64toUint8Array(255n), new Uint8Array([0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0xff]));
        assertEquals(util.convertUint64toUint8Array(65535n), new Uint8Array([0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0xff, 0xff]));
        assertEquals(util.convertUint64toUint8Array(4294967295n), new Uint8Array([0x00, 0x00, 0x00, 0x00,  0xff, 0xff, 0xff, 0xff]));
        assertEquals(util.convertUint64toUint8Array(4294967296n), new Uint8Array([0x00, 0x00, 0x00, 0x01,  0x00, 0x00, 0x00, 0x00]));
        assertEquals(util.convertUint64toUint8Array(9007199254740991n), new Uint8Array([0x00, 0x1f, 0xff, 0xff,  0xff, 0xff, 0xff, 0xff]));
        assertEquals(util.convertUint64toUint8Array(9007199254740992n), new Uint8Array([0x00, 0x20, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00]));
        assertEquals(util.convertUint64toUint8Array(9007199254740993n), new Uint8Array([0x00, 0x20, 0x00, 0x00,  0x00, 0x00, 0x00, 0x01]));
    }
});

Deno.test({
    name: 'util.convertUint64toUint8Array.output.isEqualToConvertUint8ArraytoUint64',
    fn: () => {
        const v = new Uint8Array([0x00, 0x20, 0x00, 0x00,  0x00, 0x00, 0x00, 0x01]);
        assertEquals(util.convertUint64toUint8Array(util.convertUint8ArraytoUint64(v)), v);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint64.input.length.underflow',
    fn: () => {
        try {
            util.convertUint8ArraytoUint64(new Uint8Array([0,51,23]));
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint64.input.length.overflow',
    fn: () => {
        try {
            util.convertUint8ArraytoUint64(new Uint8Array([0,51,23,33,95,54,112,55,63]));
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint64.output.type',
    fn: () => {
        assertEquals(typeof util.convertUint8ArraytoUint64(new Uint8Array([0,51,23,33,95,54,112,55])) === 'bigint', true);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint64.output.underflow',
    fn: () => {
        assertEquals(util.convertUint8ArraytoUint64(new Uint8Array([0,51,23,33,95,54,112,55])) >= 0n, true);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint64.output.overflow',
    fn: () => {
        assertEquals(util.convertUint8ArraytoUint64(new Uint8Array([0,51,23,33,95,54,112,55])) <= 18446744073709551615n, true);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint64.output',
    fn: () => {
        assertEquals(util.convertUint8ArraytoUint64(new Uint8Array([0x00, 0x20, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00])), 9007199254740992n);
        assertEquals(util.convertUint8ArraytoUint64(new Uint8Array([0x00, 0x00, 0x00, 0x00,  0xff, 0xff, 0xff, 0xff])), 4294967295n);
    }
});

Deno.test({
    name: 'util.convertUint8ArraytoUint64.output.isEqualToConvertUint64toUint8Array',
    fn: () => {
        const v = 9007199254740991n;
        assertEquals(util.convertUint8ArraytoUint64(util.convertUint64toUint8Array(v)), v);
    }
});

Deno.test({
    name: 'util.convertUint64toSafeNumbers.input.underflow',
    fn: () => {
        try {
            util.convertUint64toSafeNumbers(-1n);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint64toSafeNumbers.input.overflow',
    fn: () => {
        try {
            util.convertUint64toSafeNumbers(18446744093709551616n);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint64toSafeNumbers.output.type',
    fn: () => {
        assertEquals(util.convertUint64toSafeNumbers(626245425n) instanceof Array, true);
    }
});

Deno.test({
    name: 'util.convertUint64toSafeNumbers.output.contents.type',
    fn: () => {
        assertEquals(typeof util.convertUint64toSafeNumbers(626245425n)[0] === 'number', true);
    }
});

Deno.test({
    name: 'util.convertUint64toSafeNumbers.output.length.BelowMaxSafeNumber',
    fn: () => {
        assertEquals(util.convertUint64toSafeNumbers(90071992547409n).length, 1);
    }
});

Deno.test({
    name: 'util.convertUint64toSafeNumbers.output.length.AboveMaxSafeNumber',
    fn: () => {
        assertEquals(util.convertUint64toSafeNumbers(9007299255740991n).length, 2);
    }
});

Deno.test({
    name: 'util.convertUint64toSafeNumbers.output.value',
    fn: () => {
        assertEquals(util.convertUint64toSafeNumbers(9007299255740991n), [9007199254740991, 100001000001]);
        assertEquals(util.convertUint64toSafeNumbers(36007299255740991n), [9007199254740991, 9007199254740991, 9007199254740991, 8985701491518021]);
        
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint64.input.underflow',
    fn: () => {
        try {
            util.convertSafeNumberstoUint64([-200, -40]);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint64.input.overflow',
    fn: () => {
        try {
            util.convertSafeNumberstoUint64(Array(2049).fill(9007199254740991));
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint64.output.type',
    fn: () => {
        assertEquals(typeof util.convertSafeNumberstoUint64([456,4856161,153112]) === 'bigint', true);
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint64.output.value',
    fn: () => {
        assertEquals(util.convertSafeNumberstoUint64([456,4856161,153112]), 5009729n);
        assertEquals(util.convertSafeNumberstoUint64([4511321136,649847704856161,105485653112]), 649957701830409n);
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint32.input.underflow',
    fn: () => {
        try {
            util.convertSafeNumberstoUint32([-200, -40]);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint32.input.overflow',
    fn: () => {
        try {
            util.convertSafeNumberstoUint32(Array(2).fill(9007199254740991));
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint32.output.type',
    fn: () => {
        assertEquals(typeof util.convertSafeNumberstoUint32([456,4856161,153112]) === 'number', true);
    }
});

Deno.test({
    name: 'util.convertSafeNumberstoUint32.output.value',
    fn: () => {
        assertEquals(util.convertSafeNumberstoUint32([456,4856161,153112]), 5009729);
        assertEquals(util.convertSafeNumberstoUint32([4511326,649856161,105485]), 654472972);
    }
});

Deno.test({
    name: 'DenoSeekwithArray.input.underflow',
    fn: () => {
        const file = Deno.openSync('README.md');
        util.DenoSeekwithArray(file, [5,2,3,-100]);
        assertEquals(file.seekSync(0, Deno.SeekMode.Current), 0);
        file.close();
    }
});

Deno.test({
    name: 'DenoSeekwithArray.input.overflow',
    fn: () => {
        const file = Deno.openSync('README.md');
        util.DenoSeekwithArray(file, [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER]);
        assertEquals(file.seekSync(0, Deno.SeekMode.Current), Number.MAX_SAFE_INTEGER);
        file.close();
    }
});

// The way that this avoids going below zero might cause a bug later on
Deno.test({
    name: 'DenoSeekwithArray.output.value',
    fn: () => {
        const file = Deno.openSync('README.md');
        util.DenoSeekwithArray(file, [5,2,3]);
        assertEquals(file.seekSync(0, Deno.SeekMode.Current), 10);
        util.DenoSeekwithArray(file, [3,3,3]);
        assertEquals(file.seekSync(0, Deno.SeekMode.Current), 19);
        util.DenoSeekwithArray(file, [-21, 4]);
        assertEquals(file.seekSync(0, Deno.SeekMode.Current), 4);
        file.close();
    }
});