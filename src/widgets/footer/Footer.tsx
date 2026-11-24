import { cacheLife } from "next/cache";
import { cn } from "cn";
import { getTranslations } from "next-intl/server";
import { Link } from "@shared/i18n";
import { SpecularButton } from "@shared/ui/molecules";
import logo from "@shared/assets/logo.png";
import Image from "next/image";
import {
  MaxIcon,
  TelegramIcon,
  VkIcon,
  WhatsAppIcon,
} from "./social-icons";
import styles from "./Footer.module.scss";
import { ArrowUpRight } from "lucide-react";

async function CopyrightYear() {
  "use cache";
  cacheLife("max");

  return new Date().getFullYear();
}

export type FooterVariant = "default" | "merged";

export type FooterProps = {
  variant?: FooterVariant;
  className?: string;
};

export const Footer = async ({
  variant = "default",
  className,
}: FooterProps) => {
  const t = await getTranslations("Footer");

  const sectionLinks = [
    { label: t("about"), href: "/about" },
    { label: t("services"), href: "/services" },
    { label: t("portfolio"), href: "/portfolio" },
    { label: t("faq"), href: "/faq" },
  ];

  const documentsLinks = [
    { label: t("oferta"), href: "/oferta" },
    { label: t("personal_data"), href: "/personal_data" },
    { label: t("user_agreement"), href: "/user_agreement" },
  ];

  const contactsLinks = [
    { label: "Support@VideoProSport.com", href: "mailto:Support@VideoProSport.com" },
    { label: " +7 903 323 6546", href: "tel:+79033236546" },
  ];

  // TODO: заменить на реальные ссылки на профили
  const socialLinks = [
    { label: "ВКонтакте", href: "https://vk.com/videoprosport", Icon: VkIcon },
    { label: "MAX", href: "https://max.ru/videoprosport", Icon: MaxIcon },
    { label: "Telegram", href: "https://t.me/videoprosport", Icon: TelegramIcon },
    { label: "WhatsApp", href: "https://wa.me/79033236546", Icon: WhatsAppIcon },
  ];

  return (
    <footer
      id="contacts"
      className={cn(
        styles.footer,
        variant === "merged" && styles.merged,
        className,
      )}
      data-variant={variant}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Video Pro Sport"
          >
            <Image
              src={logo}
              alt="Video Pro Sport"
              width={160}
              height={80}
              loading="lazy"
              className={styles.logo}
            />
          </Link>
          
          <nav className={styles.column} aria-labelledby="footer-sections-title">
            <h2 id="footer-sections-title" className={styles.columnTitle}>
              {t("sections")}
            </h2>
            <ul className={styles.list}>
              {sectionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.listLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <SpecularButton
              size="lg"
              radius={18}
              tint="#26232e"
              tintOpacity={0.4}
              blur={20}
              saturate={1.6}
              textColor="#f5f5f5"
              lineColor="#ffc9a3"
              fillColor="#ffceab"
              baseColor="#686868"
              intensity={1}
              idleIntensity={1}
              shineSize={10}
              shineFade={34}
              thickness={0.5}
              glow={1.5}
              followMouse={true}
              autoAnimate={true}
              proximity={250}
              className={styles.orderButton}
            />
          </nav>

          <section
            className={styles.column}
            aria-labelledby="footer-contacts-title"
          >
            <h2 id="footer-contacts-title" className={styles.columnTitle}>
              {t("contacts")}
            </h2>
            <ul className={styles.list}>
              {contactsLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.listLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              className={styles.listLink}
              href='/contacts'
              style={{
                // color: 'rgba(0,0,0,0.5)',
                fontSize: '14px',
                display: 'flex',
              }}
            >
                Больше информации
                <ArrowUpRight aria-hidden="true" size={14}/>
            </Link>
            <ul className={styles.socials}>
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                  >
                    <Icon className={styles.socialIcon} />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={styles.column}
            aria-labelledby="footer-documents-title"
          >
            <h2 id="footer-documents-title" className={styles.columnTitle}>
              {t("documents")}
            </h2>
            <ul className={styles.list}>
              {documentsLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.listLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            ИП Шапаев Артем Валерьевич · ИНН 1234567890 · ОГРНИП 1234567890
          </span>
          <span className={styles.copyright}>
            © <CopyrightYear /> VideoProSport (Медиа Арт)
          </span>
        </div>
      </div>
    </footer>
  );
};
