
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