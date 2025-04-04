
import React from 'react';

const Sidebar = ({
  savedTime,
  nodes,
  edges,
  savedData
}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
      <h2 className="font-bold mb-4">Available Nodes</h2>
      <div className="space-y-3">
        <div
          className="bg-blue-100 p-3 rounded cursor-move border border-blue-300 hover:bg-blue-200 transition"
          onDragStart={(e) => onDragStart(e, 'coldEmail')}
          draggable
        >
          Cold Email
        </div>
        <div
          className="bg-purple-100 p-3 rounded cursor-move border border-purple-300 hover:bg-purple-200 transition"
          onDragStart={(e) => onDragStart(e, 'waitDelay')}
          draggable
        >
          Wait/Delay
        </div>
        <div
          className="bg-green-100 p-3 rounded cursor-move border border-green-300 hover:bg-green-200 transition"
          onDragStart={(e) => onDragStart(e, 'leadSource')}
          draggable
        >
          Lead Source (Optional)
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <p className="font-medium text-yellow-800">Note:</p>
        <p className="text-yellow-700 mt-1">Lead Source and Wait/Delay nodes are now optional. Emails can be scheduled without them.</p>
      </div>
      
      {savedTime && (
        <div className="mt-6 border-t pt-4">
          <h2 className="font-bold mb-2">Flow Information</h2>
          <div className="text-sm">
            <p><span className="font-medium">Last saved:</span> {savedTime.toLocaleString()}</p>
            <p><span className="font-medium">Current node count:</span> {nodes.length}</p>
            <p><span className="font-medium">Current connection count:</span> {edges.length}</p>
          </div>
        </div>
      )}

      {savedData && (
        <div className="mt-6 border-t pt-4">
          <h2 className="font-bold mb-2 text-green-700">Saved Flow</h2>
          <div className="text-sm bg-white p-2 rounded border border-green-200">
            <p><span className="font-medium">Saved at:</span> {new Date(savedData.savedAt).toLocaleString()}</p>
            <p><span className="font-medium">Nodes:</span> {savedData.nodes.length}</p>
            <p><span className="font-medium">Connections:</span> {savedData.edges.length}</p>
            <p><span className="font-medium">Scheduled emails:</span> {
              savedData.schedule.filter(item => item.type === 'email').length
            }</p>
            
            {savedData.schedule.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Schedule Details:</p>
                <ul className="list-disc pl-4 mt-1 max-h-40 overflow-y-auto">
                  {savedData.schedule.map((item, idx) => (
                    <li key={idx} className="mb-1 text-xs">
                      {item.type === 'email' ? (
                        <>
                          <span className="block font-medium">Cold Email</span>
                          <span className="block">Subject: {item.subject || 'No subject'}</span>
                          <span className="block">To: {item.to || 'No recipient'}</span>
                          <span className="block">At: {new Date(item.scheduledTime).toLocaleString()}</span>
                          {item.leadSource && (
                            <span className="block">Lead Source: {item.leadSource}</span>
                          )}
                          {item.waitDelay && (
                            <span className="block">Wait Delay: {item.waitDelay.value} {item.waitDelay.unit}</span>
                          )}
                        </>
                      ) : item.type === 'waitDelay' ? (
                        <>
                          <span className="block font-medium">Wait/Delay</span>
                          <span className="block">Duration: {item.delay}</span>
                          <span className="block">Until: {new Date(item.scheduledTime).toLocaleString()}</span>
                        </>
                      ) : item.type === 'leadSource' ? (
                        <>
                          <span className="block font-medium">Lead Source</span>
                          <span className="block">Source: {item.source || 'Unknown'}</span>
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;