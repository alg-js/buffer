import {assertEquals, assertThrows} from "@std/assert";
import {circularQueue} from "@alg/circular-queue";

export function putN(queue, n) {
    for (let i = 0; i < n; i++) {
        queue.push(i);
    }
}

export function popN(queue, n) {
    for (let i = 0; i < n; i++) {
        queue.pop();
    }
}

export function cyclePutGet(queue, initial, n) {
    assertEquals(queue.size(), initial);
    for (let i = 1; i <= n; i++) {
        queue.push(i);
        assertEquals(queue.size(), initial + i);
    }
    for (let i = n; i > 0; i--) {
        queue.pop();
        assertEquals(queue.size(), initial + i - 1);
    }
}

Deno.test({
    name: "Queues have a size",
    fn: () => {
        let queue = circularQueue(5);
        assertEquals(queue.size(), 0);
        cyclePutGet(queue, 0, 5);

        queue = circularQueue(5);
        cyclePutGet(queue, 0, 3);
        cyclePutGet(queue, 0, 5);
    },
});

Deno.test({
    name: "Items can be put in a queue",
    fn: () => {
        const queue = circularQueue(5);
        queue.push("a");
        assertEquals(queue.size(), 1);
        assertEquals(queue.peek(), "a");
    },
});

Deno.test({
    name: "Queues can be initialised with items",
    fn: () => {
        const q = circularQueue(5, ["a", "b", "c"]);
        q.push("X");
        assertEquals(q.size(), 4);
        assertEquals(q.pop(), "a");
        assertEquals([...q], ["b", "c", "X"]);
    },
});

Deno.test({
    name: "Items can be removed from a queue",
    fn: () => {
        const queue = circularQueue(5);
        queue.push("a");
        assertEquals(queue.pop(), "a");
        assertEquals(queue.size(), 0);
    },
});

Deno.test({
    name: "Multiple items can be added to a queue",
    fn: () => {
        let queue = circularQueue(5);
        queue.push("X");
        queue.pushAll(["a", "b", "c"]);
        queue.push("Y");
        assertEquals([...queue], ["X", "a", "b", "c", "Y"]);

        queue = circularQueue(10);
        putN(queue, 4);
        popN(queue, 4);
        queue.pushAll(["a", "b", "c"]);
        assertEquals([...queue], ["a", "b", "c"]);
        assertEquals(queue.size(), 3);
    },
});

Deno.test({
    name: "Queues have a capacity",
    fn: () => {
        assertEquals(circularQueue(5).capacity(), 5);
        assertEquals(circularQueue(4).capacity(), 4);
        assertEquals(circularQueue(3).capacity(), 3);
        assertEquals(circularQueue(2).capacity(), 2);
        assertEquals(circularQueue(1).capacity(), 1);
        assertEquals(circularQueue(0).capacity(), 0);
    },
});

Deno.test({
    name: "Queues error when over capacity",
    fn: () => {
        let queue = circularQueue(5);
        putN(queue, 5);
        assertThrows(() => queue.push(1));

        queue = circularQueue(0);
        assertThrows(() => queue.push(1));
    },
});

Deno.test({
    name: "Queues error when peeking or getting an empty queue",
    fn: () => {
        const queue = circularQueue(5);
        assertThrows(() => queue.pop());
        assertThrows(() => queue.peek());
    },
});

Deno.test({
    name: "Queues can be iterated",
    fn: () => {
        let queue = circularQueue(5);
        assertEquals([...queue], []);
        queue.push("a");
        assertEquals([...queue], ["a"]);
        queue.push("b");
        assertEquals([...queue], ["a", "b"]);
        popN(queue, 2);
        putN(queue, 4);
        assertEquals([...queue], [0, 1, 2, 3]);
        popN(queue, 4);
        putN(queue, 5);
        assertEquals([...queue], [0, 1, 2, 3, 4]);

        queue = circularQueue(4);
        queue.pushAll(["a", "b", "c", "d"]);
        assertEquals([...queue], ["a", "b", "c", "d"]);

        queue = circularQueue(10);
        assertEquals([...queue], []);
    },
});