'use client';

import { HeroUIProvider } from '@heroui/system';
import React, { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode}) {
  return (
    <HeroUIProvider>
        {children}
    </HeroUIProvider>
  )
}
