import {assertEquals, assertThrows} from "jsr:@std/assert@1";
import {Buffer} from "../src/main.js";
import {range} from "jsr:@alg/range";
import {alph, assertIterEquals} from "./utils.js";


Deno.test({
    name: "Buffers have a size",
    fn: () => {
        const q = new Buffer(5);
        range(5).forEach((e, i) => {
            assertEquals(q.length, i);
            q.push(e);
            assertEquals(q.length, i + 1);
        });
    },
});

Deno.test({
    name: "Items can be put in a buffer",
    fn: () => {
        const q = new Buffer(5);
        q.push("a");
        q.pushBack("b");
        q.pushFront("c");
        assertEquals(q.length, 3);
        assertIterEquals(q, ["c", "a", "b"]);
    },
});

Deno.test({
    name: "Buffers can be initialised with items",
    fn: () => {
        const q = Buffer.from(5, alph(3));
        q.push("X");
        assertEquals(q.length, 4);
        assertEquals(q.pop(), "a");
        assertIterEquals(q, ["b", "c", "X"]);
    },
});

Deno.test({
    name: "Buffers can be indexed",
    fn: () => {
        const buff = Buffer.from(10, alph(5));
        const alpha = [...alph(5)];
        for (let i = 0; i < 5; i++) {
            assertEquals(buff.at(i), alpha[i]);
            assertEquals(buff.at(-5 + i), alpha[i]);
        }
        assertEquals(buff.at(-6), undefined);
        assertEquals(buff.at(5), undefined);
    },
});

Deno.test({
    name: "Items can be removed from a buffer",
    fn: () => {
        const buffer = new Buffer(5);
        buffer.push("a");
        assertEquals(buffer.pop(), "a");
        assertEquals(buffer.length, 0);
    },
});

Deno.test({
    name: "Multiple items can be removed from a buffer",
    fn: () => {
        const buffer1 = Buffer.from(5, alph(5));
        assertIterEquals(buffer1.popK(5), alph(5));
        assertEquals(buffer1.length, 0);
        const buffer2 = Buffer.from(5, alph(5));
        assertIterEquals(buffer2.popFrontK(5), alph(5));
        assertEquals(buffer2.length, 0);
        const buffer3 = Buffer.from(5, alph(5));
        assertIterEquals(buffer3.popBackK(5), [...alph(5)].toReversed());
        assertEquals(buffer3.length, 0);
    },
});

Deno.test({
    name: "Multiple items can be peeked from a buffer",
    fn: () => {
        const buffer1 = Buffer.from(5, alph(5));
        assertIterEquals(buffer1.peekK(5), alph(5));
        assertIterEquals(buffer1, alph(5));

        const buffer2 = Buffer.from(5, alph(5));
        assertIterEquals(buffer2.peekFrontK(5), alph(5));
        assertIterEquals(buffer2, alph(5));

        const buffer3 = Buffer.from(5, alph(5));
        assertIterEquals(buffer3.peekBackK(5), [...alph(5)].toReversed());
        assertIterEquals(buffer3, alph(5));
    },
});

Deno.test({
    name: "Multiple items can be added to a buffer",
    fn: () => {
        let buffer = new Buffer(5);
        buffer.push("X");
        buffer.pushAll(alph(3));
        buffer.push("Y");
        assertIterEquals(buffer, ["X", "a", "b", "c", "Y"]);

        buffer = new Buffer(10);
        buffer.pushAll(range(8));
        range(8).forEach(() => buffer.pop());
        buffer.pushAll(alph(3));
        assertIterEquals(buffer, alph(3));
        assertEquals(buffer.length, 3);

        buffer = new Buffer(5);
        buffer.push("X");
        buffer.pushAllBack(alph(3));
        buffer.push("Y");
        assertIterEquals(buffer, ["X", "a", "b", "c", "Y"]);

        buffer = new Buffer(10);
        buffer.pushAllBack(range(8));
        range(8).forEach(() => buffer.pop());
        buffer.pushAll(alph(3));
        assertIterEquals(buffer, alph(3));
        assertEquals(buffer.length, 3);
    },
});

Deno.test({
    name: "Multiple items can be added to the front of a buffer",
    fn: () => {
        let buffer = new Buffer(5);
        buffer.pushFront("X");
        buffer.pushAllFront(alph(3));
        buffer.pushFront("Y");
        assertIterEquals(buffer, ["Y", "c", "b", "a", "X"]);

        buffer = new Buffer(10);
        buffer.pushAll(range(8));
        range(8).forEach(() => buffer.pop());
        buffer.pushAllFront(alph(3));
        assertIterEquals(buffer, ["c", "b", "a"]);
        assertEquals(buffer.length, 3);
    },
});

Deno.test({
    name: "Items can be popped from the back of a buffer",
    fn: () => {
        const buffer = new Buffer(5);
        buffer.pushAll(alph(5));
        assertEquals(
            range(5).map(() => buffer.popBack()),
            ["e", "d", "c", "b", "a"],
        );
        assertEquals(buffer.length, 0);
    },
});

Deno.test({
    name: "Items can be peeked from a buffer",
    fn: () => {
        const buffer = new Buffer(5);
        buffer.pushAll(alph(5));
        assertEquals(
            range(5).map(() => buffer.popBack()),
            ["e", "d", "c", "b", "a"],
        );
        assertEquals(buffer.length, 0);
    },
});

Deno.test({
    name: "Buffers have a capacity",
    fn: () => range(5).forEach(
        (i) => assertEquals(new Buffer(i).capacity, i),
    ),
});

Deno.test({
    name: "Buffers error when over capacity",
    fn: () => {
        assertThrows(() => new Buffer(0).push(1));
        const buffer = new Buffer(5);
        buffer.pushAll(range(5));
        assertThrows(() => buffer.push(1));
        assertThrows(() => buffer.pushBack(1));
        assertThrows(() => buffer.pushFront(1));
    },
});

Deno.test({
    name: "Buffers error when peeking or getting an empty buffer",
    fn: () => {
        const buffer = new Buffer(5);
        assertThrows(() => buffer.pop());
        assertThrows(() => buffer.popFront());
        assertThrows(() => buffer.popBack());
        assertThrows(() => buffer.peek());
        assertThrows(() => buffer.peekFront());
        assertThrows(() => buffer.peekBack());
    },
});

Deno.test({
    name: "Buffers error when peeking more items than are in the buffer",
    fn: () => {
        const buffer = Buffer.from(5, alph(5));
        assertThrows(() => buffer.popK(6));
        assertThrows(() => buffer.popFrontK(6));
        assertThrows(() => buffer.popBackK(6));
        assertThrows(() => buffer.peekK(6));
        assertThrows(() => buffer.peekFrontK(6));
        assertThrows(() => buffer.peekBackK(6));
    },
});

Deno.test({
    name: "Buffers can be peeked",
    fn: () => {
        const buffer = new Buffer(10);
        buffer.pushAll(alph(3));
        assertEquals(buffer.peek(), "a");
        assertEquals(buffer.peekFront(), "a");
        assertEquals(buffer.peekBack(), "c");
    },
});

Deno.test({
    name: "Buffers can be iterated",
    fn: () => assertIterEquals(Buffer.from(5, alph(3)), ["a", "b", "c"]),
});

Deno.test({
    name: "Buffers have values",
    fn: () => {
        const values = ["Z", "Y", "X", "A", "B", "C"];
        const q = Buffer.from(6, values);
        assertEquals([...q.values()], values);
        assertEquals([...q.values({reversed: true})], values.toReversed());
        const large = new Buffer(16);
        const arr = [];
        for (let i = 0; i < 16; i++) {
            large.push(i);
            arr.push(i);
            large.pop();
            arr.shift();
            large.push(i * 2);
            arr.push(i * 2);
        }
        assertEquals([...large.values()], arr);
        assertEquals([...large.values({reversed: true})], arr.toReversed());
    }
});
