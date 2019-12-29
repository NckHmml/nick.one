import * as React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";

import { KANA_BUFFER, KanaItem, KanaStore } from "~/redux/kana";
import { Checkbox } from "~/components/checkbox";
import { Slider } from "~/components/slider";

@observer
export class KanaPage extends React.Component {
  public static kanaStore = new KanaStore();
  
  private setRepeat = (repeat: number) => {
    KanaPage.kanaStore.repeat = repeat;
  }

  private setDelay = (delay: number) => {
    KanaPage.kanaStore.delay = delay;
  }

  private toggleReverse = () => {
    KanaPage.kanaStore.reverse = !KanaPage.kanaStore.reverse;
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
          title="Add"
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
    const { delay, repeat } = KanaPage.kanaStore;
    return (
      <>
        <Helmet>
          <title>Kana learning tool</title>
          <meta name="description" content="Kana learning tool, by Nick Hummel" />
        </Helmet>

        <div className="kana safe-area">
          <div className="g-24">
            <h1>Kana learning tool</h1>
            <p className="g-24 g-md-16 g-lg-12">
              Before I left to Tokyo for an internship, I wanted at least to be able to read some of the basic Japanese characters.
              After a bit of research, I found that Hiragana and Katakana would be the easiest to learn.
              Sadly, I couldn't find any tools that could help me in the exact way as I wanted, which is by repeating them so often that you can't forget them even if you wanted to.
            </p>
          </div>
          <div className="g-24">
            <h2>Instructions</h2>
            <div className="g-24 g-md-16 g-lg-12">
              <p>This tool works by repeating a selected sets of characters, with the idea that after repeating it enough times, they will be stored in the long term memory.</p>
              <ul className="kana-instructions">
                <li>Use the checkbox to select the character sets you want to learn.</li>
                <li>Reverse mode means you get 3 options and you have the select the correct option.</li>
                <li>Repeat is how often you want to repeat all character sets that you have selected.</li>
                <li>Delay is how long the answer is shown after the correct answer is given.</li>
              </ul>
              <p />
            </div>
          </div>

          <div className="g-24 kana-container">
            <h2>
              Hiragana sets
              <Checkbox
                title="Add all"
                onChange={this.selectAllKana(true)}
                defaultValue={this.isAllChecked(true)}
              />
            </h2>
            {this.renderKanaGroups(true)}

            <h2>
              Katakana sets
              <Checkbox
                title="Add all"
                onChange={this.selectAllKana(false)}
                defaultValue={this.isAllChecked(false)}
              />
            </h2>
            {this.renderKanaGroups(false)}

            <h2>Other settings</h2>
            <div className="g-24">
              <table className="kana-settings">
                <tbody>
                  <tr>
                    <td>Reverse mode</td>
                    <td>
                      <Checkbox
                        defaultValue={KanaPage.kanaStore.reverse}
                        onChange={this.toggleReverse}
                      />
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Repeat</td>
                    <td><Slider min={1} max={10} defaultValue={repeat} onChange={this.setRepeat} /></td>
                    <td>{repeat}x</td>
                  </tr>
                  <tr>
                    <td>Delay</td>
                    <td><Slider min={200} max={800} step={100} defaultValue={delay} onChange={this.setDelay} /></td>
                    <td>{delay}ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="g-10 g-md-6 p-v-3">
              <button>Start</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default KanaPage;