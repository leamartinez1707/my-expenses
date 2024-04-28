import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"




export const ExpenseList = () => {

  const { state } = useBudget()

  const filteredExpenses = state.currentCategory ? state.expenses.filter(exp => exp.category === state.currentCategory) : state.expenses
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])



  return (
    <div className="mt-10 text-black bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? <p className="text-gray-600 text-2xl font bold">No hay gastos aún</p> :
        (
          <>
            <p className="text-gray-600 text-2xl font-bold my-5">Listado de mis gastos.</p>
            {filteredExpenses.map(exp => (

              <ExpenseDetail key={exp.id}
                expense={exp}
              />
            ))}

          </>
        )

      }
    </div>
  )
}
