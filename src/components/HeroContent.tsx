export default function HeroContent() {
    return (
      <div className="w-[50%] text-center z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-clash-bold tracking-tight text-gray-900 mb-4 font-clash">
          Your Doctor Friend Has Gist <span className="text-7.5xl">👀</span>
        </h1>
        <p className="text-6xl md:text-2xl text-green-600 italic mb-6 font-clash-regular">
          — And It Could Save Your Life
        </p>
        <p className="text-gray-600 max-w-md mb-8 text-lg font-clash-regular">
        Real health advice. No big grammar. No long queue. Just clear, honest information that keeps you and your people well.
      </p>
      <div className="flex gap-4">
         <button className="px-8 py-3 bg-[#22c55e] text-white rounded-full font-medium hover:bg-green-600 transition-colors shadow-md">
           Let's Talk Health
         </button>
         <button className="px-8 py-3 bg-white border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm">
           Discover awadoc
         </button>
      </div>
    </div>
)};