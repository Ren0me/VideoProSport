import { CornerLink } from '@/src/shared/ui';
import { FaqListPreview } from './faq-list-prev';
import styles from './Faq.module.scss';


export const FAQPreview = () => {
    return(
        <section id='faq' className={styles.faq}>
            <div className={styles.content}>
                <h2 className={styles.faqTitle}>Частые вопросы</h2>
                <FaqListPreview />
                <CornerLink label="Больше ответов" route="faq"/>
            </div>
        </section>
    )
}
