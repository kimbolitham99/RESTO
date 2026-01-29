import { Header } from '../components/public/Header';
import { Hero } from '../components/public/Hero';
import { MenuSection } from '../components/public/MenuSection';
import { About } from '../components/public/About';
import { Contact } from '../components/public/Contact';
import { Footer } from '../components/public/Footer';
import { OrderCart } from '../components/public/OrderCart';

export function PublicPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <MenuSection />
      <About />
      <Contact />
      <Footer />
      <OrderCart />
    </div>
  );
}
