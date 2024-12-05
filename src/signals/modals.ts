import { signal, Signal } from '@preact/signals-react'

// login modal open
export const loginOpen: Signal<boolean> = signal(false)

// profile modal open
export const profileOpen: Signal<boolean> = signal(false)

// profile modal open
export const menuModal: Signal<boolean> = signal(false)
