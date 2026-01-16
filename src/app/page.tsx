function Greeting() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-black/5 bg-white/80 px-8 py-8 text-center shadow-lg shadow-black/5 dark:border-white/10 dark:bg-white/5">
      <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">
        Hola
      </p>
      <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
        Bienvenido a Maquina Electoral
      </h1>
      <p className="max-w-sm text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        Aquí puedes seguir narrativas, competidores y geohubs con datos
        actualizadoss.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl items-center justify-center px-6 py-12">
        <Greeting />
      </main>
    </div>
  );
}
