'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import MenuItemCard from '../../components/MenuItemCard';
import MenuForm from '../../components/MenuForm';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeTab, setActiveTab] = useState('Starters');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchMenuItems = () => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then(setMenuItems);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleSave = async (item: any) => {
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/menu/${(editingItem as any).id}` : '/api/menu';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    fetchMenuItems();
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    fetchMenuItems();
  };

  const handleToggleAvailable = async (id: string, isAvailable: boolean) => {
    await fetch(`/api/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable }),
    });
    fetchMenuItems();
  };

  const filteredItems = menuItems.filter((item: any) => item.category === activeTab);
  const tabs = ['Starters', 'Main Courses', 'Desserts', 'Drinks'];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8fcf9] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <Navbar />
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#0d1b12] tracking-light text-[32px] font-bold leading-tight">Menu Management</p>
            <p className="text-[#4c9a66] text-sm font-normal leading-normal">Add, edit, and manage your restaurant's menu items.</p>
          </div>
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
        <h3 className="text-[#0d1b12] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{activeTab}</h3>
        <div className="px-4 py-3 @container">
          <div className="flex overflow-hidden rounded-lg border border-[#cfe7d7] bg-[#f8fcf9]">
            <table className="flex-1">
              <thead>
                <tr className="bg-[#f8fcf9]">
                  <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Dish</th>
                  <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Description</th>
                  <th className="px-4 py-3 text-left text-[#0d1b12] w-[400px] text-sm font-medium leading-normal">Price</th>
                  <th className="px-4 py-3 text-left text-[#0d1b12] w-[120px] text-sm font-medium leading-normal">Availability</th>
                  <th className="px-4 py-3 text-left text-[#0d1b12] w-60 text-[#4c9a66] text-sm font-medium leading-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item: any) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onEdit={() => { setEditingItem(item); setIsFormOpen(true); }}
                    onDelete={handleDelete}
                    onToggleAvailable={handleToggleAvailable}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#13ec5b] text-[#0d1b12] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Add New Dish</span>
          </button>
        </div>
        {isFormOpen && <MenuForm item={editingItem} onSave={handleSave} onCancel={() => { setIsFormOpen(false); setEditingItem(null); }} />}
      </div>
    </div>
  );
};

export default MenuManagement;