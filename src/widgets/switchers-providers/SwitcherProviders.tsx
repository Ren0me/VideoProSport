import { LocaleSwitcher } from "@features/locale-switcher"
import { ThemeToggle } from "@features/theme-toggle"
import styles from './SwitcherProviders.module.scss';
import { LetterI } from "lucide-react";

export const SwitchersProviders = () => {
    return(
            <div className={styles.headerProviders} >
                <ThemeToggle />
                <LetterI />
                <LocaleSwitcher />
            </div>
    )
}