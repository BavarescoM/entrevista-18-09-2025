import { Header } from "@/components/header";
import { getProfile } from "@/http/get-profile";

export default async function Home() {

  let profile = await getProfile()
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <p className="text-sm text-muted-foreground">Bem vindo {profile.name}</p>
      </main>
    </div>
  )
}
