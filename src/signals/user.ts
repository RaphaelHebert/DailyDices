import { signal, Signal } from '@preact/signals-react'

import { IUser } from '@/type'

export const user: Signal<IUser> = signal({
  username: '',
  email: '',
  uid: '',
  isAdmin: false,
})
