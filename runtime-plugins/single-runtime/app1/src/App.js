import React from 'react';
import LocalButton from './Button';
import RemoteButton from 'app2/Button';

const App = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>App 1 - Single Runtime Demo</h1>
        <a 
          href="http://localhost:3002" 
          style={{ 
            padding: '8px 16px', 
            background: '#e24a90', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          Go to App 2 →
        </a>
      </div>

      <div style={{ 
        padding: '15px', 
        background: '#f8f9fa', 
        borderRadius: '4px', 
        marginBottom: '20px',
        border: '1px solid #e9ecef' 
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#4a90e2' }}>What's Happening Here?</h3>
        <p style={{ margin: '0', lineHeight: '1.5' }}>
          This is App1 running on port 3001. Notice in the Runtime Information that App2's module is using <code>app1_partial.js</code> instead 
          of <code>remoteEntry.js</code>. This happens because App2 lists App1 as a remote, and to avoid loading conflicting runtimes from the 
          same build (App1), the plugin switches to using the partial bundle.
        </p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Shared State Counter: {count}</h3>
        <button onClick={() => setCount(c => c + 1)}>Increment Counter</button>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div>
          <h3>Local Button:</h3>
          <LocalButton />
        </div>
        <div>
          <h3>Remote Button (from App 2):</h3>
          <React.Suspense fallback="Loading Remote Button...">
            <RemoteButton />
          </React.Suspense>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Runtime Information:</h3>
        <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          {__FEDERATION__.__INSTANCES__.map(instance => (
            <div key={instance.name} style={{ margin: '10px 0' }}>
              <div>
                <strong>Module: </strong>{instance.name}
              </div>
              {instance.options?.remotes?.length > 0 && (
                <div style={{ marginLeft: '20px', fontSize: '14px' }}>
                  <strong>Remote Entries:</strong>
                  {instance.options.remotes.map((remote, idx) => (
                    <div key={idx} style={{ marginTop: '5px', color: '#666' }}>
                      • {remote.alias || remote.name}: <code>{remote.entry}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
