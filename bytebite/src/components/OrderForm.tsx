import React, { useState, useEffect } from 'react';

const OrderForm = ({ onOrderCreated }: { onOrderCreated: () => void }) => {
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/tables').then(res => res.json()).then(data => setTables(data.filter((table: any) => table.status === 'AVAILABLE')));
    fetch('/api/menu').then(res => res.json()).then(setMenuItems);
  }, []);

  const handleAddItem = () => {
    if (!selectedMenuItem) return;
    const item = menuItems.find((mi: any) => mi.id === selectedMenuItem);
    if (!item) return;

    // Check if item is already in the order
    const existingItemIndex = orderItems.findIndex(oi => oi.menuItemId === selectedMenuItem);
    if (existingItemIndex > -1) {
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[existingItemIndex].quantity += quantity;
      setOrderItems(updatedOrderItems);
    } else {
      setOrderItems([...orderItems, { menuItemId: selectedMenuItem, name: (item as any).name, quantity, price: (item as any).price }]);
    }
  };

  const totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = totalAmount * 0.07;
  const total = totalAmount + tax;

  const handleCreateOrder = async () => {
    if (!selectedTable || orderItems.length === 0) return;

    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableId: selectedTable,
        items: orderItems.map(({ menuItemId, quantity }) => ({ menuItemId, quantity })),
        totalAmount: total,
      }),
    });

    onOrderCreated();
    setSelectedTable('');
    setOrderItems([]);
  };

  return (
    <div className="layout-content-container flex flex-col w-80">
      <h2 className="text-[#0d1b12] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">New Order</h2>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d1b12] focus:outline-0 focus:ring-0 border border-[#cfe7d7] bg-[#f8fcf9] focus:border-[#cfe7d7] h-14 bg-[image:var(--select-button-svg)] placeholder:text-[#4c9a66] p-[15px] text-base font-normal leading-normal"
          >
            <option value="">Select Table</option>
            {tables.length > 0 ? (
              tables.map((table: any) => (
                <option key={table.id} value={table.id}>Table {table.number}</option>
              ))
            ) : (
              <option value="" disabled>No tables available</option>
            )}
          </select>
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <select
            value={selectedMenuItem}
            onChange={(e) => setSelectedMenuItem(e.target.value)}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d1b12] focus:outline-0 focus:ring-0 border border-[#cfe7d7] bg-[#f8fcf9] focus:border-[#cfe7d7] h-14 bg-[image:var(--select-button-svg)] placeholder:text-[#4c9a66] p-[15px] text-base font-normal leading-normal"
          >
            <option value="">Select Menu Item</option>
            {menuItems.map((item: any) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex px-4 py-3">
        <button
          onClick={handleAddItem}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#e7f3eb] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Add Item</span>
        </button>
      </div>
      <h2 className="text-[#0d1b12] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Order Summary</h2>
      {orderItems.map((item, index) => (
        <div key={index} className="flex items-center gap-4 bg-[#f8fcf9] px-4 min-h-[72px] py-2 justify-between">
          <div className="flex flex-col justify-center">
            <p className="text-[#0d1b12] text-base font-medium leading-normal line-clamp-1">{item.name}</p>
            <p className="text-[#4c9a66] text-sm font-normal leading-normal line-clamp-2">Quantity: {item.quantity}</p>
          </div>
          <div className="shrink-0"><p className="text-[#0d1b12] text-base font-normal leading-normal">${(item.price * item.quantity).toFixed(2)}</p></div>
        </div>
      ))}
       <div className="flex items-center gap-4 bg-[#f8fcf9] px-4 min-h-14 justify-between">
              <p className="text-[#0d1b12] text-base font-normal leading-normal flex-1 truncate">Subtotal</p>
              <div className="shrink-0"><p className="text-[#0d1b12] text-base font-normal leading-normal">${totalAmount.toFixed(2)}</p></div>
            </div>
            <div className="flex items-center gap-4 bg-[#f8fcf9] px-4 min-h-14 justify-between">
              <p className="text-[#0d1b12] text-base font-normal leading-normal flex-1 truncate">Tax (7%)</p>
              <div className="shrink-0"><p className="text-[#0d1b12] text-base font-normal leading-normal">${tax.toFixed(2)}</p></div>
            </div>
            <div className="flex items-center gap-4 bg-[#f8fcf9] px-4 min-h-14 justify-between">
              <p className="text-[#0d1b12] text-base font-normal leading-normal flex-1 truncate">Total</p>
              <div className="shrink-0"><p className="text-[#0d1b12] text-base font-normal leading-normal">${total.toFixed(2)}</p></div>
            </div>
      <div className="flex px-4 py-3">
        <button
          onClick={handleCreateOrder}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Create Order</span>
        </button>
      </div>
    </div>
  );
};

export default OrderForm;