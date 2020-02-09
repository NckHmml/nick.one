import * as React from "react";
import { ClassNames } from "~/helpers/global";

interface ISudokuCellProps {
  value: number;
  valid: boolean;
  onChange: (value: number) => void;
  className?: string;
}

interface ISudokuCellState {
  focused: boolean;
}

/**
 * Sudoku cell partial
 */
export class SudokuCell extends React.Component<ISudokuCellProps, ISudokuCellState> {
  public state: ISudokuCellState = {
    focused: false
  };

  /**
   * Reference to the input element
   */
  public input: HTMLInputElement;

  /**
   * Click trigger
   */
  private click = () => {
    this.input.focus();
  }

  /**
   * Handles the change event
   * @param event onKeyPress event
   */
  private change = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = parseInt(event.key) || 0;
    if (value === this.props.value)
      return;
    this.props.onChange(value);
  }

  /**
   * Sets the ref to the input element
   */
  private setInput = (input: HTMLInputElement) => {
    this.input = input;
  }

  /**
   * Sets the focused state
   * @param focused new focus state
   */
  private setFocus(focused: boolean) {
    return () => {
      this.setState({ focused });
    };
  }

  /**
   * React render
   */
  public render() {
    const { focused } = this.state;
    const { value, valid } = this.props;
    const className = ClassNames({
      "sudoku-cell": true,
      "focused": focused,
      "invalid": !valid
    });

    return (
      <fieldset
        className={className}
        onClick={this.click}
      >
        <div className="sudoku-cell-input">
          <input
            autoComplete="off"
            autoCorrect="off"
            pattern="\d*"
            type="number"
            defaultValue={value}
            ref={this.setInput}
            onKeyPress={this.change}
            onFocus={this.setFocus(true)}
            onBlur={this.setFocus(false)}
          />
        </div>
        <label>{value}</label>
      </fieldset>
    );
  }
}