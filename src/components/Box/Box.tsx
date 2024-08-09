import { Cell } from "../Cell/Cell"
import "./Box.css"
import { CellProps } from "../Cell/Cell"

interface BoxProps {
  data: Array<CellProps>
}

export const Box = ({ data }: BoxProps) => {
  return (
    <div className="box">
      <div className="box-row">
        <Cell row={data[0].row} col={data[0].col} value={data[0].value} />
        <Cell row={data[1].row} col={data[1].col} value={data[1].value} />
        <Cell row={data[2].row} col={data[2].col} value={data[2].value} />
      </div>
      <div className="box-row">
        <Cell row={data[3].row} col={data[3].col} value={data[3].value} />
        <Cell row={data[4].row} col={data[4].col} value={data[4].value} />
        <Cell row={data[5].row} col={data[5].col} value={data[5].value} />
      </div>
      <div className="box-row">
        <Cell row={data[6].row} col={data[6].col} value={data[6].value} />
        <Cell row={data[7].row} col={data[7].col} value={data[7].value} />
        <Cell row={data[8].row} col={data[8].col} value={data[8].value} />
      </div>
    </div>
  )
}
