import * as util from './util.ts';

export interface fssBit {
    property: string,
    length: number
}

export type fssBlock = Array<fssBit>;

export type dataBit = Record<string,Uint8Array>;

export type dataBlock = Array<dataBit>;

export function parseUint8ArrayFromFssBlock(a: Uint8Array, fss: fssBlock): Record<string,Uint8Array> {
    if(a.length !== fss.reduce((a,v) => a += v.length, 0)) throw new RangeError;
    const sub = util.subsecUint8Array(a, fss.map(v => v.length));
    return Object.fromEntries(fss.map((v,i) => [v.property, sub[i]]));
}

export function parseFssBlocktoUint8Array(fss: Record<string,Uint8Array>) {
    return util.concactUint8Arrays(Object.values(fss))
}