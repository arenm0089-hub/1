import { useState } from 'react';
import { RISK_STRATEGIES, RISK_ZONES, type RiskZone } from '../data/riskContent';

const SEVERITY_COLORS: Record<RiskZone['severity'], { bar: string; text: string; bg: string }> = {
  safe: { bar: 'bg-[#059669]', text: 'text-[#047857]', bg: 'bg-[#ECFDF5]' },
  low: { bar: 'bg-[#2563EB]', text: 'text-[#1E40AF]', bg: 'bg-[#EFF6FF]' },
  moderate: { bar: 'bg-[#D97706]', text: 'text-[#B45309]', bg: 'bg-[#FFFBEB]' },
  high: { bar: 'bg-[#EA580C]', text: 'text-[#C2410C]', bg: 'bg-[#FFF7ED]' },
  critical: { bar: 'bg-[#DC2626]', text: 'text-[#B91C1C]', bg: 'bg-[#FEF2F2]' },
};

export function SectionEssay() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(RISK_ZONES[1].id);
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(RISK_STRATEGIES[7].id);

  const activeZone = RISK_ZONES.find((z) => z.id === selectedZoneId) ?? RISK_ZONES[0];
  const activeStrategy =
    RISK_STRATEGIES.find((s) => s.id === selectedStrategyId) ?? RISK_STRATEGIES[0];

  return (
    <section
      id="section-2"
      className="border-t border-b border-[#E4E2DC] bg-[#FFFFFF] py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="border-b border-[#D8D5CD] pb-5">
          <p className="font-mono text-xs text-[#5B6472]">Раздел 02 · Самостоятельная работа</p>
          <h2 className="mt-1.5 font-serif text-2xl font-bold text-[#141820] sm:text-3xl">
            Реферат № 1
          </h2>
          <p className="mt-1.5 max-w-3xl text-sm text-[#4A5260]">
            Тема: «Факторы риска и неопределённости для хозяйствующего субъекта, функционирующего
            в условиях рыночной экономики»
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#5B6472]">
            <span>Введение</span>
            <span aria-hidden="true">·</span>
            <span>Природа и зоны риска</span>
            <span aria-hidden="true">·</span>
            <span>Внешние и внутренние факторы</span>
            <span aria-hidden="true">·</span>
            <span>Методы управления</span>
            <span aria-hidden="true">·</span>
            <span>Заключение</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Основная колонка текста (70% / 8 колонок) */}
          <article className="lg:col-span-8 max-w-[68ch] space-y-6 text-[15.5px] leading-[1.75] text-[#2A313D]">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#141820]">Введение</h3>
              <p className="mt-3 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[#141820]">
                Функционирование любого хозяйствующего субъекта в условиях рыночной экономики
                протекает в динамичной и конкурентной среде. Постоянные колебания спроса и
                предложения, технологические сдвиги, изменение законодательства и
                макроэкономической конъюнктуры формируют условия неопределённости, при которых
                принятие управленческих решений невозможно без оценки потенциальных угроз и
                возможностей. Систематизация факторов риска и неопределённости является фундаментом
                для обеспечения финансовой устойчивости предприятия и успешной реализации
                инновационных проектов.
              </p>
            </div>

            <div className="border-t border-[#E4E2DC] pt-6">
              <h3 className="font-serif text-xl font-bold text-[#141820]">
                1. Соотношение неопределённости и риска. Зоны риска
              </h3>
              <p className="mt-3">
                Неопределённость возникает из-за неполноты или недостаточной достоверности
                информации об условиях будущей деятельности. Когда предприятие способно определить
                перечень возможных сценариев развития событий и оценить вероятность их наступления,
                неопределённость переходит в категорию{' '}
                <strong className="font-semibold text-[#141820]">риска</strong> — вероятности
                наступления неблагоприятных событий, ведущих к потерям или недополучению
                запланированного результата.
              </p>
              <p className="mt-3">
                В зависимости от величины возможных потерь для хозяйствующего субъекта выделяют
                пять зон риска (выберите зону на шкале ниже для просмотра финансовых последствий):
              </p>

              {/* Интерактивная шкала 5 зон риска */}
              <div className="my-5 rounded-xl border border-[#E4E2DC] bg-[#F8F7F4] p-5">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                  {RISK_ZONES.map((zone) => {
                    const active = zone.id === activeZone.id;
                    const palette = SEVERITY_COLORS[zone.severity];
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZoneId(zone.id)}
                        aria-pressed={active}
                        className={`flex flex-col rounded-lg border p-3 text-left transition-all duration-150 cursor-pointer ${
                          active
                            ? 'border-[#141820] bg-[#FFFFFF] shadow-sm'
                            : 'border-[#E4E2DC] bg-[#FFFFFF]/70 hover:border-[#9CA3AF]'
                        }`}
                      >
                        <div className={`h-1.5 w-full rounded-full ${palette.bar}`} />
                        <span className="mt-2.5 font-mono text-[11px] text-[#5B6472]">
                          0{zone.index}
                        </span>
                        <span className="mt-0.5 text-xs font-bold leading-snug text-[#141820]">
                          {zone.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-lg border border-[#E4E2DC] bg-[#FFFFFF] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        SEVERITY_COLORS[activeZone.severity].text
                      }`}
                    >
                      {activeZone.levelCode}
                    </span>
                    <span className="text-xs font-medium text-[#5B6472]">
                      Зона {activeZone.index} из 5
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-[#141820]">{activeZone.summary}</p>
                  <div className="mt-3 grid grid-cols-1 gap-3 border-t border-[#E4E2DC] pt-3 sm:grid-cols-2">
                    <div>
                      <span className="block font-mono text-[11px] text-[#5B6472]">
                        Финансовый эффект
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-[#333B48]">
                        {activeZone.financialImpact}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[11px] text-[#5B6472]">
                        Реакция управления
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-[#333B48]">
                        {activeZone.managementAction}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E4E2DC] pt-6">
              <h3 className="font-serif text-xl font-bold text-[#141820]">
                2. Основные факторы риска и неопределённости в рыночной экономике
              </h3>
              <p className="mt-3">
                Источники рисков хозяйствующего субъекта подразделяются на внешние (не зависящие от
                воли предприятия) и внутренние (связанные с организацией его собственной
                деятельности).
              </p>
              <p className="mt-3">
                <strong className="font-semibold text-[#141820]">Внешние факторы</strong> включают
                социально-политические условия (политическая стабильность, налоговое и
                антимонопольное регулирование, защита конкуренции, уровень преступности),
                макроэкономическую среду (фаза делового цикла, устойчивость финансовой системы,
                инфляция, доходы населения, культура бизнеса), правовые риски (совершенство
                законодательства и арбитражной практики, таможенная и лицензионная политика), а
                также внутриотраслевые и региональные факторы (конкуренция, появление
                товаров-заменителей, поведение поставщиков).
              </p>
              <p className="mt-3">
                <strong className="font-semibold text-[#141820]">Внутренние факторы</strong>{' '}
                формируются в рамках основной и вспомогательной деятельности компании. В основной
                деятельности ключевыми источниками угроз выступают нарушения технологической
                дисциплины, поломки оборудования, сбои в поставках сырья и комплектующих,
                экономические преступления. Во вспомогательной деятельности — перебои
                энергоснабжения, срывы графиков ремонта и аварии обслуживающих систем. Существенное
                влияние также оказывают микроэкономические параметры: финансовое состояние
                предприятия, кадровый и инновационный потенциал, качество организационной системы
                управления.
              </p>
            </div>

            <div className="border-t border-[#E4E2DC] pt-6">
              <h3 className="font-serif text-xl font-bold text-[#141820]">
                3. Выявление и стратегическое управление рисками
              </h3>
              <p className="mt-3">
                Для идентификации факторов риска предприятия применяют мозговой штурм,
                SWOT-анализ, метод Дельфи, опросные листы, карты потоков, анализ финансовой
                отчётности и метод аналогий. На основе полученной оценки формируются стратегические
                решения по управлению рисками (выберите инструмент для детального пояснения):
              </p>

              {/* Интерактивная матрица методов */}
              <div className="my-5 rounded-xl border border-[#E4E2DC] bg-[#F8F7F4] p-5">
                <div className="flex flex-wrap gap-2">
                  {RISK_STRATEGIES.map((strategy) => {
                    const isSelected = strategy.id === activeStrategy.id;
                    return (
                      <button
                        key={strategy.id}
                        type="button"
                        onClick={() => setSelectedStrategyId(strategy.id)}
                        aria-pressed={isSelected}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#1E40AF] bg-[#1E40AF] text-[#FFFFFF]'
                            : 'border-[#E4E2DC] bg-[#FFFFFF] text-[#141820] hover:border-[#1E40AF]'
                        }`}
                      >
                        {strategy.name}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-lg border border-[#E4E2DC] bg-[#FFFFFF] p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#141820]">{activeStrategy.name}</h4>
                    <span className="font-mono text-[11px] text-[#1E40AF]">
                      {activeStrategy.category}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#333B48]">
                    <strong className="font-semibold text-[#141820]">Механизм: </strong>
                    {activeStrategy.mechanism}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4A5260]">
                    <strong className="font-semibold text-[#141820]">В инновациях: </strong>
                    {activeStrategy.innovationContext}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E4E2DC] pt-6">
              <h3 className="font-serif text-xl font-bold text-[#141820]">Заключение</h3>
              <p className="mt-3">
                В рыночной экономике полностью устранить риск и неопределённость невозможно, однако
                грамотная классификация внешних и внутренних факторов позволяет перевести
                неопределённость в управляемые риски. Системное применение инструментов
                риск-менеджмента даёт хозяйствующему субъекту возможность удерживать свою
                деятельность в зонах допустимого и умеренного риска, превращая инновационную
                активность в устойчивое конкурентное преимущество.
              </p>
            </div>
          </article>

          {/* Боковая колонка примечаний (Margin Notes) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-20 space-y-5">
              <div className="rounded-xl border border-[#E4E2DC] bg-[#F8F7F4] p-5">
                <p className="font-mono text-xs text-[#5B6472]">Ключевой тезис</p>
                <blockquote className="mt-2.5 border-t border-b border-[#D8D5CD] py-3 font-serif text-lg italic leading-snug text-[#141820]">
                  «Риск — это измеримая часть неопределённости, переведённая в язык вероятностей и
                  ожидаемых потерь.»
                </blockquote>
                <p className="mt-2.5 text-xs leading-relaxed text-[#4A5260]">
                  Переход от неопределённости к риску происходит в момент количественной оценки
                  сценариев и вероятностей p<sub>i</sub>.
                </p>
              </div>

              <div className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] p-5">
                <p className="font-mono text-xs text-[#5B6472]">Инструменты выявления</p>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#333B48]">
                  <li className="flex justify-between border-b border-[#E4E2DC] pb-1.5">
                    <span>SWOT-анализ</span>
                    <span className="font-mono text-[#5B6472]">Сильные/слабые стороны</span>
                  </li>
                  <li className="flex justify-between border-b border-[#E4E2DC] pb-1.5">
                    <span>Метод Дельфи</span>
                    <span className="font-mono text-[#5B6472]">Экспертная оценка</span>
                  </li>
                  <li className="flex justify-between border-b border-[#E4E2DC] pb-1.5">
                    <span>Карты потоков</span>
                    <span className="font-mono text-[#5B6472]">Сбои процессов</span>
                  </li>
                  <li className="flex justify-between border-b border-[#E4E2DC] pb-1.5">
                    <span>Опросные листы</span>
                    <span className="font-mono text-[#5B6472]">Чек-листы рисков</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Метод аналогий</span>
                    <span className="font-mono text-[#5B6472]">Опыт прошлых НИОКР</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
