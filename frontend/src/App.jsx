import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0f19] text-slate-200 selection:bg-blue-500/20 selection:text-blue-400">
      
      {/* Platform Header */}
      <Navbar />
      
      {/* Dashboard Area */}
      <div className="flex-grow">
        <Home />
      </div>
      
      {/* Platform Footer */}
      <Footer />

      {/* Styled toast alerts */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass-panel',
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            color: '#f3f4f6',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '600',
            padding: '12px 18px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#0b0f19',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0b0f19',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
