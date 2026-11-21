import { ArrowDownRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="top" className="border-b border-[#E4E2DC] bg-[#FFFFFF]">
      <div className="mx-auto max-w-[1180px] px-6 pt-12 pb-10 lg:pt-16 lg:pb-12">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#5B6472]">
          <span>Самостоятельная работа</span>
          <span aria-hidden="true">·</span>
          <span>Материалы лекции и практикума</span>
          <span aria-hidden="true">·</span>
          <span>Методика оценки по таблице 7.1</span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-[clamp(2.1rem,4vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-[#141820] [text-wrap:balance]">
              Управление рисками в инновационной деятельности предприятия
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[15px] leading-relaxed text-[#4A5260]">
              Комплексное учебно-аналитическое исследование: теоретические основы природы риска и
              факторов его возникновения, реферат по рыночной неопределённости и количественный
              отбор инвестиционного портфеля.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 divide-y divide-[#E4E2DC] border-t border-b border-[#E4E2DC] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          <a
            href="#section-1"
            className="group flex flex-col justify-between py-4 sm:pr-5 transition-colors hover:bg-[#F8F7F4]/80"
          >
            <span className="font-mono text-xs text-[#5B6472]">01 / Теория</span>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-[#141820] group-hover:text-[#1E40AF]">
                Вопросы № 1 и № 2
              </span>
              <ArrowDownRight className="h-3.5 w-3.5 text-[#5B6472] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[#1E40AF]" />
            </div>
          </a>

          <a
            href="#section-2"
            className="group flex flex-col justify-between py-4 sm:px-5 transition-colors hover:bg-[#F8F7F4]/80"
          >
            <span className="font-mono text-xs text-[#5B6472]">02 / Реферат</span>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-[#141820] group-hover:text-[#1E40AF]">
                Риск и неопределённость
              </span>
              <ArrowDownRight className="h-3.5 w-3.5 text-[#5B6472] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[#1E40AF]" />
            </div>
          </a>

          <a
            href="#section-3"
            className="group flex flex-col justify-between py-4 sm:pr-5 lg:px-5 transition-colors hover:bg-[#F8F7F4]/80"
          >
            <span className="font-mono text-xs text-[#5B6472]">03 / Практикум</span>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-[#141820] group-hover:text-[#1E40AF]">
                Расчёт по табл. 7.1
              </span>
              <ArrowDownRight className="h-3.5 w-3.5 text-[#5B6472] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[#1E40AF]" />
            </div>
          </a>

          <a
            href="#conclusion-box"
            className="group flex flex-col justify-between py-4 sm:pl-5 transition-colors hover:bg-[#F8F7F4]/80"
          >
            <span className="font-mono text-xs text-[#047857]">Оптимальный выбор</span>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-[#141820] tabular-nums group-hover:text-[#047857]">
                Портфель № 2 · 330 тыс. руб.
              </span>
              <ArrowDownRight className="h-3.5 w-3.5 text-[#047857] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
