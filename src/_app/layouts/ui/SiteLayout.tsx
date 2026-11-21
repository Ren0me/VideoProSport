import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";
import { SwitchersProviders } from "@widgets/switchers-providers";
import { SiteFooter } from "./SiteFooter";
import styles from "./SiteLayout.module.scss";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header>
      <SwitchersProviders />
    </Header>
    <main className={styles.main}>{children}</main>
    <SiteFooter>
      <Footer />
    </SiteFooter>
  </>
);
