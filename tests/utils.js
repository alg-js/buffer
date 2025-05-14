import {assertEquals} from "jsr:@std/assert@1";

/**
 *
 * @param n
 * @returns {StringIterator<string>}
 */
export function alph(n) {
    return "abcdefghijklmnopqrstuvwxyz".slice(0, n)[Symbol.iterator]();
}


export function assertIterEquals(iter1, iter2) {
    assertEquals([...iter1], [...iter2]);
}
