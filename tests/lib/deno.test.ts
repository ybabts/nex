import { assertEquals, fail } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import * as deno from '../../src/lib/deno.ts';

Deno.test({
    name: 'deno.ensurePermssions.permission.denied',
    fn: async () => {
        if(await deno.ensurePermission({name: 'read'}, 'denied').catch((e) => {
            assertEquals(e instanceof Error, true);
        })) fail();
    }
});

Deno.test({
    name: 'deno.ensurePermssions.permission.granted',
    fn: async () => {
        await deno.ensurePermission({name: 'read'}, 'granted').catch((e) => {
            fail(e)
        }).then(v => assertEquals(v, true));
    }
});
