/*:
@title More Enemy Drops
@author Hime
@version 1.4
@date Dec 4, 2015
@filename HIME_MoreEnemyDrops.js
@url http://himeworks.com/2015/11/more-enemy-drops/
@plugindesc Allows you to add more drops to an enemy and use percentage
probabilities for drop chance.
@help
== Description ==

RPG Maker MV allows you to create up to three item drops for an enemy.
When the battle is over, the player may receive up to any of these
3 items.

When you specify drops, you use something called a "denominator"
probability, which is basically you specifying the chances of the item
dropping as a fraction of 1.

For example, if an item had a 1 /2 chance to drop, then it has a 50%
chance to drop. If an item had a 1 / 3 chance to drop, then it has a
33.33% chance to drop.

Unfortunately, with this system, you could never have any
probabilities in between.

This plugin addresses two issues:

1. You can specify more drops
2. You can specify probability using percentages

This should give you more flexibility when designing your enemies.
Give this plugin a try!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.4 Dec 4, 2015
  - You can reference the enemy in the drop chance now
1.3 Dec 4, 2015
  - changed drop default to 100% if option is not provided
1.2 Nov 25, 2015
  - switched to new note-tag format with new features
1.1 Nov 8, 2015
  - fixed bug in regex
1.0 Nov 6, 2015
  - initial release

== Usage ==

-- Understanding Item Codes --

Before we begin, you must first understand a concept that I call
"Item Codes". The item code is a way for you to quickly specify
what kind of item you want, and the ID of the item.

If you already understand item codes you can just skip this part.

This is how an ItemCode looks like:

  a11
  w23
  i42

The first letter represents the item kind.

  a - armor
  w - weapon
  i - item

The number after is the database ID. So if you write

  w23

That means the enemy will drop weapon 23.

-- Managing Additional Drops --

To create enemy drops, you would use a note-tag that looks like this:

  <enemy drop>
    item_code: "ID",
    amount: number,
    chance: "FORMULA"
  </enemy drop>

Take note of those commas: if you have additional options, you must
include a comma.

`item_code` is the code that was described above. This indicates which
item will be dropped.

`chance` is a formula that evaluates to a number as a percentage.
So for example, you could write numbers

  chance: "25"

Which means 25% chance to drop.

Alternatively, you can use javascript code if you know how to write them.
The condition offers 3 formula variables

  enemy - this enemy
      v - game variables
      s - game switches


For example, this plugin gives you a special formula variable called `v`
which gives you access to the game variables.

  chance: "v.value(3) * 10"

Which gives you 10 times the value of variable 3.
You can also use the formula variable "s" to give you access to switches.
So for example,

  chance: "s.value(2) === false ? 0 : 100"

Which means if switch 2 is OFF, it drops with 0%, but if the switch is
ON, then you get it 100%.

By default, if you don't specify a chance, then it is assumed to drop
at 100%.

For example, if you write

  <enemy drop>
    item_code: "i1"
  </enemy drop>

Then it will drop item 1 100% of the time.

The `amount` option tells the game how much of that item should drop.
For example, if you write

  <enemy drop>
    item_code: "w3",
    amount: 2
  </enemy drop>

Then it will drop two of weapon 3. If you don't specify an amount, then
the game assumes you will only get 1.

 */
/*:ja
 * @title More Enemy Drops
 * @author Hime
 * @version 1.4
 * @date Dec 4, 2015
 * @filename HIME_MoreEnemyDrops.js
 * @url http://himeworks.com/2015/11/more-enemy-drops/
 * @plugindesc 敵にドロップアイテムを追加し、獲得率にパーセンテージを使用できます。
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGツクールMVでは、敵に対して最大3つのアイテムドロップを作成できます。
 * 戦闘が終了すると、
 * プレーヤーはこれら3つのアイテムのいずれかを手に入れられます。
 *
 * ドロップを指定する時、'分母'で確率を使用します。
 *
 * 例えば、アイテムがドロップする確率が1/2だった場合、
 * 50%の確率でドロップします。
 * アイテムにドロップする確率が1/3ある場合、ドロップする確率は33.33%です。
 *
 * 残念ながら、このシステムでは、間に確率を設定することはできません。
 *
 * このプラグインは2つの問題に対処します。
 *
 * 1.より多くのドロップを指定できます
 * 2.パーセンテージを使用して確率を指定できます
 *
 * これにより、敵を設計する際の柔軟性が高まります。
 * このプラグインを試してみてください！
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は連絡してください
 *
 * == Change Log ==
 *
 * 1.4 Dec 4, 2015
 *   - You can reference the enemy in the drop chance now
 * 1.3 Dec 4, 2015
 *   - changed drop default to 100% if option is not provided
 * 1.2 Nov 25, 2015
 *   - switched to new note-tag format with new features
 * 1.1 Nov 8, 2015
 *   - fixed bug in regex
 * 1.0 Nov 6, 2015
 *   - initial release
 *
 * == 使用法 ==
 *
 * -- ItemCodeについて --
 *
 * 始める前に、'ItemCode'と呼ぶ概念を理解する必要があります。
 * ItemCodeは、必要なアイテムの種類とアイテムのIDを簡潔に指定する方法です。
 *
 * ItemCodeを理解している場合、この説明を読まずに済みます。
 *
 * ItemCodeは次のようになります。
 *
 *   a11
 *   w23
 *   i42
 *
 * 最初の文字はアイテムの種類を表します。
 *
 *   a - 防具
 *   w - 武器
 *   i - アイテム
 *
 * 後の数字はデータベースIDです。書き方は下記になります。
 *
 *   w23
 *
 * これは、敵が武器23を落とすことを意味します。
 *
 * -- 追加のドロップの管理 --
 *
 * 敵のドロップを作成するには、次のようなメモタグを敵のメモ欄へ記述します。
 *
 *   <enemy drop>
 *     item_code: "ID",
 *     amount: number,
 *     chance: "FORMULA"
 *   </enemy drop>
 *
 * これらのコンマに注意してください。
 * 追加のオプションがある場合、カンマを含める必要があります。
 *
 * 'item_code'は上記で説明したコードです。
 * ドロップされるアイテムを示します。
 *
 * 'chance'は、パーセンテージとして数値に評価される式です。
 * 数字を書くことができます。
 *
 *   chance: "25"
 *
 * これで、25％の確率でドロップします。
 *
 * 別の方法として、JavaScriptコードを使用できます。
 * 条件は3つの数式変数を提供します。
 *
 *   enemy - この敵
 *       v - ゲーム変数
 *       s - ゲームスイッチ
 *
 * 例えば、このプラグインは、
 * ゲーム変数へのアクセスを提供する'v'という特別な数式変数を提供します。
 *
 *   chance: "v.value(3) * 10"
 *
 * 変数3の10倍の値が得られます。
 * 式変数's'を使用して、スイッチにアクセスすることもできます。
 * 例えば、
 *
 *   chance: "s.value(2) === false ? 0 : 100"
 *
 * スイッチ2がオフの場合、0%になりますが、
 * スイッチ2がオンの場合、100%になります。
 *
 * デフォルトでは、チャンスを指定しない場合、
 * 100%でドロップするものと想定されます。
 * 例えば、
 *
 *   <enemy drop>
 *     item_code: "i1"
 *   </enemy drop>
 *
 * アイテム1を100％の確率でドロップします。
 *
 * 'amount'オプションは、そのアイテムをドロップする量を指定します。
 * 例えば、
 *
 *   <enemy drop>
 *     item_code: "w3",
 *     amount: 2
 *   </enemy drop>
 *
 * この場合、武器3を2つドロップします。
 * 量を指定しない場合、1つを獲得します。
 *
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.MoreEnemyDrops = 1;
TH.MoreEnemyDrops = TH.MoreEnemyDrops || {};

(function ($) {

  $.ExtRegex = /<enemy[-_ ]drop>([\s\S]*?)<\/enemy[-_ ]drop>/img

  $.getKind = function (letter) {
    if (letter === "i") {
      return 1;
    }
    else if (letter === "w") {
      return 2;
    }
    else if (letter === "a") {
      return 3;
    }
  };

  $.parseMoreDropItems = function (enemy) {
    enemy.extraDropItems = [];
    var res;
    var drop;
    while (res = $.ExtRegex.exec(enemy.note)) {
      var data = new Function("return {" + res[1] + "}")();
      var drop = $.parseExtendedDrop(data);
      enemy.extraDropItems.push(drop);
    };
  };

  $.parseExtendedDrop = function (data) {
    var itemCode = data.item_code;
    var itemType = itemCode[0];
    var itemId = Math.floor(itemCode.substring(1));
    var chance = data.chance || "100";
    var formula = chance;
    var amount = data.amount || 1;
    var drop = {};
    drop.kind = $.getKind(itemType.toLowerCase());
    drop.dataId = itemId;
    drop.chance = formula;
    drop.amount = Math.floor(amount);
    return drop;
  };

  var TH_MoreEnemyDrops_GameEnemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
  Game_Enemy.prototype.makeDropItems = function () {
    $.parseMoreDropItems(this.enemy());
    var items = TH_MoreEnemyDrops_GameEnemy_makeDropItems.call(this);
    items = items.concat(this.makeExtraDropItems(this.enemy()));
    return items
  };

  /* Determine whether any extra items are dropped. These items
   * use percentage based probabilities.
   */
  Game_Enemy.prototype.makeExtraDropItems = function (enemy) {
    if (enemy.extraDropItems === undefined) {
      $.parseMoreDropItems(enemy);
    }
    var res = [];
    for (var i = 0; i < enemy.extraDropItems.length; i++) {
      var di = enemy.extraDropItems[i];

      if (Math.random() * 100 < this.dropRate(di)) {
        for (var j = 0; j < di.amount; j++) {
          res.push(this.itemObject(di.kind, di.dataId));
        }
      }
    }
    return res;
  };

  /* Treat denominator as a percentage. Apply double drop as well */
  Game_Enemy.prototype.dropRate = function (dropItem) {
    return this.evalDropChance(dropItem.chance) * this.dropItemRate()
  };

  Game_Enemy.prototype.evalDropChance = function (formula) {
    var enemy = this;
    var v = $gameVariables;
    var s = $gameSwitches;
    return eval(formula);
  };
})(TH.MoreEnemyDrops);