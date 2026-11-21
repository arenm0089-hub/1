import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { SectionCalculation } from './components/SectionCalculation';
import { SectionEssay } from './components/SectionEssay';
import { SectionTheory } from './components/SectionTheory';

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#141820]">
      <Navbar onPrint={handlePrint} />

      <main>
        <HeroSection />
        <SectionTheory />
        <SectionEssay />
        <SectionCalculation />
      </main>

      <footer className="border-t border-[#E4E2DC] bg-[#FFFFFF] py-8">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-2 px-6 text-xs text-[#5B6472] sm:flex-row">
          <span>
            Выполнено по методическим указаниям «Управление рисками в инновационной деятельности предприятия»
          </span>
          <span>Материалы лекции и практикума · Таблица 7.1</span>
        </div>
      </footer>
    </div>
  );
}
