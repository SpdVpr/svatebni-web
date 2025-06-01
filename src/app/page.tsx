'use client';

import { useEffect, useState } from "react";

export default function WeddingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      <h1>Test - {mounted ? 'Mounted' : 'Loading'}</h1>
    </div>
  );
}
