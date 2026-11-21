import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DEFAULT_PORTFOLIOS, type PortfolioInput } from '../data/riskContent';
import { PortfolioCharts, type ComputedPortfolio } from './PortfolioCharts';

type CalcMode = 'reference' | 'simulator';

export function SectionCalculation() {
  const [mode, setMode] = useState<CalcMode>('reference');
  const [simInputs, setSimInputs] = useState<PortfolioInput[]>(DEFAULT_PORTFOLIOS);

  const activeInputs = mode === 'reference' ? DEFAULT_PORTFOLIOS : simInputs;

  const computedPortfolios: ComputedPortfolio[] = useMemo(() => {
    const raw = activeInputs.map((item) => {
      const safeProjects = Math.max(1, item.projects);
      const safeFails = Math.min(safeProjects, Math.max(0, item.fails));
      const riskProb = safeFails / safeProjects;
      const riskPct = riskProb * 100;
      const mp = item.cost * riskProb;
      return {
        ...item,
        projects: safeProjects,
        fails: safeFails,
        riskProb,
        riskPct,
        mp,
      };
    });

    const minMp = Math.min(...raw.map((p) => p.mp));
    const winnerId =
      raw.find((p) => p.mp === minMp)?.id ?? raw[0].id;

    return raw.map((p) => ({
      ...p,
      isWinner: p.id === winnerId,
    }));
  }, [activeInputs]);

  const winner = computedPortfolios.find((p) => p.isWinner) ?? computedPortfolios[1];

  const updatePortfolio = (
    id: number,
    field: 'cost' | 'projects' | 'fails',
    value: number
  ) => {
    setSimInputs((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === 'projects') {
          const nextProjects = Math.max(1, Math.min(30, value));
          return {
            ...item,
            projects: nextProjects,
            fails: Math.min(item.fails, nextProjects),
          };
        }
        if (field === 'fails') {
          return {
            ...item,
            fails: Math.max(0, Math.min(item.projects, value)),
          };
        }
        return {
          ...item,
          cost: Math.max(200, Math.min(5000, value)),
        };
      })
    );
  };

  const resetSimulator = () => {
    setSimInputs(DEFAULT_PORTFOLIOS);
  };

  return (
    <section id="section-3" className="mx-auto max-w-[1180px] px-6 py-14 lg:py-16">
      <div className="flex flex-col gap-4 border-b border-[#D8D5CD] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[#5B6472]">Раздел 03 · Практическое задание</p>
          <h2 className="mt-1.5 font-serif text-2xl font-bold text-[#141820] sm:text-3xl">
            Расчётное задание — Задача № 1
          </h2>
          <p className="mt-1 text-sm text-[#4A5260]">
            Оценка меры риска и выбор наиболее перспективного инвестиционного портфеля (табл. 7.1)
          </p>
        </div>

        <div className="no-print flex items-center gap-2 self-start">
          <div
            role="group"
            aria-label="Режим расчёта"
            className="inline-flex items-center gap-1 rounded-lg border border-[#E4E2DC] bg-[#FFFFFF] p-1"
          >
            <button
              type="button"
              onClick={() => setMode('reference')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                mode === 'reference'
                  ? 'bg-[#141820] text-[#FFFFFF]'
                  : 'text-[#4A5260] hover:text-[#141820]'
              }`}
            >
              Данные табл. 7.1
            </button>
            <button
              type="button"
              onClick={() => setMode('simulator')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                mode === 'simulator'
                  ? 'bg-[#1E40AF] text-[#FFFFFF]'
                  : 'text-[#4A5260] hover:text-[#141820]'
              }`}
            >
              Симулятор «Что если»
            </button>
          </div>

          {mode === 'simulator' && (
            <button
              type="button"
              onClick={resetSimulator}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E2DC] bg-[#FFFFFF] px-3 py-2 text-xs font-semibold text-[#141820] whitespace-nowrap shrink-0 hover:border-[#141820] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Сбросить</span>
            </button>
          )}
        </div>
      </div>

      {/* Условие и методическая формула */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] p-6">
          <p className="font-mono text-xs text-[#5B6472]">Условие задачи</p>
          <p className="mt-2.5 text-sm leading-relaxed text-[#2A313D]">
            Определите меру риска как наиболее ожидаемый плановый результат (ожидаемые потери),
            который возможно получить в ходе реализации инновационного проекта. Выберите наиболее
            перспективный инвестиционный портфель инновационных проектов на основании исходных
            данных таблицы 7.1.
          </p>
        </div>

        <div className="lg:col-span-7 rounded-xl bg-[#141820] p-6 text-[#F8F7F4]">
          <p className="font-mono text-xs text-[#9CA3AF]">
            Методика расчёта (математическое ожидание потерь)
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-lg font-medium tracking-tight text-[#FFFFFF]">
            <span>
              M<sub>p</sub> = &Sigma; x<sub>i</sub> &middot; p<sub>i</sub> = (&Sigma; x<sub>i</sub>{' '}
              &middot; v<sub>i</sub>) / (&Sigma; v<sub>i</sub>)
            </span>
            <span className="text-[#9CA3AF]">|</span>
            <span>
              p<sub>i</sub> = v<sub>i</sub> / N
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#CBD5E1]">
            где <strong className="text-[#FFFFFF]">M<sub>p</sub></strong> — мера риска (тыс. руб.
            на 1 проект); <strong className="text-[#FFFFFF]">x<sub>i</sub></strong> — средние
            затраты на проект (потери при неудаче, тыс. руб.);{' '}
            <strong className="text-[#FFFFFF]">v<sub>i</sub></strong> — число возможных неудач;{' '}
            <strong className="text-[#FFFFFF]">N</strong> — общее число проектов в портфеле;{' '}
            <strong className="text-[#FFFFFF]">p<sub>i</sub></strong> — степень риска (вероятность
            неудачи).
          </p>
        </div>
      </div>

      {/* Интерактивные параметры (если включён симулятор) */}
      {mode === 'simulator' && (
        <div className="no-print mt-6 rounded-xl border border-[#1E40AF]/30 bg-[#EFF6FF]/60 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-bold text-[#141820]">
              Интерактивное моделирование параметров портфелей
            </h3>
            <span className="text-xs text-[#4A5260]">
              Изменяйте значения — расчёты, графики и оптимальный выбор обновляются мгновенно
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {simInputs.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-[#E4E2DC] bg-[#FFFFFF] p-4 space-y-3"
              >
                <div className="font-semibold text-sm text-[#141820]">{p.name}</div>
                <label className="block text-xs text-[#4A5260]">
                  <span className="flex justify-between tabular-nums">
                    <span>Затраты x<sub>i</sub> (тыс. руб.)</span>
                    <strong className="font-mono text-[#141820]">{p.cost}</strong>
                  </span>
                  <input
                    type="range"
                    min={500}
                    max={3500}
                    step={50}
                    value={p.cost}
                    onChange={(e) => updatePortfolio(p.id, 'cost', Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#1E40AF] cursor-pointer"
                  />
                </label>

                <label className="block text-xs text-[#4A5260]">
                  <span className="flex justify-between tabular-nums">
                    <span>Число проектов N</span>
                    <strong className="font-mono text-[#141820]">{p.projects}</strong>
                  </span>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    step={1}
                    value={p.projects}
                    onChange={(e) => updatePortfolio(p.id, 'projects', Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#1E40AF] cursor-pointer"
                  />
                </label>

                <label className="block text-xs text-[#4A5260]">
                  <span className="flex justify-between tabular-nums">
                    <span>Возможные неудачи v<sub>i</sub></span>
                    <strong className="font-mono text-[#141820]">{p.fails}</strong>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={p.projects}
                    step={1}
                    value={p.fails}
                    onChange={(e) => updatePortfolio(p.id, 'fails', Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#DC2626] cursor-pointer"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Пошаговые карточки расчёта */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {computedPortfolios.map((p) => (
          <div
            key={p.id}
            className={`rounded-xl border p-6 transition-colors ${
              p.isWinner
                ? 'border-[#047857] bg-[#ECFDF5]/65'
                : 'border-[#E4E2DC] bg-[#FFFFFF]'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg font-bold text-[#141820]">{p.name}</h3>
              <span
                className={`font-mono text-xs font-semibold whitespace-nowrap ${
                  p.isWinner ? 'text-[#047857]' : 'text-[#5B6472]'
                }`}
              >
                {p.isWinner ? 'Оптимальный' : `${p.projects} проектов`}
              </span>
            </div>

            <dl className="mt-4 space-y-2 text-sm tabular-nums">
              <div className="flex justify-between gap-2">
                <dt className="text-[#4A5260]">Затраты на 1 проект:</dt>
                <dd className="font-mono font-medium text-[#141820]">
                  {p.cost.toLocaleString('ru-RU')} тыс. руб.
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#4A5260]">Возможных неудач:</dt>
                <dd className="font-mono font-medium text-[#141820]">
                  {p.fails} из {p.projects}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#4A5260]">Степень риска p<sub>{p.id}</sub>:</dt>
                <dd className="font-mono font-medium text-[#141820]">
                  {p.riskProb.toFixed(2).replace('.', ',')} ({p.riskPct.toFixed(0)}%)
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#4A5260]">Формула:</dt>
                <dd className="font-mono text-xs text-[#5B6472]">
                  {p.cost} &times; {p.riskProb.toFixed(2).replace('.', ',')}
                </dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-[#E4E2DC] pt-3.5 flex items-baseline justify-between">
              <span className="text-xs font-semibold text-[#4A5260]">
                Мера риска M<sub>p{p.id}</sub>
              </span>
              <span
                className={`font-mono text-lg font-bold tabular-nums ${
                  p.isWinner ? 'text-[#047857]' : 'text-[#141820]'
                }`}
              >
                {Math.round(p.mp).toLocaleString('ru-RU')} тыс. руб.
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Графики */}
      <PortfolioCharts portfolios={computedPortfolios} />

      {/* Итоговая таблица 7.1 */}
      <div className="mt-8 overflow-hidden rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] print-break-inside-avoid">
        <div className="border-b border-[#E4E2DC] px-6 py-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-[#141820]">
            Сводная таблица расчётов (Таблица 7.1)
          </h3>
          <span className="font-mono text-xs text-[#5B6472]">Ед. изм.: тыс. руб.</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm tabular-nums">
            <thead>
              <tr className="border-b border-[#E4E2DC] bg-[#F8F7F4] text-xs font-semibold text-[#4A5260]">
                <th className="px-5 py-3.5 text-left">Инвестиционный портфель</th>
                <th className="px-4 py-3.5 text-right">Средние затраты (x<sub>i</sub>)</th>
                <th className="px-4 py-3.5 text-right">Число проектов (N)</th>
                <th className="px-4 py-3.5 text-right">Возможные неудачи (v<sub>i</sub>)</th>
                <th className="px-4 py-3.5 text-right">Степень риска (p<sub>i</sub>)</th>
                <th className="px-5 py-3.5 text-right">Мера риска (M<sub>p</sub>)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DC]">
              {computedPortfolios.map((p) => (
                <tr
                  key={p.id}
                  className={p.isWinner ? 'bg-[#ECFDF5]/60 font-semibold' : 'hover:bg-[#F8F7F4]/60'}
                >
                  <td className="px-5 py-3.5 text-left text-[#141820]">
                    <span>{p.name}</span>
                    {p.isWinner && (
                      <span className="ml-2 font-mono text-xs font-bold text-[#047857]">
                        · Выбор
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[#141820]">
                    {p.cost.toLocaleString('ru-RU')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[#141820]">
                    {p.projects}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[#141820]">
                    {p.fails}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[#141820]">
                    {p.riskProb.toFixed(2).replace('.', ',')} ({p.riskPct.toFixed(0)}%)
                  </td>
                  <td
                    className={`px-5 py-3.5 text-right font-mono font-bold ${
                      p.isWinner ? 'text-[#047857]' : 'text-[#141820]'
                    }`}
                  >
                    {Math.round(p.mp).toLocaleString('ru-RU')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Итоговый вывод */}
      <div
        id="conclusion-box"
        className="mt-8 rounded-xl border border-[#047857]/35 bg-[#ECFDF5]/70 p-6 lg:p-7 print-break-inside-avoid"
      >
        <p className="font-mono text-xs font-semibold text-[#047857]">
          Итоговый вывод по Задаче № 1
        </p>
        <h3 className="mt-1.5 font-serif text-xl font-bold text-[#141820]">
          Наиболее перспективен — {winner.name}
        </h3>

        {mode === 'reference' ? (
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#2A313D]">
            <li>
              <strong className="font-semibold text-[#141820]">Минимальная мера риска:</strong>{' '}
              ожидаемые потери на один проект составляют{' '}
              <strong className="font-mono text-[#047857]">330 тыс. руб.</strong> (против 450 тыс.
              руб. в портфеле № 1 и 490 тыс. руб. в портфеле № 3).
            </li>
            <li>
              <strong className="font-semibold text-[#141820]">
                Минимальная вероятность неудачи:
              </strong>{' '}
              степень риска равна <strong className="font-mono text-[#047857]">20%</strong> (наравне
              с портфелем № 3 и на 5 п.п. ниже, чем у портфеля № 1).
            </li>
            <li>
              <strong className="font-semibold text-[#141820]">Наилучшая диверсификация:</strong>{' '}
              портфель содержит <strong className="font-mono text-[#047857]">10 проектов</strong> с
              наименьшей средней стоимостью одного проекта (1 650 тыс. руб.), что снижает
              концентрацию риска.
            </li>
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-[#2A313D]">
            При заданных параметрах симуляции минимальную меру риска обеспечивает{' '}
            <strong className="font-semibold text-[#141820]">{winner.name}</strong> с ожидаемыми
            потерями{' '}
            <strong className="font-mono text-[#047857]">
              {Math.round(winner.mp).toLocaleString('ru-RU')} тыс. руб.
            </strong>{' '}
            на проект при степени риска{' '}
            <strong className="font-mono text-[#047857]">{winner.riskPct.toFixed(0)}%</strong> и
            диверсификации по <strong className="font-mono">{winner.projects}</strong> проектам.
          </p>
        )}
      </div>
    </section>
  );
}
