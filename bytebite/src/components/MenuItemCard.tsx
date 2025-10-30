import React from 'react';

// Define the type for the props, which will be a single menu item
interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    category: string;
  };
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggleAvailable: (id: string, isAvailable: boolean) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onEdit, onDelete, onToggleAvailable }) => {
  return (
    <tr className="border-t border-t-[#cfe7d7]">
      <td className="h-[72px] px-4 py-2 w-[400px] text-[#0d1b12] text-sm font-normal leading-normal">
        {item.name}
      </td>
      <td className="h-[72px] px-4 py-2 w-[400px] text-[#4c9a66] text-sm font-normal leading-normal">
        {item.description}
      </td>
      <td className="h-[72px] px-4 py-2 w-[400px] text-[#4c9a66] text-sm font-normal leading-normal">
        ${item.price.toFixed(2)}
      </td>
      <td className="h-[72px] px-4 py-2 w-[120px] text-center text-sm font-normal leading-normal">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-[#cfe7d7] border-2 bg-transparent text-[#13ec5b] checked:bg-[#13ec5b] checked:border-[#13ec5b] checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-[#cfe7d7] focus:outline-none"
          checked={item.isAvailable}
          onChange={(e) => onToggleAvailable(item.id, e.target.checked)}
        />
      </td>
      <td className="h-[72px] px-4 py-2 w-60 text-[#4c9a66] text-sm font-bold leading-normal tracking-[0.015em]">
        <button onClick={() => onEdit(item)} className="mr-2">Edit</button>
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default MenuItemCard;