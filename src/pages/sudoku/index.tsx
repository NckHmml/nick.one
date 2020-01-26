import * as React from "react";
import { Helmet } from "react-helmet";

import { I18N } from "~/components/i18n";
import { SudokuCell } from "./partials/cell";
import { SudokuSolver } from "./solver";

interface ISudokuState {
  valids: Array<Array<boolean>>;
  field: Array<Array<number>>;
}

export class SudokuPage extends React.Component<{}, ISudokuState> {
  public state: ISudokuState = {
    valids: new Array<Array<boolean>>(),
    field: new Array<Array<number>>()
  };

  /**
   * Renders a cell with a value
   * @param value value of the cell
   * @param x column number
   * @param y row number
   */
  private renderCell(value: number, x: number, y: number) {
    return (
      <td key={x}>
        <SudokuCell
          valid={this.state.valids[y][x]}
          value={value}
          onChange={this.setCell(x, y)}
        />
      </td>
    );
  }

  /**
   * Provides a callback to set the value of a cell
   * @param x column number
   * @param y row number
   */
  private setCell(x: number, y: number) {
    return (value: number) => {
      const { field, valids } = this.state;
      field[y][x] = value;
      SudokuSolver.checkValids(field, valids);

      this.setState({ field, valids });
    };
  }

  /**
   * Renders all sudoku cells
   */
  private renderCells = () => {
    const { field } = this.state;
    if (field.length === 0) return null;
    // Generate and fill cell buffer to render
    const cells = [];
    for (let y = 0; y < 9; y++) {
      cells.push([]);
      for (let x = 0; x < 9; x++) {
        const value = field[y][x];
        cells[y].push(this.renderCell(value, x, y));
      }
    }

    return (
      <>
        {cells.map((row, index) => <tr key={index}>{row.map(cell => cell)}</tr>)}
      </>
    );
  }

  /**
   * Generates the initial field data
   */
  private generateField = () => {
    const field = new Array<Array<number>>();
    const valids = new Array<Array<boolean>>();

    for (let y = 0; y < 9; y++) {
      field.push([]);
      valids.push([]);
      for (let x = 0; x < 9; x++) {
        field[y].push(0);
        valids[y].push(true);
      }
    }

    this.setState({ valids, field });
  }

  /**
   * Starts the solving algorithm
   */
  private solve = () => {
    const { field } = this.state;
    SudokuSolver.solve(field);

    // We need this to for debugging and forcing a state update
    const { valids } = this.state;
    SudokuSolver.checkValids(field, valids);
    this.setState({ valids, field  });
  }

  /**
   * React component mounting
   */
  public componentDidMount() {
    this.generateField();
  }

  /**
   * React render
   */
  public render() {
    const Cells = this.renderCells;
    return (
      <>
        <Helmet>
          <title>Sudoku</title>
        </Helmet>

        <div className="sudoku safe-area">
          <div className="g-24">
            <h1><I18N parent="sudoku">intro_title</I18N></h1>
            <p className="g-24 g-md-16 g-lg-12">
              <I18N parent="sudoku">intro_text</I18N>
            </p>
          </div>
          <div className="g-24">
            <h2><I18N parent="sudoku">instruction_title</I18N></h2>
            <div className="g-24 g-md-16 g-lg-12">
              <ul className="sudoku-instructions">
                <li><I18N parent="sudoku">instruction_li_1</I18N></li>
                <li><I18N parent="sudoku">instruction_li_2</I18N></li>
                <li><I18N parent="sudoku">instruction_li_3</I18N></li>
                <li><I18N parent="sudoku">instruction_li_4</I18N></li>
                <li><I18N parent="sudoku">instruction_li_5</I18N></li>
              </ul>
              <p />
            </div>
          </div>
          <div className="g-24 sudoku-container">
            <div className="g-24 g-md-18 g-md-p-3 p-t-2">
              <table className="sudoku-table">
                <tbody>
                  <Cells />
                </tbody>
              </table>
              <div className="g-12 p-v-2">
                <button onClick={this.solve}><I18N parent="sudoku">solve</I18N></button>
              </div>
              <div className="g-12 p-v-2">
                <button onClick={this.generateField} className="secondary"><I18N parent="sudoku">clear</I18N></button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SudokuPage;