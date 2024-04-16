import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export const BudgetForm = () => {


    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit} >

            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-red-600 font-bold text-center">
                    Define budget
                </label>
                <input
                    autoFocus
                    type="number"
                    id="budget"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define your budget"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                disabled={isValid}
                type="submit"
                value='Define budget'
                className="bg-red-600 hover:bg-red-700 cursor-pointer uppercase w-full p-2 text-white font-black disabled:opacity-40" />
        </form>
    )
}
