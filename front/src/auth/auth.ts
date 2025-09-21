import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getProfile } from '@/http/get-profile'
// import { defineAbilityFor } from '@saas/auth'
// import { getMembership } from '@/http/get-membership'

export async function isAuthenticated() {
    let r = !!(await cookies()).get('token')?.value
    console.log(r, `uoba`)
    return r
}

export async function auth() {
  const token = (await cookies()).get('token')?.value
  if (!token) {
    redirect('/auth/sign-in')
  }
  redirect('/api/auth/sign-out')
}
