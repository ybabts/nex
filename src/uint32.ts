export default class Uint32 {
    [Symbol.for("Deno.customInspect")]() { return this.toString() }
    private val;
    static readonly BITS = 32;
    static readonly BYTES = Uint32.BITS / 8;
    static readonly MIN = 0;
    static readonly MAX = Math.pow(2,Uint32.BITS) - 1;
    constructor(n: number) {
        if(!Uint32.isUint32(n)) throw new RangeError;
        this.val = n;
    }
    valueOf(): number { return this.val; }
    toString(): string { return `${this.valueOf()}`; }
    static isUint32(n: number): boolean {
        return Uint32.MIN <= n && n <= Uint32.MAX;
    }
    /** @description Converts using big endian */
    static toUint8Array(n: number): Uint8Array {
        if(!Uint32.isUint32(n)) throw new RangeError;
        return new Uint8Array([
            (n & 0xff000000) >> 24,
            (n & 0x00ff0000) >> 16,
            (n & 0x0000ff00) >> 8,
            (n & 0x000000ff)
        ]);
    }
    /** @description Converts using big endian */
    static fromUint8Array(a: Uint8Array | Uint8ClampedArray): Uint32 {
        if(a.length !== Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT) throw new RangeError;
        const v = ((a[a.length - 1]) | 
            (a[a.length - 2] << 8) | 
            (a[a.length - 3] << 16) | 
            (a[a.length - 4] << 24)) >>> 0;
        return new Uint32(v);
    }
    /** @description Converts using big endian */
    toUint8Array() { return Uint32.toUint8Array(this.valueOf())}
}