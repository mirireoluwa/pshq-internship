interface Props {
  png: string
  alt?: string
}

const Flag = ({ png, alt = '' }: Props) => {
  return <img src = {png} alt = {alt} />
}

export default Flag;