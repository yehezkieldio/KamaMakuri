import { customAlphabet } from "nanoid";

const alphabet = "0123456789";
const length = 14;

const nanoid = customAlphabet(alphabet, length);

export function generatePublicId() {
    return nanoid();
}
