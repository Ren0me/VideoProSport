import type { ReactNode } from 'react';
import { PrismCarousel, type PrismCarouselItem } from "@shared/ui";
import styles from './portfolio-preview.module.scss'

const ITEMS: PrismCarouselItem[] = [
    {
        src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80&auto=format&fit=crop',
        alt: 'Футбольный матч на стадионе',
        title: 'Матч под светом прожекторов',
        subtitle: 'Спортивный репортаж',
    },
    {
        src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80&auto=format&fit=crop',
        alt: 'Бегун на легкоатлетической дорожке',
        title: 'Спринт на финишной прямой',
        subtitle: 'Съёмка со стедикама',
    },
    {
        src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80&auto=format&fit=crop',
        alt: 'Баскетболист в прыжке',
        title: 'Баскетбол крупным планом',
        subtitle: 'Промо-ролик клуба',
    },
    {
        src: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80&auto=format&fit=crop',
        alt: 'Пловец в бассейне',
        title: 'Дорожка в голубой воде',
        subtitle: 'Подводная камера',
    },
    {
        src: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=1200&q=80&auto=format&fit=crop',
        alt: 'Велосипедист на шоссе',
        title: 'Шоссе на рассвете',
        subtitle: 'Съёмка с дрона',
    },
    {
        src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80&auto=format&fit=crop',
        alt: 'Сноубордист на склоне',
        title: 'Склон и свежий снег',
        subtitle: 'Зимний сезон',
    },
    {
        src: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&q=80&auto=format&fit=crop',
        alt: 'Боксёрский поединок',
        title: 'Раунд в ринге',
        subtitle: 'Замедленная съёмка',
    },
    {
        src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80&auto=format&fit=crop',
        alt: 'Болельщики на трибунах',
        title: 'Трибуны в движении',
        subtitle: 'Эмоции болельщиков',
    },
]

export type PortfolioPreviewProps = {
    footer?: ReactNode;
}

export const PortfolioPreview = ({ footer }: PortfolioPreviewProps) => {
    return (
        <section id='portfolio' className={styles.section}>
            <div className={styles.aurora} aria-hidden='true'>
                <span className={styles.blobWarm} />
                <span className={styles.blobPink} />
                <span className={styles.blobCool} />
            </div>
            <div className={styles.glass} aria-hidden='true' />
            <div className={styles.panel}>
                <PrismCarousel
                    items={ITEMS}
                    aspect={1.5}
                    size={0.66}
                    neighborScale={0.7}
                    gap={16}
                    radius={20}
                    saturation={0}
                    dim={0.24}
                    sweep={1}
                    sweepDuration={1.05}
                    interval={5}
                    className={styles.carousel}
                    captions={false}
                />
            </div>
            {footer ? <div className={styles.footerSlot}>{footer}</div> : null}
        </section>
    )
}
