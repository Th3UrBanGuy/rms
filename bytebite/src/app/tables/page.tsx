import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import TableCard from '../components/TableCard';

const TableManagement = () => {
  const [tables, setTables] = useState([]);
  const [view, setView] = useState('Floor Plan'); // 'Floor Plan' or 'List View'

  useEffect(() => {
    fetch('/api/tables')
      .then((res) => res.json())
      .then(setTables);
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8fcf9] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <Navbar />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#0d1b12] tracking-light text-[32px] font-bold leading-tight">Table Status</p>
              <p className="text-[#4c9a66] text-sm font-normal leading-normal">Manage table occupancy and assign orders.</p>
            </div>
          </div>
          <div className="pb-3">
            <div className="flex border-b border-[#cfe7d7] px-4 gap-8">
              <a
                className={`flex flex-col items-center justify-center border-b-[3px] ${
                  view === 'Floor Plan' ? 'border-b-[#13ec5b] text-[#0d1b12]' : 'border-b-transparent text-[#4c9a66]'
                } pb-[13px] pt-4 cursor-pointer`}
                onClick={() => setView('Floor Plan')}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Floor Plan</p>
              </a>
              <a
                className={`flex flex-col items-center justify-center border-b-[3px] ${
                  view === 'List View' ? 'border-b-[#13ec5b] text-[#0d1b12]' : 'border-b-transparent text-[#4c9a66]'
                } pb-[13px] pt-4 cursor-pointer`}
                onClick={() => setView('List View')}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">List View</p>
              </a>
            </div>
          </div>
          {view === 'Floor Plan' ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {tables.map((table: any) => (
                <TableCard key={table.id} table={table} />
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TableManagement;