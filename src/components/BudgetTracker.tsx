import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { AmountDisplay } from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"
import "react-circular-progressbar/dist/styles.css"

export const BudgetTracker = () => {

    const { state, remainingBudget, totalExpenses, dispatch } = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    const handleReset = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar la aplicación?')) {
            dispatch({ type: 'reset-app' })
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    className="max-w-sm"
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage > 80 ? '#DC2626' : '#32de84',
                        trailColor: '#F5F5F5',
                        textSize: 10,
                        textColor: 'black',
                    })}
                    text={`Gastado ${percentage}%`}
                />
            </div>
            <div className="flex flex-col justify-center gap-8">
                <button
                    type="button"
                    onClick={handleReset}
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-pink-600"
                >
                    Resetear App
                </button>
                <AmountDisplay
                    label="Presupuesto"
                    amount={Math.trunc(state.budget)}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>

        </div>
    )
}
