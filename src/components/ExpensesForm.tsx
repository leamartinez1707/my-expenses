import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const ExpensesForm = () => {
  return (
    <form className="space-y-4">
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 py-2 border-red-500 "
      >
        Nuevo gasto
      </legend>
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
          minLength={0}
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
        >
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
          />
        </div>
      </div>

      <input type="text" className="bg-red-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg " value={'Registrar gasto'} />
    </form>
  )
}
