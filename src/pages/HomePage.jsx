import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import ContactButtons from '../components/ContactButtons';
import LeadPopup from '../components/LeadPopup';
import { useCompany } from '../hooks/useData';

export default function HomePage() {
  const company = useCompany();

  return (
    <>
      <Header />
      <main>
        <Hero tagline={company?.tagline} heroImage={company?.heroImage} />
        <ProductsSection />
        <AboutSection />
        <LocationSection />
      </main>
      <Footer />
      <ContactButtons />
      <LeadPopup />
    </>
  );
}
