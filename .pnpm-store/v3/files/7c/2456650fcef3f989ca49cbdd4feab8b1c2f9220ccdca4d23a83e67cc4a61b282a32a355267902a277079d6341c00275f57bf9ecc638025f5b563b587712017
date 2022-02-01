export default function useDebouncedCallback<T extends unknown[]>(callback: (...args: T) => unknown, delay: number, options?: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
}): [(...args: T) => void, () => void, () => void];
