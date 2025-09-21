"use client"

import { Slash, LogOut } from "lucide-react"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

export function Header() {
  async function handleLogout() {
    localStorage.removeItem("token")
    window.location.href = "/auth/sign-in"
  }

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between p-4">
      <div className="flex items-center gap-3">
              
        <span className="text-lg font-semibold">Meu App</span>
      </div>

      <div className="flex items-center gap-4">
        <Separator orientation="vertical" className="h-5" />
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
