/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_CommonEventButtons.js
 * @title Common Event Buttons
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Feb 1, 2016
 * @filename HIME_CommonEventButtons.js
 *
 * @plugindesc v1.1 マップ上でキーを押すだけでコモンイベントを実行できます。
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2016/01/common-event-buttons/
 * 
 * == 説明 ==
 *
 * デフォルトのコモンイベントは、コモンイベントを呼び出すイベントがある場合、
 * 条件が満たされた時、コモンイベントが自動的に実行される場合に実行できます。
 *
 * このプラグインを使用すると、
 * キーボードの特定のキーにコモンイベントを割り当てることができます。
 * そのキーを押すと、マップ上にいる限りコモンイベントが実行され、
 * コモンイベントを実行できます。
 *
 * 特定のキーが押された時、独自の特別なロジックを作成できます。
 * プラグインを検索/作成する必要はありません。
 *
 * 例えば、マップ上でキーを押してパーティメンバーの順序を切り替えたい場合、
 * コモンイベントを作成してからイベントロジックをまとめることができます。
 * 最後に、このコモンイベントをゲームボタンの1つに割り当てることができます。
 * スクリプトは必要ありません。
 *
 * == 使用法 ==
 *
 * コモンイベントをキーに割り当てるには、
 * コモンイベントのどこかに注釈を作成してから、
 *
 *   <trigger button: BUTTON_NAME />
 *
 * RPGツクールMVには、デフォルトで機能するキーセットが用意されています。
 * それらは次のとおりです。
 *
 *   ok       - Zキー / Enterキー
 *   escape   - Xキー / Escキー
 *   shift    - 左/右 Shiftキー
 *   control  - 左/右 Ctrlキー / Altキー
 *   pageup   - Qキー / PageUpキー
 *   pagedown - Wキー / PageDownキー
 *   up       - 上矢印 / テンキー8
 *   down     - 下矢印 / テンキー2
 *   left     - 左矢印 / テンキー4
 *   right    - 右矢印 / テンキー6
 *   debug    - F9キー
 *
 * 例えば、Escキーを1回押す度にコモンイベントを実行したい場合、
 * 次のように記述します。
 *
 *   <trigger button: escape />
 *
 * 成功した場合、マップ上でキーを押すと、
 * 割り当てたコモンイベントが実行されます。
 *
 * 他のキーボードプラグインを使用して、次のようなキーを追加できます。
 *
 * ZE Keymapper:
 *   http://mvplugins.com/plugin/Zalerinian/ZE%20-%20Key%20Mapper
 *
 * Quasi Input:
 *   http://forums.rpgmakerweb.com/index.php?/topic/51087-quasi-input/
 *
 *
 * キー名のリストについては、これらのプラグインの手順を参照してください。
 *
 * 
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は無料ですが、連絡してください
 * - クレジット表示をHimeWorksにしてください
 *
 * == Change Log ==
 *
 * 1.1 - Feb 1, 2016
 *  * Supports common event buttons in the battle scene now
 *  * Refactored to make it easier to extend to other scenes
 * 1.0 - Jan 21, 2016
 *  * initial release
 */
/*
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 *
 * - https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、次のサイトのいずれかで私に連絡できます。
 *
 * - Main Website: http://himeworks.com
 * - Facebook: https://www.facebook.com/himeworkscom/
 * - Twitter: https://twitter.com/HimeWorks
 * - Youtube: https://www.youtube.com/c/HimeWorks
 * - Tumblr: http://himeworks.tumblr.com/
 *
*/

/*:
 * @title Common Event Buttons
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Feb 1, 2016
 * @filename HIME_CommonEventButtons.js
 * @url http://himeworks.com/2016/01/common-event-buttons/
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
 * @plugindesc v1.1 - Allows you to execute common events with the press of a
 * button on the map.
 * @help
 * -------------------------------------------------------------------------
 * == Description ==
 *
 * By default, common events can only be executed when you have an event call a
 * common event, or if a common event runs automatically when a condition is met.
 *
 * With this plugin, you can assign common events to certain buttons on the
 * keyboard. When that button is pressed, the common event will be executed as
 * long as you are on the map and common events can be executed!
 *
 * This allows you to create your own special logic when certain keys are
 * pressed, without having to find or write a plugin for it.
 *
 * So for example, if you wanted to press a button to switch the order of your
 * party members while on the map, you can create a common event and then put
 * together the event logic. Finally, you can assign this common event to one
 * of your game buttons! No scripting required.
 *
 * == Terms of Use ==
 *
 * - Free for use in non-commercial projects with credits
 * - Free for use in commercial projects, but it would be nice to let me know
 * - Please provide credits to HimeWorks
 *
 * == Change Log ==
 *
 * 1.1 - Feb 1, 2016
 *  * Supports common event buttons in the battle scene now
 *  * Refactored to make it easier to extend to other scenes
 * 1.0 - Jan 21, 2016
 *  * initial release
 *
 * == Usage ==
 *
 * To assign a common event to a button, create a comment somewhere in the
 * common event and then write
 *
 *   <trigger button: BUTTON_NAME />
 *
 * RPG Maker offers a very limited set of buttons to work with by default. They
 * are as follows:
 *
 *   ok       - Z key, or Enter key
 *   escape   - X key, or Esc key
 *   shift    - left or right shift
 *   control  - left or right ctrl/alt
 *   pageup   - Q key, or page up key
 *   pagedown - W key, or page down key
 *   up       - up arrow, or numpad 8
 *   down     - down arrow, or numpad 2
 *   left     - left arrow, or numpad 4
 *   right    - right arrow, or numpad 6
 *   debug    - F9
 *
 * So for example, if you wanted a common event to run whenever you press one
 * of the escape buttons, you would write
 *
 *   <trigger button: escape />
 *
 * And, if successful, the common event you assigned to it will run when you
 * press the button on the map.
 *
 * You can use other keyboard plugins to provide more buttons, such as
 *
 * ZE Keymapper: http://mvplugins.com/plugin/Zalerinian/ZE%20-%20Key%20Mapper
 * Quasi Input: http://forums.rpgmakerweb.com/index.php?/topic/51087-quasi-input/
 *
 * Please refer to the instructions in those plugins for a list of button names.
 *
 * -------------------------------------------------------------------------
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.TH_CommonEventButtons = 1;
TH.CommonEventButtons = TH.CommonEventButtons || {};

(function ($) {

  $.Regex = /<trigger[-_ ]button:\s*(.+?)\s*\/>/im

  $.buttonTrigger = function (commonEvent) {
    if (commonEvent.buttonTrigger === undefined) {
      commonEvent.buttonTrigger = null;
      var list = commonEvent.list;
      for (var i = 0; i < list.length; i++) {
        var cmd = list[i];
        if (cmd.code === 108) {
          var res = $.Regex.exec(cmd.parameters[0]);
          if (res) {
            commonEvent.buttonTrigger = res[1];
          }
        }
      }
    }
    return commonEvent.buttonTrigger;
  };

  Scene_Base.prototype.loadCommonEventButtons = function () {
    this._commonEventButtons = {};
    for (var i = 1; i < $dataCommonEvents.length; i++) {
      var cev = $dataCommonEvents[i];
      var button = $.buttonTrigger(cev)
      if (button) {
        this._commonEventButtons[button] = cev.id
      }
    }
  };

  Scene_Base.prototype.updateCommonEventButtons = function () {
    if (!this.canCheckCommonEventButton()) {
      return;
    }
    for (var key in this._commonEventButtons) {
      if (Input.isTriggered(key)) {
        $gameTemp.reserveCommonEvent(this._commonEventButtons[key]);
      }
    }
  };

  Scene_Base.prototype.canCheckCommonEventButton = function () {
    if ($gameMap.isEventRunning()) {
      return false;
    }
    return true;
  }

  /***************************************************************************/

  var TH_SceneMap_initialize = Scene_Map.prototype.initialize;
  Scene_Map.prototype.initialize = function () {
    TH_SceneMap_initialize.call(this);
    this.loadCommonEventButtons();
  };

  var TH_SceneMap_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    TH_SceneMap_update.call(this);
    this.updateCommonEventButtons();
  };

  /***************************************************************************/

  var TH_SceneBattle_initialize = Scene_Battle.prototype.initialize;
  Scene_Battle.prototype.initialize = function () {
    TH_SceneBattle_initialize.call(this);
    this.loadCommonEventButtons();
  };

  var TH_SceneBattle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    TH_SceneBattle_update.call(this);
    this.updateCommonEventButtons();
  };

})(TH.CommonEventButtons);