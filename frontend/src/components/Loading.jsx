import { Loader2, Sparkles } from 'lucide-react';

export function Loading({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="relative flex flex-col items-center">
        {/* Glow backdrop behind spinner */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl animate-pulse" />

        {/* Dual Outer Spinner Rings */}
        <div className="relative flex items-center justify-center w-20 h-20">
          {/* Static Gradient Background Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-600 animate-spin" />
          
          {/* Reverse Pulsing Inner Ring */}
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 border-l-blue-600 animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />

          {/* Center Brand Icon */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Loading Text & Animated Dots */}
        <div className="mt-6 flex items-center gap-1.5 text-gray-700 font-semibold text-sm tracking-wide">
          <span>{message}</span>
          <span className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
}