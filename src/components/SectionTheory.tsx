import { useState } from 'react';
import { FACTOR_ITEMS } from '../data/riskContent';

type FactorFilter = 'all' | 'external' | 'internal';

export function SectionTheory() {
  const [filter, setFilter] = useState<FactorFilter>('all');
  const [expandedFactorId, setExpandedFactorId] = useState<string | null>('ext-political');

  const filteredFactors = FACTOR_ITEMS.filter((item) =>
    filter === 'all' ? true : item.group === filter
  );

  const externalFactors = filteredFactors.filter((item) => item.group === 'external');
  const internalFactors = filteredFactors.filter((item) => item.group === 'internal');

  return (
    <section id="section-1" className="mx-auto max-w-[1180px] px-6 py-14 lg:py-16">
      <div className="border-b border-[#D8D5CD] pb-5">
        <p className="font-mono text-xs text-[#5B6472]">Раздел 01 · Теоретические основы</p>
        <h2 className="mt-1.5 font-serif text-2xl font-bold text-[#141820] sm:text-3xl">
          Вопросы для обсуждения
        </h2>
        <p className="mt-1 text-sm text-[#4A5260]">
          Ответы на вопросы № 1 и № 2 по материалам лекции и методических указаний
        </p>
      </div>

      {/* Вопрос 1 */}
      <div className="mt-10">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-mono text-xs font-semibold text-[#1E40AF]">Вопрос 01</span>
          <h3 className="text-xl font-bold text-[#141820]">
            Что такое риск и неопределённость?
          </h3>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] p-6">
            <p className="font-mono text-xs text-[#5B6472]">Категория А · Информационный дефицит</p>
            <h4 className="mt-2 font-serif text-xl font-semibold text-[#141820]">
              Неопределённость
            </h4>
            <p className="mt-3 text-[15px] leading-relaxed text-[#333B48]">
              Состояние неполноты, недостаточности или отсутствия информации об условиях реализации
              инновационного проекта и внешней среде, при котором невозможно точно предсказать
              наступление тех или иных событий и их исходы. Вероятности событий при «чистой»
              неопределённости не поддаются точной количественной оценке.
            </p>
          </article>

          <article className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] p-6">
            <p className="font-mono text-xs text-[#1E40AF]">Категория Б · Измеримая величина</p>
            <h4 className="mt-2 font-serif text-xl font-semibold text-[#141820]">
              Риск и риск инновационной деятельности
            </h4>
            <p className="mt-3 text-[15px] leading-relaxed text-[#333B48]">
              <strong className="font-semibold text-[#141820]">Риск</strong> (по лекции) —
              вероятность наступления неблагоприятных событий, ведущих к потерям, убытку. Это
              «измеримая» часть неопределённости, когда известны возможные исходы и их вероятности.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#333B48]">
              <strong className="font-semibold text-[#141820]">
                Риск инновационной деятельности
              </strong>{' '}
              — возможность получения результата, не обеспечивающего достижения поставленной цели,
              наносящего ущерб инициаторам инновационного процесса (или получение незапланированного
              отрицательного результата при внедрении инновации).
            </p>
          </article>
        </div>

        <div className="mt-5 grid grid-cols-1 divide-y divide-[#E4E2DC] rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] md:grid-cols-2 md:divide-y-0 md:divide-x">
          <div className="p-6">
            <p className="font-mono text-xs text-[#5B6472]">Элемент системы</p>
            <h4 className="mt-1.5 text-base font-bold text-[#141820]">Объект риска</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#4A5260]">
              То, на что направлено воздействие субъекта при принятии решения (инвестиции,
              инновационный проект, производственная система и т. п.).
            </p>
          </div>
          <div className="p-6">
            <p className="font-mono text-xs text-[#5B6472]">Элемент системы</p>
            <h4 className="mt-1.5 text-base font-bold text-[#141820]">Субъект риска</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#4A5260]">
              Физическое или юридическое лицо, занимающееся выполнением функций управления риском.
            </p>
          </div>
        </div>
      </div>

      {/* Вопрос 2 */}
      <div className="mt-14 border-t border-[#E4E2DC] pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-xs font-semibold text-[#1E40AF]">Вопрос 02</span>
              <h3 className="text-xl font-bold text-[#141820]">
                Внешние и внутренние факторы инновационных рисков
              </h3>
            </div>
            <p className="mt-1.5 text-sm text-[#4A5260]">
              Нажмите на любую группу факторов, чтобы увидеть прикладной пример из инновационной
              практики
            </p>
          </div>

          <div
            role="group"
            aria-label="Фильтр факторов риска"
            className="no-print inline-flex items-center gap-1 self-start rounded-lg border border-[#E4E2DC] bg-[#FFFFFF] p-1"
          >
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#141820] text-[#FFFFFF]'
                  : 'text-[#4A5260] hover:text-[#141820]'
              }`}
            >
              Все (6)
            </button>
            <button
              type="button"
              onClick={() => setFilter('external')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                filter === 'external'
                  ? 'bg-[#1E40AF] text-[#FFFFFF]'
                  : 'text-[#4A5260] hover:text-[#141820]'
              }`}
            >
              Внешние (4)
            </button>
            <button
              type="button"
              onClick={() => setFilter('internal')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                filter === 'internal'
                  ? 'bg-[#047857] text-[#FFFFFF]'
                  : 'text-[#4A5260] hover:text-[#141820]'
              }`}
            >
              Внутренние (2)
            </button>
          </div>
        </div>

        <div
          className={`mt-6 grid grid-cols-1 gap-6 ${
            filter === 'all' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
          }`}
        >
          {externalFactors.length > 0 && (
            <div className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E4E2DC] bg-[#F3F5F9] px-6 py-4">
                <div>
                  <h4 className="text-base font-bold text-[#141820]">Внешние факторы</h4>
                  <p className="text-xs text-[#5B6472]">Макро- и мезосреда · Не зависят от предприятия</p>
                </div>
                <span className="font-mono text-xs font-semibold text-[#1E40AF]">04 группы</span>
              </div>
              <div className="divide-y divide-[#E4E2DC]">
                {externalFactors.map((factor) => {
                  const isExpanded = expandedFactorId === factor.id;
                  return (
                    <div key={factor.id} className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setExpandedFactorId(isExpanded ? null : factor.id)}
                        aria-expanded={isExpanded}
                        className="flex w-full items-start justify-between gap-4 text-left cursor-pointer"
                      >
                        <div>
                          <span className="font-mono text-[11px] text-[#5B6472]">
                            {factor.category}
                          </span>
                          <h5 className="mt-0.5 text-sm font-bold text-[#141820]">
                            {factor.title}
                          </h5>
                        </div>
                        <span className="mt-1 font-mono text-xs text-[#1E40AF] whitespace-nowrap shrink-0">
                          {isExpanded ? 'Свернуть' : 'Пример'}
                        </span>
                      </button>
                      <p className="mt-2 text-sm leading-relaxed text-[#4A5260]">
                        {factor.description}
                      </p>
                      {isExpanded && (
                        <div className="mt-3 rounded-lg bg-[#F8F7F4] px-3.5 py-2.5 text-xs leading-relaxed text-[#141820]">
                          <strong className="font-semibold text-[#1E40AF]">Пример проявления: </strong>
                          {factor.example}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {internalFactors.length > 0 && (
            <div className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E4E2DC] bg-[#F2F7F5] px-6 py-4">
                <div>
                  <h4 className="text-base font-bold text-[#141820]">Внутренние факторы</h4>
                  <p className="text-xs text-[#5B6472]">Среда предприятия · Зона управляемого влияния</p>
                </div>
                <span className="font-mono text-xs font-semibold text-[#047857]">02 группы</span>
              </div>
              <div className="divide-y divide-[#E4E2DC]">
                {internalFactors.map((factor) => {
                  const isExpanded = expandedFactorId === factor.id;
                  return (
                    <div key={factor.id} className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setExpandedFactorId(isExpanded ? null : factor.id)}
                        aria-expanded={isExpanded}
                        className="flex w-full items-start justify-between gap-4 text-left cursor-pointer"
                      >
                        <div>
                          <span className="font-mono text-[11px] text-[#5B6472]">
                            {factor.category}
                          </span>
                          <h5 className="mt-0.5 text-sm font-bold text-[#141820]">
                            {factor.title}
                          </h5>
                        </div>
                        <span className="mt-1 font-mono text-xs text-[#047857] whitespace-nowrap shrink-0">
                          {isExpanded ? 'Свернуть' : 'Пример'}
                        </span>
                      </button>
                      <p className="mt-2 text-sm leading-relaxed text-[#4A5260]">
                        {factor.description}
                      </p>
                      {isExpanded && (
                        <div className="mt-3 rounded-lg bg-[#F8F7F4] px-3.5 py-2.5 text-xs leading-relaxed text-[#141820]">
                          <strong className="font-semibold text-[#047857]">Пример проявления: </strong>
                          {factor.example}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
