import Uint64 from '../../src/types/uint64.ts';

const random = {
    int: (Math.random() * 1000000) | 0,
    bigint: BigInt((Math.random() * 1000000) | 0),
    Uint8Array: new Uint8Array([(Math.random() * 255) | 0, (Math.random() * 255) | 0, (Math.random() * 255) | 0, (Math.random() * 255) | 0,
        (Math.random() * 255) | 0, (Math.random() * 255) | 0, (Math.random() * 255) | 0, (Math.random() * 255) | 0])
}

const typedArrays = {
    Uint8Array: new Uint8Array(8),
    Uint32Array: new Uint32Array(4)
}

const dataViews = {
    Uint8Array: new DataView(typedArrays.Uint8Array.buffer),
    Uint32Array: new DataView(typedArrays.Uint32Array.buffer)
}

Deno.bench({
    name: 'Uint64.toUint8Array()',
    fn() {
        Uint64.toUint8Array(random.bigint)
    }
});

Deno.bench({
    name: 'Uint64 -> Uint8Array /w DataView',
    fn() {
        dataViews.Uint8Array.setBigUint64(0, random.bigint); 
        typedArrays.Uint8Array.slice(0, 8);
    }
});

Deno.bench({
    name: 'Uint64.fromUint8Array()',
    fn() {
        Uint64.fromUint8Array(random.Uint8Array)
    }
});

Deno.bench({
    name: 'Uint8Array -> Uint64 /w DataView',
    fn() {
        typedArrays.Uint8Array.set(random.Uint8Array);
        dataViews.Uint8Array.getBigUint64(0);
    }
});

Deno.bench({
    name: 'Uint8Array -> Uint64 /w Uint64Array',
    fn() {
        new BigUint64Array(random.Uint8Array.buffer, random.Uint8Array.byteOffset, random.Uint8Array.byteLength / 8)[0]
    }
});