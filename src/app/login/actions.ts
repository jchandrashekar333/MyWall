'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const handle = formData.get('handle') as string
  
  if (!handle.match(/^[a-z0-9-]+$/)) {
      return { error: "Handle can only contain lowercase letters, numbers, and hyphens" }
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            handle
        }
    }
  })

  if (error) {
    return { error: error.message }
  }

  if (data?.user && !data?.session) {
    const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password })
    if (loginErr) {
      return { error: loginErr.message }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}
