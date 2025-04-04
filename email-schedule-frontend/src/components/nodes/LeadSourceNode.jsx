import React from 'react';
import { Handle, Position } from 'reactflow';

const LeadSourceNode = ({ data, selected }) => (
  <div className={`bg-green-100 p-4 rounded-md border ${selected ? 'border-green-500 shadow-md' : 'border-green-300'} w-64 relative`}>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-500" />

    <div className="font-bold text-green-700 mb-2 flex justify-between items-center">
      <span>Lead Source</span>
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
    <select
      className="w-full border border-gray-300 p-1 text-sm rounded"
      value={data.source || ''}
      onChange={(e) => data.updateNodeData(data.id, { source: e.target.value })}
    >
      <option value="">Select a source</option>
      <option value="website">Website</option>
      <option value="linkedin">LinkedIn</option>
      <option value="referral">Referrals</option>  {/* Changed from "referral" to "referrals" */}
      <option value="other">Others</option>        {/* Changed from "other" to "others" */}
    </select>
    
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
  </div>
);

export default LeadSourceNode;