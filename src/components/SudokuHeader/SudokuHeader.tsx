import "./SudokuHeader.css"

export const SudokuHeader = () => {
  return (
    <div className="header-container">
      <div className="difficulty-row">
        <div>Dificultad</div>
        <div>Fácil</div>
        <div>Medio</div>
        <div>Difícil</div>
      </div>
      <div className="difficulty-row">
        <div>Errores: 0</div>
        <div>Puntuación: 1111</div>
        <div>Tiempo: 00:00</div>
      </div>
    </div>
  )
}
