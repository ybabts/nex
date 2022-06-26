import { endian, typedArrays, dataViews } from './mod.ts';

export default class Uint64 {
    static readonly BITS = 64;
    static readonly BYTES = Uint64.BITS / 8;
    static readonly MIN = 0;
    static readonly MAX = 18446744073709551615n;
    private value: bigint;
    constructor(n: bigint) {
        if(!Uint64.is(n)) throw new RangeError;
        this.value = n;
    }
    [Symbol.for("Deno.customInspect")]() {
        return this.toString()
    }
    valueOf(): bigint {
        return this.value;
    }
    toString(): string {
        return `${this.value}`;
    }
    static is(n: bigint) {
        return n >= Uint64.MIN && Uint64.MAX >= n;
    }
    static toUint8Array(n: bigint, endian?: endian): Uint8Array {
        if(!Uint64.is(n)) throw new RangeError;
        dataViews.Uint8Array.setBigUint64(0, n, endian);
        return typedArrays.Uint8Array.slice(0, Uint64.BYTES / Uint8Array.BYTES_PER_ELEMENT);
    }
    toUint8Array(endian?: endian): Uint8Array {
        return Uint64.toUint8Array(this.valueOf(), endian);
    }
    static fromUint8Array(a: Uint8Array | Uint8ClampedArray, endian?: endian): bigint {
        if(a.length !== Uint64.BYTES / Uint8Array.BYTES_PER_ELEMENT) throw new RangeError;
        typedArrays.Uint8Array.set(a);
        return dataViews.Uint8Array.getBigUint64(0, endian)
    }
}