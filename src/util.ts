
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

// Big Endian
export function convertUint64toUint8Array(n: bigint): Uint8Array {
    if(n < 0n || n > 18446744073709551615n) throw new RangeError;
    return new Uint8Array([
        Number((n & 0xff00000000000000n) >> 64n),
        Number((n & 0x00ff000000000000n) >> 48n),
        Number((n & 0x0000ff0000000000n) >> 40n),
        Number((n & 0x000000ff00000000n) >> 32n),
        Number((n & 0x00000000ff000000n) >> 24n),
        Number((n & 0x0000000000ff0000n) >> 16n),
        Number((n & 0x000000000000ff00n) >> 8n),
        Number((n & 0x00000000000000ffn))
    ]);
}

export function convertUint8ArraytoUint64(a: Uint8Array): bigint {
    if(a.length !== 8) throw new RangeError;
    return ((BigInt(a[a.length - 1])) | 
        (BigInt(a[a.length - 2]) << 8n) | 
        (BigInt(a[a.length - 3]) << 16n) | 
        (BigInt(a[a.length - 4]) << 24n) | 
        (BigInt(a[a.length - 5]) << 32n) | 
        (BigInt(a[a.length - 6]) << 40n) | 
        (BigInt(a[a.length - 7]) << 48n) | 
        (BigInt(a[a.length - 8]) << 64n)) >> BigInt(0);
}

export function convertUint64toSafeNumbers(n: bigint): Array<number> {
    if(n < 0n || n > 18446744073709551615n) throw new RangeError;
    const v = Array(Math.ceil(Number(n / 9007199254740991n))).fill(Number.MAX_SAFE_INTEGER);
    v.push(Number(n % BigInt(Number.MAX_SAFE_INTEGER - 1)));
    return v;
}

export function convertSafeNumberstoUint64(a: Array<number>): bigint {
    const v = a.reduce((a,c) => a += BigInt(c), 0n);
    if(v < 0 || v > 18446744073709551615n) throw new RangeError;
    return v;
}

export function convertSafeNumberstoUint32(a: Array<number>): number {
    const v = a.reduce((a,c) => a += c, 0);
    if(v < 0 || v > 4294967295) throw new RangeError;
    return v;
}
