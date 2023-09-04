'use client'

import { setCookie } from 'cookies-next'

export default function handleLogout() {
  setCookie('user', '')
  window.location.href = '/'
}
