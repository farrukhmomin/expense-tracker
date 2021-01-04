export function getKeyValues<T>(obj: T, key: keyof T): any {
    return (obj[key] || '').toString();
}