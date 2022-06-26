import { endian, typedArrays, dataViews } from './mod.ts';

export default class Uint32 {
    static readonly BITS = 32;
    static readonly BYTES = Uint32.BITS / 8;
    static readonly MIN = 0;
    static readonly MAX = Math.pow(2,Uint32.BITS) - 1;
    private value: number;
    constructor(n: number) {
        if(!Uint32.is(n)) throw new RangeError;
        this.value = n;
    }
    [Symbol.for("Deno.customInspect")]() {
        return this.toString()
    }
    valueOf(): number {
        return this.value;
    }
    toString(): string {
        return `${this.value}`;
    }
    static is(n: number) {
        return n >= Uint32.MIN && Uint32.MAX >= n;
    }
    static toUint8Array(n: number, endian?: endian): Uint8Array {
        if(!Uint32.is(n)) throw new RangeError;
        dataViews.Uint8Array.setUint32(0, n, endian);
        return typedArrays.Uint8Array.slice(0, Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT);
    }
    toUint8Array(endian?: endian): Uint8Array {
        return Uint32.toUint8Array(this.valueOf(), endian);
    }
    static fromUint8Array(a: Uint8Array | Uint8ClampedArray, endian?: endian): number {
        if(a.length !== Uint32.BYTES / Uint8Array.BYTES_PER_ELEMENT) throw new RangeError;
        if(endian) return (
            (a[0]) |
            (a[1] << 8) |
            (a[2] << 16) |
            (a[3] << 24)) >>> 0;
        return (
            (a[3]) |
            (a[2] << 8) |
            (a[1] << 16) |
            (a[0] << 24)
        ) >>> 0;
    }
}