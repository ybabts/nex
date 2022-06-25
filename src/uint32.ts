export default class Uint32 {
    [Symbol.for("Deno.customInspect")]() { return this.toString() }
    private val;
    static readonly BITS = 32;
    static readonly BYTES = Uint32.BITS / 8;
    static readonly MIN = 0;
    static readonly MAX = Math.pow(2,Uint32.BITS) - 1;
    private static arr = new Uint32Array(1);
    private static view = new DataView(Uint32.arr.buffer);
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
        Uint32.view.setUint32(0, n);
        return new Uint8Array(Uint32.arr.buffer);
    }
    /** @description Converts using big endian */
    static fromUint8Array(a: Uint8Array | Uint8ClampedArray): Uint32 {
        if(a.length !== Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT) throw new RangeError;
        const view = new DataView(a.buffer);
        return new Uint32(view.getUint32(0))
    }
    /** @description Converts using big endian */
    toUint8Array() { return Uint32.toUint8Array(this.valueOf())}
}