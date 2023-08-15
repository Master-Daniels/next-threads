import { useEffect, useState } from "react";

export function useDebounce<Value>(value: Value, delay?: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay ?? 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debouncedValue;
}
