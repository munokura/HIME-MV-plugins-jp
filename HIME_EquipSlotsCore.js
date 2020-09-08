/*
 * ご質問や懸念がある場合は、次のサイトのいずれかで私に連絡できます。
 *
 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/
 */
/*:ja
 * @title Equip Slots Core
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @date Apr 15, 2016
 * @version 1.5
 * @filename HIME_EquipSlotsCore.js
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_EquipSlotsCore.js
 * @plugindesc v1.5 - アクター毎に装備スロットをカスタムする機能を追加します。
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * == 説明 ==
 *
 * Video: https://www.youtube.com/watch?v=fXcA0IdPsPg
 *
 * デフォルトでは、RPGツクールMVには次の5つの装備タイプがあります：
 *
 *   武器:1
 *   盾:2
 *   頭:3
 *   身体:4
 *   装飾品:5
 *
 * また、データベースに装備スロットを直接追加および変更することもできます。
 *
 * 問題の1つは、全てのアクターが、
 * これらのスロットに設計した装備を使用できない場合でも、
 * それらの装備スロットを持っていることです。
 *
 * もう1つの問題は、
 * 同じスロットの複数をアクターに追加できないことです。
 * アクターはそれぞれ1つしか持てません。
 * 2つのアクセサリーを着用したくてもできません。
 *
 * このプラグインはこれらの問題を解決します。
 * アクターの装備スロットをカスタマイズする機能を追加し、
 * 使用するスロットを個別に選択できるようにします。
 *
 * == 使用法 ==
 *
 * -- 装備スロットの追加 --
 *
 * このプラグインを使用している場合、
 * デフォルトの'初期装備'は使用されなくなります。
 * 代わりに、メモタグを使用して全てのアクター装備スロットを管理します。
 *
 * アクターのメモ欄に下記のメモタグを入力すると、装備スロットを追加できます。
 *
 *   <equip slot: ETYPE>
 *
 * ETYPEは'装備タイプ'の略で、プロジェクトに設定した装備タイプの1つです。
 * [タイプ]タブで確認できます。
 *
 * ETYPEのIDを記述するか、ETYPEに名前を使うことができます。
 * 例えば、武器は装備タイプ1なので、次のいずれかを記述できます。
 *
 *   <equip slot: 1>
 *
 * 装備タイプの名前を変更した場合、
 * これらのメモタグを更新することを忘れないでください。
 *
 * ※装備タイプの名前で日本語など2バイト文字を使用するとエラーになります。
 * この場合、IDを使用してください。
 *
 * アクター/職業の特徴内'武器タイプ装備' '防具タイプ装備'に注意してください。
 * 適合していない装備を指定した場合、
 * スロットが用意され、装備は無しになります。
 *
 *
 * 装備スロットを追加したい場合、メモタグを追加してください。
 * データベースに設定済みと仮定し、
 * 3つの武器と2つのリングをつける場合は下記になります。
 *
 *   <equip slot: 1>
 *   <equip slot: 1>
 *   <equip slot: 1>
 *   <equip slot: 5>
 *   <equip slot: 5>
 *
 * -- 初期装備の指定 --
 *
 * [初期装備]欄は使用できなくなったため、
 * それらを指定する別の方法を見つける必要があります。
 *
 * 装備スロットメモタグは、
 * 'アイテムコード'と呼ばれるものを使用した初期装備をサポートし、
 * 次のように記述されます。
 *
 *   <equip slot: ETYPE ITEMCODE>
 *
 * 'ITEMCODE'は、武器、防具、アイテムを素早く参照する方法です。
 * 次のようになります。
 *
 *   a1 - armor 1
 *   w3 - weapon 3
 *   i5 - item 5
 *
 * 武器4を初期装備としてアクターの装備タイプ1に持たせたい場合、
 * 下記のメモタグを使用します。
 *
 *   <equip slot: 1 w4>
 *
 * -- 装備スロットの動的な追加と削除 --
 *
 * ゲーム中に装備スロットを追加/削除したい場合、スクリプトコールを使用します。
 *
 * ACTOR.addEquipSlot(ETYPE)
 *
 * ACTORはGame_Actorオブジェクトへの参照で、
 * ETYPEは追加する装備スロットの名前/IDです。
 *
 * 下記で、アクター2にタイプ4および'Accessory'の追加装備スロットを追加します。
 *
 *   $gameActors.actor(2).addEquipSlot(4)
 *   $gameActors.actor(2).addEquipSlot("Accessory")
 *
 * スロットの削除は、同様のスクリプトを使用して行われます。
 *
 *    ACTOR.removeEquipSlot(ETYPE)
 *
 * 追加されている装備スロットを削除する場合、次のように使用します。
 *
 *   $gameActors.actor(2).removeEquipSlot(4)
 *   $gameActors.actor(2).removeEquipSlot("Accessory")
 *
 * そのタイプのランダム装備スロットは削除されます。
 * 装備スロットにアイテムが含まれている場合、アイテムは装備されません。
 *
 * 装備スロットが存在しない場合、何も起こりません。
 *
 * -- 複数の装備タイプ --
 *
 * デフォルトでは、全ての装備に1つの装備タイプがあります。
 * メモタグを使用して、装備タイプを追加できます。
 *
 * 複数の装備タイプを使用すると、
 * 複数のスロットに同じ装備を配置できます。
 *
 * 武器/防具に装備タイプを追加するには、
 * 武器/防具のメモ欄に次のように入力します。
 *
 *   <equip type: TYPE />
 *
 * 必要な数の装備タイプを割り当てることができます。
 *
 * -- カスタムシーン --
 *
 * このプラグインは、必要最低限の装備スロット機能を提供します。
 * 目的は、それがデフォルトのシーンであろうとカスタムのシーンであろうと、
 * あらゆる装備シーンでそれを使用できるようにすることです。
 *
 * Yanflyの装備メニューを使用して、このプラグインを使用したい場合、
 * このプラグインを下に配置します。
 * 
 * -- 競合対策 --
 * 
 * このプラグインは装備枠にカーソルを合わせたままアクター切り替えを行う
 * プラグイン（TMOmitEquipCommand.jsなど）と競合します。
 * これに解決するパッチプラグインが下記にあります。
 * https://raw.githubusercontent.com/elleonard/RPGtkoolMV-Plugins/master/plugins/DarkPlasma_HIME_EquipSlotCorePatch.js
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.5 - Apr 15, 2016
 *  * added support for multiple equip types for equips.
 *  * standardized the way to check whether an equip slot can hold an item
 * 1.4 - Apr 11, 2016
 *  * Change the way etype ID is checked
 *  * Fixed "Change Equipment" command
 * 1.3 - Mar 14, 2016
 *  * Added support for adding and removing equip slots using script calls
 * 1.2 - Nov 20, 2015
 *  * updated to support enemy equips
 * 1.1 - Nov 18, 2015
 *  * updated to support Yanfly's EquipCore
 * 1.0 - Nov 12, 2015
 *  * initial release
 *
 */

/*
If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/
*/
/*:
@title Equip Slots Core
@author Hime --> HimeWorks (http://himeworks.com)
@date Apr 15, 2016
@version 1.5
@filename HIME_EquipSlotsCore.js
@url http://himeworks.com/2015/11/equip-slots-core/

@plugindesc v1.5 - Provides you with tools to set up custom equip slots
for each actor individually.
@help
== Description ==

Video: https://www.youtube.com/watch?v=fXcA0IdPsPg

By default, RPG Maker gives you 5 equip types to work with:

  Weapon
  Shield
  Head
  Body
  Accessory

You also have the ability to add and modify equip slots directly in
the database.

However, one problem you might notice is that every actor will have
those equip slots, even if they can't use any of the equips that you've
designed for those slots.

Another problem is you can't add multiple copies of the same slot to
an actor: they can only have one of each. Want to wear two accessories?
Can't be done.

This plugin solves that problem. It provides ways for you to customize
your actors' equip slots, allowing you to choose exactly which slots
they will have in the game.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.5 - Apr 15, 2016
 * added support for multiple equip types for equips.
 * standardized the way to check whether an equip slot can hold an item
1.4 - Apr 11, 2016
 * Change the way etype ID is checked
 * Fixed "Change Equipment" command
1.3 - Mar 14, 2016
 * Added support for adding and removing equip slots using script calls
1.2 - Nov 20, 2015
 * updated to support enemy equips
1.1 - Nov 18, 2015
 * updated to support Yanfly's EquipCore
1.0 - Nov 12, 2015
 * initial release

== Usage ==

-- Adding equip slots --

First, if you are using this plugin, the default "Initial equipment" box
will no longer be used. Instead, you will manage all actor equip slots
using note-tags.

To add an equip slot, use the following note tag:

  <equip slot: ETYPE>

The ETYPE, which is short for "equip type", is one of the equip types
that you have set up for your project. You can see this in the Types tab.

You can either write the ID of the etype, or you can write the exact name
of the etype. For example, Weapon is equip type 1, so you can write either

  <equip slot: 1>
  <equip slot: Weapon>

Depending on your preferences. I would recommend writing out the full
name so that it is clearer, but if you ever change your equip types names
you will need to remember to update these note-tags.

If you would like to add more equip slots, just add more note-tags.
Want 3 weapons and 2 rings, assuming they are in the database?

  <equip slot: Weapon>
  <equip slot: Weapon>
  <equip slot: Weapon>
  <equip slot: Ring>
  <equip slot: Ring>

-- Specifying Initial Equip --

Because the Initial Equipment box is no longer used, you will need to
find another way to specify them.

The equip slot note-tag supports initial equip, using something called an
"Item Code", and is written like this:

  <equip slot: ETYPE ITEMCODE>

An Item code is a quick way to reference a particular weapon, armor, or
item. They look like this:

  a1 - armor 1
  w3 - weapon 3
  i5 - item 5

So for example, if you want your actor to have a weapon slot with
weapon 4 from the database as its initial equip, use the note-tag

  <equip slot: Weapon w4>

-- Adding and Removing Equip Slots Dynamically --

You may want to add or remove equip slots during the game.
To add an equip slot, use the script call

ACTOR.addEquipSlot(ETYPE)

Where the ACTOR is a reference to a Game_Actor object, and the ETYPE is
the name or ID of the equip slot you want to add.

For example, you can write

  $gameActors.actor(2).addEquipSlot(4)
  $gameActors.actor(2).addEquipSlot("Accessory")

To give actor 2 an extra equip slot of type 4 and "Accessory"

Removing slots is done using a similar script call

   ACTOR.removeEquipSlot(ETYPE)

For example, if you want to remove the equip slot you added before, you can
write

  $gameActors.actor(2).removeEquipSlot(4)
  $gameActors.actor(2).removeEquipSlot("Accessory")

A random equip slot of that type will be removed. If the equip slot contains
an item, the item will be un-equipped and returned to the inventory.

If no such equip slot exists, nothing will happen.

-- Multiple Equip Types --

By default, all equips have one equip type.
You can assign additional equip types using note-tags.

With multiple equip types, you can put on the same equip in multiple slots
of your choice.

To assign additional equip types, note-tag armors or weapons with

  <equip type: TYPE />

You can assign as many equip types as you want.

-- Custom Scenes --

This plugin provides bare-bones equip slot functionality. The purpose
is to be able to use it with *any* equip scene, whether it is the
default scene or a custom scene.

 */

var Imported = Imported || {};
var TH = TH || {};
Imported.EquipSlotsCore = 1;
TH.EquipSlotsCore = TH.EquipSlotsCore || {};

function Game_EquipSlot() {
    this.initialize.apply(this, arguments);
};

(function($) {

    $.Regex = /<equip[-_ ]slot:\s+(\w+)(?:\s+(\w)(\d+))?>/img
    $.EtypeRegex = /<equip[-_ ]type:\s*(.+?)\s*\/>/img

    $.etypeIds = function(obj) {
        if (obj.etypeIds === undefined) {
            obj.etypeIds = [obj.etypeId];
            var res;
            while (res = $.EtypeRegex.exec(obj.note)) {

                obj.etypeIds.push($.getEtypeId(res[1]));
            }
        }
        return obj.etypeIds;
    }

    $.etypeNameToId = function(etypeName) {
        if (!$.etypeMap) {
            $.etypeMap = {}
            for (var i = 1; i < $dataSystem.equipTypes.length; i++) {
                var name = $dataSystem.equipTypes[i].toUpperCase();
                $.etypeMap[name] = i;
            }
        }
        return $.etypeMap[etypeName.toUpperCase()];
    }

    $.getEtypeId = function(etypeId) {
        if (isNaN(etypeId)) {
            etypeId = $.etypeNameToId(etypeId);
        } else {
            etypeId = Math.floor(etypeId)
        }
        return etypeId;
    };

    Game_EquipSlot.prototype.initialize = function() {
        this._etypeId = 1;
        this._item = new Game_Item();
    };

    Game_EquipSlot.prototype.setEtypeId = function(etypeID) {
        this._etypeId = etypeID;
    };

    Game_EquipSlot.prototype.etypeId = function() {
        return this._etypeId;
    };

    Game_EquipSlot.prototype.setObject = function(item) {
        this._item.setObject(item);
    };

    Game_EquipSlot.prototype.object = function() {
        return this._item.object();
    };

    Game_EquipSlot.prototype.setEquip = function(isWeapon, item) {
        this._item.setEquip(isWeapon, item);
    };

    /* Support for multiple equip types */
    Game_EquipSlot.prototype.canEquip = function(item) {
        ids = $.etypeIds(item);
        return ids.contains(this._etypeId);
    }

    Game_EquipSlot.prototype.isEtypeId = function(id) {
        return this._etypeId === id;
    };

    /***************************************************************************/

    var TH_EquipSlotsCore_GameBattler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        this._equips = [];
        TH_EquipSlotsCore_GameBattler_initMembers.call(this);
    };

    /* Returns equip slot objects */
    Game_Battler.prototype.equipSlotList = function() {
        return this._equips;
    };

    /* Returns all of the equip slot types for the battler
     * Purely for backwards compatibility
     */
    Game_Battler.prototype.equipSlots = function() {
        var slots = this._equips;
        var ids = [];
        for (var i = 0; i < slots.length; i++) {
            ids.push(slots[i].etypeId());
        }
        return ids;
    };

    Game_Battler.prototype.equips = function() {
        return this._equips.map(function(item) {
            return item.object();
        });
    };

    Game_Battler.prototype.initEquips = function(equips) {
        var baseSlots = this.baseSlots();
        if (baseSlots.length > 0) {
            var maxSlots = baseSlots.length;
            this._equips = [];
            for (var i = 0; i < maxSlots; i++) {
                this._equips[i] = JsonEx.makeDeepCopy(baseSlots[i]);
            }
            this.releaseUnequippableItems(true);
            this.refresh();
        }
    };

    /* Base equip slots for the battler */
    Game_Battler.prototype.baseSlots = function() {
        return [];
    }

    Game_Battler.prototype.getBaseSlots = function(battler) {
        if (!battler.baseEquipSlots) {
            battler.baseEquipSlots = [];
            var res;
            while (res = $.Regex.exec(battler.note)) {
                var equipSlot = new Game_EquipSlot();
                var etypeId = res[1];
                var itemType = res[2];
                var itemID = res[3];

                // /* Not a number. Assume it's the name of an equip type */
                etypeId = $.getEtypeId(etypeId);

                equipSlot.setEtypeId(etypeId);
                if (itemType) {
                    equipSlot.setEquip(itemType.toLowerCase() === "w", Math.floor(itemID));
                }

                battler.baseEquipSlots.push(equipSlot);
            }
        }
        return battler.baseEquipSlots;
    };

    Game_Battler.prototype.weapons = function() {
        return this.equips().filter(function(item) {
            return item && DataManager.isWeapon(item);
        });
    };

    Game_Battler.prototype.armors = function() {
        return this.equips().filter(function(item) {
            return item && DataManager.isArmor(item);
        });
    };

    /* Finds the first equip slot with the given equip type */
    Game_Battler.prototype.getSlotByEtypeId = function(etypeId) {
        var slots = this._equips;
        for (var i = 0; i < slots.length; i++) {
            if (slots[i].isEtypeId(etypeId)) {
                return i;
            }
        }
    };

    /* Overwrite. */
    Game_Battler.prototype.changeEquip = function(slotId, item) {
        if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || this.equipSlotList()[slotId].canEquip(item))) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };

    /* Ovewrite. We need to find a slot. Assumes 1 is the weapon type */
    Game_Battler.prototype.changeEquipById = function(etypeId, itemId) {
        var slotId = this.getSlotByEtypeId(etypeId);
        if (this.equipSlots()[slotId] === 1) {
            this.changeEquip(slotId, $dataWeapons[itemId]);
        } else {
            this.changeEquip(slotId, $dataArmors[itemId]);
        }
    };

    /* Adds a new equip slot to the actor */
    Game_Battler.prototype.addEquipSlot = function(etypeId) {
        var equipSlot = new Game_EquipSlot();
        etypeId = $.getEtypeId(etypeId);
        equipSlot.setEtypeId(etypeId);
        this._equips.push(equipSlot);
    };

    /* Removes one instance of the specified equip slot. If an object
     * exists in that slot, the object is un-equipped.
     */
    Game_Battler.prototype.removeEquipSlot = function(etypeId) {
        etypeId = $.getEtypeId(etypeId);
        var slots = this._equips;
        for (var i = 0; i < slots.length; i++) {
            if (slots[i].isEtypeId(etypeId)) {
                this.tradeItemWithParty(null, slots[i].object());
                slots.splice(i, 1);
                break;
            }
        };
    };

    /* Overwrite */
    Game_Battler.prototype.releaseUnequippableItems = function(forcing) {
        for (;;) {
            var slots = this.equipSlotList();
            var slotTypes = this.equipSlots();
            var equips = this.equips();
            var changed = false;
            for (var i = 0; i < equips.length; i++) {
                var item = equips[i];
                if (item && (!this.canEquip(item) || !slots[i].canEquip(item))) {
                    if (!forcing) {
                        this.tradeItemWithParty(null, item);
                    }
                    this._equips[i].setObject(null);
                    changed = true;
                }
            }
            if (!changed) {
                break;
            }
        }
    };

    /* Overwrite */
    Game_Battler.prototype.bestEquipItem = function(slotId) {
        var slot = this.equipSlotList()[slotId];
        var etypeId = this.equipSlots()[slotId];
        var items = $gameParty.equipItems().filter(function(item) {
            return slot.canEquip(item) && this.canEquip(item);
        }, this);
        var bestItem = null;
        var bestPerformance = -1000;
        for (var i = 0; i < items.length; i++) {
            var performance = this.calcEquipItemPerformance(items[i]);
            if (performance > bestPerformance) {
                bestPerformance = performance;
                bestItem = items[i];
            }
        }
        return bestItem;
    };

    /***************************************************************************/

    /* Pulled up */
    var TH_GameActor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() {
        return Game_Battler.prototype.equipSlots.call(this);
    };

    /* Pulled up */
    Game_Actor.prototype.equips = function() {
        return Game_Battler.prototype.equips.call(this);
    };

    /* Pulled up */
    Game_Actor.prototype.weapons = function() {
        return Game_Battler.prototype.weapons.call(this);
    };

    /* Pulled up */
    Game_Actor.prototype.armors = function() {
        return Game_Battler.prototype.armors.call(this);
    };

    /* Pulled up */
    var TH_GameActor_initEquips = Game_Actor.prototype.initEquips;
    Game_Actor.prototype.initEquips = function(equips) {
        Game_Battler.prototype.initEquips.call(this, equips);
    };

    /* Pulled up */
    Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
        Game_Battler.prototype.changeEquipById.call(this, etypeId, itemId);
    };

    /* Pulled up */
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        Game_Battler.prototype.changeEquip.call(this, slotId, item);
    };

    /* Pulled up */
    Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
        Game_Battler.prototype.releaseUnequippableItems.call(this, forcing);
    };

    /* Pulled up */
    Game_Actor.prototype.bestEquipItem = function(slotId) {
        return Game_Battler.prototype.bestEquipItem.call(this, slotId);
    };

    /* By default, we check the actor for any equip slots */
    Game_Actor.prototype.baseSlots = function() {
        var slots = Game_Battler.prototype.baseSlots.call(this);
        return slots.concat(this.getBaseSlots(this.actor()))
    };

    /***************************************************************************/

    /* Overwrite. Ask if the equip slot can hold the item */
    Window_EquipItem.prototype.includes = function(item) {
        if (item === null) {
            return true;
        }
        if (this._slotId < 0 || !this._actor.equipSlotList()[this._slotId].canEquip(item)) {
            return false;
        }
        return this._actor.canEquip(item);
    };

    /***************************************************************************/

})(TH.EquipSlotsCore);