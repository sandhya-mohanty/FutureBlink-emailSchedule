import React from 'react';
import { Handle, Position } from 'reactflow';

const ColdEmailNode = ({ data, selected }) => (
  <div className={`bg-blue-100 p-4 rounded-md border ${selected ? 'border-blue-500 shadow-md' : 'border-blue-300'} w-64 relative`}>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
    
    <div className="font-bold text-blue-700 mb-2 flex justify-between items-center">
      <span>Cold Email</span>
      <button 
        className="text-red-500 hover:text-red-700 text-sm font-bold"
        onClick={(e) => {
          e.stopPropagation();
          data.onDelete(data.id);
        }}
      >
        ×
      </button>
    </div>
    <div className="bg-white p-2 rounded mb-2">
      <div className="text-sm font-medium text-gray-700">To Email:</div>
      <input
        type="email"
        className="w-full border border-gray-300 p-1 text-sm rounded"
        placeholder="recipient@example.com"
        value={data.toEmail || ''}
        onChange={(e) => data.updateNodeData(data.id, { toEmail: e.target.value })}
      />
    </div>
    <div className="bg-white p-2 rounded mb-2">
      <div className="text-sm font-medium text-gray-700">Subject:</div>
      <input
        type="text"
        className="w-full border border-gray-300 p-1 text-sm rounded"
        placeholder="Enter email subject"
        value={data.subject || ''}
        onChange={(e) => data.updateNodeData(data.id, { subject: e.target.value })}
      />
    </div>
    <div className="bg-white p-2 rounded">
      <div className="text-sm font-medium text-gray-700">Content:</div>
      <textarea
        className="w-full border border-gray-300 p-1 text-sm rounded h-20"
        placeholder="Enter email content"
        value={data.content || ''}
        onChange={(e) => data.updateNodeData(data.id, { content: e.target.value })}
      />
    </div>
    
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
  </div>
);

export default ColdEmailNode;