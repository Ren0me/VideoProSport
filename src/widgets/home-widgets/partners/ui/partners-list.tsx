"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useInView, useMediaQuery, usePageVisible } from "@shared/lib";
import { useGetPartnersList } from "../lib/use-get-partners-list";
import styles from "./partners-list.module.scss";

export const PartnersList = () => {
  const partners = useGetPartnersList();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pageVisible = usePageVisible();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const inView = useInView(rootRef, { rootMargin: "0px", once: false });

  return (
    <div ref={rootRef} className={styles.marqueeWrapper}>
      <Marquee
        autoFill
        direction="right"
        speed={48}
        loop={0}
        play={!isPaused && !reducedMotion && pageVisible && inView}
      >
        {partners.map((partner, index) => (
          <div
            key={`${partner.alt}-${index}`}
            className={styles.partnerCard}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <a
              className={styles.partnerLink}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={300}
                height={100}
                loading="lazy"
                decoding="async"
                className={styles.partnerImage}
              />
            </a>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
