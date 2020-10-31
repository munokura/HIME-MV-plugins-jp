/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_RandomEncounterEvents.js
 * @title Random Encounter Events
 * @author Hime
 * @date Nov 10, 2015
 * @plugindesc ランダムエンカウント時、マップでコモンイベントを実行できます
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * https://himeworks.com/2015/11/random-encounter-events-mv/
 *
 * == 説明 ==
 *
 * RPGツクールMVでは、
 * プレイヤーが敵にランダムに遭遇するようにマップを設定できます。
 * マップ上に存在する敵、使用可能なリージョン、出現する頻度等を選択できます。
 *
 * ゲーム中、プレイヤーはマップを探索し、敵とランダムエンカウントします。
 *
 * ランダムエンカウントをさらに制御したい場合はどうなりますか?
 * 発生した内容に応じて、いくつかの変数を増やしたい場合はどうしますか?
 * 特定の一連のボタンを時間内に押すことで、
 * プレイヤーにエンカウントをスキップするチャンスを与えるかもしれません。
 *
 * このプラグインは、
 * イベントをランダムエンカウントにも適用するツールを提供します。
 *
 * プレイヤーがランダムエンカウントすると、
 * 戦闘が始まる前に、選んだコモンイベントが実行されます。
 *
 * == 使用法 ==
 *
 * 変数を予約することから始めます。
 * どのコモンイベントを実行するかを決定するために
 * ゲームが使用する特別な変数です。
 *
 * 次に、プラグイン管理に移動し、
 * RandomEncounterEventsをダブルクリックして、
 * 使用することにした変数のIDを入力します。
 *
 * これで、全ての準備が整いました。
 * 動作することをテストするには、下記の例に従ってください。
 *
 * 1.ランダムエンカウント変数として変数10を選択し、
 * マップにランダムエンカウントが設定されていると仮定します。
 *
 * 2.'出現！'というメッセージを表示するコモンイベントを作成します。
 * コモンイベント4であると想定します。
 *
 * 3.テストプレイを開始し、F9を押して、
 * 変数10の値をステップ2で設定したコモンイベントのIDに変更します。
 * この場合、4に設定します。
 *
 * 4.次に、走り回って、ランダムエンカウントを待ちます。
 * ある時点で、'出現！'というメッセージが表示されるはずです。
 * メッセージを読み終えると、戦闘が発生します。
 *
 * エンカウントメッセージが表示された場合、
 * ランダムエンカウントイベントが正常にセットアップされています。
 * イベントを使用して、いつでも実行するコモンイベントを選択できます。
 *
 * -- エンカウントをスキップする --
 *
 * このプラグインを使用すると、ランダムエンカウントをスキップできます。
 *
 * これを行うには、コモンイベント中にスクリプトを使います。
 *
 *   $gamePlayer.cancelEncounter();
 *
 * これは基本的にシステムに戦闘を無視するよう指示します。
 *
 * -- エンカウントした敵情報へのアクセス --
 *
 * コモンイベントでは、遭遇した敵グループにアクセスできます。
 * スクリプトでこのオブジェクトを介して敵グループにアクセスできます。
 *
 *    $gameTroop
 *
 * 
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * Nov 10, 2015 - renamed clearEncounter to cancelEncounter
 * Nov 7, 2015  - initial release
 *
 * @param Variable ID
 * @desc 変数IDを指定。変数の値をコモンイベントIDとして実行
 * @type variable
 * @default 0
 *
 */

/*:
@title Random Encounter Events
@author Hime
@date Nov 10, 2015
@plugindesc Allows you to run a common event when you run into a
random encounter.

@param Variable ID
@desc Holds the ID of the common event that should be run. Changeable in-game
@default 0
@help
== Description ==

In RPG Maker, you can set up your maps so that the player will randomly
encounter enemies. You can choose what enemies will be present on the
map, what regions they will be available in, how often they will
show up, and so on.

During the game, the player can then explore your maps and randomly
encounter enemies.

However, what happens if you wanted to have some more control over
the random encounters? What if you wanted to increment some variables
depending on what you encountered? Or perhaps give the player a chance
to skip the encounter by pressing a certain sequence of buttons in
time!

This plugin gives you the tools to apply your eventing knowledge
towards random encounters as well.

When the player runs into a random encounter, a common event of
your choice will execute, before the battle begins.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 10, 2015 - renamed clearEncounter to cancelEncounter
Nov 7, 2015  - initial release

== Usage ==

Begin by reserving a variable in your game. This is a special variable
that the game will use to determine which common event will run.

Next, go to the plugin manager, double-click on RandomEncounterEvents,
and enter the ID of the variable that you've decided to use.

And now everything is ready. To test that it works, follow this
example:

1. Let's assume you have chosen variable 10 as your random encounter
variable, and that your map has some random encounters set up.

2. Create a common event that will display a message "Encounter!"
  We'll assume this is common event 4

3. Start testplay, press F9, and change the value of variable 10 to
  the ID of the common event you set up in step 2. In this case, I will
  set it to 4.

4. Now, run around and wait for a random encounter. At some point, you
  should get a message that says "Encounter!", and once you finish
  reading the message, the battle will occur.

If you see the encounter message, then your random encounter event has
been set up successfully. You can choose which common event to run
at anytime using events.

-- Skipping Encounters --

This plugin let's you skip random encounters in your random encounter
event.

To do this, you would make a script call

 $gamePlayer.cancelEncounter();

Which would basically tell the engine to ignore the battle.

-- Accessing Encountered Enemy Information --

In your common event, you will have access to the enemy troop that
you encounter.

You can access the troop through this object in script calls

  $gameTroop

I will provide a separate tutorial showing some things you can
do with the troop information.

*/


var Imported = Imported || {};
var TH = TH || {};
Imported.RandomEncounterEvents = 1;
TH.RandomEncounterEvents = TH.RandomEncounterEvents || {};

(function ($) {

  $.parameters = PluginManager.parameters('HIME_RandomEncounterEvents');
  $.VariableID = Math.floor($.parameters["Variable ID"]);

  /* Overwrite */
  Scene_Map.prototype.updateEncounter = function () {
    if ($gamePlayer.executeEncounter()) {
      $gamePlayer.pendingEncounter()
      $gameTemp.reserveCommonEvent($gameVariables.value($.VariableID))
      $gameMap.setupStartingEvent()
    }
    else if ($gamePlayer.isPendingEncounter()) {
      if ($gameMap.isEventRunning()) {
        return;
      }
      $gamePlayer.cancelEncounter();
      SceneManager.push(Scene_Battle)
    }
  };

  var TH_RandomEncounterEvents_GamePlayer_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function () {
    TH_RandomEncounterEvents_GamePlayer_initMembers.call(this);
    this.cancelEncounter();
  };

  /* */
  Game_Player.prototype.pendingEncounter = function () {
    this._isEncountering = true;
  };

  /* Returns true if there is a pending encounter */
  Game_Player.prototype.isPendingEncounter = function () {
    return this._isEncountering;
  };

  /* Removes any pending encounters */
  Game_Player.prototype.cancelEncounter = function () {
    this._isEncountering = false;
  };

})(TH.RandomEncounterEvents);