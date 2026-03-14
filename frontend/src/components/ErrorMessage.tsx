interface Props {
  children: React.ReactNode
}

const ErrorMessage = ({ children }: Props) => {
  return (
    <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold texr-center">{children}</p>
  )
}

export default ErrorMessage