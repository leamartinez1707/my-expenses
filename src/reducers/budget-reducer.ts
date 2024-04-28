import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"


// El tipo de las acciones de budget reducer, acá se agregan todas las funciones que se quieren ejecutar con el comando Dispatch en los Componentes
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'category-filter', payload: { id: Category['id'] } }



// State [Estado] de Budget, se muestran todas las propiedades que va a tener el Estado
export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']

}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}
const initialExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

// Valores iniciales del Estado
export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategory: ''
}


// Funcion para crear un Gasto [Expense], De tipo DraftExpense y recibe [ : ] una Expense ( Gasto )
const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

// Inicializacion del Reducer, Estado de tipo BudgetState, con los valores de inicio InitialState. Acciones de tipo BudgetActions
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {

        return {

            ...state,
            budget: action.payload.budget
        }
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }
    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
        }
    }
    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(exp => exp.id !== action.payload.id),
        }
    }
    if (action.type === 'get-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }
    if (action.type === 'reset-app') {
        return {
            ...state,
            expenses: [],
            budget: 0
        }
    }
    if (action.type === 'category-filter') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}