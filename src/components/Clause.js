import React from 'react';

// Global counter and node coloring for clause numbering
let counter = {};
let visited = [];

const Clause = ({ item, level, parseJsonData, style }) => {
  // Initialize counter for the current level if not already set
  if (counter[level] === undefined) {
    counter[level] = 0;
  }

  // Reset counter for all levels greater than current
  for (let i = level + 1; counter.hasOwnProperty(i); i++) {
    counter[i] = 0;
  }

  // Increment counter for the current level if node not visited
  if (!visited.includes(item)) {
    counter[level]++;
    visited.push(item);
  }

  // Alternate between lettering and numbering
  const listItemNumber = level % 2 === 0 ? `${counter[level]}.` : `(${String.fromCharCode(97 + counter[level] - 1)})`;

  return (
    <div className='clause' style={{...style, display: 'inline-block'}}>
      {listItemNumber} {item.children ? parseJsonData(item.children, level + 1) : item.text}
    </div>
  );
};

export default Clause;