import ClientComponent from '@/app/components/ClientComponent';

export default function Home() {
  return (
    <main className="flex flex-col w-4/5 max-w-[700px] items-center bg-gray-800">
      <h1 className="font-bold text-2xl mb-10 text-white">
        DO NOT SAY PROFANITY
      </h1>
      <ClientComponent />
    </main>
  );
}
