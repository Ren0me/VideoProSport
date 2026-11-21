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
        videoSrc="/videos/hero_video_h264.mp4"
        poster="/videos/hero_video_poster.jpg"
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
