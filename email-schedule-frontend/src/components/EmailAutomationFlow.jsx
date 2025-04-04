import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import components
import ColdEmailNode from './nodes/ColdEmailNode';
import WaitDelayNode from './nodes/WaitDelayNode';
import LeadSourceNode from './nodes/LeadSourceNode';
import Sidebar from './Sidebar';
import Header from './Header';
import { calculateSchedule } from '../utils/calculateSchedule';
import { authService } from '../services/authService';
import { emailService } from '../services/emailService';
import AuthPage from '../pages/AuthPage';

// Node types registration object
const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};

const EmailAutomationFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedTime, setSavedTime] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const nodeId = useRef(0);

  // Check authentication on component mount
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const getNewNodeId = () => {
    nodeId.current += 1;
    return `node_${nodeId.current}`;
  };

  const onConnect = useCallback(
    (params) => {
      // Check if connection already exists
      const connectionExists = edges.some(
        edge => edge.source === params.source && edge.target === params.target
      );
      
      if (connectionExists) {
        return;
      }
      
      setEdges((eds) => addEdge({
        ...params,
        id: `e${params.source}-${params.target}`,
        animated: params.sourceHandle === 'conditional',
        style: { 
          stroke: '#555',
          strokeWidth: 2,
        },
        markerEnd: { 
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#555',
        },
      }, eds));
    },
    [setEdges, edges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const updateNodeData = useCallback((id, data) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onDeleteNode = useCallback(
    (id) => {
      // Remove the node
      setNodes((nds) => nds.filter((node) => node.id !== id));
      
      // Remove any connected edges
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== id && edge.target !== id
      ));
    },
    [setNodes, setEdges]
  );

  const onDeleteEdge = useCallback(
    (id) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== id));
      setSelectedEdge(null);
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
  
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
  
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
  
      const id = getNewNodeId();
      let newNode = {
        id,
        type,
        position,
        data: { 
          id,
          label: type, 
          updateNodeData,
          onDelete: onDeleteNode,
        },
      };
  
      if (type === 'coldEmail') {
        newNode.data = {
          ...newNode.data,
          toEmail: '',
          subject: '',
          content: '',
        };
      } else if (type === 'waitDelay') {
        newNode.data = {
          ...newNode.data,
          value: 1,
          unit: 'Days', 
        };
      } else if (type === 'leadSource') {
        newNode.data = {
          ...newNode.data,
          source: '',
        };
      }
  
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, updateNodeData, onDeleteNode]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Validate all required fields are filled
  const validateFlow = useCallback(() => {
    if (nodes.length === 0) {
      return "No nodes to save. Please add at least one node.";
    }

    // Check for required fields in each node type
    for (const node of nodes) {
      if (node.type === 'coldEmail') {
        if (!node.data.toEmail || !node.data.subject || !node.data.content) {
          return `Cold Email node is missing required fields. Please fill in all fields.`;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(node.data.toEmail)) {
          return `Invalid email address in Cold Email node.`;
        }
      }
    
    }
    
    // Check if there are any connections
    if (edges.length === 0 && nodes.length > 1) {
      return "Nodes are not connected. Please connect your nodes to create a flow.";
    }
    
    return null;
  }, [nodes, edges]);

  const clearAllFields = useCallback(() => {
    // Store current positions for new nodes
    const nodePositions = {};
    nodes.forEach(node => {
      nodePositions[node.id] = {...node.position};
    });
    
    // Create new nodes with cleared fields but same positions
    const clearedNodes = nodes.map(node => {
      const position = nodePositions[node.id];
      const id = node.id;
      
      let newData = { 
        id,
        label: node.type, 
        updateNodeData,
        onDelete: onDeleteNode,
      };
      
      if (node.type === 'coldEmail') {
        newData = {
          ...newData,
          toEmail: '',
          subject: '',
          content: '',
        };
      } else if (node.type === 'waitDelay') {
        newData = {
          ...newData,
          value: 1,
          unit: 'Days', // Updated to match backend enum
        };
      } else if (node.type === 'leadSource') {
        newData = {
          ...newData,
          source: '',
        };
      }
      
      return {
        ...node,
        data: newData,
        position
      };
    });
    
    setNodes(clearedNodes);
  }, [nodes, setNodes, updateNodeData, onDeleteNode]);

  const onSaveFlow = useCallback(async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setValidationError("Please login to save your flow");
      setTimeout(() => setValidationError(null), 5000);
      return;
    }
      
    // Validate all required fields
    const error = validateFlow();
      
    if (error) {
      setValidationError(error);
      setTimeout(() => setValidationError(null), 5000);
      return;
    }
      
    const now = new Date();
    setSavedTime(now);
      
    // Create schedule based on the flow
    const schedule = calculateSchedule(nodes, edges, now);
      
    // Save the current flow data
    const flowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: { ...node.data }
      })),
      edges,
      schedule,
      savedAt: now.toISOString()
    };
      
    try {
      // Schedule each email in the flow
      for (const item of schedule) {
        if (item.type === 'email') {
          // Find connected nodes
          let leadSourceNode = null;
          let waitDelayNode = null;
            
          // Check for connected waitDelay and leadSource nodes
          edges.forEach(edge => {
            if (edge.target === item.nodeId) {
              const sourceNode = nodes.find(n => n.id === edge.source);
              if (sourceNode) {
                if (sourceNode.type === 'leadSource') {
                  leadSourceNode = sourceNode;
                } else if (sourceNode.type === 'waitDelay') {
                  waitDelayNode = sourceNode;
                }
              }
            }
          });
            
          const leadSource = (leadSourceNode?.data?.source && leadSourceNode.data.source !== "") 
  ? leadSourceNode.data.source 
  : null;

// Extract waitDelay if it exists with valid value and unit
const waitDelay = (waitDelayNode?.data?.value && waitDelayNode?.data?.unit && waitDelayNode.data.unit !== "")
  ? {
      value: Number(waitDelayNode.data.value),
      unit: String(waitDelayNode.data.unit)
    }
  : null;
             
          // Schedule email with optional parameters
          await emailService.scheduleEmail(
            item.to,
            item.subject,
            item.content,
            leadSource,
            waitDelay
          );
        }
      }
        
      // Set saved data
      setSavedData(flowData);
        
      // Show success message
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
        
      // Clear all fields after successful save
      clearAllFields();
    } catch (error) {
      setValidationError(error.message || "Failed to save flow");
      setTimeout(() => setValidationError(null), 5000);
    }
  }, [nodes, edges, validateFlow, clearAllFields, isAuthenticated]);

  // If not authenticated, show auth page
  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="h-screen flex flex-col" tabIndex={0}>
      <Header 
        onSaveFlow={onSaveFlow} 
        isSaved={isSaved} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          savedTime={savedTime}
          nodes={nodes}
          edges={edges}
          savedData={savedData}
        />
        
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          {validationError && (
            <div className="absolute top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-md">
              <strong>Error:</strong> {validationError}
            </div>
          )}
          
          {isSaved && (
            <div className="absolute top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow-md">
              Flow saved successfully! Emails have been scheduled.
            </div>
          )}
          
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            deleteKeyCode={null} // Disable default delete to handle in our custom handler
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            connectionLineStyle={{ stroke: '#555', strokeWidth: 2 }}
            connectionLineType="smoothstep"
          >
            <Controls />
            <MiniMap 
              nodeStrokeColor={(n) => {
                if (n.type === 'coldEmail') return '#3b82f6';
                if (n.type === 'waitDelay') return '#8b5cf6';
                if (n.type === 'leadSource') return '#10b981';
                return '#555';
              }}
              nodeColor={(n) => {
                if (n.type === 'coldEmail') return '#dbeafe';
                if (n.type === 'waitDelay') return '#ede9fe';
                if (n.type === 'leadSource') return '#d1fae5';
                return '#fff';
              }}
            />
            <Background gap={12} size={1} />
            
            <Panel position="top-right">
              <div className="bg-white p-3 rounded shadow-md">
                <div className="text-sm mb-1 font-medium">Connection Tips:</div>
                <div className="text-xs text-gray-600">
                  Drag from the bottom handle of one node to the top handle of another to connect them
                </div>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default EmailAutomationFlow;
