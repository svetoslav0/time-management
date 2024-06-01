export default function buildQueryString(
    params: Record<string, string | boolean | number>
): string {
    const query = new URLSearchParams();
    Object.keys(params).forEach((key) => {
        const value = params[key];
        if (typeof value === 'boolean') {
            query.append(key, value ? 'true' : 'false');
        } else if (typeof value === 'number') {
            query.append(key, value.toString());
        } else {
            query.append(key, value);
        }
    });
    return query.toString();
}