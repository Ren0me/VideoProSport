import clan from '@shared/assets/thumb_rg4u.jpg';
import stingray from '@shared/assets/thumb_stingray.jpg';

export type TPartnersItem = {
    src: string;
    alt: string;
    href: string;
}

export const useGetPartnersList = (): TPartnersItem[] => [
    {
        src: clan.src,
        alt: 'RG4U',
        href: 'https://rg4u.ru'
    },
    {
        src: stingray.src,
        alt: 'Penza Dive Club',
        href: 'https://penzadive.ru'
    },
    {
        src: clan.src,
        alt: 'RG4U',
        href: 'https://rg4u.ru'
    },
    {
        src: stingray.src,
        alt: 'Penza Dive Club',
        href: 'https://penzadive.ru'
    },
    {
        src: clan.src,
        alt: 'RG4U',
        href: 'https://rg4u.ru'
    },
    {
        src: stingray.src,
        alt: 'Penza Dive Club',
        href: 'https://penzadive.ru'
    },
]