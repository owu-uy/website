"use client";

import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "components/shared/ui/carousel";

export default function Gallery() {
  const date = new Date();
  const displayGallery = date > new Date("2024-10-19");

  return (
    <>
      {displayGallery ? (
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-5">
          <span>
            <h2 className="text-center text-5xl font-bold text-yellow-400">Galería</h2>
            <p className="mt-2 text-center text-lg font-[400] text-white">
              ¡Reviví los mejores momentos de La Meetup 2023!
            </p>
          </span>

          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <img alt="" className="w-full max-w-[1200px] rounded-md" src="/open_space.jpg" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : null}
    </>
  );
}
