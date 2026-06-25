import React from 'react';

export default function BidsTable({ isProcessing }) {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-bold mb-4 text-gray-700 flex justify-between items-center">
        Live Agent Bids
        {isProcessing && <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full animate-pulse">Bids Incoming...</span>}
      </h3>
      
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 font-medium">Specialist Agent</th>
              <th className="p-3 font-medium">Reputation (ERC-8004)</th>
              <th className="p-3 font-medium">Bid Amount</th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className={`transition-all ${isProcessing ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}>
              <td className="p-3 font-semibold flex items-center gap-2">
                <span className="text-xl">🎨</span> UI Agent
              </td>
              <td className="p-3"><span className="text-green-600 font-bold">820</span> / 1000</td>
              <td className="p-3 font-mono">0.008 ETH</td>
              <td className="p-3">
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">Winner</span>
              </td>
            </tr>
            <tr className={`transition-all ${isProcessing ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}>
              <td className="p-3 font-semibold flex items-center gap-2">
                <span className="text-xl">✍️</span> Content Agent
              </td>
              <td className="p-3"><span className="text-yellow-600 font-bold">650</span> / 1000</td>
              <td className="p-3 font-mono">0.009 ETH</td>
              <td className="p-3">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Rejected</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {isProcessing && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2">
          <span className="animate-spin text-lg">⚙️</span>
          <strong>Escrow Action:</strong> Locking 0.008 ETH in smart contract for UI Agent...
        </div>
      )}
    </div>
  );
}