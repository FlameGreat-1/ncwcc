import { useState } from 'react';

const Portal = () => {
  const [test] = useState('Portal Test');
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Portal Component Test</h1>
        <p>If you see this, the Portal component itself is not the issue.</p>
        <p>Status: {test}</p>
      </div>
    </div>
  );
};

export default Portal;
