/*:
@title Formula Effects
@author Hime --> HimeWorks (http://himeworks.com)
@date Feb 11, 2015
@version 1.0
@filename HIME_FormulaEffects.js
@url http://himeworks.com/2016/02/formula-effects-mv/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.0 - Allows you to execute any formula as an effect
@help
== Description ==

All items and skills in RPG Maker come with additional "effects".

Effects include gaining HP, learning a skill, gaining a buff in a parameter,
or running a common event.

However, what if you would like a skill to do something that isn't provided
by default?

You could use the damage formula, but what if you would like to create
conditions on those effects? You could include those conditions in the formula
as well, but the problem here is you may end up with a very complex damage
formula.

Instead of using the damage formula for everything, you can create custom
effects that support formulas. If you already knew how to write the formula,
then you can just move it from the damage formula into this formula effect.

Because a formula effect is just another effect, it supports other plugins
that work with effects, such as Conditional Effects, which allows you to
determine whether an effect should be executed based on a condition.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Feb 11, 2015 -  initial release

== Usage ==

To create a formula effect, note-tag items or skills with

  <formula effect>
    FORMULA
  </formula effect>

Where the FORMULA will be evaluated during skill execution and the behavior
is determined by what you write in the formula.

The following formula variables are available

  a - attacker
  b - target
  i - current item or skill
  v - game variables
  s - game switches
  t - game troop
  p - game party

So for example, if you wanted to reduce the target's HP by 100, you could
use the formula

  b.gainHp(-100);

You can access the result of the action on the target using

  var r = b.result()

With this, you can then check how much HP damage or MP damage was dealt

  r.hpDamage
  r.mpDamage

And then use this in your effect calculations.

Anything that is defined in the code can be used as an effect.

 */
/*:ja
 * @title Formula Effects
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @date Feb 11, 2015
 * @version 1.0
 * @filename HIME_FormulaEffects.js
 * @url http://himeworks.com/2016/02/formula-effects-mv/
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
 * @plugindesc v1.0 - 複数行のJavaScript式をアイテムやスキルの効果として実行できます。
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGメーカーの全てのアイテムやスキルには、効果が付いています。
 * 効果には、HPの獲得、スキルの習得、パラメータでのバフ獲得、
 * コモンイベントの実行などがあります。
 * しかし、デフォルトでは用意されていない効果をスキルに持たせたい場合、
 * どうでしょうか?
 * ダメージの計算式を使うこともできますが、
 * その効果に条件をつけたい場合はどうでしょうか?
 * このような条件を計算式に含めることもできますが、
 * 問題は非常に複雑なダメージ計算式になってしまうことです。
 * 全てにダメージ計算式を使用するのではなく、
 * 計算式をサポートするカスタム効果を作成することができます。
 * 計算式の書き方を既に知っていたのであれば、
 * ダメージ計算式からこの効果計算式に移動させればいいのです。
 * 効果計算式はただの効果なので、
 * 条件に基づいて効果を実行すべきかを判断できるHIME_EffectConditionsなど、
 * 効果を扱う他のプラグインにも対応しています。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * Feb 11, 2015 -  initial release
 *
 * == 使用方法 ==
 *
 * 計算式の効果を作成するには、アイテムやスキルにメモタグを付けます。
 *
 *   <formula effect>
 *     FORMULA
 *   </formula effect>
 *
 * ここで、
 * FORMULAはスキル実行時に評価され、
 * 計算式に何を書くかで挙動が決まります。
 * 以下のFORMULA変数が利用可能です。
 *
 *   a - 攻撃者
 *   b - 対象
 *   i - 使用アイテム・スキル
 *   v - 変数
 *   s - スイッチ
 *   t - 敵グループ
 *   p - パーティ
 *
 * 例えば、対象のHPを100減らしたい場合、次のような計算式を使います。
 *
 *   b.gainHp(-100);
 *
 * タグの書き方:
 *
 *   <formula effect>
 *     b.gainHp(-100);
 *   </formula effect>
 *
 * 対象のアクションの結果にアクセスするには下記を使います。
 *
 *   var r = b.result()
 *
 * 下記で、HPダメージやMPダメージを確認できます。
 *
 *   r.hpDamage
 *   r.mpDamage
 *
 * そして、これを効果の計算に使用します。
 *
 * コードで定義されているものは何でも効果として使用できます。
 *
 * 使用例:
 *   スキル使用者と対象者のHP値を対象者にダメージを与え、使用者を回復させる。
 *   (式の大文字・小文字に注意)
 *
 *   <formula effect>
 *     var hpDiff = Math.abs(a.hp - b.hp);
 *     a.gainHp(hpDiff);
 *     b.gainHp(-hpDiff);
 *   </formula effect>
 *
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.FormulaEffects = 1;
TH.FormulaEffects = TH.FormulaEffects || {};

(function ($) {

  $.Code = "TH_FORMULA_EFFECT";
  $.Regex = /<formula[-_ ]effect:\s*(\w+)\s*\/>/img
  $.ExtRegex = /<formula[-_ ]effect>([\s\S]*?)<\/formula[-_ ]effect>/img

  $.loadEffects = function (obj) {
    if (obj.thFormulaEffectsLoaded) {
      return;
    }
    obj.thFormulaEffectsLoaded = true;
    var res;
    while (res = $.ExtRegex.exec(obj.note)) {
      var formula = res[1];
      var eff = {
        code: $.Code,
        dataId: 0,
        value1: formula,
        value2: 0
      };
      obj.effects.push(eff);
    }
  };

  var TH_GameAction_applyItemEffect = Game_Action.prototype.applyItemEffect;
  Game_Action.prototype.applyItemEffect = function (target, effect) {
    if (effect.code === $.Code) {
      this.itemEffectFormulaEffect(target, effect);
    }
    else {
      TH_GameAction_applyItemEffect.call(this, target, effect);
    }
  };

  /* Apply custom formula effect to user or target */
  Game_Action.prototype.itemEffectFormulaEffect = function (target, effect) {
    var formula = effect.value1;
    var a = this.subject();
    var b = target;
    var i = this.item();
    var v = $gameVariables;
    var s = $gameSwitches;
    var p = $gameParty;
    var t = $gameTroop;
    eval(formula);
    this.makeSuccess(target);
  };

  var TH_DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function (object) {
    TH_DataManager_onLoad.call(this, object);
    if (object[1] && object[1].effects !== undefined) {
      for (var i = 1, len = object.length; i < len; i++) {
        $.loadEffects(object[i])
      };
    };
  };
})(TH.FormulaEffects);