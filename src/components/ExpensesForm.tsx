import { categories } from "../data/categories"
import type { DraftExpense, Value } from "../types";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { ChangeEvent, useState } from "react";
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
  const { dispatch } = useBudget()

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
    if (Object.values(expense).includes('')) {
      setError('All fields are obligatory')
      console.log(error)
      return
    }
    dispatch({ type: 'add-expense', payload: { expense } })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4">
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 py-2 border-red-500 "
      >
        Nuevo gasto
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
          onChange={handleChange}        >
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
        value={'Registrar gasto'} />
    </form>
  )
}
