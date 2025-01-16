
"use client"

import { useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)

  return {
    toast,
    showToast: (message: string) => setToast(message),
    hideToast: () => setToast(null),
  }
}