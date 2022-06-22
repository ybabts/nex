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

Deno.test({
    name: 'fss.parseFssBlocktoUint8Array.isEqualToParseUint8ArrayFromFssBlock',
    fn: () => {
        const val = new Uint8Array([2,4,2,15,2]);
        const block = fss.parseUint8ArrayFromFssBlock(val, [{
            property: 'inUse',
            length: 1
        }, {
            property: 'nextRelation',
            length: 4
        }]);
        assertEquals(val, fss.parseFssBlocktoUint8Array(block));
    }
});

Deno.test({
    name: 'fss.readFileFromFssBlock.output',
    fn: () => {
        const val = new Uint8Array([1,4,2,0,1,4,5,2,3]);
        Deno.writeFileSync('ffsReadFileFromFssBlockTest', val);
        const file = Deno.openSync('ffsReadFileFromFssBlockTest');
        file.seekSync(0,Deno.SeekMode.Start);
        const result = fss.readFileFromFssBlock(file, [{
            property: 'inUse',
            length: 1
        }, {
            property: 'nextRelationID',
            length: 4
        }, {
            property: 'nextPropertyID',
            length: 4
        }]);
        assertEquals(result, {
            inUse: new Uint8Array([1]),
            nextRelationID: new Uint8Array([4, 2, 0, 1]),
            nextPropertyID: new Uint8Array([4, 5, 2, 3])
        });
        Deno.removeSync('ffsReadFileFromFssBlockTest');
        file.close();
    }
});

Deno.test({
    name: 'fss.readFileFromFssBlock.input.overflow',
    fn: () => {
        const val = new Uint8Array([1,4,2,0,1,4,5]);
        Deno.writeFileSync('ffsReadFileFromFssBlockTest', val);
        const file = Deno.openSync('ffsReadFileFromFssBlockTest');
        file.seekSync(0,Deno.SeekMode.Start);
        const result = fss.readFileFromFssBlock(file, [{
            property: 'inUse',
            length: 1
        }, {
            property: 'nextRelationID',
            length: 4
        }, {
            property: 'nextPropertyID',
            length: 4
        }]);
        assertEquals(result, {
            inUse: new Uint8Array([1]),
            nextRelationID: new Uint8Array([4, 2, 0, 1]),
            nextPropertyID: new Uint8Array([4, 5, 0, 0])
        });
        Deno.removeSync('ffsReadFileFromFssBlockTest');
        file.close();
    }
});