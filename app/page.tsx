"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';

const StormFormApp = dynamic(() => import('./storm-form-app'), { ssr: false });

export default function Page() {
  return <StormFormApp />;
}
