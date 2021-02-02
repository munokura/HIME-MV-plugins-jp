/*:ja
 * @target MV MZ
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_HiddenShopGoods.js
 * @title Hidden Shop Goods
 * @author Hime
 * @date Nov 8, 2015
 * @filename HIME_HiddenShopGoods.js
 * @plugindesc v1.0 ショップの商品の表示/非表示を切り替えられます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2015/11/hidden-shop-goods/
 * 
 * == 説明 ==
 *
 * RPGメーカーMVでは、ショップを作成する際に、
 * まず販売するアイテムのリストと価格を指定します。
 * あとはエンジンが代行してくれるので、プレイヤーが店員に話しかけると、
 * 設定したアイテムが表示されます。
 *
 * しかし、特定の条件で特定アイテムを非表示にしたい場合はどうしますか？
 * 例えば、武器屋が様々な種類の武器を提供している場合、
 * パーティの誰も使えない場合は特定の武器を非表示にしたいかもしれません。
 * アクターが剣しか使えない場合、弓や槍を全て隠したいかもしれません。
 *
 * シンプルなコマンドで素早く簡単にショップ商品を非表示にできます。
 * いつものようにイベントを作成して、ショップ商品を非表示にするだけです。
 *
 * == 使用方法 ==
 *
 * ショップの商品には、リストに表示されている順番に番号が付けられています。
 * 最初の商品には1番、2番目の商品には2番、というように番号が付けられています。
 *
 * 商品を隠すには2つの方法があります
 *
 * 1. プラグインコマンドを使う
 *
 * プラグインコマンドを作成
 *
 *   hide_good shopGoodNumber
 *
 * shopGoodNumber は非表示にしたいショップ商品の番号です。
 *
 * 例えば、
 * リストの3番目のショップ商品を隠したい場合、
 * 次のように書きます。
 *
 *   hide_good 3
 *
 * ショップ商品がいつ非表示になるかは、
 * 条件分岐を作成するかどうかにかかっています。
 *
 * 2. スクリプトコールを使う
 *
 * スクリプトコールを作成
 *
 *   hide_good(shopGoodNumber, condition)
 *
 * shopGoodNumber は非表示にしたいショップ商品の番号です。
 *
 * condition は、true/falseで評価されるjavascriptの式です。
 * trueの場合、ショップの商品は非表示になります。
 *
 * 例えば、パーティリーダーのレベルが10以下の場合、
 * 4番目のショップ商品を隠したい場合、下記のスクリプトで実現できます。
 *
 *   hide_good(4, "$gameParty.leader().level < 10")
 *
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * Nov 8, 2015 -  initial release
 */

/*:
@title Hidden Shop Goods
@author Hime
@date Nov 8, 2015
@plugindesc Easily hide shop goods when they shouldn't be seen!
@help 
== Description ==

In RPG Maker MV, when you create shops, you start by specifying a list
of items that will be sold, along with their prices. The engine then
handles the rest for you so that when the player talks to the shopkeeper,
the items you've set up will be displayed.

However, what happens if you want to make it so that certain items are
not shown depending on certain conditions? For example, if a weaponsmith
offers different types of weapons, you might want to hide certain weapon
types if no one in the party can use it. If your actor can only use
swords, you might want to hide all the bows and spears.

This plugin allows you to hide shop goods quickly and easily using
a simple command. Just create your event the way you normally do and
hide shop goods!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 8, 2015 -  initial release

== Usage ==

Shop goods are numbered based on the order they appear in the list.
The first good is assigned number 1, the second is assigned number 2,
and so on.

There are two ways to hide goods

1. Using a plugin command

Create a plugin command and write

  hide_good shopGoodNumber
  
Where the `shopGoodNumber` is the number of the shop good that you would
like to hide.

For example, if you want to hide the third shop good on the list, you
can write

  hide_good 3

It is up to you to create conditional branches to determine when a shop
good will be hidden.

2. Using a script call

Create a script call and write

  hide_good(shopGoodNumber, condition)
  
Where the `shopGoodNumber` is the number of the shop good that you would
like to hide.

The condition is any valid javascript expression that evaluates to
true or false. If the condition is true, then the shop good will be
hidden.

For example, if you want to hide the fourth shop good if the party 
leader's level is less than 10, you can make the script call

  hide_good(4, "$gameParty.leader().level < 10")

 */

var Imported = Imported || {}
var TH = TH || {};
Imported.HiddenShopGoods = 1;
TH.HiddenShopGoods = TH.HiddenShopGoods || {};

(function ($) {

  var TH_HiddenShopGoods_GameTemp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    TH_HiddenShopGoods_GameTemp_initialize.call(this)
    this.clearHiddenShopGoods();
  };

  Game_Temp.prototype.hideShopGood = function (num) {
    this._hiddenShopGoods[num] = true;
  };

  Game_Temp.prototype.isShopGoodHidden = function (num) {
    return this._hiddenShopGoods[num];
  };

  Game_Temp.prototype.clearHiddenShopGoods = function () {
    this._hiddenShopGoods = {};
  }

  /* Use a plugin command */
  var TH_HiddenShopGoods_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    TH_HiddenShopGoods_GameInterpreter_pluginCommand.call(this, command, args);
    if (command.toLowerCase() === "hide_good") {
      this.hideShopGoods(args);
    }
  };

  /* Store the hidden good ID */
  Game_Interpreter.prototype.hideShopGoods = function (args) {
    var shopGoodNum = Math.floor(args[0]) - 1;
    $gameTemp.hideShopGood(shopGoodNum);
  };

  /* Use a script call */
  hide_good = function (shopGoodNum, condition) {
    var num = Math.floor(shopGoodNum) - 1;
    if (eval(condition)) {
      $gameTemp.hideShopGood(num);
    }
  };

  /* Process the goods before the scene takes them */
  var TH_HiddenShopGoods_SceneShop_prepare = Scene_Shop.prototype.prepare;
  Scene_Shop.prototype.prepare = function (goods, purchaseOnly) {
    TH_HiddenShopGoods_SceneShop_prepare.call(this, goods, purchaseOnly);
    this.removeHiddenGoods();
  };

  /* Go through the list of goods and remove the ones that should be removed */
  Scene_Shop.prototype.removeHiddenGoods = function () {
    for (var i = this._goods.length - 1; i >= 0; i--) {
      if ($gameTemp.isShopGoodHidden(i)) {
        this._goods.splice(i, 1);
      }
    }
  }

  /* Clear out hidden goods settings after we're done with the scene */
  var TH_HiddenShopGoods_SceneShop_terminate = Scene_Shop.prototype.terminate;
  Scene_Shop.prototype.terminate = function () {
    TH_HiddenShopGoods_SceneShop_terminate.call(this);
    $gameTemp.clearHiddenShopGoods();
  }
})(TH.HiddenShopGoods);