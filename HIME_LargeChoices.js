/*:
 * @title Large Choices
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.2
 * @date Jul 17, 2016
 * @filename HIME_LargeChoices.js
 * @url http://himeworks.com/2015/10/large-choices-mv/
 *
 * If you enjoy my work, consider supporting me on Patreon!
 *
 * * https://www.patreon.com/himeworks
 *
 * If you have any questions or concerns, you can contact me at any of
 * the following sites:
 *
 * * Main Website: http://himeworks.com
 * * Facebook: https://www.facebook.com/himeworkscom/
 * * Twitter: https://twitter.com/HimeWorks
 * * Youtube: https://www.youtube.com/c/HimeWorks
 * * Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc v1.2 - Combines multiple show choice commands into a single,
 * large list.
 * @help
 * == Description ==
 *
 * By default, RPG Maker only provides you with 6 choices when you create
 * Show Choice commands.
 *
 * This script allows you to display more than 6 choices by combining multiple
 * Show Choice commands into a single, large list.
 *
 * In order to properly set up the choice settings such as the default choice or
 * the cancel choice, please read the Usage section for more information.
 *
 * If you want to have two or more, separate choices, please insert a comment in
 * between so they aren't merged together.
 *
 * == Terms of Use ==
 *
 * - Free for use in non-commercial projects with credits
 * - Contact me for commercial use
 *
 * == Change Log ==
 *
 * 1.2 - Jul 14, 2016
 *   * fixed bug where game crashes during "Event Test" if choices exist
 * 1.1 - Dec 22, 2015
 *   * fixed bug where "default" choice #1 for extended choices did nothing
 *   * fixed bug where "cancel" choice #1 for extended choices did nothing
 * 1.0 - Oct 23, 2015
 *   * initial release
 *
 * == Usage ==
 *
 * -- Combining Choices --
 *
 * To combine choices, start by creating a Show Choice command and fill in your
 * options. To add more choices, create another Show Choice command and fill
 * in your options. The game will automatically combine them for you.
 *
 * -- Custom Default Choice --
 *
 * The default choice is relative to the choice command that the choice
 * belongs to.
 *
 * Suppose you have 8 choices as follows, split across two choice commands:
 *
 * Show Choices #1
 *   Choice 1
 *   Choice 2
 *   Choice 3
 *   Choice 4
 *   Choice 5
 *   Choice 6
 * Show Choices #2
 *   Choice 7
 *   Choice 8
 *
 * And you wanted to set Choice 7 as the default choice. That is, when you
 * run this event, choice 7 will be highlighted by default.
 *
 * In order to accomplish this, set the default choice for the second set of
 * choices to "Choice 2", and set the first set to "None". The engine will
 * automatically update the default choice, so you need to make sure it
 * selects the right one.
 *
 * -- Custom Cancel Choice --
 *
 * Having a custom cancel choice is similar to default choices: select the
 * appropriate choice, and then make sure all other choices are disallowed.
 *
 * If you need to use a "cancel branch", make sure that only the last set
 * of choices has that option, and previous cancel choices are disallowed.
 */

/*:ja
 * @title Large Choices
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.2
 * @date Jul 17, 2016
 * @filename HIME_LargeChoices.js
 * @url http://himeworks.com/2015/10/large-choices-mv/
 *
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 *
 * - https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、
 * 次のサイトのいずれかで私に連絡できます。
 *
 * - Main Website: http://himeworks.com
 * - Facebook: https://www.facebook.com/himeworkscom/
 * - Twitter: https://twitter.com/HimeWorks
 * - Youtube: https://www.youtube.com/c/HimeWorks
 * - Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc v1.2 複数の'選択肢の表示…'を1つの大きなリストに結合します
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * == 説明 ==
 *
 * RPGツクールMVのデフォルトでは、
 * '選択肢の表示…'コマンド(以降、選択コマンド)を作成する時、
 * 6つの選択肢を提供します。
 *
 * このスクリプトを使用すると、
 * 複数の'選択肢の表示…'コマンドを1つの大きなリストに組み合わせ、
 * 7つ以上の選択肢を表示できます。
 *
 * デフォルトの選択やキャンセルの選択などの選択を適切に設定するには、
 * 詳細について使用方法のセクションをお読みください。
 *
 * 2つ以上の個別の選択肢が必要な場合、それらの間に注釈を挿入して、
 * それらが結合されないようにしてください。
 *
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 *
 * == 使用法 ==
 *
 * -- 選択肢の組み合わせ --
 *
 * 選択肢を組み合わせるには、選択肢コマンドを作成して、
 * オプションを入力します。
 * さらに選択肢を追加するには、別の選択肢コマンドを作成し、
 * オプションを入力します。
 * 自動的にそれらは結合されます。
 *
 * -- カスタムデフォルト選択 --
 *
 * デフォルトの選択は、選択が属する選択肢コマンドに関連しています。
 *
 * 次の8つの選択肢があり、2つの選択肢コマンドに分割されているとします。
 *
 * 選択肢の表示 #1
 *   選択肢 1
 *   選択肢 2
 *   選択肢 3
 *   選択肢 4
 *   選択肢 5
 *   選択肢 6
 * 選択肢の表示 #2
 *   選択肢 7
 *   選択肢 8
 *
 * また、選択肢7をデフォルトの選択肢として設定します。
 * つまり、このイベントを実行すると、デフォルトで選択肢7が強調表示されます。
 *
 * これを実現するには、
 * 選択の2番目のセットのデフォルトの選択を'選択肢1'に設定し、
 * 最初のセットを'なし'に設定します。
 * エンジンはデフォルトの選択を自動的に更新するので、
 * 正しい選択を選択することを確認する必要があります。
 *
 * -- カスタムキャンセルの選択 --
 *
 * カスタムキャンセルの選択は、デフォルトの選択に似ています。
 * 適切な選択肢を選択し、他の全ての選択が許可されていないことを確認します。
 *
 * '選択肢のキャンセル'を使用する必要がある場合、
 * 最後の選択肢のセットのみにその機能があり、
 * 以前のキャンセルの選択肢は機能しないことに注意してください。
 *
 * == Change Log ==
 *
 * 1.2 - Jul 14, 2016
 *   * fixed bug where game crashes during "Event Test" if choices exist
 * 1.1 - Dec 22, 2015
 *   * fixed bug where "default" choice #1 for extended choices did nothing
 *   * fixed bug where "cancel" choice #1 for extended choices did nothing
 * 1.0 - Oct 23, 2015
 *   * initial release
 *
 */

// ===========================================================================
// Rest of Script
// ===========================================================================
var Imported = Imported || {};
var TH = TH || {};
Imported.TH_LargeChoices = 1;
TH.LargeChoices = TH.LargeChoices || {};

(function ($) {
  var _TH_Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function (params) {
    params = this.combineChoices()
    _TH_Game_Interpreter_setupChoices.call(this, params)
  };

  Game_Interpreter.prototype.combineChoices = function (params) {
    /* IMPORTANT If we don't clone this, we will modify the event permanently */
    this._list = JSON.parse(JSON.stringify(this._list))
    var currIndex = this._index
    var numChoices = 0;
    var firstCmd = this._list[this._index];
    this._index++;
    while (this._index < this._list.length) {
      var cmd = this._list[this._index];
      var nextCmd = this._list[this._index + 1];
      if (cmd.indent === this._indent)
        /* Reached "End Choices" command. See if next command is "Show Choices" */
        if (cmd.code === 404 && (nextCmd === undefined || nextCmd.code !== 102)) {
          break;
        }
        else if (cmd.code === 102) {

          /* Update cancel choice.
           * -2 is "cancel"
           * -1 is "disallow"
           * 0 to 5 are zero-indexed choices
           */
          var cancelType = cmd.parameters[1]
          if (cancelType > -1) {
            firstCmd.parameters[1] = cancelType + numChoices
          }
          else if (cancelType === -2) {
            firstCmd.parameters[1] = cancelType;
          }

          /* Update default choice */
          var defaultType = cmd.parameters[2]
          if (defaultType > -1) {
            firstCmd.parameters[2] = defaultType + numChoices;
          }

          /* Add all of the parameters to the current command */
          var options = cmd.parameters[0];
          for (var i = 0; i < options.length; i++) {
            firstCmd.parameters[0].push(options[i]);
          }

          /* Delete the "end choice" and "show choice" commands */
          this._list.splice(this._index - 1, 2)
          this._index -= 2;
        }

        /* Update the branch number */
        else if (cmd.code === 402) {
          cmd.parameters[0] = numChoices;
          numChoices++;
        }
      this._index++;
    }
    /* Go back to where we left off */
    this._index = currIndex;

    /* Return the new parameters for the first choice command */
    return firstCmd.parameters;
  }
}(TH.LargeChoices));