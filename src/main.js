/* @ts-self-types="./main.d.ts" */

export class Buffer {
    #buffer;
    #capacity;
    #front;
    #back;
    #size;

    constructor(capacity) {
        this.#capacity = capacity;
        this.#buffer = Array(capacity).fill(null);
        this.#front = 0;
        this.#back = 0;
        this.#size = 0;
    }

    static from(capacity, initial) {
        const buffer = new Buffer(capacity);
        buffer.pushAll(initial);
        return buffer;
    }

    get length() {
        return this.#size;
    }

    get capacity() {
        return this.#capacity;
    }

    at(index) {
        if (index < -this.length || index >= this.length) {
            return undefined;
        } else if (index < 0) {
            index = mod(this.#back + index, this.capacity);
            return this.#buffer[index];
        } else {
            index = mod(this.#front + index, this.capacity);
            return this.#buffer[index];
        }
    }

    push(item) {
        if (this.#size === this.#capacity) {
            throw new Error("called `.push` on full queue");
        } else {
            this.#buffer[this.#back] = item;
            this.#back = (this.#back + 1) % this.#capacity;
            this.#size += 1;
        }
    }

    pushBack(item) {
        this.push(item);
    }

    pushFront(item) {
        if (this.#size === this.#capacity) {
            throw new Error("called `.pushFront` on full queue");
        } else {
            this.#front = mod(this.#front - 1, this.#capacity);
            this.#buffer[this.#front] = item;
            this.#size += 1;
        }
    }

    pushAll(items) {
        for (const item of items) {
            this.push(item);
        }
    }

    pushAllBack(items) {
        this.pushAll(items);
    }

    pushAllFront(items) {
        for (const item of items) {
            this.pushFront(item);
        }
    }

    peek() {
        if (this.#size === 0) {
            throw new Error("called `.peek` on empty queue");
        } else {
            return this.#buffer[this.#front];
        }
    }

    peekK(k) {
        if (this.#size < k) {
            throw new Error(
                "called `.peekK` on buffer with fewer than k items",
            );
        } else {
            const result = [];
            for (let i = 0; i < k; i++) {
                result.push(this.at(i));
            }
            return result;
        }
    }

    peekFront() {
        return this.peek();
    }

    peekFrontK(k) {
        return this.peekK(k);
    }

    peekBack() {
        if (this.#size === 0) {
            throw new Error("called `.peekBack` on empty queue");
        } else {
            const back = mod(this.#back - 1, this.#capacity);
            return this.#buffer[back];
        }
    }

    peekBackK(k) {
        if (this.#size < k) {
            throw new Error(
                "called `.peekK` on buffer with fewer than k items",
            );
        } else {
            const result = [];
            for (let i = 0; i < k; i++) {
                result.push(this.at(-i - 1));
            }
            return result;
        }
    }

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

    popK(k) {
        if (this.#size < k) {
            throw new Error("called `.popK` on buffer with fewer than k items");
        } else {
            const result = [];
            for (let i = 0; i < k; i++) {
                result.push(this.pop());
            }
            return result;
        }
    }

    popFront() {
        return this.pop();
    }

    popFrontK(k) {
        return this.popK(k);
    }

    popBack() {
        if (this.#size === 0) {
            throw new Error("called `.popBack` on empty queue");
        } else {
            this.#back = mod(this.#back - 1, this.#capacity);
            const value = this.#buffer[this.#back];
            this.#buffer[this.#back] = null;
            this.#size -= 1;
            return value;
        }
    }

    popBackK(k) {
        if (this.#size < k) {
            throw new Error(
                "called `.popBackK` on buffer with fewer than k items",
            );
        } else {
            const result = [];
            for (let i = 0; i < k; i++) {
                result.push(this.popBack());
            }
            return result;
        }
    }

    * values({reversed = false} = {}) {
        if (reversed) {
            for (let i = 0; i < this.length; i++) {
                yield this.at(-i - 1);
            }
        } else {
            yield* this[Symbol.iterator]();
        }
    }

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


function mod(a, b) {
    return ((a % b) + b) % b;
}
