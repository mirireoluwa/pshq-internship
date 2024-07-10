import { ReactNode } from 'react'

interface Props {
  title: string
  text?: string
  children?: ReactNode
}

const InfoLine = ({ title, text = 'None', children}: Props) => {
  return children ? (
    <div className = "[ infoline ] [ cluster ] [ items-center ]">
      <span> {title}:</span> {children}
    </div>
  ) : (
    <p className = "infoline">
      <span> {title}: </span> {text}
    </p>
  )
}

export default InfoLine;