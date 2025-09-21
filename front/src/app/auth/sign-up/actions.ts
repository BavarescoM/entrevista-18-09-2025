'use server'
import { HTTPError } from 'ky'
import { z } from 'zod'
import { signUp } from '@/http/sign-up'
const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor informe seu nome completo.',
    }),
    email: z
      .string()
      .email({ message: 'Por favor informe seu email' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter ao menos 6 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }
  const { name, email, password } = result.data
  try {
    await signUp({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }
    console.error(err)
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }
  return { success: true, message: null, errors: null }
}
