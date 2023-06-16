import ClientComponent from '@/app/components/ClientComponent';

export default function Home() {
  return (
    <main className="flex min-h-[1000px] flex-col items-center p-24 bg-gray-800">
      <h1 className="font-bold text-2xl mb-10 text-white">
        DO NOT SAY PROFANITY
      </h1>
      <ClientComponent />
    </main>
  );
}
