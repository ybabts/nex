import { assertEquals, fail } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import * as fss from '../src/fss.ts';

Deno.test({
    name: 'fss.parseUint8ArrayFromFssBlock.a.underflow',
    fn: () => {
        try {
            fss.parseUint8ArrayFromFssBlock(new Uint8Array([]), [{
                property: 'inUse',
                length: 1
            }])
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'fss.parseUint8ArrayFromFssBlock.a.overflow',
    fn: () => {
        try {
            fss.parseUint8ArrayFromFssBlock(new Uint8Array([2,5]), [{
                property: 'inUse',
                length: 1
            }])
            fail();
        } catch(e) {
            assertEquals(e instanceof RangeError, true);
        }
    }
});

Deno.test({
    name: 'fss.parseUint8ArrayFromFssBlock.output',
    fn: () => {
        const v = fss.parseUint8ArrayFromFssBlock(new Uint8Array([2,5,1,2]), [{
            property: 'inUse',
            length: 1
        }, {
            property: 'value',
            length: 3
        }]);
        assertEquals(v, {
            inUse: new Uint8Array([2]),
            value: new Uint8Array([5,1,2])
        })
    }
});

Deno.test({
    name: 'fss.parseFssBlocktoUint8Array.output',
    fn: () => {
        assertEquals(fss.parseFssBlocktoUint8Array({
            inUse: new Uint8Array([1]),
            relation: new Uint8Array([4,1,2,5])
        }), new Uint8Array([1, 4, 1, 2, 5]));
    }
});

Deno.test({
    name: 'fss.parseFssBlocktoUint8Array.input.empty',
    fn: () => {
        assertEquals(fss.parseFssBlocktoUint8Array({}), new Uint8Array);
    }
});

