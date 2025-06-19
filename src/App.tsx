import { useMemo, useEffect } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker"
import { ExpensesModal } from "./components/ExpensesModal"
import { ExpenseList } from "./components/ExpenseList"
import { FilterByCategory } from "./components/FilterByCategory"

function App() {

  const { state } = useBudget()

  const isValidObject = useMemo(() => state.budget > 0, [state.budget])


  // Se convierte budget a String porque LocalStorage no permite números, solo Strings
  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])



  return (
    <>
      <div className="bg-red-600 py-8 lg:max-h-72 flex flex-col items-center justify-center gap-y-4 p-4">
        <h1 className='uppercase text-center font-black text-4xl text-white'>Controlá tus gastos diarios</h1>
        <p className="text-2xl text-center text-white font-thin">Definí un presupuesto final, y día a día agregá todo lo que vayas gastando, para llevar un control de tu presupuesto.</p>
        <p className="text-2xl text-center text-white font-thin">Toda la información es guardada en tu navegador, si borras el historial o los datos de esta página, probablemente perderas lo que has cargado.</p>

      </div>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg lg:mt-10 px-10 py-8 mb-10
      ">
        {isValidObject && (
          <>
            <h2 className="text-3xl font-black text-center mb-4">Presupuesto</h2>
            <p className="text-center font-light text-xl mb-10 flex flex-col"><span className="font-black">Importante</span> Precisas editar o borrar uno de tus gastos? Simplemente arrastralo hacía la izquierda para borrar, o hacía la derecha para editar.</p>
          </>
        )}
        {isValidObject ? <BudgetTracker /> : <BudgetForm
        />}
      </div>

      {isValidObject && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpensesModal />

        </main>

      )}
    </>
  )
}

export default App
