import { Header } from "@widgets/header";
import { SwitchersProviders } from "@widgets/switchers-providers";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header>
      <SwitchersProviders />
    </Header>
    <main>{children}</main>
  </>
);
