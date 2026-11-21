import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

// Unsplash stock photos, cropped to the tiles by object-cover.
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&auto=format&fit=crop",
    alt: "Diver swimming underwater",
  },
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80&auto=format&fit=crop",
    alt: "Ocean waves seen from above",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop",
    alt: "Tropical beach at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=600&q=80&auto=format&fit=crop",
    alt: "Open sea at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80&auto=format&fit=crop",
    alt: "Mountain lake landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80&auto=format&fit=crop",
    alt: "Forest and mountain view",
  },
];

export default function TiltedGridHeroDemo() {
  return (
    <TiltedGridHero
      images={IMAGES}
      className="h-[560px] w-full rounded-lg border border-border bg-background"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
        <div className="px-6">
          <h1 className="text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Every frame,
            <br />
            brought into focus.
          </h1>
        </div>
        <p className="max-w-md text-balance px-6 text-sm text-muted-foreground">
          Images curve in from one edge, flatten out at the centre, then fade
          away round the other.
        </p>
      </div>
    </TiltedGridHero>
  );
}
