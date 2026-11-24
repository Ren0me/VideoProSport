import {
  About,
  FAQPreview,
  Hero,
  Partners,
  PortfolioPreview,
  SaleBanner,
  Services
} from "@widgets/home-widgets";
import { Footer } from "@widgets/footer";
import { ScrollUpButton } from '@shared/ui'


export const HomePage = () => {
  return(
    <>
      <Hero
        videoSrc="/videos/hero-desktop.mp4"
        videoSrcMobile="/videos/hero-mobile.mp4"
        poster="/videos/hero-desktop-poster.jpg"
        mobilePoster="/videos/hero-mobile-poster.jpg"
      />
      <About />
      <Services />
      <SaleBanner />
      <FAQPreview />
      <Partners />
      <PortfolioPreview footer={<Footer variant="merged" />} />
      <ScrollUpButton />
    </>
  )
};
