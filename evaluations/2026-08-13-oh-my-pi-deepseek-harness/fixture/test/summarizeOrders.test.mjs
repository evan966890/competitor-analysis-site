import assert from 'node:assert/strict';
import test from 'node:test';
import { summarizePaidOrders } from '../summarizeOrders.mjs';

test('sums only paid orders without per-line rounding', () => {
  const actual = summarizePaidOrders([
    { customer: 'Ada', amount: 10.49, status: 'paid' },
    { customer: 'Ada', amount: 10.49, status: 'paid' },
    { customer: 'Bob', amount: 99.99, status: 'refunded' },
  ]);

  assert.deepEqual(actual, [{ customer: 'Ada', total: 20.98 }]);
});

test('sorts by total descending and breaks ties by customer name', () => {
  const actual = summarizePaidOrders([
    { customer: 'Zoe', amount: 20, status: 'paid' },
    { customer: 'Ada', amount: 20, status: 'paid' },
    { customer: 'Bob', amount: 30, status: 'paid' },
  ]);

  assert.deepEqual(actual, [
    { customer: 'Bob', total: 30 },
    { customer: 'Ada', total: 20 },
    { customer: 'Zoe', total: 20 },
  ]);
});
