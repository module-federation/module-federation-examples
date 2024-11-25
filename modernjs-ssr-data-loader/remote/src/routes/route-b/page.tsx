import { useLoaderData } from '@modern-js/runtime/router';
import type { ProfileData } from './page.data';

const Index = (): JSX.Element => {
  const data = (useLoaderData() as ProfileData) || {
    message: 'Not Found',
    timestamp: new Date().toLocaleString(),
    status: 'error',
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <div style={{
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{
          color: '#333',
          marginBottom: '1rem',
          fontSize: '2rem',
        }}>
          Route B Example
        </h1>
        
        <div style={{
          backgroundColor: data.status === 'success' ? '#e6f4ea' : '#fce8e6',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}>
          <p style={{ 
            fontSize: '1.2rem',
            color: '#333',
            marginBottom: '0.5rem',
          }}>
            {data.message}
          </p>
          <small style={{ color: '#666' }}>
            Last updated: {data.timestamp}
          </small>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}>
          <p style={{ margin: 0, color: '#666' }}>
            Status: <span style={{
              color: data.status === 'success' ? '#34a853' : '#ea4335',
              fontWeight: 'bold',
            }}>
              {data.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
