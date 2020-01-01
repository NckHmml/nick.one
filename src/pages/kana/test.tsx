import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { when } from "mobx";
import { observer } from "mobx-react";

import { KanaItem, KANA_BUFFER } from "~/redux/kana";
import KanaPage from ".";
import { I18N } from "~/components/i18n";
import { ClassNames, Randomize } from "~/helpers/global";

/**
 * Display character for unknown kana
 */
const UNKNOWN_KANA: string = "?";

class KanaOption extends KanaItem {
  public clicked: boolean = false;
}

interface ITestState {
  items: Array<KanaItem>;
  options: Array<KanaOption>;
  guess: string;
}

@observer
export class KanaTest extends React.Component<RouteComponentProps<{}>, ITestState> {
  public state: ITestState = {
    items: [],
    options: [],
    guess: ""
  };

  /**
   * Switch to next item
   */
  private next = () => {
    KanaPage.kanaStore.stateNext();
    let options = new Array<KanaOption>();
    if (KanaPage.kanaStore.reverse) {
      options = this.getOptions();
    }
    this.setState({ guess: "", options });
  };

  /**
   * Gets an array of options to select from
   */
  private getOptions = (itemsFallback: Array<KanaItem> = []): Array<KanaOption> => {
    const items = itemsFallback.length > 0 ? itemsFallback : this.state.items;
    const { step, seed } = KanaPage.kanaStore.state;
    const current = items[step];
    const options = new Array<KanaOption>();

    // Get possible alternatives
    const alternatives = KANA_BUFFER.filter(item => item.group === current.group && item.hiragana === current.hiragana && item !== current);
    // 'step + seed' to keep it consistent over reload, yet 'random' per step
    Randomize(alternatives, step + seed);
    // Obviously, correct answer must be part of the answers
    options.push(current as KanaOption);
    // Push 2 alternatives
    options.push(alternatives.pop() as KanaOption);
    options.push(alternatives.pop() as KanaOption);
    // Randomize options
    Randomize(options, new Date().getTime().toString(16));

    // Reset clicked
    options.forEach(o => o.clicked = false);

    return options;
  }

  /**
   * Tries to get a kana equivelent of the current guess
   */
  private getKanaForGuess(): string {
    const { items, guess } = this.state;
    const { step } = KanaPage.kanaStore.state;
    const current = items[step];

    const result = KANA_BUFFER.filter(kana => kana.romaji === guess && kana.hiragana === current.hiragana);
    if (result.length > 0)
      return result[0].kana;
    return UNKNOWN_KANA;
  }

  /**
   * Handles the guess event
   */
  private doGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setGuess(event.target.value);
  }

  /**
   * Handles option click event
   */
  private clickOption(option: KanaOption) {
    return () => {
      option.clicked = true;
      this.setGuess(option.romaji);
    };
  }

  /**
   * Checks and sets the guess value
   * @param guess the new guess value
   */
  private setGuess(guess: string) {
    this.setState({ guess }, () => {
      // Check if valid
      if (this.isValidGuess()) {
        setTimeout(() => {
          const { step } = KanaPage.kanaStore.state;
          const { items } = this.state;
          // Check if end of test
          if ((step + 1) >= items.length) {
            alert("finished!");
            KanaPage.kanaStore.resetStep();
            this.props.history.push("/kana/");
          } else {
            // Get next
            this.next();
          }
        }, KanaPage.kanaStore.delay);
      }
    });
  }

  /**
   * Checks if the current guess is valid
   */
  private isValidGuess = (): boolean => {
    const { items, guess } = this.state;
    const { step } = KanaPage.kanaStore.state;
    const current = items[step];
    return guess === current.romaji || guess === current.kana;
  }

  /**
   * Load the items from the kana store
   */
  private loadItems = () => {
    const items = KanaPage.kanaStore.getTestItems();
    let options = new Array<KanaOption>();
    if (KanaPage.kanaStore.reverse) {
      options = this.getOptions(items);
    }
    if (items.length > 0)
      this.setState({ items, options });
    else if (options.length > 0)
      this.setState({ options });
  }

  /**
   * React mount
   */
  public componentDidMount() {
    // Manually observe, as we need data to be set
    when(() => Boolean(KanaPage.kanaStore.selected.length > 0 && KanaPage.kanaStore.state))
      .then(() => this.loadItems());
  }

  /**
   * Render a reverse option
   */
  public renderOption = (option: KanaOption) => {
    const { items } = this.state;
    const { step } = KanaPage.kanaStore.state;
    const current = items[step];

    const className = ClassNames({
      "valid": option.clicked && option.romaji === current.romaji,
      "invalid": option.clicked && option.romaji !== current.romaji,
    });

    return (
      <li
        className={className}
        key={option.kana}
        onClick={this.clickOption(option)}
      >
        {option.kana}
      </li>
    );
  }

  /**
   * Render reverse field
   */
  public renderReverse = () => {
    const { items, options } = this.state;
    const { step } = KanaPage.kanaStore.state;
    const optionItems = options.map(o => this.renderOption(o));

    return (
      <>
        <ul className="kana-preview">
          <li>{items[step].romaji}</li>
        </ul>
        <ul className="kana-preview click">
          {optionItems}
        </ul>
      </>
    )
  }

  /**
   * Render normal field
   */
  public renderNormal = () => {
    const { items, guess } = this.state;
    const { step } = KanaPage.kanaStore.state;

    const guessed = this.getKanaForGuess();
    const previewClass = ClassNames({
      "kana-preview": true,
      "valid": this.isValidGuess(),
      "invalid": !this.isValidGuess() && guessed !== UNKNOWN_KANA
    });

    return (
      <>
        <ul className={previewClass}>
          <li>{items[step].kana}</li>
          <li>{this.getKanaForGuess()}</li>
        </ul>
        <fieldset className="kana-input">
          <input
            type="text"
            onChange={this.doGuess}
            value={guess}
          />
        </fieldset>
      </>
    );
  }

  /** 
   * Render game field
   */
  public renderField = () => {
    const { items } = this.state;
    const { step } = KanaPage.kanaStore.state;

    const Field = KanaPage.kanaStore.reverse ? this.renderReverse : this.renderNormal;

    return (
      <>
        <h2><I18N parent="kana">intro_title</I18N>&nbsp;({step + 1}/{items.length})</h2>
        <Field />
        <div className="p-v-3"><Link to="/kana" className="c-button w-150"><I18N parent="kana">cancel</I18N></Link></div>
      </>
    );
  }

  /**
   * Render when not items selected
   */
  public renderEmpty = () => {
    return (
      <>
        <h2>No items selected</h2>
        <div className="p-v-3"><Link to="/kana" className="c-button w-150">Back</Link></div>
      </>
    );
  }

  public render() {
    const Content = this.state.items.length > 0 ? this.renderField : this.renderEmpty;

    return (
      <>
        <div className="content-bottom" />
        <div className="g-24 g-p-0 g-sm-20 g-sm-p-2 kana-test">
          <Content />
        </div>
      </>
    );
  }
}