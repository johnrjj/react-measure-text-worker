class LruCache<K, V> {
  constructor(private maxEntries = 10, private values = new Map<K, V>()) {}

  public get(key: K): V | undefined {
    const hasKey = this.values.has(key);
    let entry: V | undefined;
    if (hasKey) {
      // peek the entry, re-insert for LRU strategy
      entry = this.values.get(key) as V;
      this.values.delete(key);
      this.values.set(key, entry);
      return entry;
    }
    return entry;
  }

  public put(key: K, value: V) {
    if (this.values.size >= this.maxEntries) {
      // least-recently used cache eviction strategy
      const keyToDelete = this.values.keys().next().value;
      this.values.delete(keyToDelete);
    }
    this.values.set(key, value);
  }
}

export { LruCache };
