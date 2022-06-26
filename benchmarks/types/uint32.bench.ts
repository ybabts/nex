import Uint32 from '../../src/types/uint32.ts';

const random = {
    int: (Math.random() * 1000000) | 0,
    bigint: BigInt((Math.random() * 10000000) | 0),
    Uint8Array: new Uint8Array([(Math.random() * 255) | 0, (Math.random() * 255) | 0, (Math.random() * 255) | 0, (Math.random() * 255) | 0])
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
    name: 'Uint32.toUint8Array()',
    fn() {
        Uint32.toUint8Array(random.int)
    }
});

Deno.bench({
    name: 'Uint32 -> Uint8Array /w DataView',
    fn() {
        dataViews.Uint8Array.setUint32(0, random.int); 
        typedArrays.Uint8Array.slice(0, 4);
    }
});

Deno.bench({
    name: 'Uint32 -> Uint8Array /w Bit Shifting',
    fn() {
        new Uint8Array([
            (random.int & 0xff000000) >> 24,
            (random.int & 0x00ff0000) >> 16,
            (random.int & 0x0000ff00) >> 8,
            (random.int & 0x000000ff)
        ]);
    }
});

Deno.bench({
    name: 'Uint32.fromUint8Array()',
    fn() {
        Uint32.fromUint8Array(random.Uint8Array)
    }
});

Deno.bench({
    name: 'Uint8Array -> Uint32 /w DataView',
    fn() {
        typedArrays.Uint8Array.set(random.Uint8Array);
        dataViews.Uint8Array.getUint32(0);
    }
});

Deno.bench({
    name: 'Uint8Array -> Uint32 /w Uint32Array',
    fn() {
        new Uint32Array(random.Uint8Array.buffer, random.Uint8Array.byteOffset, random.Uint8Array.byteLength / 4)[0];
    }
});

Deno.bench({
    name: 'Uint8Array -> Uint32 /w Bit Shifting',
    fn() {
        ((random.Uint8Array[random.Uint8Array.length - 1]) | 
            (random.Uint8Array[random.Uint8Array.length - 2] << 8) | 
            (random.Uint8Array[random.Uint8Array.length - 3] << 16) | 
            (random.Uint8Array[random.Uint8Array.length - 4] << 24)) >>> 0;
    }
});