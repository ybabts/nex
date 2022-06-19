import * as util from './util.ts';

export interface fileSystemStructureBlock {
    property: string,
    length: number
}

export function parseUint8ArrayFromFssBlock(a: Uint8Array, fss: Array<fileSystemStructureBlock>): Record<string,Uint8Array> {
    if(a.length !== fss.reduce((a,v) => a += v.length, 0)) throw new RangeError;
    const sub = util.subsecUint8Array(a, fss.map(v => v.length));
    return Object.fromEntries(fss.map((v,i) => [v.property, sub[i]]));
}

export function parseFssBlocktoUint8Array(fss: Record<string,Uint8Array>) {
    return util.concactUint8Arrays(Object.values(fss))
}