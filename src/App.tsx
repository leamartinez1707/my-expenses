import { useMemo } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker"
import { ExpensesModal } from "./components/ExpensesModal"
import { ExpenseList } from "./components/ExpenseList"

function App() {

  const { state } = useBudget()

  const isValidObject = useMemo(() => state.budget > 0, [state.budget])

  return (
    <>
      <div className="bg-red-600 py-8 max-h-72
      ">
        <h1 className='uppercase text-center font-black text-4xl text-white'>Mis gastos.</h1>
      </div>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10
      ">
        {isValidObject ? <BudgetTracker /> : <BudgetForm
        />}
      </div>

      {isValidObject && (
        <main className="max-w-3xl mx-auto py-10">

          <ExpenseList/>
          <ExpensesModal />

        </main>

      )}
    </>
  )
}

export default App
