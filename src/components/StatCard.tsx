import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType }) => {
  const changeColor = changeType === 'positive' ? 'text-[#078829]' : 'text-[#e72a08]';

  return (
    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cfe7d7]">
      <p className="text-[#0d1b12] text-base font-medium leading-normal">{title}</p>
      <p className="text-[#0d1b12] tracking-light text-2xl font-bold leading-tight">{value}</p>
      <p className={`text-base font-medium leading-normal ${changeColor}`}>{change}</p>
    </div>
  );
};

export default StatCard;