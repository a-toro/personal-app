import { Progress } from "./ui/progress";

export default function Home() {
  return (
    <div className="w-full flex-1 ">
      <div className="flex gap-10">
        <div className="flex-1/2 flex flex-col gap-2">
          <section className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold opacity-65">Gastos</h1>
            <span className="text-xs text-slate-400 opacity-50">
              01 - 03 de marzo de 2025
            </span>
            <div className="h-40  rounded-xl border flex justify-center items-center"></div>
          </section>
          <section className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold text-slate-800">
              Últimos movimientos
            </h1>
            <article className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-slate-600">Hoy</h2>
              <ul className="flex flex-col gap-2">
                <li className="border-b pb-2 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full border bg-blue-500 flex items-center justify-center">
                      TM
                    </div>
                    <div className="flex flex-col h-full">
                      <span className="text-sm font-semibold text-slate-800">
                        Transporte
                      </span>
                      <span className="text-xs text-slate-400">
                        Descripción
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    25.000,00
                  </span>
                </li>
                <li className="border-b pb-2 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full border bg-blue-500 flex items-center justify-center">
                      TM
                    </div>
                    <div className="flex flex-col h-full">
                      <span className="text-sm font-semibold text-slate-800">
                        Transporte
                      </span>
                      <span className="text-xs text-slate-400">
                        Descripción
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    25.000,00
                  </span>
                </li>
                <li className="border-b pb-2 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full border bg-blue-500 flex items-center justify-center">
                      TM
                    </div>
                    <div className="flex flex-col h-full">
                      <span className="text-sm font-semibold text-slate-800">
                        Transporte
                      </span>
                      <span className="text-xs text-slate-400">
                        Descripción
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    25.000,00
                  </span>
                </li>
              </ul>
            </article>
            <article className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-slate-600">
                La semana pasada
              </h2>
              <ul className="flex flex-col gap-2">
                <li className="border-b pb-2 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full border bg-blue-500 flex items-center justify-center">
                      TM
                    </div>
                    <div className="flex flex-col h-full">
                      <span className="text-sm font-semibold text-slate-800">
                        Transporte
                      </span>
                      <span className="text-xs text-slate-400">
                        Descripción
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    25.000,00
                  </span>
                </li>
                <li className="border-b pb-2 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full border bg-blue-500 flex items-center justify-center">
                      TM
                    </div>
                    <div className="flex flex-col h-full">
                      <span className="text-sm font-semibold text-slate-800">
                        Transporte
                      </span>
                      <span className="text-xs text-slate-400">
                        Descripción
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    25.000,00
                  </span>
                </li>
                <li className="border-b pb-2 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full border bg-blue-500 flex items-center justify-center">
                      TM
                    </div>
                    <div className="flex flex-col h-full">
                      <span className="text-sm font-semibold text-slate-800">
                        Transporte
                      </span>
                      <span className="text-xs text-slate-400">
                        Descripción
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    25.000,00
                  </span>
                </li>
              </ul>
            </article>
          </section>
        </div>
        <div className="flex-1 hidden sm:flex">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold opacity-70">
              ¿Dondé gastas tú dinero?
            </h2>
            <div className="flex flex-col gap-2 text-sm text-slate-500 font-semibold">
              <div className="flex justify-between">
                <span>Alimentación</span>
                <span>150.000,0</span>
              </div>
              <Progress value={60} indicatorClassName="bg-yellow-500" />
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-500 font-semibold">
              <div className="flex justify-between">
                <span>Transporte</span>
                <span>200.000,0</span>
              </div>
              <Progress value={80} indicatorClassName="bg-yellow-500" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
