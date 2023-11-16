import { cookies } from 'next/headers'

export default async function Index() {
  const cookieStore = cookies()
  const renderWordAnimation = (word: string, startingDelay: number) => {
    return word.split('').map((letter, index) => (
      <span
        key={index}
        className="inline-block animate-fall font-extrabold text-[#ff8e3c]"
        style={{ animationDelay: `${startingDelay + index * 50}ms` }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <main className="flex-grow flex items-center justify-center bg-current">
        <div className='relative'>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] overflow-hidden flex flex-row">
            {renderWordAnimation('GET', 0)}
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] overflow-hidden flex flex-row">
            {renderWordAnimation('READY', 1500)}
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href=""
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Tata
          </a>
        </p>
      </footer>
    </div>
  )
}
