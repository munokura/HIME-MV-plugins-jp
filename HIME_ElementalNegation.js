/*:
@title Elemental Negation
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Dec 4, 2015
@filename HIME_ElementalNegation.js
@url http://himeworks.com/2015/12/elemental-negation/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc Allows you to specify negative element rates, which will negate
the damage or recovery of elemental skills.
@help
== Description ==

Element rates determine the multiplier effect on skill or item damage.

For example, if you have 200% element rate towards fire, any fire damage
inflicted against you will be 200% effective, or double the damage.

Similarly, if you have 0% element rate towards fire, any fire damage
inflifcted to you will be 0% effective, or result in no damage.

However, what happens if you have negative element rates? This means that you
will actually absorb the damage! -100% element rate towards fire would mean
you would absorb all of the damage, while -50% element rate means you would
absorb half of the damage.

This plugin allows you to specify negative element rates.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.0 Dec 4, 2015
 - initial release

== Usage ==

Note-tag any objects that have traits with

  <element rate: ELEMENT_TYPE, RATE% />

Where the ELEMENT_TYPE is either the name or the ID of the element, and
the RATE is a number.

For example, if the Fire element is ID 2 in your terms database and you want
to absorb 100% of fire, you can say either of the following:

  <element rate: Fire, -100% />
  <element rate: 2, -100% />

 */
/*:ja
 * @title Elemental Negation
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Dec 4, 2015
 * @filename HIME_ElementalNegation.js
 * @url http://himeworks.com/2015/12/elemental-negation/
 *
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
 * @plugindesc 負の属性有効度を指定できます。
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * == 説明 ==
 *
 * 属性有効度は、スキルまたはアイテムのダメージに対する乗数効果を決定します。
 *
 * 例えば、炎に対して200%の属性有効度がある場合、
 * 与えられる炎によるダメージは200%の効果/2倍のダメージになります。
 *
 * 同様に、炎に対する属性有効度が0%である場合、
 * 与えられる炎によるダメージは0%の効果/ダメージなしになります。
 *
 * しかし、属性有効度が負の場合はどうなりますか?
 * 実際にダメージを吸収することを意味します。
 *
 * 炎に対して-100%の属性有効度は、全てのダメージを吸収することを意味し、
 * -50%の属性有効度は、ダメージの半分を吸収することを意味します。
 *
 * このプラグインを使用すると、負の属性有効度を指定できます。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は連絡してください
 *
 * == Change Log ==
 *
 * 1.0 Dec 4, 2015
 *  - initial release
 *
 * == 使用法 ==
 *
 * 属性有効度を持たせたいオブジェクトにはメモタグを付けます
 *
 *   <element rate: ELEMENT_TYPE, RATE% />
 *
 * ELEMENT_TYPEは属性の名前(1バイト文字のみ)/IDであり、RATEは数値です。
 *
 * 例えば、炎の属性は、用語のデータベースにID2であり、
 * 炎を100%吸収するには、次を記述します。
 *
 *   <element rate: 2, -100% />
 *
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.TraitValues = 1;
TH.TraitValues = TH.TraitValues || {};

(function ($) {

  $.Regex = /<element[-_ ]rate:\s*(\w+)\s*,\s*(.+)%\s*\/>/img

  $.loadElementMap = function () {
    $.elementMap = {}
    var elements = $dataSystem.elements;
    for (var i = 1, len = elements.length; i < len; i++) {
      var name = elements[i].toUpperCase();
      $.elementMap[name] = i;
      $.elementMap[i] = i;
    }
  };

  $.getElementId = function (name) {
    return $.elementMap[name];
  };

  $.loadNegativeElementRate = function (obj) {
    var res;
    while (res = $.Regex.exec(obj.note)) {
      var id = $.getElementId(res[1].toUpperCase());
      var value = Math.floor(res[2]);
      trait = { code: 11, dataId: id, value: value / 100 }
      obj.traits.push(trait);
    };
  };

  DataManager.loadAllNegativeElementRates = function () {
    $.dataLoaded = true;
    var data;
    var obj;
    for (var i = 0; i < this._databaseFiles.length; i++) {
      data = window[this._databaseFiles[i].name];
      if (Array.isArray(data)) {
        for (var j = 0, len = data.length; j < len; j++) {
          obj = data[j];
          if (obj && obj.traits !== undefined) {
            $.loadNegativeElementRate(obj);
          }
        }
      }
    };
  };

  var TH_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    var res = TH_DataManager_isDatabaseLoaded.call(this);
    if (res && !$.dataLoaded) {
      $.loadElementMap();
      this.loadAllNegativeElementRates();
    }
    return res;
  };

})(TH.TraitValues);