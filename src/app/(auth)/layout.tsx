import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/assets/background.webp"
          alt="Photo by Gheorghe Cezar on Unsplash"
          fill
          priority
          className="absolute inset-0 object-cover"
          sizes="(min-width: 1040px) 50vw, (min-width: 780px) 33.33vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-white/70 md:to-white/40" />
      </AspectRatio>
      <main className="absolute top-1/2 col-span-1 flex min-w-full -translate-y-1/2 justify-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </main>
    </div>
  );
}
