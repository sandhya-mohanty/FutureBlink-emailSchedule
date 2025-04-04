
export const calculateSchedule = (nodes, edges, startTime = new Date()) => {
  const schedule = [];
  const processedNodes = new Set();
  
  // Helper to find nodes with no incoming edges (starting nodes)
  const findStartNodes = () => {
    const nodesWithIncoming = new Set(edges.map(e => e.target));
    return nodes.filter(node => !nodesWithIncoming.has(node.id));
  };
  
  // Helper to find all nodes connected to a given node
  const findNextNodes = (nodeId) => {
    return edges
      .filter(edge => edge.source === nodeId)
      .map(edge => nodes.find(node => node.id === edge.target))
      .filter(Boolean);
  };
  
  // Process a node and its connections recursively
  const processNode = (node, currentTime) => {
    if (!node || processedNodes.has(node.id)) return;
    
    processedNodes.add(node.id);
    let nextTime = new Date(currentTime);
    
    if (node.type === 'coldEmail') {
      schedule.push({
        type: 'email',
        nodeId: node.id,
        to: node.data.toEmail,
        subject: node.data.subject,
        content: node.data.content,
        scheduledTime: nextTime.toISOString(),
      });
    } else if (node.type === 'waitDelay') {
      const { value, unit } = node.data;
      let milliseconds = 0;
      
      switch(unit) {
        case 'Minutes':
          milliseconds = value * 60 * 1000;
          break;
        case 'Hours':
          milliseconds = value * 60 * 60 * 1000;
          break;
        case 'Days':
          milliseconds = value * 24 * 60 * 60 * 1000;
          break;
        case 'Weeks':
          milliseconds = value * 7 * 24 * 60 * 60 * 1000;
          break;
        default:
          milliseconds = 0;
      }
      
      nextTime = new Date(nextTime.getTime() + milliseconds);
      
      schedule.push({
        type: 'waitDelay',
        nodeId: node.id,
        delay: `${value} ${unit}`,
        scheduledTime: nextTime.toISOString(),
      });
    } else if (node.type === 'leadSource') {
      schedule.push({
        type: 'leadSource',
        nodeId: node.id,
        source: node.data.source,
        scheduledTime: nextTime.toISOString(),
      });
    }
    
    // Find and process next nodes
    const nextNodes = findNextNodes(node.id);
    nextNodes.forEach(nextNode => {
      processNode(nextNode, nextTime);
    });
  };
  
  // Start with nodes that have no incoming connections
  const startNodes = findStartNodes();
  startNodes.forEach(node => {
    processNode(node, startTime);
  });
  
  return schedule;
};