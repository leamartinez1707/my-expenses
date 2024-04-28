import { ChangeEvent } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'category-filter', payload: { id: e.target.value } })
    }
    return (
        <div
            className="bg-white shadow-lg rounded-lg p-10"
        >

            <form >
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar gastos</label>
                    <select id="category"
                        onChange={handleChange}
                        className="bg-slate-100 p-3 flex-1 rounded "
                    >
                        <option value="">-- Todas las categorías --</option>
                        {categories.map(cat => (
                            <option value={cat.id}
                                key={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
