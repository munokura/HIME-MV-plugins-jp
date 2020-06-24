/*:
@title Follower Event Touch
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date May 13, 2016
@filename HIME_FollowerEventTouch.js
@url http://himeworks.com/2016/01/follower-event-touch-mv/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.1 - when an event touches a follower, the event will be
triggered as if it touched the player.
@help 
== Description ==

In RPG Maker, the "event touch" trigger allows you to create events that will
execute when they touch the player.

"Touch" means when they try to move in a certain direction, but are unable to
move because there is something blocking the way. In this case, the only 
object they check for is the player.

If one of the player's followers is in the way, they will not be able to move,
but they won't run their commands either.

With this plugin, you can have events triggered when they touch either the
player or the player's followers.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.1 - May 13, 2016
 * Added support for checking which follower is touched
1.0 - Jan 1, 2016
 - initial release

== Usage ==

To have an event triggered when they touch a follower, set their trigger type
to "event touch", and then create a comment and write

  <follower touch>

Whenever the event touches a *visible* follower, the event will also run.

-- Checking who is touched --

When an event is triggered, you may be able to access properties of the
touched follower, assuming a follower was touched.

In your events, you can access the currently touched follower using

  this.touchedFollower()
  
Which will either return a reference to a follower, or null.
If a follower exists, you can then check the properties of the follower.

For example, to check if the follower is facing down if one exists, you
can use this script in a conditional branch:

  var f = this.touchedFollower(); f && f.direction() == 2

 */
/*:ja
 * @title Follower Event Touch
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date May 13, 2016
 * @filename HIME_FollowerEventTouch.js
 * @url http://himeworks.com/2016/01/follower-event-touch-mv/
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
 * @plugindesc v1.1 イベントがフォロワーに触れると、プレイヤーに触れたと同様にイベントを実行します
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGツクールMVでは、
 * "イベントから接触"トリガーを使って、プレイヤーに触れた時、
 * 実行されるイベントを作成することができます。
 * "接触"とは、イベントが特定の方向に移動しようとしたが、
 * 何かが邪魔をしていて移動できない場合を意味します。
 * この場合、イベントがチェックする対象はプレイヤーだけです。
 * もしプレイヤーのフォロワーが邪魔をしている場合、
 * イベントは移動できませんが、コマンドを実行することもできません。
 * このプラグインを使えば、
 * プレイヤーやフォロワーに触れた時にイベントを発生させることができます。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は無料ですが、連絡してください
 * - クレジット表示をHimeWorksにしてください
 *
 * == Change Log ==
 *
 * 1.1 - May 13, 2016
 *  * Added support for checking which follower is touched
 * 1.0 - Jan 1, 2016
 *  - initial release
 *
 * == 使用方法 ==
 *
 * フォロワーに接触した時、イベントをトリガーするには、
 * トリガーを"イベントから接触"に設定し、注釈を作成して以下のように書きます。
 *
 *   <follower touch>
 *
 * フォロワーに触れると、イベントが実行されます。
 *
 * -- 触られたフォロワーの確認 --
 *
 * イベントがトリガーされた時、
 * フォロワーが接触されたと仮定して、
 * 接触されたフォロワーのプロパティにアクセスできる場合があります。
 * イベントが接触してるフォロワーにアクセスするには、スクリプトを使います。
 *
 *   this.touchedFollower()
 *
 * フォロワーへの参照を返すかnullを返します。
 * フォロワーが存在する場合、
 * そのフォロワーのプロパティをチェックすることができます。
 * 例えば、フォロワーが存在する場合、
 * そのフォロワーが下を向いているかどうかをチェックするには、
 * '条件分岐'で下記のスクリプトを使用します。
 *
 *   var f = this.touchedFollower(); f && f.direction() == 2
 *
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.TH_FollowerEventTouch = 1;
TH.FollowerEventTouch = TH.FollowerEventTouch || {};

(function ($) {

  var TH_GameEvent_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
  Game_Event.prototype.checkEventTriggerTouch = function (x, y) {
    TH_GameEvent_checkEventTriggerTouch.call(this, x, y);
    this.checkFollowerEventTouch(x, y);
  };

  Game_Event.prototype.checkFollowerEventTouch = function (x, y) {
    if (!$gameMap.isEventRunning()) {
      if (this._trigger === 2 && this._followerTouch) {
        var followers = $gamePlayer.followers().visibleFollowers();
        for (var i = 0; i < followers.length; i++) {
          if (followers[i].pos(x, y)) {
            this.onFollowerTouch(followers[i]);
          }
        }
      }
    }
  };

  Game_Event.prototype.onFollowerTouch = function (follower) {
    if (!this.isJumping() && this.isNormalPriority()) {
      this.start();
    }
  };

  var TH_GameEvent_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function () {
    TH_GameEvent_setupPageSettings.call(this);
    var page = this.page();
    var list = page.list;
    for (var i = 0; i < list.length; i++) {
      var cmd = list[i];

      if (cmd.code === 108 && cmd.parameters[0].contains("<follower touch>")) {
        this._followerTouch = true;
        break;
      }
    }
  };

  var TH_GameEvent_clearPageSettings = Game_Event.prototype.clearPageSettings;
  Game_Event.prototype.clearPageSettings = function () {
    TH_GameEvent_clearPageSettings.call(this);
    this._followerTouch = false;
  };

  var TH_GameEvent_onFollowerTouch = Game_Event.prototype.onFollowerTouch;
  Game_Event.prototype.onFollowerTouch = function (follower) {
    TH_GameEvent_onFollowerTouch.call(this, follower);
    this._touchedFollower = follower;
  };

  Game_Event.prototype.touchedFollower = function () {
    return this._touchedFollower;
  };

  Game_Event.prototype.clearTouchedFollower = function () {
    this._touchedFollower = null;
  };

  var TH_GameInterpreter_setup = Game_Interpreter.prototype.setup;
  Game_Interpreter.prototype.setup = function (list, eventId) {
    TH_GameInterpreter_setup.call(this, list, eventId);
    var event = $gameMap.event(eventId);
    if (event) {
      this._touchedFollower = event.touchedFollower();
      event.clearTouchedFollower()
    }
  };

  Game_Interpreter.prototype.touchedFollower = function () {
    return this._touchedFollower;
  };
})(TH.FollowerEventTouch);