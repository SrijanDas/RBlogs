import { IAxiosError } from "@/types/custom";
import axios from "axios";

export default function handleError(error: unknown) {
    let msg = "";
    if (axios.isAxiosError(error)) {
        const err = error as IAxiosError;
        msg = err.response?.data?.msg ?? "An error occurred. Please try again.";
    } else {
        msg = "An error occurred. Please try again.";
    }

    return msg;
}
