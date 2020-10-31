/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_BattleExpDistribution.js
 * @title Battle Exp Distribution
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Jan 2, 2016
 * @filename HIME_BattleExpDistribution.js
 *
 * @plugindesc v1.0 戦闘勝利時に獲得する経験値合計を参加生存アクターに均等割します
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2016/01/battle-exp-distribution/
 *
 * == 説明 ==
 *
 * 戦闘で敵を倒すと、生きている全員に何らかの経験値を獲得します。
 * 例えばスライムを倒した場合、そのスライムが100経験値の価値があると、
 * 生存パーティメンバー全員が100経験値を獲得します。
 * メンバーが1人の場合、そのメンバーは100経験値を獲得します。
 * 4人のメンバーが居た場合、4人のメンバー全員が100経験値を獲得します。
 *
 * これではパーティメンバーの人数で差はないので、
 * パーティメンバーを1人で戦闘に挑む利点がありません。
 *
 * このプラグインは経験値の獲得方法を変更します。
 * 単純に全員が同じ量の経験値を獲得するのではなく、
 * 合計経験値を参加生存アクターに均等割します。
 * 敵が100経験値を持っていて、他の3人のパーティメンバーを連れてきた場合、
 * 全員が25経験値を獲得します。
 * ただし、敵を1人で倒した場合、100経験値を獲得できます。
 *
 * == 使用方法 ==
 *
 * 入れるだけです。
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
 * 1.0 - Jan 2, 2016
 *  - initial release
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
@title Battle Exp Distribution
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Jan 2, 2016
@filename HIME_BattleExpDistribution.js
@url http://himeworks.com/2016/01/battle-exp-distribution/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.0 - distributes EXP between all alive party members equally.
@help 
== Description ==

In RPG Maker, when you defeat enemies in battle, everyone that's alive will
receive some EXP.

So for example, if you defeated a slime, and the slime is worth 100 EXP, then
every party member that is alive will receive 100 EXP. If you had one member,
that member would receive 100 EXP. If you had four members, then all four
members would receive 100 EXP.

However, this means there is no incentive to try to challenge yourself to have
one party member solo the battle, because there's no difference whether you
bring your entire party or not.

This plugin changes the way EXP is rewarded. Instead of simply giving everyone
the same amount of EXP, the total EXP is divided among all of the party
members.

For now, the EXP is divided equally, so if an enemy gives 100 EXP and you
bring three other party members with you, then everyone will only receive 25.
However, if you decided to solo the enemy yourself, you will get the full 100.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Jan 2, 2016
 - initial release

== Usage ==

Plug and Play.


 */

var Imported = Imported || {};
var TH = TH || {};
Imported.TH_BattleExpDistribution = 1;
TH.BattleExpDistribution = TH.BattleExpDistribution || {};

(function ($) {

  var TH_GameTroop_expTotal = Game_Troop.prototype.expTotal;
  Game_Troop.prototype.expTotal = function () {
    var total = TH_GameTroop_expTotal.call(this);
    total = this.applyTotalExpModifiers(total);
    return total;
  };

  Game_Troop.prototype.applyTotalExpModifiers = function (total) {
    total = this.applyPartyCountExpModifier(total);
    return total;
  };

  Game_Troop.prototype.applyPartyCountExpModifier = function (total) {
    total = Math.floor(total / $gameParty.aliveMembers().length);
    return total;
  };

})(TH.BattleExpDistribution);