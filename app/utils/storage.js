// utils/storage.js
"use client"

export const getLogs = (key) => {
  if (typeof window !== 'undefined') {
    const logs = localStorage.getItem(key)
    return logs ? JSON.parse(logs) : []
  }
  return []
}

export const addLog = (key, log) => {
  if (typeof window !== 'undefined') {
    const logs = getLogs(key)
    logs.unshift(log) // Add new log at beginning
    localStorage.setItem(key, JSON.stringify(logs.slice(0, 100))) // Keep only last 100 logs
  }
}

export const clearLogs = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}