import { useState } from "react";

export type Disclosure = {
    open: boolean;
    opOpenChange: (value: boolean) => void;
};

export default function useDisclosure() {
    const [open, setOpen] = useState<boolean>(false);

    function opOpenChange(value: boolean) {
        setOpen(value);
    }

    return { open, opOpenChange };
}
