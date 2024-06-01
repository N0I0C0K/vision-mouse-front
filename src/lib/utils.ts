import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isTauri = '__TAURI__' in window

export function getDecimalPlaces(num: number) {
  const parts = num.toString().split('.')
  return parts.length > 1 ? parts[1].length : 0
}
