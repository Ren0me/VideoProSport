import {
    CircleUserRound,
    FolderBookmark,
    House,
    Menu,
    ShoppingCartPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type MobileNavItem = {
    label: string,
    href?: string,
    icon: LucideIcon,
    ariaLabel: string,
}

export const MOBILE_NAV_ITEMS: MobileNavItem[] = [
    { label: 'Главная', href: '/', icon: House, ariaLabel: 'Главная' },
    { label: 'Сделать заказ', href: '/', icon: ShoppingCartPlus, ariaLabel: 'Сделать заказ' },
    { label: 'Портфолио', href: '/portfolio', icon: FolderBookmark, ariaLabel: 'Портфолио' },
    { label: 'Профиль', href: '/', icon: CircleUserRound, ariaLabel: 'Профиль' },
    { label: 'Меню', icon: Menu, ariaLabel: 'Меню' },
]
