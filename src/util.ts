
// Big Endian
export function convertUint32toUint8Array(n: number): Uint8Array {
    if(n < 0 || n > 4294967295) throw new RangeError;
    return new Uint8Array([
        (n & 0xff000000) >> 24,
        (n & 0x00ff0000) >> 16,
        (n & 0x0000ff00) >> 8,
        (n & 0x000000ff)
    ]);
}

export function convertUint8ArraytoUint32(a: Uint8Array) {
    if(a.length !== 4) throw new RangeError;
    return ((a[a.length - 1]) | 
        (a[a.length - 2] << 8) | 
        (a[a.length - 3] << 16) | 
        (a[a.length - 4] << 24)) >>> 0;
}

export function concactUint8Arrays(a: Array<Uint8Array>): Uint8Array {
    const arr: number[] = [];
    return new Uint8Array(a.reduce((a,c) => {
        a.push(...c);
        return a;
    }, arr))
}

export function subsecUint8Array(a: Uint8Array, l: Array<number>): Array<Uint8Array> {
    if(a.length === 0 || l.length === 0) throw new RangeError;
    if(a.length !== l.reduce((a,c) => a += c, 0)) throw new RangeError;
    return l.map((v, i,) => {
        const p = l.slice(0,i).reduce((a,c) => a += c, 0);
        return a.slice(p, p + v)
    })
}