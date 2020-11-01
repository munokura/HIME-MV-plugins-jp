/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_EventTriggerLabels.js
 * @title Event Trigger Labels
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Dec 31, 2015
 * @filename HIME_EventTriggerLabels.js
 *
 *
 * @plugindesc v1.0 イベントのトリガーを拡張し、キーによって異なる動作をする分岐を作成できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2016/01/event-trigger-labels-mv/
 * 
 * == 説明 ==
 *
 * RPGツクールMVでは、マップ上にイベントがあります。
 * イベントは、プレイヤーが上/前に立っている時、トリガーできます。
 * プレイヤーがイベントをトリガーしたい場合、'実行'ボタンを押します。
 * デフォルトではZ/Enterキーです。
 * イベントがトリガーされると、コマンドのリスト全体が実行されます。
 *
 * しかし、プレーヤーが別の方法でイベントと対話できるようにしたい場合は?
 *
 * 例えば、プレイヤーがイベントに近づいて通常どおりに話しかけた場合、
 * 会話をしているだけです。
 *
 * 一方、プレイヤーがイベントに近づいてAキーを押すと、
 * ミニゲームを実行するかどうかを確認するイベントが表示されます。
 *
 * このプラグインを使用すると、
 * イベントのコマンドのリストをセクションに分けることができます。
 * イベントのトリガー方法に応じて、異なるセクションが実行され、
 * プレーヤーがイベントと対話する時、異なる動作を作成できます。
 *
 * == 使用法 ==
 *
 * デフォルトでは、現在のイベントページの全てのコマンドは、
 * イベントの実行時に上から下まで実行されます。
 *
 * トリガーラベル条件が満たされた場合のみ実行される
 * ページのセクションを作成できます。
 *
 *   -- ボタントリガーラベル --
 *
 * これらのトリガーラベルには、特定のボタンを押す必要があります。
 *
 * 例えば、'a'キーが押された時、のみ実行されるコマンドセットと、
 * 'b'キーが押された時のみ実行されるコマンドセットがあります。
 *
 * ボタントリガーラベルを作成するには、'ラベル'イベントコマンドを作成して、
 *
 *   button_trigger BUTTON
 *
 * BUTTONは押さなければならないボタンの名称です。
 *
 * ボタンに使用しているプラグインに応じて、異なる場合があります。
 * 例えば、カスタムキーボードや入力スクリプトを使用していない場合、
 * これらのボタン以外にはあまり選択肢がありません。
 *
 *   ok       - Zキー, Enterキー, Bボタン
 *   escape   - Xキー, Escキー
 *   control  - 左Control, 右Contorl
 *   shift    - 左Shift, 右Shift, Aボタン
 *   alt
 *   pageup   - Qキー, Lボタン
 *   pagedown - Wキー, Rボタン
 *
 * これらは、Yanflyのキーボード設定プラグインにも適用されます。
 *
 * 例えば、目の前のイベントを次のタイミングでトリガーする場合
 * Xキー(通常はメニューに移動します)を押すと、次のように記述できます。
 *
 *   button_trigger escape
 *
 * メニューを開く代わりに、エスケープボタンを押してイベントをトリガーします。
 *
 * ZE - Key Mapper等のフルキーボードプラグインを使用している場合、
 * キーボード全体にアクセスできます。
 *
 * 使用可能なボタンについては、入力プラグインの手順をご覧ください。
 * また、押されているボタンの名前を表示する'デバッグ'情報を表示できる
 * プラグインパラメータも提供しています。
 * これをラベルに使用します。
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
 * 1.0 - Dec 31, 2015
 *  * initial release
 * 0.2 - Dec 12, 2015
 *  * fixed error where page switching didn't load up trigger buttons properly
 * 0.1 - Dec 10, 2015
 *  * initial beta release
 * 
 * 
 * @param Show Debug
 * @text デバッグ表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc 押されているキーを表示する場合'true'に設定します。テストプレイ中にF8を押してConsoleで確認してください。
 * @default true
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
 */

/*:
@title Event Trigger Labels
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Dec 31, 2015
@filename HIME_EventTriggerLabels.js
@url http://himeworks.com/2016/01/event-trigger-labels-mv/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.0 - Allows you to set up events to run differently depending
on how the player interacts with it.
@help
== Description ==

In RPG Maker, you have events on the map that can be triggered when the player
is either standing on top of them or in front of them. When a player wishes
to trigger an event, they press the "action" button, which by default is the
Z or Enter key. When an event is triggered, they will execute the entire list
of commands.

However, what happens if you want to allow a player to interact with an event
in different ways?

For example, if a player walks up to an event and talks to it normally, they
might just have friendly conversation.

On the other hand, if a player walks up to an event and presses the A key,
this might issue a challenge to the event to a mini-game, and the event will
ask you if you're sure you want to do this.

This plugin allows you to separate an event's list of commands into different
sections. Depending on how the event is triggered, a different section would
run, allowing you to create unique behaviors when the player interacts with
an event.

== Terms of Use ==

- Free for use in non-commercial projects
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Dec 31, 2015
 * initial release
0.2 - Dec 12, 2015
 * fixed error where page switching didn't load up trigger buttons properly
0.1 - Dec 10, 2015
 * initial beta release

== Usage ==

By default, all commands on the current event page are executed from top to
bottom when the event is run.

We can create sections of the page that will only be run when the trigger
label condition is met.

 -- Button Trigger Labels --

These trigger labels require certain buttons to be pressed.

For example, you might have a set of commands that only run when the "a" key
is pressed, and another set of commands that are only run when the "b" key is
pressed.

To create a button trigger label, create a "Label" event command and write

 button_trigger BUTTON

Where the BUTTON is the name of a button that should be pressed.

Depending on what plugins you're using for buttons, it may be different.
For example, if you're not using any custom keyboard or input scripts, you
don't really have much choice beyond these buttons:

 ok       - Z key, Enter key
 escape   - X key, Esc key
 control  - left control, right contorl
 shift    - left shift, right shift
 alt
 pageup   - Q key
 pagedown - W key

These apply to Yanfly's keyboard config plugin as well.

So for example, if you want the event in front of you to be triggered when
you press the X key (which usually goes to the menu), you can write

 button_trigger escape

Which would intercept the escape button press and trigger the event instead
of opening the menu.

If you're using a full keyboard plugin such as ZE - Key Mapper, you would
then have access to the entire keyboard!

Please look at the instructions for your input plugin on what buttons are
available. I have also provided a plugin parameter that allows you to show
"debug" information, which displays the name of the button that's being
pressed. You will use this for your labels.

@param Show Debug
@desc set this to `true` without quotes if you want to print out the key
that is being pressed. This is to see what to use for your labels.
@default true
*/



var Imported = Imported || {};
var TH = TH || {};
Imported.TH_EventTriggerLabels = 1;
TH.EventTriggerLabels = TH.EventTriggerLabels || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_EventTriggerLabels");
  $.showDebug = $.params["Show Debug"].trim().toLowerCase() === "true";

  var TH_GamePlayer_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
  Game_Player.prototype.triggerButtonAction = function () {
    var res = TH_GamePlayer_triggerButtonAction.call(this);
    if (!res) {
      var key = Input._latestButton;
      if (key && this.canStartLocalEvents()) {
        if ($.showDebug) {
          console.log(key)
        }
        res = this.checkTriggerLabels(key);
      }
    }
    return res;
  };

  /* Generic method for checking trigger labels. Intended to
   * be aliased. Must return true if an event was triggered, and
   * false otherwise
   */
  Game_Player.prototype.checkTriggerLabels = function (button) {
    var res = this.checkButtonTriggerLabels(button);
    return res;
  }

  Game_Player.prototype.checkButtonTriggerLabels = function (button) {
    var events = $gameMap.eventsXy(this.x, this.y);

    // check events under the player
    var res = this.checkEventTriggerLabels(events, button)
    if (res) {
      return true;
    }

    // check events in front of the player
    var direction = this.direction();
    var x1 = this.x;
    var y1 = this.y;
    var x2 = $gameMap.roundXWithDirection(x1, direction);
    var y2 = $gameMap.roundYWithDirection(y1, direction);
    var events = $gameMap.eventsXy(x2, y2);
    res = this.checkEventTriggerLabels(events, button)
    if (res) {
      return true;
    }

    // check events across the counter
    if ($gameMap.isCounter(x2, y2)) {
      var x3 = $gameMap.roundXWithDirection(x2, direction);
      var y3 = $gameMap.roundYWithDirection(y2, direction);
      var events = $gameMap.eventsXy(x3, y3);
      res = this.checkEventTriggerLabels(events, button)
      if (res) {
        return true;
      }
    }
    return false;
  };

  Game_Player.prototype.checkEventTriggerLabels = function (events, button) {
    if (!$gameMap.isEventRunning()) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.hasButtonTriggerLabel(button)) {
          // Add a jump to label command
          var jumpCmd = { code: 119, indent: 0, parameters: ["button_trigger " + button] };
          event.list().splice(0, 0, jumpCmd);
          event.needsTriggerClearOut();

          event.start();
          return true;
        }
      };
    }
    return false;
  };

  var TH_GameEvent_unlock = Game_Event.prototype.unlock;
  Game_Event.prototype.unlock = function () {
    TH_GameEvent_unlock.call(this);
    this.clearOutTriggerLabel();
  };

  /* Clear out the new trigger label we added before */
  var TH_GameEvent_start = Game_Event.prototype.start;
  Game_Event.prototype.start = function () {
    this.loadTriggerSections();
    TH_GameEvent_start.call(this);
  };

  var TH_GameEvent_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function () {
    TH_GameEvent_initMembers.call(this);
    this.clearTriggerLabels();
  };

  var TH_GameEvent_clearPageSettings = Game_Event.prototype.clearPageSettings;
  Game_Event.prototype.clearPageSettings = function () {
    TH_GameEvent_clearPageSettings.call(this);
    this.clearTriggerLabels();
  };

  var TH_GameEvent_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function () {
    TH_GameEvent_setupPageSettings.call(this);
    this.loadTriggerSections();
  };

  Game_Event.prototype.clearOutTriggerLabel = function () {
    var page = this.page()
    if (page && page.needsTriggerClearOut) {
      this.page().list.splice(0, 1);
      this.page().needsTriggerClearOut = false;
    }
  };

  Game_Event.prototype.needsTriggerClearOut = function () {
    this.page().needsTriggerClearOut = true;
  };

  Game_Event.prototype.loadTriggerSections = function () {
    var page = this.page();
    if (page && !page.triggerSectionsLoaded) {
      page._buttonTriggerLabels = {}
      var cmds = page.list;
      i = cmds.length - 1;
      while (i > -1) {
        var cmd = cmds[i];
        if (cmd.code === 118 && cmd.parameters[0].toLowerCase().contains("button_trigger")) {
          var button = cmd.parameters[0].split(" ")[1].toLowerCase();
          page._buttonTriggerLabels[button] = true
          // Insert Exit Event Processing Command above this label to end the previous section1
          var exitCmd = { code: 115, indent: 0, parameters: [] };
          cmds.splice(i, 0, exitCmd);
        }
        i--;
      }
      page.triggerSectionsLoaded = true;
    }
    this._buttonTriggerLabels = page._buttonTriggerLabels;
  };

  Game_Event.prototype.isTriggerSectionsLoaded = function () {
    return this.page().triggerSectionsLoaded;
  };

  Game_Event.prototype.page = function () {
    return this.event().pages[this._pageIndex];
  };

  Game_Event.prototype.clearTriggerLabels = function (button) {
    this._buttonTriggerLabels = {};
  };

  Game_Event.prototype.hasButtonTriggerLabel = function (button) {
    return this._buttonTriggerLabels[button];
  };

  Game_Event.prototype.list = function () {
    return this.page().list;
  };

})(TH.EventTriggerLabels);