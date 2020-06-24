/*:
@title Inventory Core
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Mar 28, 2016
@filename HIME_InventoryCore.js
@url

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.0 - Provides a standalone inventory object
@help
== Description ==

This plugin provides a standard way to manage inventories of items and gold.

It offers multiple inventories so that the party for example can have multiple
inventories, which can be swapped depending on your needs.

A new "Inventory" object is available for plugin developers, which allows you
to easily provide inventory support for any object that you like.

Additional inventory functionality will be added over-time.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Mar 28, 2016
 - initial release

== Usage ==

-- Multiple Inventories --

This plugin offers you the ability to manage multiple inventories.
The party, for example, can have multiple inventories.

To create an inventory, use the script call

  $gameParty.createInventory( ID )

Where the ID is a name that you will use to reference the inventory throughout
the game. For example, you can say things like

  $gameParty.createInventory( "Main Inventory" )
  $gameParty.createInventory( 1 )

To switch inventories, use the script call

  $gameParty.switchInventory( ID )

Assuming the inventory is already created, the party will use the specified
inventory as the default inventory. For example, assuming you have a second
inventory called "sub", you could switch to that inventory using

  $gameParty.switchInventory( "sub" )

To merge inventories, use the script call

  $gameParty.mergeInventory( ID1, ID2 )

This will merge inventory 1 into inventory 2, and delete inventory 1.
Inventory 2 will be set as the default inventory.

== For Developers ==

The default inventory implementation for parties is no good. The inventory
should be abstracted into its own class and an instance of it held by the
party. The purpose of this plugin is to provide such an abstraction so that
it is easier to work with inventories.

The two objects that you will be interested in are

Game_Inventory
Game_Inventories

The Game_Inventory object holds all of the usable items, weapons, armors,
and gold. It has the same interface as the party; you can take a look at
the methods provided.

The Game_Inventories object is a container that's used to manage multiple
inventories. Any object that can have support for multiple inventories
should use this to work with individual inventory objects.

For backwards compatibility, all of the methods that were originally in
Game_Party have been replaced with calls to its "current" inventory, which
is defined to be the inventory that all items/gold will be sent to.

The current inventory may be switched at anytime using script calls.

@param Default Inventory ID
@desc ID of the default inventory that the game party starts with
@default 1
 */
/*:ja
 * @title Inventory Core
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Mar 28, 2016
 * @filename HIME_InventoryCore.js
 * @url http://himeworks.com/2016/03/inventory-core/
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
 * @plugindesc v1.0 複数のインベントリを管理する機能を追加します。
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * アイテムや所持金のインベントリを管理するための標準的な方法を提供します。
 * 複数のインベントリを提供しているので、
 * 例えばパーティが複数のインベントリを持つことができ、
 * 必要に応じて入れ替えることができます。
 * プラグイン開発者向けに新しい'Inventory'オブジェクトが用意されており、
 * 好きなオブジェクトに簡単にインベントリのサポートを提供することができます。
 * 追加のインベントリ機能は時間をかけて追加される予定です。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は無料ですが、連絡してください
 * - クレジット表示をHimeWorksにしてください
 *
 * == Change Log ==
 *
 * 1.0 - Mar 28, 2016
 *  - initial release
 *
 * == 使用方法 ==
 *
 * -- 複数のインベントリ --
 *
 * このプラグインは、複数のインベントリを管理する機能を追加します。
 * 例えば、パーティは複数のインベントリを持つことができます。
 * インベントリを作成するには、下記スクリプトを使います。
 *
 *   $gameParty.createInventory( ID )
 *
 * IDはゲーム中にインベントリを参照するために使用する名前です。
 * 例えば、次のようなことができます。
 *
 *   $gameParty.createInventory( "Main Inventory" )
 *   $gameParty.createInventory( 1 )
 *
 * インベントリを切り替えるには、下記スクリプトを使います。
 *
 *   $gameParty.switchInventory( ID )
 *
 * インベントリが既に作成されていると仮定すると、
 * パーティは指定されたインベントリをデフォルトとして使用します。
 * 例えば、"sub"という名前の2つ目のインベントリがあると仮定して、
 * そのインベントリに切り替えるには、下記スクリプトを使います。
 *
 *   $gameParty.switchInventory( "sub" )
 *
 * インベントリをマージするには、下記スクリプトを使います。
 *
 *   $gameParty.mergeInventory( ID1, ID2 )
 *
 * 上記はインベントリ1をインベントリ2にマージし、インベントリ1を削除します。
 * インベントリ2はデフォルトのインベントリとして設定されます。
 *
 * == 開発者向け ==
 *
 * パーティのデフォルトのインベントリの実装はダメです。
 * インベントリはそれ自身のクラスとパーティによって
 * 保持されるインスタンスに抽象化されるべきです。
 * このプラグインの目的は、インベントリをより簡単に扱うことができるように、
 * そのような抽象化を提供することです。
 * 注目すべき下記の2つのオブジェクト
 *
 * Game_Inventory
 * Game_Inventories
 *
 * Game_Inventoryオブジェクトは、
 * 使用可能なアイテム、武器、防具、所持金の全てを保持しています。
 * パーティと同じインターフェースを持っています。
 * Game_Inventoriesオブジェクトは、
 * 複数のインベントリを管理するためのコンテナです。
 * 複数のインベントリをサポートしているオブジェクトは、
 * 個々のインベントリオブジェクトを扱うためにこれを使用する必要があります。
 * 後方互換性、元々Game_Partyにあった全てのメソッドは、
 * "current"インベントリへの呼び出しに置き換えられています。
 * 現在のインベントリは、
 * スクリプトを使っていつでも切り替えることができます。
 *
 * @param Default Inventory ID
 * @text デフォルトインベントリ開始ID
 * @desc ゲームパーティが開始するデフォルトインベントリのID
 * @default 1
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.TH_InventoryCore = 1;
TH.InventoryCore = TH.InventoryCore || {};

/* Represents an inventory object */
function Game_Inventory() {
  this.initialize.apply(this, arguments);
};

/* A container for holding multiple inventories. */
function Game_Inventories() {
  this.initialize.apply(this, arguments);
};

(function ($) {

  $.params = PluginManager.parameters("HIME_InventoryCore");
  $.defaultInventoryId = $.params["Default Inventory ID"].trim();

  $.maxItems = function (item) {
    if (item.maxItems === undefined) {
      if (DataManager.isItem(item)) {
        item.maxItems = 99;
      }
      else if (DataManager.isArmor(item)) {
        item.maxItems = 99;
      }
      else if (DataManager.isWeapon(item)) {
        item.maxItems = 99;
      }
    }
    return item.maxItems;
  };

  /***************************************************************************/

  Game_Inventories.prototype.initialize = function () {
    this._data = {};
  };

  Game_Inventories.prototype.get = function (id) {
    return this._data[id];
  };

  Game_Inventories.prototype.create = function (id, owner) {
    var inv = new Game_Inventory(owner);
    this._data[id] = inv;
    return inv;
  };

  /* Merges 2 inventories together by moving all of the items and gold from
   * one inventory to the other. The first inventory is then deleted.
   */
  Game_Inventories.prototype.merge = function (id1, id2) {
    var inv1 = this._data[id1];
    var inv2 = this._data[id2];
    if (inv1 && inv2) {
      inv1.mergeWith(inv2);
      this.remove(id1);
    }
  };

  Game_Inventories.prototype.remove = function (id) {
    delete this._data[id];
  }

  /***************************************************************************/

  Game_Inventory.prototype.initialize = function (owner) {
    this._owner = owner;
    this.initGold();
    this.initAllItems();
  };

  Game_Inventory.prototype.initAllItems = function () {
    this._items = {};
    this._weapons = {};
    this._armors = {};
  };

  Game_Inventory.prototype.initGold = function () {
    this._gold = 0;
  };

  Game_Inventory.prototype.weapons = function () {
    var list = [];
    for (var id in this._weapons) {
      list.push($dataWeapons[id]);
    }
    return list;
  };

  Game_Inventory.prototype.armors = function () {
    var list = [];
    for (var id in this._armors) {
      list.push($dataArmors[id]);
    }
    return list;
  };

  Game_Inventory.prototype.items = function () {
    var list = [];
    for (var id in this._items) {
      list.push($dataItems[id]);
    }
    return list;
  };

  Game_Inventory.prototype.equipItems = function () {
    return this.weapons().concat(this.armors());
  };

  Game_Inventory.prototype.allItems = function () {
    return this.items().concat(this.equipItems());
  };

  Game_Inventory.prototype.itemContainer = function (item) {
    if (!item) {
      return null;
    } else if (DataManager.isItem(item)) {
      return this._items;
    } else if (DataManager.isWeapon(item)) {
      return this._weapons;
    } else if (DataManager.isArmor(item)) {
      return this._armors;
    } else {
      return null;
    }
  };

  Game_Inventory.prototype.maxItems = function (item) {
    return $.maxItems(item);
  };

  Game_Inventory.prototype.numItems = function (item) {
    var container = this.itemContainer(item);
    return container ? container[item.id] || 0 : 0;
  };

  Game_Inventory.prototype.gold = function () {
    return this._gold;
  };

  Game_Inventory.prototype.gainGold = function (amount) {
    this._gold = (this._gold + amount).clamp(0, this.maxGold());
  };

  Game_Inventory.prototype.maxGold = function () {
    return 99999999;
  };

  Game_Inventory.prototype.gainItem = function (item, amount, includeEquip) {
    var container = this.itemContainer(item);
    if (container) {
      var lastNumber = this.numItems(item);
      var newNumber = lastNumber + amount;
      container[item.id] = newNumber.clamp(0, this.maxItems(item));
      if (container[item.id] === 0) {
        delete container[item.id];
      }
      if (includeEquip && newNumber < 0) {
        this._owner.discardMembersEquip(item, -newNumber);
      }
      $gameMap.requestRefresh();
    }
  };

  Game_Inventory.prototype.loseItem = function (item, amount, includeEquip) {
    this.gainItem(item, -amount, includeEquip);
  };

  Game_Inventory.prototype.mergeWith = function (otherInv) {
    var items = this.allItems();
    for (var i = 0; i < items.length; i++) {
      otherInv.gainItem(items[i], this.numItems(items[i]));
    }

    otherInv.gainGold(this.gold());
  };

  /***************************************************************************/

  var TH_GameParty_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function () {
    this._inventories = new Game_Inventories();
    TH_GameParty_initialize.call(this);
  };

  Game_Party.prototype.createInventory = function (id) {
    return this._inventories.create(id, this);
  };

  Game_Party.prototype.switchInventory = function (id) {
    this._inventory = this._inventories.get(id);
  };

  Game_Party.prototype.mergeInventory = function (id1, id2) {
    this._inventories.merge(id1, id2);
    this.switchInventory(id2);
  };

  Game_Party.prototype.getInventory = function (id) {
    return this._inventories.get(id);
  };

  Game_Party.prototype.inventory = function () {
    return this._inventory;
  };

  /* Overwrite */
  Game_Party.prototype.initAllItems = function () {
    var id = $.defaultInventoryId;
    this._inventories.create(id, this);
    this._inventory = this._inventories.get(id);
  };

  /* Overwrite */
  Game_Party.prototype.weapons = function () {
    return this._inventory.weapons();
  };

  /* Overwrite */
  Game_Party.prototype.armors = function () {
    return this._inventory.armors();
  };

  /* Overwrite */
  Game_Party.prototype.items = function () {
    return this._inventory.items();
  };

  /* Overwrite */
  Game_Party.prototype.equipItems = function () {
    return this._inventory.equipItems();
  };

  /* Overwrite */
  Game_Party.prototype.allItems = function () {
    return this._inventory.allItems();
  };

  /* Overwrite */
  Game_Party.prototype.itemContainer = function (item) {
    return this._inventory.itemContainer(item);
  };

  /* Overwrite */
  Game_Party.prototype.maxItems = function (item) {
    return this._inventory.maxItems(item);
  };

  Game_Party.prototype.numItems = function (item) {
    return this._inventory.numItems(item);
  };

  /* Overwrite */
  Game_Party.prototype.gold = function () {
    return this._inventory.gold();
  };

  /* Overwrite */
  Game_Party.prototype.gainGold = function (amount) {
    this._inventory.gainGold(amount);
  };

  /* Overwrite */
  Game_Party.prototype.maxGold = function () {
    return this._inventory.maxGold();
  };

  Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    this._inventory.gainItem(item, amount, includeEquip);
  };

})(TH.InventoryCore);