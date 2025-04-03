import LogoutButton from "@/components/auth/LogoutButton";
// import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-col p-5">
      <div className="flex flex-row flex-1">
        <aside className="w-50 border overflow-y-auto px-2 py-3 rounded-xl">
          <nav>
            <div className="flex flex-col">
              <p className="text-xs text-slate-400">Gastos</p>
              <ul className="flex flex-col gap-1">
                <li className="pl-2 border rounded-sm flex flex-row justify-start items-center px-4 py-1">
                  <Link
                    to={"/gastos"}
                    className="text-sm text-slate-500 font-semibold"
                  >
                    Nuevo gasto
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categorias"}
                    className="pl-2 text-sm text-slate-500 font-semibold"
                  >
                    Categorias
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        <div className="w-full">
          <header className="w-full flex justify-end">
            <LogoutButton />
          </header>
          <main className="p-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
