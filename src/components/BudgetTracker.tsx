import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { AmountDisplay } from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"
import "react-circular-progressbar/dist/styles.css"

export const BudgetTracker = () => {

    const { state, remainingBudget, totalExpenses, dispatch } = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

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
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    onClick={() => dispatch({ type: 'reset-app' })}
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
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
