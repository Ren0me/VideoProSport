'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@shared/ui';
import {
    useGetFaqItemsPreview
} from '../lib/use-get-faq-items-prev';

import styles from './Faq.module.scss';


export const FaqListPreview = () => {
    const faqItems = useGetFaqItemsPreview();

    return (
        <Accordion type='single' collapsible className={styles.faqList}>
            {
                faqItems.map(({ title, description }, i) => {
                    const value = `item_${i + 1}`;

                    return (
                        <AccordionItem key={value} value={value} className={styles.faqItem}>
                            <AccordionTrigger className={styles.faqTrigger} indicator="aperture">
                                {title}
                            </AccordionTrigger>
                            <AccordionContent className={styles.faqAnswer}>
                                {description}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    )
}
