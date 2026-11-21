import { useState } from 'react';

export interface ComputedPortfolio {
  id: number;
  name: string;
  cost: number;
  projects: number;
  fails: number;
  riskProb: number;
  riskPct: number;
  mp: number;
  isWinner: boolean;
}

interface PortfolioChartsProps {
  portfolios: ComputedPortfolio[];
}

export function PortfolioCharts({ portfolios }: PortfolioChartsProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const activePortfolio =
    portfolios.find((p) => p.id === hoveredId) ??
    portfolios.find((p) => p.isWinner) ??
    portfolios[0];

  // Chart 1 scaling
  const maxCostOrMp = Math.max(2600, ...portfolios.map((p) => Math.ceil((p.cost + 250) / 500) * 500));
  const yTicks1 = [0, 0.2, 0.4, 0.6, 0.8, 1].map((r) => Math.round(r * maxCostOrMp));
  const c1Top = 24;
  const c1Bottom = 212;
  const c1Height = c1Bottom - c1Top;

  // Chart 2 scaling
  const maxProjects = Math.max(10, ...portfolios.map((p) => p.projects));
  const c2StartX = 112;
  const c2MaxBarW = 246;
  const xTicks2 = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round(r * maxProjects));

  // Chart 3 (Bubble scatter: X = riskPct, Y = cost)
  const minRisk = 0;
  const maxRisk = Math.max(35, ...portfolios.map((p) => Math.ceil((p.riskPct + 5) / 5) * 5));
  const minCost = 1000;
  const maxCost = Math.max(2800, ...portfolios.map((p) => Math.ceil((p.cost + 300) / 500) * 500));
  const plotLeft = 64;
  const plotRight = 430;
  const plotTop = 26;
  const plotBottom = 205;

  return (
    <div id="charts-analytics" className="mt-8 space-y-6 print-break-inside-avoid">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[#5B6472]">Визуальный анализ · Интерактивные графики</p>
          <h3 className="mt-1 font-serif text-xl font-bold text-[#141820]">
            Сравнение портфелей по затратам, структуре и мере риска
          </h3>
        </div>
        <div className="rounded-lg border border-[#E4E2DC] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#333B48] tabular-nums">
          <span className="font-mono text-[#5B6472]">Фокус: </span>
          <strong className="font-semibold text-[#141820]">{activePortfolio.name}</strong>
          <span className="mx-1.5 text-[#9CA3AF]">·</span>
          <span>
            M<sub>p</sub> = {Math.round(activePortfolio.mp).toLocaleString('ru-RU')} тыс. руб.
          </span>
          <span className="mx-1.5 text-[#9CA3AF]">·</span>
          <span>p = {activePortfolio.riskPct.toFixed(1).replace('.0', '')}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* График 1: Мера риска и средние затраты */}
        <div className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-[#141820]">
                График 1. Мера риска (M<sub>p</sub>) и затраты на проект
              </h4>
              <p className="mt-0.5 text-xs text-[#5B6472]">
                Сопоставление средних затрат на 1 проект и ожидаемых потерь (тыс. руб.)
              </p>
            </div>
          </div>

          <svg
            viewBox="0 0 460 250"
            className="mt-4 w-full h-auto overflow-visible"
            role="img"
            aria-label="Сравнение средних затрат на проект и меры риска портфелей"
          >
            {yTicks1.map((val) => {
              const y = c1Bottom - (val / maxCostOrMp) * c1Height;
              return (
                <g key={val}>
                  <line
                    x1={52}
                    y1={y}
                    x2={446}
                    y2={y}
                    stroke="#E4E2DC"
                    strokeDasharray={val === 0 ? undefined : '4 4'}
                  />
                  <text
                    x={45}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-[#5B6472] font-mono text-[10.5px] tabular-nums"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {portfolios.map((p, idx) => {
              const groupX = 82 + idx * 124;
              const barW = 34;
              const costH = Math.max(4, (p.cost / maxCostOrMp) * c1Height);
              const costY = c1Bottom - costH;
              const mpH = Math.max(4, (p.mp / maxCostOrMp) * c1Height);
              const mpY = c1Bottom - mpH;
              const isDimmed = hoveredId !== null && hoveredId !== p.id;

              return (
                <g
                  key={p.id}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer transition-opacity duration-150"
                  style={{ opacity: isDimmed ? 0.45 : 1 }}
                >
                  <rect
                    x={groupX}
                    y={costY}
                    width={barW}
                    height={costH}
                    rx={5}
                    fill="#CBD5E1"
                  />
                  <text
                    x={groupX + barW / 2}
                    y={costY - 6}
                    textAnchor="middle"
                    className="fill-[#4A5260] font-mono text-[10.5px] font-semibold tabular-nums"
                  >
                    {p.cost}
                  </text>

                  <rect
                    x={groupX + barW + 8}
                    y={mpY}
                    width={barW}
                    height={mpH}
                    rx={5}
                    fill={p.isWinner ? '#047857' : '#1E40AF'}
                  />
                  <text
                    x={groupX + barW + 8 + barW / 2}
                    y={mpY - 6}
                    textAnchor="middle"
                    className={`font-mono text-[11px] font-bold tabular-nums ${
                      p.isWinner ? 'fill-[#047857]' : 'fill-[#1E40AF]'
                    }`}
                  >
                    {Math.round(p.mp)}
                  </text>

                  <text
                    x={groupX + barW + 4}
                    y={234}
                    textAnchor="middle"
                    className={`text-[11.5px] font-semibold ${
                      p.isWinner ? 'fill-[#047857]' : 'fill-[#141820]'
                    }`}
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-[#E4E2DC] pt-3 text-xs text-[#4A5260]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#CBD5E1]" />
              Средние затраты (x<sub>i</sub>)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#1E40AF]" />
              Мера риска M<sub>p</sub>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#047857]" />
              Минимальная мера риска (оптимум)
            </span>
          </div>
        </div>

        {/* График 2: Структура портфелей */}
        <div className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] p-6">
          <div>
            <h4 className="text-base font-bold text-[#141820]">
              График 2. Структура портфелей и степень риска (p<sub>i</sub>)
            </h4>
            <p className="mt-0.5 text-xs text-[#5B6472]">
              Соотношение успешных и потенциально неудачных проектов в портфеле
            </p>
          </div>

          <svg
            viewBox="0 0 460 250"
            className="mt-4 w-full h-auto overflow-visible"
            role="img"
            aria-label="Структура успешных и рисковых проектов по портфелям"
          >
            {xTicks2.map((val) => {
              const x = c2StartX + (val / maxProjects) * c2MaxBarW;
              return (
                <g key={val}>
                  <line
                    x1={x}
                    y1={24}
                    x2={x}
                    y2={202}
                    stroke="#E4E2DC"
                    strokeDasharray={val === 0 ? undefined : '4 4'}
                  />
                  <text
                    x={x}
                    y={222}
                    textAnchor="middle"
                    className="fill-[#5B6472] font-mono text-[10.5px] tabular-nums"
                  >
                    {val} пр.
                  </text>
                </g>
              );
            })}

            {portfolios.map((p, idx) => {
              const y = 38 + idx * 56;
              const barH = 32;
              const successCount = Math.max(0, p.projects - p.fails);
              const successW = (successCount / maxProjects) * c2MaxBarW;
              const failW = (p.fails / maxProjects) * c2MaxBarW;
              const isDimmed = hoveredId !== null && hoveredId !== p.id;

              return (
                <g
                  key={p.id}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer transition-opacity duration-150"
                  style={{ opacity: isDimmed ? 0.45 : 1 }}
                >
                  <text
                    x={c2StartX - 12}
                    y={y + 20}
                    textAnchor="end"
                    className={`text-[12px] font-semibold ${
                      p.isWinner ? 'fill-[#047857]' : 'fill-[#141820]'
                    }`}
                  >
                    {p.name}
                  </text>

                  {successW > 0 && (
                    <rect
                      x={c2StartX}
                      y={y}
                      width={successW}
                      height={barH}
                      rx={5}
                      fill="#059669"
                    />
                  )}
                  {successW > 26 && (
                    <text
                      x={c2StartX + successW / 2}
                      y={y + 20}
                      textAnchor="middle"
                      className="fill-[#FFFFFF] font-mono text-[11px] font-semibold tabular-nums"
                    >
                      {successCount}
                    </text>
                  )}

                  {failW > 0 && (
                    <rect
                      x={c2StartX + successW + (successW > 0 ? 3 : 0)}
                      y={y}
                      width={failW}
                      height={barH}
                      rx={5}
                      fill="#DC2626"
                    />
                  )}
                  {failW > 20 && (
                    <text
                      x={c2StartX + successW + (successW > 0 ? 3 : 0) + failW / 2}
                      y={y + 20}
                      textAnchor="middle"
                      className="fill-[#FFFFFF] font-mono text-[11px] font-semibold tabular-nums"
                    >
                      {p.fails}
                    </text>
                  )}

                  <text
                    x={c2StartX + successW + failW + 14}
                    y={y + 20}
                    className="fill-[#333B48] font-mono text-[11.5px] font-semibold tabular-nums"
                  >
                    Риск {p.riskPct.toFixed(0)}%
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-[#E4E2DC] pt-3 text-xs text-[#4A5260]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#059669]" />
              Успешные проекты (N − v<sub>i</sub>)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#DC2626]" />
              Возможные неудачи (v<sub>i</sub>)
            </span>
          </div>
        </div>
      </div>

      {/* График 3: Матрица Risk vs Cost + диверсификация */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FFFFFF] p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-base font-bold text-[#141820]">
              График 3. Позиционная матрица «Степень риска — Затраты — Диверсификация»
            </h4>
            <p className="mt-0.5 text-xs text-[#5B6472]">
              Размер окружности соответствует числу проектов N в портфеле. Левый нижний квадрант — зона минимальных потерь.
            </p>
          </div>
          <span className="font-mono text-xs text-[#047857] whitespace-nowrap shrink-0">
            Оптимум: минимум p<sub>i</sub> и x<sub>i</sub>
          </span>
        </div>

        <svg
          viewBox="0 0 480 235"
          className="mt-4 w-full max-w-[740px] h-auto overflow-visible"
          role="img"
          aria-label="Позиционная матрица степень риска и средние затраты портфелей"
        >
          {/* Оптимальная зона подсветка */}
          <rect
            x={plotLeft}
            y={(plotTop + plotBottom) / 2}
            width={(plotRight - plotLeft) * 0.62}
            height={(plotBottom - plotTop) / 2}
            fill="#ECFDF5"
            rx={6}
          />
          <text
            x={plotLeft + 10}
            y={plotBottom - 10}
            className="fill-[#047857] text-[10.5px] font-semibold"
          >
            Целевая зона (низкие затраты и риск)
          </text>

          {/* Горизонтальные линии (Затраты) */}
          {[1000, 1500, 2000, 2500, maxCost].map((val) => {
            const y = plotBottom - ((val - minCost) / (maxCost - minCost)) * (plotBottom - plotTop);
            return (
              <g key={val}>
                <line
                  x1={plotLeft}
                  y1={y}
                  x2={plotRight}
                  y2={y}
                  stroke="#E4E2DC"
                  strokeDasharray="4 4"
                />
                <text
                  x={plotLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#5B6472] font-mono text-[10px] tabular-nums"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Вертикальные линии (Риск %) */}
          {[0, 10, 20, 30, maxRisk].map((pct) => {
            const x = plotLeft + ((pct - minRisk) / (maxRisk - minRisk)) * (plotRight - plotLeft);
            return (
              <g key={pct}>
                <line
                  x1={x}
                  y1={plotTop}
                  x2={x}
                  y2={plotBottom}
                  stroke="#E4E2DC"
                  strokeDasharray="4 4"
                />
                <text
                  x={x}
                  y={plotBottom + 18}
                  textAnchor="middle"
                  className="fill-[#5B6472] font-mono text-[10px] tabular-nums"
                >
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* Оси */}
          <line x1={plotLeft} y1={plotBottom} x2={plotRight} y2={plotBottom} stroke="#9CA3AF" />
          <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotBottom} stroke="#9CA3AF" />

          <text
            x={(plotLeft + plotRight) / 2}
            y={233}
            textAnchor="middle"
            className="fill-[#4A5260] text-[10.5px] font-medium"
          >
            Степень риска pᵢ (%)
          </text>

          {/* Пузыри портфелей */}
          {portfolios.map((p) => {
            const cx =
              plotLeft +
              (Math.min(maxRisk, Math.max(minRisk, p.riskPct)) / (maxRisk - minRisk)) *
                (plotRight - plotLeft);
            const clampedCost = Math.min(maxCost, Math.max(minCost, p.cost));
            const cy =
              plotBottom - ((clampedCost - minCost) / (maxCost - minCost)) * (plotBottom - plotTop);
            const r = 10 + Math.sqrt(p.projects) * 3.8;
            const isDimmed = hoveredId !== null && hoveredId !== p.id;

            return (
              <g
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-opacity duration-150"
                style={{ opacity: isDimmed ? 0.4 : 1 }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={p.isWinner ? '#047857' : '#1E40AF'}
                  fillOpacity={0.16}
                  stroke={p.isWinner ? '#047857' : '#1E40AF'}
                  strokeWidth={2}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  className={`font-mono text-[11px] font-bold tabular-nums ${
                    p.isWinner ? 'fill-[#047857]' : 'fill-[#1E40AF]'
                  }`}
                >
                  N={p.projects}
                </text>
                <text
                  x={cx}
                  y={cy - r - 6}
                  textAnchor="middle"
                  className="fill-[#141820] text-[11px] font-semibold"
                >
                  {p.name} ({Math.round(p.mp)} тыс.)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
