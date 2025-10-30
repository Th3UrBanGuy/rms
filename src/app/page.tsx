'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    averageOrderValue: 0,
    ordersServed: 0,
  });

  useEffect(() => {
    // Fetch active orders
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setActiveOrders(data.filter((order: any) => order.status !== 'COMPLETED')));

    // Fetch tables
    fetch('/api/tables')
      .then((res) => res.json())
      .then(setTables);

    // Fetch analytics
    fetch('/api/analytics')
      .then((res) => res.json())
      .then(setAnalytics);
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8fcf9] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <Navbar />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#0d1b12] tracking-light text-[32px] font-bold leading-tight">Dashboard</p>
              <p className="text-[#4c9a66] text-sm font-normal leading-normal">Overview of today's operations</p>
            </div>
          </div>

          <h3 className="text-[#0d1b12] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Active Orders</h3>
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
                  </tr>
                </thead>
                <tbody>
                  {activeOrders.map((order: any) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-[#0d1b12] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Table Status</h3>
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-lg border border-[#cfe7d7] bg-[#f8fcf9]">
              <table className="flex-1">
                <thead>
                  <tr className="bg-[#f8fcf9]">
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Table</th>
                    <th className="px-4 py-3 text-left text-[#0d1b12] w-60 text-sm font-medium leading-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((table: any) => (
                    <tr key={table.id} className="border-t border-t-[#cfe7d7]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#0d1b12] text-sm font-normal leading-normal">Table {table.number}</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#e7f3eb] text-[#0d1b12] text-sm font-medium leading-normal w-full">
                          <span className="truncate">{table.status}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-[#0d1b12] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Daily Sales Summary</h3>
          <div className="flex flex-wrap gap-4 p-4">
            <StatCard title="Total Sales" value={`$${analytics.totalSales.toFixed(2)}`} change="+10%" changeType="positive" />
            <StatCard title="Average Order Value" value={`$${analytics.averageOrderValue.toFixed(2)}`} change="-5%" changeType="negative" />
            <StatCard title="Orders Served" value={analytics.ordersServed.toString()} change="+15%" changeType="positive" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;