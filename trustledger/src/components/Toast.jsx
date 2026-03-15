import React, { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ToastContext = createContext({ push: () => {} })

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const push = useCallback((msg) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, msg }])
    setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), 4500)
  }, [])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-[100]">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div key={t.id}
              initial={{ opacity: 0, x: 20, scale: .95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: .95 }}
              style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:14,padding:"12px 16px",boxShadow:"var(--shadow2)"}}>
              <div className="text-sm">{t.msg}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
