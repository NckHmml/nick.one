export class SudokuSolver {
  /**
   * Checks for invalid moves within a cell
   * @param field Sudoku field
   * @param valids Valid state buffer
   */
  private static checkCells(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    for (let val = 1; val <= 9; val++) {
      for (let cell = 0; cell < 9; cell++) {
        let exists = false;
        let pos = { x: 0, y: 0 };

        const startx = (cell % 3) * 3;
        const starty = cell - (cell % 3);

        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            if (field[y + starty][x + startx] === val) {
              if (exists) {
                valids[pos.y][pos.x] = false;
                valids[y + starty][x + startx] = false;
              }
              exists = true;
              pos = {
                x: x + startx,
                y: y + starty,
              };
            }
          }
        }
      }
    }
  }

  /**
   * Checks if a value is already used in a cell
   */
  private static solveCell(field: Array<Array<number>>, x: number, y: number, val: number): boolean {
    const startx = x - (x % 3);
    const starty = y - (y % 3);

    for (let ix = startx; ix < startx + 3; ix++) {
      for (let iy = starty; iy < starty + 3; iy++) {
        if (y === iy && x === ix) continue;
        if (field[ix][iy] === val) return false;
      }
    }
    return true;
  }

  /**
   * Checks for invalid moves within a row
   * @param field Sudoku field
   * @param valids Valid state buffer
   */
  private static checkRows(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    for (let val = 1; val <= 9; val++) {
      for (let y = 0; y < 9; y++) {
        let exists = false;
        let posX = 0;

        for (let x = 0; x < 9; x++) {
          if (field[y][x] === val) {
            if (exists) {
              valids[y][posX] = false;
              valids[y][x] = false;
            }
            exists = true;
            posX = x;
          }
        }
      }
    }
  }

  /**
   * Checks if a value is already used in a row
   */
  private static solveRow(field: Array<Array<number>>, x: number, y: number, val: number): boolean {
    for (let ix = 0; ix < 9; ix++) {
      if (x === ix) continue;
      if (field[ix][y] === val) return false;
    }
    return true;
  }

  /**
   * Checks for invalid moves within a column
   * @param field Sudoku field
   * @param valids Valid state buffer
   */
  private static checkColumns(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    for (let val = 1; val <= 9; val++) {
      for (let x = 0; x < 9; x++) {
        let exists = false;
        let posY = 0;

        for (let y = 0; y < 9; y++) {
          if (field[y][x] === val) {
            if (exists) {
              valids[posY][x] = false;
              valids[y][x] = false;
            }
            exists = true;
            posY = y;
          }
        }
      }
    }
  }

  /**
   * Checks if a value is already used in a column
   */
  private static solveColumn(field: Array<Array<number>>, x: number, y: number, val: number) {
    for (let iy = 0; iy < 9; iy++) {
      if (y === iy) continue;
      if (field[x][iy] === val) return false;
    }
    return true;
  }

  /**
   * Backtrack algorithm
   */
  private static backTrack(field: Array<Array<number>>, possibilities: Array<Array<Array<boolean>>>, x = 0, y = 0): boolean {
    while (field[x][y] !== 0) {
      if (++y >= 9) {
        y = 0;
        if (++x >= 9)
          return true;
      }
    }

    let tx: number;
    let ty: number;

    for (let val = 1; val <= 9; val++) {
      if (possibilities[x][y][val - 1]) {
        const clone = this.getPossibilities(field);
        this.setBlock(field, possibilities, x, y, val);
        ty = y;
        tx = x;
        if (++ty >= 9) {
          ty = 0;
          if (++tx >= 9)
            return true;
        }

        if (this.backTrack(field, possibilities, tx, ty))
          return true;
        else {
          this.setPossibilities(possibilities, clone);
          field[x][y] = 0;
        }
      }
    }

    if (--y < 0) {
      y = 8;
      x--;
    }
    return false;
  }

  /**
   * Set a value in the field and clear the possibility
   */
  private static setBlock(field: Array<Array<number>>, possibilities: Array<Array<Array<boolean>>>, x: number, y: number, val: number) {
    field[x][y] = val;

    // Rows
    for (let ix = 0; ix < 9; ix++)
      possibilities[ix][y][val - 1] = false;

    // Columns
    for (let iy = 0; iy < 9; iy++)
      possibilities[x][iy][val - 1] = false;

    // Cell
    const startx = x - (x % 3);
    const starty = y - (y % 3);
    for (let ix = startx; ix < startx + 3; ix++) {
      for (let iy = starty; iy < starty + 3; iy++)
        possibilities[ix][iy][val - 1] = false;
    }
  }

  /**
   * Copies a possibilities clone back into the possibilities array
   */
  private static setPossibilities(possibilities: Array<Array<Array<boolean>>>, clone: Array<Array<Array<boolean>>>) {
    for (let x = 0; x < 9; x++)
      for (let y = 0; y < 9; y++)
        for (let val = 0; val < 9; val++) {
          possibilities[x][y][val] = clone[x][y][val];
        }
  }

  /**
   * Gets the possibilities array
   */
  private static getPossibilities(field: Array<Array<number>>) {
    const possibilities = new Array<Array<Array<boolean>>>();

    for (let x = 0; x < 9; x++) {
      possibilities.push([]);
      for (let y = 0; y < 9; y++) {
        possibilities[x].push([]);
        for (let val = 1; val <= 9; val++) {
          const possible =
            field[x][y] === 0 &&
            this.solveRow(field, x, y, val) &&
            this.solveColumn(field, x, y, val) &&
            this.solveCell(field, x, y, val);
          possibilities[x][y].push(possible);
        }
      }
    }
    return possibilities;
  }

  /**
   * Checks the field for invalid values
   * @param field Field to check
   * @param valids Array to store result into
   */
  public static checkValids(field: Array<Array<number>>, valids: Array<Array<boolean>>) {
    // Reset buffer
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        valids[y][x] = true;
      }
    }
    // Run checks
    this.checkCells(field, valids);
    this.checkRows(field, valids);
    this.checkColumns(field, valids);
  }

  /**
   * Solves a sudoku puzzle
   * @param field Field to solve
   */
  public static solve(field: Array<Array<number>>) {
    const possibilities = this.getPossibilities(field);
    this.backTrack(field, possibilities);
  }
}