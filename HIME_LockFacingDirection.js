/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_LockFacingDirection.js
 * @title Lock Facing Direction
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Jan 1, 2016
 * @filename HIME_LockFacingDirection.js
 *
 * @plugindesc v1.0 プレイヤーが特定のボタンを押した時、方向を変えずに移動できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 * 
 * 元プラグイン:
 * http://himeworks.com/2016/01/lock-facing-direction/
 *
 * == 説明 ==
 *
 * RPGツクールでは、キャラクターを移動させると、移動中はその方向を向きます。
 * 例えば、上に移動すると上を向きます。
 * 左に移動すると左を向きます。
 *
 * このプラグインを使うと、
 * プレイヤーが特定のボタンを押した時、方向を変えずに移動できます。
 * 前方を向いたまま左右に移動する向き固定移動ができます。
 *
 * 向く方向が重要な場面では、他にも機構が絡んでいることがあります。
 *
 * == 使用方法 ==
 *
 * プラグインのパラメータで、"Lock Button"のボタンの名前を入力してください。
 * デフォルトの入力システムを使用している場合
 * (つまり、入力プラグインを使用していない場合)、
 * 以下のボタンを使用することができます。
 *
 *   shift    - Xボタン / Shift
 *   control  - Control / Alt
 *   ok       - Aボタン / Enter / スペース / Z
 *   escape   - Escape / テンキー0 / X / Insert
 *   pageup   - LBボタン / Pageup / Q
 *   pagedown - RBボタン / Pagedown / W
 *   down     - 下ボタン / カーソル下 / テンキー2
 *   left     - 左ボタン / カーソル左 / テンキー4
 *   right    - 右ボタン / カーソル右 / テンキー6
 *   up       - 上ボタン / カーソル上 / テンキー8
 *   tab      - Tab
 *
 * 例えば、`shift`ボタン(引用符なし)を使用した場合、
 * プレイヤーがshiftを押した時、キャラクターの方向が固定されます。
 * カスタム入力システムを使用している場合、
 * そのプラグインが提供する説明書を参照して、
 * 使用するボタンの名前を確認する必要があります。
 * このプラグインはゲームパッドとキーボードの両方で動作します。
 *
 * -----注意-----
 * 
 * 現在のところ、マウス・タッチのシステムには対応していません。
 * -----注意-----
 *
 * 原文では上記のとおりに書いてありますが、
 * 指定されたキー・ボタンを押したまま、
 * マウスで移動する分には向き固定は働いています。
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
 * 1.0 - Jan 1, 2016
 *  - initial release
 *
 * @param Lock Button
 * @text ロックボタン
 * @type select
 * @option Tab
 * @value tab
 * @option Aボタン / Enter / スペース / Z
 * @value ok
 * @option Xボタン / Shift
 * @value shift
 * @option Control / Alt
 * @value control
 * @option Escape / テンキー0 / X / Insert
 * @value escape
 * @option RBボタン / Pagedown / W
 * @value pagedown
 * @option LBボタン / Pageup / Q
 * @value pageup
 * @option 下ボタン / カーソル下 / テンキー2
 * @value down
 * @option 左ボタン / カーソル左 / テンキー4
 * @value left
 * @option 右ボタン / カーソル右 / テンキー6
 * @value right
 * @option 上ボタン / カーソル上 / テンキー8
 * @value up
 * @desc プレイヤーの方向をロックするボタン
 * @default control
 */
/*
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
*/

/*:
@title Lock Facing Direction
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Jan 1, 2016
@filename HIME_LockFacingDirection.js
@url http://himeworks.com/2016/01/lock-facing-direction/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.0 - Allows you to lock the direction that the character is
facing while a button is pressed.
@help
== Description ==

In RPG Maker, when you move your character around, they will face that
direction while they are moving. For example, if you move up, they will face
up. If you move left, they will face left.

With this plugin, you can set it up so that when the player holds down a
specific button, the character will not change directions while moving. This
allows you to create strafing movement, where you move side to side while
facing forward.

There can be other mechanics involved where the direction that you face may
be important.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Jan 1, 2016
 - initial release

== Usage ==

In the plugin parameters, type in the name of the button for the "Lock Button"
The actual name of the button will depend on what input plugins you're using.

If you're using the default input system (ie: no input plugins), you have the
following buttons to work with:

  shift    - any "shift" keys
  control  - any "ctrl" or "alt" keys
  ok       - "z", "enter", "space"
  escape   - "x", "esc", "insert"
  pageup   - "q", "pgup"
  pagedown - "w", "pgdown"
  left     - left arrow, numpad 4
  up       - up arrow, numpad 8
  right    - right arrow, numpad 6
  down     - down arrow, numpad 2

So for example, if you use the `shift` button (without quotes), then when the
player holds down shift, their character direction will be fixed.

If you are using a custom input system, you will need to consult the
instructions provided by that plugin to get the names of the buttons you
have to work with.

This plugin should work with both gamepads and keyboards.
It currently does not support mouse-only or touch-only systems.

@param Lock Button
@desc The name of the button to press to lock the player direction
@default control
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.TH_LockFaceDirection = 1;
TH.LockFaceDirection = TH.LockFaceDirection || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_LockFacingDirection");
  $.button = $.params["Lock Button"].toLowerCase().trim();

  var TH_GameCharacterBase_isDirectionFixed = Game_CharacterBase.prototype.isDirectionFixed;
  Game_CharacterBase.prototype.isDirectionFixed = function () {
    return TH_GameCharacterBase_isDirectionFixed.call(this) || this.isdirectionFixButtonPressed();
  };

  Game_CharacterBase.prototype.isdirectionFixButtonPressed = function () {
    return Input.isPressed($.button);
  };
})(TH.LockFaceDirection);