"use client";

import { useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useGetPartnersList } from "../lib/use-get-partners-list";
import styles from "./partners-list.module.scss";

export const PartnersList = () => {
  const partners = useGetPartnersList();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={styles.marqueeWrapper}>
      <Marquee
        autoFill
        direction="right"
        speed={48}
        loop={0}
        play={!isPaused}
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
                className={styles.partnerImage}
              />
            </a>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
