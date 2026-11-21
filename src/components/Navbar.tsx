import { Printer } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onPrint: () => void;
}

export function Navbar({ onPrint }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#E4E2DC] bg-[#F8F7F4]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-8 px-6 py-3.5">
        <a
          href="#top"
          className="font-serif text-lg font-bold tracking-tight text-[#141820] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF]"
        >
          Риск-менеджмент
        </a>

        <nav
          aria-label="Навигация по разделам"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A5260]"
        >
          <a
            href="#section-1"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#141820] hover:underline hover:underline-offset-4"
          >
            Вопросы 1–2
          </a>
          <a
            href="#section-2"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#141820] hover:underline hover:underline-offset-4"
          >
            Реферат
          </a>
          <a
            href="#section-3"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#141820] hover:underline hover:underline-offset-4"
          >
            Задача № 1
          </a>
          <a
            href="#charts-analytics"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#141820] hover:underline hover:underline-offset-4"
          >
            Визуализация
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-2 rounded-lg bg-[#141820] px-4 py-2 text-xs font-semibold text-[#F8F7F4] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Печать / PDF</span>
          </button>
        </div>
      </div>

      <div className="h-[2px] w-full bg-[#E4E2DC]/60" aria-hidden="true">
        <div
          className="h-full bg-[#1E40AF] transition-transform duration-150 origin-left"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>
    </header>
  );
}
