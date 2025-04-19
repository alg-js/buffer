# @alg/circular-queue

[![JSR](https://jsr.io/badges/@alg/circular-queue)](https://jsr.io/@alg/circular-queue)
[![API](https://img.shields.io/badge/API-blue?logo=readme&logoColor=white)](https://jsr.io/@alg/circular-queue/doc)
[![License](https://img.shields.io/badge/MIT-green?label=license)](https://github.com/alg/circular-queue/blob/main/LICENSE)

A circular queue/buffer.

## Install

```
deno add jsr:@alg/circular-queue
```

## Example

```javascript
import {circularQueue} from "@alg/queues";

const q = circularQueue(16, ["A", "B"]);
q.push("C");
q.pushAll(["X", "Y", "Z"]);
console.log(q.size());  // 6
console.log(q.capacity());  // 16
console.log(q.pop());  // "A"
console.log(q.peek());  // "B"
console.log([...q]);  // ["B", "C", "X", "Y", "Z"]
```
