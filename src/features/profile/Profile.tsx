import Link from 'next/link';
import styles from './Profile.module.scss';

export const ProfileLink = () => {
    return(
        <Link className={styles.profileLink} href={''}>
            <span className={styles.innerProfileLink}>
                Личный кабинет
            </span>
        </Link>
    )
}
