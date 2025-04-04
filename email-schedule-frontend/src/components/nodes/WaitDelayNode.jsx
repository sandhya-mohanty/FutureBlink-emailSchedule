import React from 'react';
import { Handle, Position } from 'reactflow';

const WaitDelayNode = ({ data, selected }) =>{ 

  const handleValueChange=(e)=>{
     const value = parseInt(e.target.value,10);
     if(value >0 ){
      data.updateNodeData(data.id,{value})
      console.log(`Updated waitDelay value for node ${data.id}:`, value);

     }
  };
  const handleUnitChange=(e)=>{
    data.updateNodeData(data.id,{unit:e.target.value});
    console.log(`Updated waitDelay unit for node ${data.id}:`, e.target.value);

  };
  
  return(
  <div className={`bg-purple-100 p-4 rounded-md border ${selected ? 'border-purple-500 shadow-md' : 'border-purple-300'} w-64 relative`}>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-purple-500" />
    
    <div className="font-bold text-purple-700 mb-2 flex justify-between items-center">
      <span>Wait/Delay</span>
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
    <div className="flex items-center gap-2">
      <input
        type="number"
        className="w-16 border border-gray-300 p-1 text-sm rounded"
        min="1"
        max="99"
        value={data.value || 1}
        onChange={handleValueChange}
      />
      <select
        className="border border-gray-300 p-1 text-sm rounded"
        value={data.unit || 'Days'}
        onChange={handleUnitChange}
      >
        <option value="Minutes">Minutes</option>
        <option value="Hours">Hours</option>
        <option value="Days">Days</option>
        <option value="Weeks">Weeks</option>
      </select>
    </div>
    
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-purple-500" />
  </div>
);
}

export default WaitDelayNode;
