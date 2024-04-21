import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const alphabet = "0123456789";
const length = 14;

const nanoid = customAlphabet(alphabet, length);

export function generatePublicId() {
    return nanoid();
}
