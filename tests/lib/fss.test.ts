import { assertEquals, fail } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import * as fss from '../../src/lib/fss.ts';

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
        const filename = 'ffsReadFileFromFssBlockTestOutput';
        const val = new Uint8Array([1,4,2,0,1,4,5,2,3]);
        Deno.writeFileSync(filename, val);
        const file = Deno.openSync(filename);
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
        Deno.removeSync(filename);
        file.close();
    }
});

Deno.test({
    name: 'fss.readFileFromFssBlock.input.overflow',
    fn: () => {
        const filename = 'ffsReadFileFromFssBlockTestInputOverflow';
        const val = new Uint8Array([1,4,2,0,1,4,5]);
        Deno.writeFileSync(filename, val);
        const file = Deno.openSync(filename);
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
        Deno.removeSync(filename);
        file.close();
    }
});

Deno.test({
    name: 'fss.writeFromFssBlock.output',
    fn: () => {
        const filename = 'fssWriteFromFssBlockTestOutput';
        Deno.writeFileSync(filename, new Uint8Array);
        const file = Deno.openSync(filename, {
            write: true,
            read: true
        });
        fss.writeFromFssBlock(file, {
            inUse: new Uint8Array([0]),
            nextRelationID: new Uint8Array([5,1,2,3]),
            nextPropertyID: new Uint8Array([0,2,52,7])
        });
        file.seekSync(0, Deno.SeekMode.Start);
        const data = new Uint8Array(9);
        file.readSync(data);
        assertEquals(data, new Uint8Array([0,5,1,2,3,0,2,52,7]));
        Deno.removeSync(filename);
        file.close();
    }
});

Deno.test({
    name: 'fss.writeFromFssBlock.output.sameAsReadFromFssBlock',
    fn: () => {
        const filename = 'fssWriteFromFssBlockTestOutput';
        Deno.writeFileSync(filename, new Uint8Array);
        const file = Deno.openSync(filename, {
            write: true,
            read: true
        });
        const fssBlock = {
            inUse: new Uint8Array([0]),
            nextRelationID: new Uint8Array([5,1,2,3]),
            nextPropertyID: new Uint8Array([0,2,52,7])
        };
        fss.writeFromFssBlock(file, fssBlock);
        file.seekSync(0, Deno.SeekMode.Start);
        assertEquals(fssBlock, fss.readFileFromFssBlock(file, [
            {
                property: 'inUse',
                length: 1
            },{
                property: 'nextRelationID',
                length: 4
            },{
                property: 'nextPropertyID',
                length: 4
            }
        ]));
        Deno.removeSync(filename);
        file.close();
    }
});