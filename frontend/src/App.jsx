import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800 selection:bg-teal-500/15 selection:text-teal-700">
      
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
          style: {
            background: '#ffffff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            fontSize: '13px',
            fontWeight: '600',
            padding: '12px 18px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
          },
          success: {
            iconTheme: {
              primary: '#14b8a6',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
