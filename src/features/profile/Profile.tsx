import Link from 'next/link';
import styles from './Profile.module.scss';

export const ProfileLink = () => {
    return(
        <Link className={styles.profileLink} href={''}>
            Личный кабинет
        </Link>
    )
}