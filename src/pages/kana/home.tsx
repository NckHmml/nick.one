import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react";

import { KANA_BUFFER, KanaItem, KanaGameState } from "~/redux/kana";
import { KanaPage } from ".";
import { Checkbox } from "~/components/checkbox";
import { Slider } from "~/components/slider";
import { I18N } from "~/components/i18n";

@observer
export class KanaHome extends React.Component<RouteComponentProps<{}>> {
  private start = () => {
    KanaPage.kanaStore.state = new KanaGameState;
    this.props.history.push("/kana/test");
  }

  /**
   * Resets the step in the game state
   */
  private resetStep = () => {
    // ToDo; warning for resetting?
    if (!KanaPage.kanaStore.state || !KanaPage.kanaStore.state.step) return;
    KanaPage.kanaStore.resetStep();
  }

  private setRepeat = (repeat: number) => {
    if (KanaPage.kanaStore.repeat == repeat) return;
    KanaPage.kanaStore.repeat = repeat;
    this.resetStep();
  }

  private setDelay = (delay: number) => {
    if (KanaPage.kanaStore.delay == delay) return;
    KanaPage.kanaStore.delay = delay;
    this.resetStep();
  }

  private toggleReverse = () => {
    KanaPage.kanaStore.reverse = !KanaPage.kanaStore.reverse;
    this.resetStep();
  }

  private selectKana(items: Array<KanaItem>) {
    const { selected } = KanaPage.kanaStore;
    return (checked: Boolean) => {
      if (checked) {
        items
          .map(i => i.kana)
          .filter(k => !selected.includes(k)) // Don't add twice
          .forEach(k => selected.push(k));
      } else {
        items
          .map(i => i.kana)
          .forEach(i => selected.remove(i));
      }
    };
  }

  private selectAllKana(hiragana: boolean) {
    const items = KANA_BUFFER.filter(kana => kana.hiragana === hiragana);
    return this.selectKana(items);
  }

  private isChecked(hiragana: boolean, group: number): boolean {
    const { selected } = KanaPage.kanaStore;
    const checked = KANA_BUFFER
      .filter(kana => kana.group === group && kana.hiragana === hiragana)
      .map(k => selected.includes(k.kana))
      .reduce((prev, cur) => prev = cur && prev, true);

    return checked;
  }

  private isAllChecked(hiragana: boolean) {
    const { selected } = KanaPage.kanaStore;
    const checked = KANA_BUFFER
      .filter(kana => kana.hiragana === hiragana)
      .map(k => selected.includes(k.kana))
      .reduce((prev, cur) => prev = cur && prev, true);

    return checked;
  }

  private renderKanaGroup(hiragana: boolean, group: number) {
    const reverse = false;
    // Get all kana for current group
    const allKana = KANA_BUFFER.filter(kana => kana.group === group && kana.hiragana === hiragana);
    // Parse to html
    const items = allKana.map(item => (
      <li key={item.kana}>
        <span>{reverse ? item.romaji : item.kana}</span>
        <span>{reverse ? item.kana : item.romaji}</span>
      </li>
    ));

    return (
      <div key={group} className="g-24 g-md-12 kana-group">
        <ul className="kana-list">{items}</ul>
        <Checkbox
          title={<I18N parent="kana">add</I18N>}
          onChange={this.selectKana(allKana)}
          defaultValue={this.isChecked(hiragana, group)}
        />
      </div>
    )
  }

  private renderKanaGroups(hiragana: boolean) {
    // Get all hiragana groups
    const hiraganaGroups = KANA_BUFFER.reduce((buffer, kana) => {
      if (kana.hiragana && buffer.indexOf(kana.group) === -1)
        buffer.push(kana.group);
      return buffer;
    }, new Array<number>());

    return hiraganaGroups.map((group) => this.renderKanaGroup(hiragana, group));
  }

  public render() {
    const { delay, repeat, state } = KanaPage.kanaStore;

    const continueButton = state && state.step > 0 ? (
      <div className="g-10 g-md-6 p-v-3">
        <Link to="/kana/test" className="c-button secondary"><I18N parent="kana">continue</I18N></Link>
      </div>
    ) : undefined;

    return (
      <div className="kana safe-area">
        <div className="g-24">
          <h1><I18N parent="kana">intro_title</I18N></h1>
          <p className="g-24 g-md-16 g-lg-12">
            <I18N parent="kana">intro_text</I18N>
          </p>
        </div>
        <div className="g-24">
          <h2><I18N parent="kana">instruction_title</I18N></h2>
          <div className="g-24 g-md-16 g-lg-12">
            <p><I18N parent="kana">instruction_text</I18N></p>
            <ul className="kana-instructions">
              <li><I18N parent="kana">instruction_li_1</I18N></li>
              <li><I18N parent="kana">instruction_li_2</I18N></li>
              <li><I18N parent="kana">instruction_li_3</I18N></li>
              <li><I18N parent="kana">instruction_li_4</I18N></li>
            </ul>
            <p />
          </div>
        </div>

        <div className="g-24 kana-container">
          <h2>
            <I18N parent="kana">h_set</I18N>
            <Checkbox
              title={<I18N parent="kana">add_all</I18N>}
              onChange={this.selectAllKana(true)}
              defaultValue={this.isAllChecked(true)}
            />
          </h2>
          {this.renderKanaGroups(true)}

          <h2>
            <I18N parent="kana">k_set</I18N>
            <Checkbox
              title={<I18N parent="kana">add_all</I18N>}
              onChange={this.selectAllKana(false)}
              defaultValue={this.isAllChecked(false)}
            />
          </h2>
          {this.renderKanaGroups(false)}

          <h2><I18N parent="kana">other_settings</I18N></h2>
          <div className="g-24">
            <table className="kana-settings">
              <tbody>
                <tr>
                  <td><I18N parent="kana">reverse</I18N></td>
                  <td>
                    <Checkbox
                      defaultValue={KanaPage.kanaStore.reverse}
                      onChange={this.toggleReverse}
                    />
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td><I18N parent="kana">repeat</I18N></td>
                  <td><Slider min={1} max={10} defaultValue={repeat} onChange={this.setRepeat} /></td>
                  <td>{repeat}x</td>
                </tr>
                <tr>
                  <td><I18N parent="kana">delay</I18N></td>
                  <td><Slider min={200} max={800} step={100} defaultValue={delay} onChange={this.setDelay} /></td>
                  <td>{delay}ms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="g-10 g-md-6 p-v-3">
            <button onClick={this.start}><I18N parent="kana">start</I18N></button>
          </div>
          {continueButton}
        </div>
      </div>
    );
  }
}