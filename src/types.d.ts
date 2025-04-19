/**
 * Every day I pray for <https://tc39.es/proposal-type-annotations/>
 */

/**
 * Creates a queue with the given capacity and values
 *
 * @template T
 * @param {number} capacity
 * @param {Iterable<T> | null} initial
 * @returns {CircularQueue<T>}
 */
export function circularQueue<T>(
  capacity: number,
  initial?: Iterable<T> | null,
): CircularQueue<T>;

/**
 * A circular queue/buffer.
 *
 * Does not hold references to objects once they are removed from the queue.
 *
 * @template T
 */
export class CircularQueue<T> {
  /**
   * Creates a queue with the given capacity
   * @param {number} capacity
   * @param {Iterable<T> | null} initial
   */
  constructor(capacity: number, initial: Iterable<T> | null);
  /**
   * Returns the size of the queue
   * @returns {number}
   */
  size(): number;
  /**
   * Returns the capacity of the queue
   * @returns {number}
   */
  capacity(): number;
  /**
   * Adds an item to the queue
   * @param {T} item
   * @throws {Error} if the queue is full
   */
  push(item: T): void;
  /**
   * Puts all items in the queue in order
   * @param {Iterable<T>} items
   */
  pushAll(items: Iterable<T>): void;
  /**
   * Returns the item at the front of the queue
   * @returns {T} item
   * @throws {Error} if the queue is empty
   */
  peek(): T;
  /**
   * Returns and removes the item at the front of the queue
   * @returns {T} item
   * @throws {Error} is the queue is empty
   */
  pop(): T;
  /**
   * Iterator for the queue. Behaviour is not defined if the queue is
   * modified while iterating.
   * @returns {Generator<T, void, *>}
   */
  [Symbol.iterator](): Generator<T, void, void>;
}
