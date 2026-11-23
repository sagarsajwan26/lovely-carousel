import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#12071C] flex flex-col items-center justify-center p-6 text-center text-white">
      <h1 className="font-serif text-6xl text-pink-300 mb-4 font-bold">404</h1>
      <p className="font-serif text-2xl text-white italic mb-2">
        A Memory Lost in the Mist
      </p>
      <p className="text-sm text-white/70 max-w-md mb-8">
        The melody you are seeking might have faded or drifted away into another dreamscape.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#FF2D6C] text-white font-medium text-sm hover:bg-[#FF4B7A] transition-all shadow-lg"
      >
        Return to Player ♡
      </Link>
    </div>
  );
}
