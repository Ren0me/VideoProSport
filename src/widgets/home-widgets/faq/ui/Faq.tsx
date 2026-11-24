import { CornerLink, LazyMount } from '@/src/shared/ui';
import { FaqListPreview } from './faq-list-prev';
import styles from './Faq.module.scss';


export const FAQPreview = () => {
    return(
        <section id='faq' className={styles.faq}>
            <div className={styles.content}>
                <h2 className={styles.faqTitle}>Частые вопросы</h2>
                <LazyMount minHeight={360} rootMargin="500px 0px">
                    <FaqListPreview />
                </LazyMount>
                <CornerLink label="Больше ответов" route="faq"/>
            </div>
        </section>
    )
}
