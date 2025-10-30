import React from 'react';

interface OrderDetailsModalProps {
  order: any;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p><strong>Order ID:</strong> #{order.id.slice(0, 5)}</p>
        <p><strong>Table:</strong> {order.table.number}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
        <h3 className="text-xl font-bold mt-4">Items</h3>
        <ul>
          {order.items.map((item: any) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.menuItem.name} x {item.quantity}</span>
              <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;