"use client";

import { ChangeEventHandler, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Input } from "@/components//ui/input";

import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";

interface IProps {
    route: string;
    placeholder?: string;
}

const SearchInput = ({ route, placeholder }: IProps) => {
    const router = useRouter();

    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        if (debouncedValue) {
            router.push(`${route}/?query=${debouncedValue}`);
        } else {
            router.push(`${route}`);
        }
    }, [debouncedValue, router, route]);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e?.target?.value);
    };

    return (
        <div className="relative flex items-center">
            <Image src="/assets/img/search.svg" alt="search" width={25} height={25} className="absolute pl-2" />
            <Input
                placeholder={placeholder ?? "Search..."}
                className="bg-dark-2 text-light-2 pl-10"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default SearchInput;
