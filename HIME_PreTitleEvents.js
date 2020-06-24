/*:
@title Pre-Title Events
@author Hime @ HimeWorks (http://himeworks.com
@date Feb 23, 2016
@filename HIME_PreTitleEvents.js
@url http://himeworks.com/2015/11/pre-title-events/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/
@plugindesc Build your own sequence of events that should occur before
the title screen begins

@help
== Description ==

RPG Maker MV gives you a nice title screen, but it doesn't give you much
control over what should happen before the game goes to the title
screen.

For example, you might want to show some splash screens, or perhaps
an introductory video.

With this plugin, you can easily put together what should happen before
the title screen using events that you are already familiar with.

Because it is an event, you can do basically anything you want!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Feb 23, 2016 - pre-title map can be used as the title screen.
Nov 14, 2015 - switched to a new pre-title map subclass
Nov  5, 2015 - initial release

== Usage ==

-- Use as Splash Screen --

Start by creating a new map where you will be creating your pre-title
event.

Next, go to the plugin manager, double-click on my plugin entry, and
then set the "Pre-Title Map ID" value to the ID of your map.

Note that the pre-title event doesn't automatically go to the title
screen when your event is finished. This is to provide you with full
control over how the event will behave.

If you would like to go to the title screen afterwards, you can make
the following script call:

   SceneManager.goto(Scene_Title)

-- Use as Title Screen --

This plugin provides the option to replace your title screen with the
map you have selected for your pre-title events.

This allows you to event your title screen yourself.

In the plugin parameters, set the "Use As Title" option to true if you
would like to have the game treat the pre-title map as the title screen.

This means that if the player decides to quit the game and return to the
menu, they will go back to the pre-title screen.

Otherwise, the pre-title screen will simply be a splash screen that will
be displayed once.

@param Pre-Title Map ID
@desc Which map to show for pre-title processing
@default 1

@param Use As Title
@desc Replaces the title screen with this map. Set this to true if you
want this to be used as your title screen by default.
@default false
 */
/*:ja
 * @title Pre-Title Events
 * @author Hime @ HimeWorks (http://himeworks.com
 * @date Feb 23, 2016
 * @filename HIME_PreTitleEvents.js
 * @url http://himeworks.com/2015/11/pre-title-events/
 *
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 *
 * * https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、
 * 次のサイトのいずれかで私に連絡できます。
 *
 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/
 * 
 * @plugindesc タイトル表示前に実行するイベントを作成できます。
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGツクールMVを使用すると、タイトル画面が表示されますが、
 * タイトル画面が表示される前に、何かをさせる制御はできません。
 *
 * 例えば、スプラッシュスクリーンを表示したり、
 * 紹介ビデオを表示したりです。
 *
 * このプラグインを使用すると、
 * 使い慣れたイベントを使用して、
 * タイトル画面の前に何をすべきかを簡単にまとめることができます。
 *
 * イベントなので、基本的には何でもできます！
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は連絡してください
 *
 *
 * == Change Log ==
 *
 * Feb 23, 2016 - pre-title map can be used as the title screen.
 * Nov 14, 2015 - switched to a new pre-title map subclass
 * Nov  5, 2015 - initial release
 *
 * == 使用法 ==
 *
 * -- スプラッシュスクリーンとして使用 --
 *
 * タイトル前イベントを作成する新しいマップを作成することから始めます。
 *
 * 次に、プラグイン管理に移動し、プラグインエントリをダブルクリックし、
 * 'Pre-Title Map ID'値をマップのIDに設定します。
 *
 * タイトル前イベントが終了しても、
 * 自動的にタイトル画面に移動しないことに注意してください。
 * イベントの動作を完全に制御できるようにするためです。
 *
 * 後でタイトル画面に移動する場合、次のスクリプトを使用します。
 *
 *    SceneManager.goto(Scene_Title)
 *
 * -- タイトル画面として使用 --
 *
 * このプラグインは、
 * タイトル画面をタイトル前イベント用に
 * 選択したマップに置き換えるオプションを提供します。
 *
 * これにより、自分でタイトル画面をイベントにできます。
 *
 * プラグインのパラメーターで、
 * タイトル画面としてタイトル前マップをゲームで処理する場合、
 * 'Use As Title'オプションをtrueに設定します。
 *
 * プレーヤーがゲームを終了してメニューに戻ると決定した場合、
 * タイトル前画面に戻ることを意味します。
 *
 * それ以外の場合、
 * タイトル前画面は単にスプラッシュ画面になり、
 * 一度表示されます。
 *
 * @param Pre-Title Map ID
 * @desc タイトル前イベントのマップ
 * @default 1
 *
 * @param Use As Title
 * @type boolean
 * @desc タイトル画面をこのマップに置き換えます。デフォルトでタイトル画面として使用する場合、trueに設定します。
 * @default false
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.PreTitleEvents = 1;
TH.PreTitleEvents = TH.PreTitleEvents || {};

(function ($) {

  $.Parameters = PluginManager.parameters('HIME_PreTitleEvents');
  $.MapID = Math.floor($.Parameters['Pre-Title Map ID']) || 1;
  $.UseAsTitle = $.Parameters['Use As Title'].trim().toUpperCase() === "TRUE";
  $.ShownOnce = false;

  function Scene_PretitleMap() {
    this.initialize.apply(this, arguments);
  }

  Scene_PretitleMap.prototype = Object.create(Scene_Map.prototype);
  Scene_PretitleMap.prototype.constructor = Scene_PretitleMap;

  Scene_PretitleMap.prototype.initialize = function () {
    Scene_Map.prototype.initialize.call(this);
    DataManager.setupNewGame();
    $gamePlayer.reserveTransfer($.MapID, 0, 0);
  }

  var TH_SceneManager_goto = SceneManager.goto;
  SceneManager.goto = function (sceneClass) {
    if (sceneClass === Scene_Title && ($.UseAsTitle || !$.ShownOnce)) {
      this._nextScene = new Scene_PretitleMap();
      $.ShownOnce = true;
    }
    else {
      TH_SceneManager_goto.call(this, sceneClass);
    }
  };
})(TH.PreTitleEvents);