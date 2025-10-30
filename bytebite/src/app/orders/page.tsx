'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import OrderForm from '../../components/OrderForm';
import OrderDetailsModal from '../../components/OrderDetailsModal';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = () => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then(setOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order: any) => {
    if (activeTab === 'Active') {
      return order.status !== 'COMPLETED';
    }
    return order.status === 'COMPLETED';
  });

  const tabs = ['Active', 'Completed'];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8fcf9] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <Navbar />
      <div className="gap-1 px-6 flex flex-1 justify-center py-5">
        <OrderForm onOrderCreated={fetchOrders} />
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#0d1b12] tracking-light text-[32px] font-bold leading-tight min-w-72">Orders</p>
          </div>
          <div className="pb-3">
            <div className="flex border-b border-[#cfe7d7] px-4 gap-8">
              {tabs.map((tab) => (
                <a
                  key={tab}
                  className={`flex flex-col items-center justify-center border-b-[3px] ${
                    activeTab === tab ? 'border-b-[#13ec5b] text-[#0d1b12]' : 'border-b-transparent text-[#4c9a66]'
                  } pb-[13px] pt-4 cursor-pointer`}
                  onClick={() => setActiveTab(tab)}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-lg border border-[#cfe7d7] bg-[#f8fcf9]">
              <table className="flex-1">
                <thead>
                  <tr className="bg-[#f8fcf9]">
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Order ID</th>
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Table</th>
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Items</th>
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Total</th>
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-60 text-sm font-medium leading-normal">Status</th>
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-60 text-[#4c9a66] text-sm font-medium leading-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order: any) => (
                    <tr key={order.id} className="border-t border-t-[#cfe7d7]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#0d1b12] text-sm font-normal leading-normal">#{order.id.slice(0, 5)}</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#4c9a66] text-sm font-normal leading-normal">Table {order.table.number}</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#4c9a66] text-sm font-normal leading-normal">{order.items.length}</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#4c9a66] text-sm font-normal leading-normal">${order.totalAmount.toFixed(2)}</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#e7f3eb] text-[#0d1b12] text-sm font-medium leading-normal w-full">
                          <span className="truncate">{order.status}</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-60 text-[#4c9a66] text-sm font-bold leading-normal tracking-[0.015em]">
                        <button onClick={() => setSelectedOrder(order)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default OrderManagement;