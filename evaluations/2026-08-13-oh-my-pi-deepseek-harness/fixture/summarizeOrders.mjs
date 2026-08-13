export function summarizePaidOrders(orders) {
  const totalsByCustomer = new Map();

  for (const order of orders) {
    if (order.status !== 'paid') continue;
    const previous = totalsByCustomer.get(order.customer) ?? 0;
    totalsByCustomer.set(order.customer, previous + Math.round(order.amount));
  }

  return [...totalsByCustomer.entries()]
    .map(([customer, total]) => ({ customer, total }))
    .sort((left, right) => left.total - right.total);
}
