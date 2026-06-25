import React, { useState } from 'react';

export default function App() {
  const [task, setTask] = useState('');
  const [logs, setLogs] = useState([
    "System: Ready.",
    "Manager Agent: Waiting for new tasks..."
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeployTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    setIsProcessing(true);
    
    setLogs(prev => [...prev, `\n> Task received: "${task}"`]);
    setLogs(prev => [...prev, "> Manager Agent: Analyzing task requirements..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "> Manager Agent: Required skills identified -> [UI Design, React]"]);
      setLogs(prev => [...prev, "> Manager Agent: Broadcasting job to Specialist Agents..."]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-600">🤖 Agentra Marketplace</h1>
        <p className="text-gray-500 mt-2">Autonomous AI Freelancer Network</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Task Input Area */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Post a Job</h2>
          <form onSubmit={handleDeployTask}>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              placeholder="e.g., Build a landing page for my AI startup..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              disabled={isProcessing}
            ></textarea>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Estimated Budget: <span className="font-semibold text-green-600">0.01 ETH</span>
              </div>
              <button
                type="submit"
                disabled={isProcessing || !task}
                className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
                  isProcessing ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isProcessing ? 'Agents Working...' : 'Deploy Task 🚀'}
              </button>
            </div>
          </form>

          {/* Live Agent Bids Table */}
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
        </div>

        {/* Right Side: Live Terminal */}
        <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col h-[500px]">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-xs font-mono ml-2">agent-orchestration-terminal</span>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed text-green-400 space-y-2">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {log}
              </div>
            ))}
            {isProcessing && (
              <div className="animate-pulse text-green-600">_</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}