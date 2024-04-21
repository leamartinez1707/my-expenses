import { ReactNode } from "react"


type ErrorProps = {
    children: ReactNode
}
export const Error = ({ children }: ErrorProps) => {
    return (
        <p className="bg-red-500 p-1 text-white font-bold text-sm text-center rounded-md ">
            {children}
        </p>
    )
}
