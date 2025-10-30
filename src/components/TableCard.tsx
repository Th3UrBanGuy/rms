import React from 'react';

// Define the type for the props, which will be a single table
interface TableCardProps {
  table: {
    id: string;
    number: number;
    status: string;
  };
}

const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const getStatusColor = () => {
    switch (table.status) {
      case 'AVAILABLE':
        return 'bg-green-500';
      case 'OCCUPIED':
        return 'bg-red-500';
      case 'RESERVED':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-square ${getStatusColor()}`}
    >
      <p className="text-white text-base font-bold leading-tight w-4/5 line-clamp-2">Table {table.number}</p>
      <p className="text-white text-sm font-medium leading-normal">{table.status}</p>
    </div>
  );
};

export default TableCard;