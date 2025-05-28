/* Copyright 2025 James Finnie-Ansley
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A circular buffer/buffer.
 *
 * Does not hold references to objects once they are removed from the buffer.
 *
 * @template T
 */
export class Buffer<T> {
  /** The number of items in the buffer */
  readonly length: number;

  /** The capacity of the buffer */
  readonly capacity: number;

  /**
   * Creates a buffer with the given capacity
   *
   * @param {Object} options
   * @param {number} options.capacity
   */
  constructor(options: {capacity: number});

  /**
   * Creates a buffer with the given capacity, populated with the given items.
   *
   * @param {Iterable<T>} initial
   * @param {Object} options
   * @param {number} options.capacity
   * @returns {Buffer<T>}
   */
  static from<T>(initial: Iterable<T>, options: {capacity: number}): Buffer<T>;

  /**
   * Returns the item at the given index.
   *
   * @param index
   */
  at(index: number): T | undefined;

  /**
   * Adds an item to the back of the buffer.
   *
   * @param {T} item
   * @throws {Error} if the buffer is full
   */
  push(item: T): void;

  /**
   * Adds an item to the back of the buffer. An alias for `Buffer.push`.
   *
   * @param {T} item
   * @throws {Error} if the buffer is full
   */
  pushBack(item: T): void;

  /**
   * Adds an item to the front of the buffer.
   *
   * @param {T} item
   * @throws {Error} if the buffer is full
   */
  pushFront(item: T): void;

  /**
   * Puts all items at the back of the buffer.
   *
   * @param {Iterable<T>} items
   * @throws {Error} if the buffer is full
   */
  pushAll(items: Iterable<T>): void;

  /**
   * Puts all items at the back of the buffer. An alias for `Buffer.pushAll`.
   *
   * @param {Iterable<T>} items
   * @throws {Error} if the buffer is full
   */
  pushAllBack(items: Iterable<T>): void;

  /**
   * Puts all items at the front of the buffer.
   *
   * @param {Iterable<T>} items
   * @throws {Error} if the buffer is full
   */
  pushAllFront(items: Iterable<T>): void;

  /**
   * Returns the item at the front of the buffer.
   *
   * @returns {T} item
   * @throws {Error} if the buffer is empty
   */
  peek(): T;

  /**
   * Returns the item at the front of the buffer.
   *
   * @returns {T} item
   * @throws {Error} if the buffer is empty
   */
  peekFront(): T;

  /**
   * Returns the item at the back of the buffer.
   *
   * @returns {T}
   * @throws {Error} if the buffer is empty
   */
  peekBack(): T;

  /**
   * Returns the k items at the front of the buffer
   *
   * @param {number} k
   * @returns {T[]}
   * @throws {Error} if the buffer has fewer than k items
   */
  peekK(k: number): T[];

  /**
   * Returns the k items at the front of the buffer.
   * An alias for `Buffer.peekK`.
   *
   * @param {number} k
   * @returns {T[]}
   * @throws {Error} if the buffer has fewer than k items
   */
  peekFrontK(k: number): T[];

  /**
   * Returns the k items at the back of the buffer.
   *
   * @param {number} k
   * @returns {T[]}
   * @throws {Error} if the buffer has fewer than k items
   */
  peekBackK(k: number): T[];

  /**
   * Returns and removes the item at the front of the buffer.
   * 
   * @returns {T} item
   * @throws {Error} is the buffer is empty
   */
  pop(): T;

  /**
   * Returns and removes the item at the front of the buffer.
   *
   * @returns {T} item
   * @throws {Error} is the buffer is empty
   */
  popFront(): T;

  /**
   * Returns and removes the item at the back of the buffer.
   *
   * @returns {T} item
   * @throws {Error} is the buffer is empty
   */
  popBack(): T;

  /**
   * Returns and removes k items at the front of the buffer.
   *
   * @returns {T} item
   * @throws {Error} is the buffer is empty
   */
  popK(k: number): T[];

  /**
   * Returns and removes k items at the front of the buffer.
   * An alias for `Buffer.popK`
   *
   * @param {number} k
   * @returns {T[]} item
   * @throws {Error} is the buffer has fewer than k items
   */
  popFrontK(k: number): T[];

  /**
   * Returns and removes k items at the back of the buffer.
   *
   * @param {number} k
   * @returns {T[]} item
   * @throws {Error} is the buffer has fewer than k items
   */
  popBackK(k: number): T[];

  /**
   * Yields the values of this buffer.
   *
   * @param {Object} options
   * @param {boolean} options.reversed Whether to yield values in reversed order
   */
  values(options?: {reversed?: boolean}): Iterator<T>;

  /**
   * Iterator for the buffer. Behaviour is not defined if the buffer is
   * modified while iterating.
   *
   * @returns {Iterator<T>}
   */
  [Symbol.iterator](): Iterator<T>;
}
