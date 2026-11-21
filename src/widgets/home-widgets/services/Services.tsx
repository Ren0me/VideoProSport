import styles from "./Services.module.scss";
import AccordionGalleryServices from "./ui/services-gallery";
import { useGetServicesGallery } from "./lib/use-get-services-gallery";
import { CornerLink } from "@/src/shared/ui";

export const Services = () => {
  const items = useGetServicesGallery();

  return (
    <section id="services" className={styles.services}>
      <div className={styles.content}>
        <h2 className={styles.servicesTitle}>Услуги</h2>
        <div className={styles.servicesGallery}>
            <AccordionGalleryServices
                items={items}
                defaultIndex={2}
                expandRatio={0.52}
                trigger="hover"
                accentColor="#ffffff"
                overlayColor="#060010"
                textColor="#ffffff"
                grayscale
                showLabels
                duration={0.6}
                ease="power3.out"
                parallax={0.5}
                tilt={8}
                stagger={0.06}
                height={460}
                gap={10}
                radius={16}
                orientation="horizontal"
            />
        </div>
        <CornerLink label="Об услугах" route="services"/>
      </div>
    </section>
  );
};
