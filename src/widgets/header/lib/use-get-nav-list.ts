import {
    CircleHelp,
    Clapperboard,
    FolderBookmark,
    Info,
    Phone,
    ShoppingCartPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
    label: string,
    href: string,
    icon?: LucideIcon,
}

export const useGetNavList = ({page = 'home'}: {page: 'home' | 'another'}): NavItem[] => {
    if (page === 'another') {
        return [
            { label: 'Сделать заказ', href: '/', icon: ShoppingCartPlus },
            { label: 'О нас', href: '/about', icon: Info },
            { label: 'Услуги', href: '/services', icon: Clapperboard },
            { label: 'FAQ', href: '/faq', icon: CircleHelp },
            { label: 'Контакты', href: '/contacts', icon: Phone },
            { label: 'Портфолио', href: '/portfolio', icon: FolderBookmark },
        ]
    }
    return [
            { label: 'Сделать заказ', href: '/', icon: ShoppingCartPlus },
            { label: 'О нас', href: '#about', icon: Info },
            { label: 'Услуги', href: '#services', icon: Clapperboard },
            { label: 'FAQ', href: '#faq', icon: CircleHelp },
            { label: 'Контакты', href: '#contacts', icon: Phone },
            { label: 'Портфолио', href: '/portfolio', icon: FolderBookmark },
    ]
}
