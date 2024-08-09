import { Cell } from "../Cell/Cell"
import "./Box.css"

interface CellProps {
  row: number
  col: number
  value: number
}
interface BoxProps {
  data: Array<CellProps>
}

export const Box = ({ data }: BoxProps) => {
  return (
    <div className="box">
      <div className="box-row">
        <Cell n={data[0].value} />
        <Cell n={data[1].value} />
        <Cell n={data[2].value} />
      </div>
      <div className="box-row">
        <Cell n={data[3].value} />
        <Cell n={data[4].value} />
        <Cell n={data[5].value} />
      </div>
      <div className="box-row">
        <Cell n={data[6].value} />
        <Cell n={data[7].value} />
        <Cell n={data[8].value} />
      </div>
    </div>
  )
}
