import { categories } from "../data/categories"
import type { DraftExpense, Value } from "../types";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { ChangeEvent, useEffect, useState } from "react";
import { Error } from "./Error";
import { useBudget } from "../hooks/useBudget";

export const ExpensesForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })
  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const { dispatch, state, remainingBudget } = useBudget()


  useEffect(() => {

    if (state.editingId) {
      const editingExpense = state.expenses.filter(exp => exp.id === state.editingId)[0]
      setPreviousAmount(editingExpense.amount)
      setExpense(editingExpense)
    }
  }, [state.editingId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmount = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name]: isAmount ? +value : value
    })

  }
  const handleCangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Valida si todos los campos estan completos
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios!')
      return
    }

    // Validar que no se exceda del presupuesto definido

    if ((expense.amount - previousAmount) > remainingBudget) {
      setError(`El gasto excede el presupuesto. Disponible $${remainingBudget}`)
      return
    }

    // Agregar o actualizar un nuevo gasto
    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })

    }

    // Reiniciar state expense con valores en 0
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })
    setPreviousAmount(0)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4">
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 py-2 border-red-500 "
      >
        {state.editingId ? 'Modificar gasto' : 'Nuevo gasto'}
      </legend>
      {error && <Error>{error}</Error>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName"
          className="text-xl "
        >
          Nombre gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          onChange={handleChange}
          value={expense.expenseName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount"
          className="text-xl "
        >
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Cantidad del gasto. Ej: 200"
          className="bg-slate-100 p-2"
          name="amount"
          min={0}
          onChange={handleChange}
          value={expense.amount}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category"
          className="text-xl "
        >
          Categorias:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          onChange={handleChange}
          value={expense.category}      >
          <option value="">-- Selecione --</option>
          {categories.map(cat => (
            <option
              key={cat.id}
              value={cat.id}>
              {cat.name}
            </option>

          ))}
        </select>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount"
            className="text-xl "
          >
            Fecha gasto:
          </label>
          <DatePicker
            className="bg-slate-100 p-2 border-0"
            onChange={handleCangeDate}
            value={expense.date}
          />
        </div>
      </div>

      <input
        type="submit"
        className="bg-black hover:bg-gray-700 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg "
        value={state.editingId ? 'Guardar cambios' : 'Registrar gasto'} />
    </form>
  )
}
