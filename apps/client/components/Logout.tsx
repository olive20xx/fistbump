'use client'

import { setCookie } from 'cookies-next'

export default function handleLogout() {
  setCookie('token', '')
  setCookie('userId', '')
  window.location.href = '/'
}
