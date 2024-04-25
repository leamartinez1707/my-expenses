import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"




export const ExpenseList = () => {

  const { state } = useBudget()

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

  return (
    <div className="mt-10 text-black">
      {isEmpty ? <p className="text-gray-600 text-2xl font bold">No hay gastos aún</p> :
        (
          <>
            <p className="text-gray-600 text-2xl font-bold my-5">Listado de mis gastos.</p>
            {state.expenses.map(exp => (

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
