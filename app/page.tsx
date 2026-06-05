"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';

const StormFormApp = dynamic(() => import('./storm-form-app'), { ssr: false });

export default function Page() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <main style={{
        position: 'fixed', inset: 0, color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '24px', fontFamily: 'Arial, sans-serif'
      }}>
        <img src="/logo.png" alt="Storm Form" style={{ width: 72, height: 72, objectFit: 'contain' }} />
        <p style={{ fontSize: '10px', letterSpacing: '0.5em', color: '#6b7280', textTransform: 'uppercase', margin: 0 }}>
          Storm Form
        </p>
        <button
          onClick={() => setEntered(true)}
          style={{
            marginTop: '8px',
            padding: '14px 48px',
            background: 'transparent',
            border: '1px solid rgba(0,119,255,0.3)',
            color: '#0077FF',
            borderRadius: '16px',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Enter
        </button>
      </main>
    );
  }

  return <StormFormApp />;
}
