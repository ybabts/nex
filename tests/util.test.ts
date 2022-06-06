import { assertEquals, fail } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import { convertUint32toUint8Array } from '../src/util.ts';

Deno.test({
    name: 'util.convertUint32toUint8Array.input.underflow',
    fn: () => {
        try {
            convertUint32toUint8Array(-1);
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
            convertUint32toUint8Array(4294967296);
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.output.type',
    fn: () => {
        assertEquals(convertUint32toUint8Array(52) instanceof Uint8Array, true);
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.output.length',
    fn: () => {
        assertEquals(convertUint32toUint8Array(52).length, 4);
    }
});

Deno.test({
    name: 'util.convertUint32toUint8Array.output.value',
    fn: () => {
        assertEquals(convertUint32toUint8Array(588842), new Uint8Array([0,8,252,42]));
        assertEquals(convertUint32toUint8Array(4874611), new Uint8Array([0,74,97,115]));
    }
});

