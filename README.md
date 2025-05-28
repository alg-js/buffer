# @alg/buffer

[![JSR](https://jsr.io/badges/@alg/buffer)](https://jsr.io/@alg/buffer)
[![License](https://img.shields.io/badge/Apache--2.0-green?label=license)](https://github.com/alg-js/buffer/blob/main/LICENSE)

A circular queue/buffer.

See [@alg/deque](https://jsr.io/@alg/deque) for a generic double ended queue.

## Install

```
deno add jsr:@alg/buffer
```

## Example

```javascript
import {Buffer} from "@alg/buffer";

const buff = Buffer.from(["A", "B"], {capacity: 16});

buff.push("C");
buff.pushAll(["X", "Y", "Z"]);

console.log(buff.length);  // 6
console.log(buff.capacity);  // 16

console.log(buff.pop());  // A
console.log(buff.popK(2));  // ["B", "C"]
console.log(buff.peek());  // X
console.log(buff.peekK(3));  // ["X", "Y", "Z"]
console.log([...buff]);  // ["X", "Y", "Z"]
```

Buffers can also act as double ended queues with the `push/pop` `back/front`
methods.

```javascript
import {Buffer} from "@alg/buffer";

const buff = new Buffer({capacity: 16});

buff.pushBack("A");
buff.pushAllBack(["B", "C"]);
buff.pushFront("X");
buff.pushAllFront(["Y", "Z"]);

console.log([...buff]);  // ["Z", "Y", "X", "A", "B", "C"]

console.log(buff.popBack());  // C
console.log(buff.popFront());  // Z
console.log(buff.popBackK(2));  // ["B", "A"]
console.log(buff.popFrontK(2));  // ["Y", "X"]
```
