/*:ja
 * @target MZ MV
 * @title Counter After Hit
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @date Nov 30, 2015
 * @filename HIME_CounterAfterHit.js
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_CounterAfterHit.js
 *
 * @plugindesc 攻撃を回避せずに反撃をするように反撃の仕様を変更します。
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2015/11/counter-after-hit/
 * 
 * 
 * == 説明 ==
 *
 * Video: https://www.youtube.com/watch?v=5bWZAdDSjaQ
 *
 * デフォルトでは、対象が正常に反撃すると、
 * 対象は自動的に攻撃者のアクションを回避し、通常の攻撃で反撃します。
 * このプラグインは、対象が自動的に回避しないように変更し、
 * その後、反撃を実行します。
 *
 * 
 * == 利用規約 ==
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は、連絡してください
 *
 * 
 * == Change Log ==
 *
 * Nov 30, 2015 -  initial release
 *
 * == 使用法 ==
 *
 * プラグインをプロジェクトへ入れるだけです。
 *
 */
/*
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 *
 * * https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、
 * 次のサイトのいずれかで私に連絡できます。
 *
 * * Main Website: http://himeworks.com
 * * Facebook: https://www.facebook.com/himeworkscom/
 * * Twitter: https://twitter.com/HimeWorks
 * * Youtube: https://www.youtube.com/c/HimeWorks
 * * Tumblr: http://himeworks.tumblr.com/
 *
 */

/*:
@title Counter After Hit
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 30, 2015
@filename HIME_CounterAfterHit.js
@url http://himeworks.com/2015/11/counter-after-hit/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc Changes counterattack system so that target may get hit before
they counterattack.
@help
== Description ==

Video: https://www.youtube.com/watch?v=5bWZAdDSjaQ

By default, when a target successfully counterattacks, they would automatically
evade the attacker's action, and then respond with a normal attack.

This plugin changes it so that the target does not evade automatically, and
will perform the counter attack afterwards.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 30, 2015 -  initial release

== Usage ==

Plug and play.

 */

var Imported = Imported || {};
var TH = TH || {};
Imported.CounterAfterHit = 1;
TH.CounterAfterHit = TH.CounterAfterHit || {};

(function($) {

    /* Request a counterattack after the normal attack */
    var TH_BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
    BattleManager.invokeCounterAttack = function(subject, target) {
        this.invokeNormalAction(subject, target);
        this._logWindow.push('performCounterAfterHit', BattleManager.invokeCounterAfterHit, this, subject, target);
    };

    BattleManager.invokeCounterAfterHit = function(subject, target) {
        if (target.canCounter()) {
            TH_BattleManager_invokeCounterAttack.call(this, subject, target);
        }
    };

    Game_Battler.prototype.canCounter = function() {
        return this.canMove();
    };

    /* Perform a counterattack */
    Window_BattleLog.prototype.performCounterAfterHit = function(method, caller, subject, target) {
        method.call(caller, subject, target)
    };
})(TH.CounterAfterHit);