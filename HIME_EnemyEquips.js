/*:
@title Enemy Equips
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.3
@date Apr 26, 2016
@filename HIME_EnemyEquips.js
@url http://himeworks.com/2015/11/enemy-equips/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.3 - Allows you to give enemies equips. Provides
functionality for managing enemy equips.
@help
== Description ==

Video: https://www.youtube.com/watch?v=HRZp2narUWU

Do you have a game where players can visually see what enemies are using?
For example, depending on what armor they wear, their appearance will
change.

Or perhaps you have a stealing mechanic that allows you to steal enemy
weapons and armors, which would lower the enemy's strength and defense
after those equips have been pilfered!

This plugin provides you with the ability to give enemies equips.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.3 - Apr 26, 2016
  * supports "normal attack" animation for enemies now
1.2 - Dec 7, 2015
  * Display plugin loading error
1.1 - Nov 21, 2015
  * added some methods related to equips and animations
1.0 - Nov 20, 2015
  * initial release

== Required ==

* Equip Slots Core
  http://himeworks.com/2015/11/equip-slots-core/

== Usage ==

-- Setting up Equip Slots --

For details information on how to set up equip slots, please see
the usage section for Equip Slots Core.

If you already know how to set up equip slots, basically just
note-tag enemies with

  <equip slot: ETYPE>

If you want to set up initial equipment, use the note-tag:

  <equip slot: ETYPE ITEM_CODE>

-- Setting up Equip Traits --

Like actors, enemies will need to have the appropriate "equip" features
so that they can actually equip weapons and armors.

-- Changing Equips During the Game --

To change enemy equips during the game, you can use script calls.
To access the enemy, you will need to use this script call

  var enemy = $gameTroop.members()[INDEX];

Where the INDEX is the index of the enemy you want to choose.
0 is the first enemy, 1 is the second enemy, and so on.

Once you have your enemy, you will need a weapon or an armor.
Let's say you wanted to get weapon 3 from the database. You
would use this script call

  var weapon = $dataWeapons[3];

Next, you just need to have the enemy change equips, using the
following script call:

  enemy.changeEquip(SLOT_INDEX, EQUIP);

Where the SLOT_ID is which slot you want to set the equip to.
0 is the first slot, 1 is the second slot, and so on.

So the whole script call would look something like this:

  var enemy = $gameTroop.members()[INDEX];
  var weapon = $dataWeapons[3];
  enemy.changeEquip(0, weapon);

If successful, your equip will now be using weapon 3.

 */
/*:ja
 * @title Enemy Equips
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.3
 * @date Apr 26, 2016
 * @filename HIME_EnemyEquips.js
 * @url http://himeworks.com/2015/11/enemy-equips/
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
 * @plugindesc v1.3 要HIME_EquipSlotsCore.js。敵に装備スロットを加え、装備を管理する機能を追加します
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * == 説明 ==
 *
 * Video: https://www.youtube.com/watch?v=HRZp2narUWU
 *
 * プレイヤーが使用している敵を視覚的に確認できるゲームはありますか?
 * 例えば、着用する防具に応じて、外観は変化します。
 *
 * 敵の武器や防具を盗むことができる盗難メカニズムがあり、
 * それらの装備が盗まれた後に敵の力と防御を低下させるかもしれません。
 *
 * このプラグインは、敵に装備スロットを加え、装備を管理する機能を追加します。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.3 - Apr 26, 2016
 *   * supports "normal attack" animation for enemies now
 * 1.2 - Dec 7, 2015
 *   * Display plugin loading error
 * 1.1 - Nov 21, 2015
 *   * added some methods related to equips and animations
 * 1.0 - Nov 20, 2015
 *   * initial release
 *
 * == 必要プラグイン ==
 *
 * * Equip Slots Core
 *   http://himeworks.com/2015/11/equip-slots-core/
 *
 * == 使用法 ==
 *
 * -- 装備スロットの設定 --
 *
 * 装備スロットの設定方法の詳細については、
 * HIME_EquipSlotsCoreの'使用法'セクションを参照してください。
 *
 * 基本タグは下記です。
 * このプラグインでは、敵のメモ欄に入力します。
 *
 *   <equip slot: ETYPE>
 *
 * 初期装備を設定する場合、下記のメモタグを使用します。
 *
 *   <equip slot: ETYPE ITEM_CODE>
 *
 * -- 装備特性の設定 --
 *
 * 敵の特徴内'武器タイプ装備' '防具タイプ装備'に注意してください。
 * 適合していない装備を指定した場合、
 * スロットが用意され、装備は無しになります。
 *
 * -- ゲーム中に装備を変更する --
 *
 * ゲーム中に敵の装備を変更するには、スクリプトコールを使用できます。
 * あくまで、装備の変更の設定です。
 * 予め敵のメモタグで装備スロットを設定しておく必要があります。
 *
 * 敵にアクセスするには、下記のスクリプトコールを使用する必要があります。
 *
 *   var enemy = $gameTroop.members()[INDEX];
 *
 * INDEX は選択する敵のインデックスです。
 * 0は最初の敵、1は2番目の敵、というように続きます。
 *
 * 敵を確定したら、武器/防具を指定します。
 * 武器3を取得する場合、下記のスクリプトコールを使用します。
 *
 *   var weapon = $dataWeapons[3];
 *
 * 次に、下記のスクリプトコールを使用して、敵に装備を変更させます。
 *
 *   enemy.changeEquip(SLOT_ID, EQUIP);
 *
 * SLOT_IDは、装備を設定するスロットです。
 * 0は最初に設定したスロット、1は2番目に設定したスロット…と続きます。
 * ※敵のメモタグで設定したスロットのタグの順でSLOT_IDが決まります。
 * 装備タイプIDとは異なる点に注意してください。
 *
 * 使用例：
 * 敵のメモタグに
 * <equip slot: 1>
 * <equip slot: 4>
 * と設定している前提で、
 *
 * 下記のスクリプトで、
 * 敵グループの最初のキャラクターに
 * 武器ID3を
 * 0番のスロット(<equip slot: 1>)に装備します。
 *
 *   var enemy = $gameTroop.members()[0];
 *   var weapon = $dataWeapons[3];
 *   enemy.changeEquip(0, weapon);
 *
 * 下記のスクリプトで、
 * 敵グループの最初のキャラクターに
 * 防具ID18を
 * 1番のスロット(<equip slot: 4>)に装備します。
 *
 *   var enemy = $gameTroop.members()[0];
 *   var armor = $dataArmors[18];
 *   enemy.changeEquip(1, armor);
 *
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.EnemyEquips = 1;
TH.EnemyEquips = TH.EnemyEquips || {};



(function ($) {

  var TH_PluginManager_checkErrors = PluginManager.checkErrors;
  PluginManager.checkErrors = function () {
    if (!Imported["EquipSlotsCore"]) {
      throw new Error("Plugin Error: Enemy Equips plugin requires 'Equip Slots Core' to be installed above");
    }
    TH_PluginManager_checkErrors.call(this);
  };

  var TH_GameEnemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function (enemyId, x, y) {
    TH_GameEnemy_setup.call(this, enemyId, x, y);
    this.initEquips([]);
  };

  Game_Enemy.prototype.baseSlots = function () {
    var slots = Game_Battler.prototype.baseSlots.call(this);
    return slots.concat(this.getBaseSlots(this.enemy()))
  };

  Game_Enemy.prototype.paramPlus = function (paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
      var item = equips[i];
      if (item) {
        value += item.params[paramId];
      }
    }
    return value;
  };

  Game_Enemy.prototype.changeEquip = function (slotId, item) {
    if (!item || this.equipSlots()[slotId] === item.etypeId) {
      this._equips[slotId].setObject(item);
      this.refresh();
    }
  };

  Game_Enemy.prototype.releaseUnequippableItems = function (forcing) {
    for (; ;) {
      var slots = this.equipSlots();
      var equips = this.equips();
      var changed = false;
      for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
          /* We need support for troop inventory */
          // if (!forcing) {
          // this.tradeItemWithParty(null, item);
          // }
          this._equips[i].setObject(null);
          changed = true;
        }
      }
      if (!changed) {
        break;
      }
    }
  };

  var TH_GameEnemy_performAttack = Game_Enemy.prototype.performAttack;
  Game_Enemy.prototype.performAttack = function () {
    TH_GameEnemy_performAttack.call(this);
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
        this.requestMotion('thrust');
      } else if (attackMotion.type === 1) {
        this.requestMotion('swing');
      } else if (attackMotion.type === 2) {
        this.requestMotion('missile');
      }
      this.startWeaponAnimation(attackMotion.weaponImageId);
    }
  }

  var TH_GameEnemy_traitObjects = Game_Enemy.prototype.traitObjects;
  Game_Enemy.prototype.traitObjects = function () {
    var objects = TH_GameEnemy_traitObjects.call(this);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
      var item = equips[i];
      if (item) {
        objects.push(item);
      }
    }
    return objects;
  };

  var TH_GameEnemy_isSkilLWtypeOk = Game_Enemy.prototype.isSkillWtypeOk;
  Game_Enemy.prototype.isSkillWtypeOk = function (skill) {
    var res = TH_GameEnemy_isSkilLWtypeOk.call(this, skill);
    if (!res) {
      return false;
    }
    var wtypeId1 = skill.requiredWtypeId1;
    var wtypeId2 = skill.requiredWtypeId2;
    if ((wtypeId1 === 0 && wtypeId2 === 0) ||
      (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
      (wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))) {
      return true;
    } else {
      return false;
    }
  };

  Game_Enemy.prototype.isWtypeEquipped = function (wtypeId) {
    return this.weapons().some(function (weapon) {
      return weapon.wtypeId === wtypeId;
    });
  };

  Game_Enemy.prototype.hasNoWeapons = function () {
    return this.weapons().length === 0;
  };

  Game_Enemy.prototype.attackAnimationId1 = function () {
    if (this.hasNoWeapons()) {
      return this.bareHandsAnimationId();
    } else {
      var weapons = this.weapons();
      return weapons[0] ? weapons[0].animationId : 0;
    }
  };

  Game_Enemy.prototype.attackAnimationId2 = function () {
    var weapons = this.weapons();
    return weapons[1] ? weapons[1].animationId : 0;
  };

  Game_Enemy.prototype.bareHandsAnimationId = function () {
    return 1;
  };

  /* Enemies now have weapons, so they can show attack animations */
  Window_BattleLog.prototype.showEnemyAttackAnimation = function (subject, targets) {
    this.showActorAttackAnimation(subject, targets);
  };
})(TH.EnemyEquips);