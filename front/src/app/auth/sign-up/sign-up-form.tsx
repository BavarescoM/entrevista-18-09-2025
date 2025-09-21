'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    }
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Criar Conta</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success === false && message && (
            <Alert variant="destructive" className="bg-red-900 text-red-100 border-red-700">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <AlertTitle>Falha ao criar conta</AlertTitle>
              </div>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <Label htmlFor="name">Nome</Label>
            <Input
              name="name"
              id="name"
              placeholder="Digite seu nome"
              className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors?.name && (
              <p className="text-xs font-medium text-red-400">{errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors?.email && (
              <p className="text-xs font-medium text-red-400">{errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              name="password"
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors?.password && (
              <p className="text-xs font-medium text-red-400">{errors.password[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirme a senha</Label>
            <Input
              name="password_confirmation"
              type="password"
              id="password_confirmation"
              placeholder="Repita sua senha"
              className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors?.password_confirmation && (
              <p className="text-xs font-medium text-red-400">{errors.password_confirmation[0]}</p>
            )}
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-gray-100"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Criar Conta'
            )}
          </Button>

          <div className="text-center">
            <Button className="w-full mt-2 text-blue-400 hover:text-blue-500" variant="link" size="sm" asChild>
              <Link href="/auth/sign-in">Já tem conta? Entrar</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
