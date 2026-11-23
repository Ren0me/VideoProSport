export type NavItem = {
    label: string,
    href: string
}

export const useGetNavList = ({page = 'home'}: {page: 'home' | 'another'}): NavItem[] => {
    if (page === 'another') {
        return [
            { label: 'Сделать заказ', href: '/' },
            { label: 'О нас', href: '/about' },
            { label: 'Услуги', href: '/services' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Контакты', href: '/contacts' },
            { label: 'Портфолио', href: '/portfolio' },
        ]
    }
    return [
            { label: 'Сделать заказ', href: '/' },
            { label: 'О нас', href: '#about' },
            { label: 'Услуги', href: '#services' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Контакты', href: '#contacts' },
            { label: 'Портфолио', href: '/portfolio' },
    ]
}