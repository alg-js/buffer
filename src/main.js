/* @ts-self-types="./types.d.ts" */

/**
 * Creates a queue with the given capacity and values
 *
 * @template T
 * @param {number} capacity
 * @param {Iterable<T> | null} initial
 * @returns {CircularQueue<T>}
 */
export function circularQueue(capacity, initial = null) {
    return new CircularQueue(capacity, initial)
}


/**
 * A circular queue/buffer.
 *
 * Does not hold references to objects once they are removed from the queue.
 *
 * @template T
 */
export class CircularQueue {
    /** @type {?T[]} */
    #buffer;
    /** @type {number} */
    #capacity;
    /** @type {number} */
    #front;
    /** @type {number} */
    #back;
    /** @type {number} */
    #size;

    /**
     * Creates a queue with the given capacity and values
     *
     * @param {number} capacity
     * @param {Iterable<T> | null} initial
     */
    constructor(capacity, initial = null) {
        this.#capacity = capacity;
        this.#buffer = Array(capacity).fill(null);
        this.#front = 0;
        this.#back = 0;
        this.#size = 0;
        if (initial !== null) {
            this.pushAll(initial)
        }
    }

    /**
     * Returns the size of the queue
     * @returns {number}
     */
    size() {
        return this.#size;
    }

    /**
     * Returns the capacity of the queue
     * @returns {number}
     */
    capacity() {
        return this.#capacity;
    }

    /**
     * Adds an item to the queue
     * @param {T} item
     * @throws {Error} if the queue is full
     */
    push(item) {
        if (this.#size === this.#capacity) {
            throw new Error("called `.push` on full queue");
        } else {
            this.#buffer[this.#back] = item;
            this.#back = (this.#back + 1) % this.#capacity;
            this.#size += 1;
        }
    }

    /**
     * Puts all items in the queue in order
     * @param {Iterable<T>} items
     * @throws {Error} if the queue does not have capacity
     */
    pushAll(items) {
        for (const item of items) {
            this.push(item);
        }
    }

    /**
     * Returns the item at the front of the queue
     * @returns {T} item
     * @throws {Error} if the queue is empty
     */
    peek() {
        if (this.#size === 0) {
            throw new Error("called `.peek` on empty queue");
        } else {
            return this.#buffer[this.#front];
        }
    }

    /**
     * Returns and removes the item at the front of the queue
     * @returns {T} item
     * @throws {Error} is the queue is empty
     */
    pop() {
        if (this.#size === 0) {
            throw new Error("called `.pop` on empty queue");
        } else {
            const value = this.#buffer[this.#front];
            this.#buffer[this.#front] = null;
            this.#front = (this.#front + 1) % this.#capacity;
            this.#size -= 1;
            return value;
        }
    }

    /**
     * Iterator for the queue. Behaviour is not defined if the queue is
     * modified while iterating.
     * @returns {Generator<T, void, void>}
     */
    * [Symbol.iterator]() {
        if (this.#size !== 0) {
            yield this.#buffer[this.#front];
            for (
                let i = (this.#front + 1) % this.#capacity;
                i !== this.#back;
                i = (i + 1) % this.#capacity
            ) {
                yield this.#buffer[i];
            }
        }
    }
}
