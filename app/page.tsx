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
        gap: '24px'
      }}>
        <img src="/logo.png" alt="Storm Form" style={{ width: 72, height: 72, objectFit: 'contain' }} />
        <h1 className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/60">
          Storm Form
        </h1>
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
