import {useEffect, useState} from "react";

export const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
