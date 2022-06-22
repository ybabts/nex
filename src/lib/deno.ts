
// not fully testable
export async function ensurePermission(p: Deno.PermissionDescriptor, state_override?: string) {
    const perm = await Deno.permissions.query(p);
    if((state_override || perm.state) === 'prompt') await Deno.permissions.request(p);
    if((state_override || perm.state) === 'denied') throw new Error(`ensure Deno permission denied: ${p}`)
    if((state_override || perm.state) === 'granted') return true;
    throw new Error('unknown error occurred');
}