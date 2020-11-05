<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <button
          type="button"
          v-on:click="activetab = 1"
          v-bind:class="[activetab === 1 ? 'active' : '']"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          データ表示
        </button>
        <button
          type="button"
          v-on:click="activetab = 2"
          v-bind:class="[activetab === 2 ? 'active' : '']"
          class="toggleBtn btn btn-outline-primary col-md-6 col-xl-1"
        >
          メモ
        </button>
        <div class="col-md-6 col-xl-1"></div>
        <button
          type="button"
          class="btn btn-success col-md-6 col-xl-1"
          data-toggle="modal"
          data-target="#filter-content"
        >
          絞り込み
        </button>
        <div class="col-md-6 col-xl-1"></div>
        <button
          type="button"
          v-on:click="
            startVisivle = !startVisivle;
            visivle(startVisivle);
          "
          class="btn btn-success col-md-6 col-xl-1"
        >
          データ切り替え
        </button>
      </div>

      <!-- ナビバー、ハンバーガー実装はほぼコピペ -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <span class="navbar-brand"></span>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="nav">
            <!-- v-forした配列は直接書き換えできない、$setやsplice()を使う（関数内でも使わないとダメ） -->
            <button
              class="btn btn-outline-info nav-item"
              v-for="(Value, index) in cate"
              :key="index"
              v-on:click="cate = activeCateChenge(cate, index)"
              v-bind:class="[Value.state === true ? 'active' : '']"
            >
              {{ Value.catename }}
            </button>
          </ul>
        </div>
      </nav>

      <div class="modal" id="filter-content" tabindex="-1" role="dialog">
        <div id="modal-filter" class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header"></div>
            <div id="filter-body"></div>
            <div class="modal-footer">
              <div
                class="row col-12 h-100"
                v-for="(value, index) in sliderPro"
                :key="index"
              >
                <span class="col-2 text-nowrap">{{ value.name }}</span>
                <span class="col-1 text-right text-nowrap"
                  >{{ sValue[index][0] }} Min</span
                >
                <vue-slider
                  class="col-6"
                  ref="slider"
                  v-model="sValue[index]"
                  :min="value.min"
                  :max="value.max"
                  @drag-end="sliderChenged(sValue)"
                  :tooltip="'none'"
                ></vue-slider>
                <span class="col-2 text-nowrap"
                  >{{ sValue[index][1] }} Max</span
                >
              </div>
              <div class="row"></div>
              <button
                type="button"
                id="valReset"
                class="btn btn-outline-primary"
                v-on:click="sValue = resetSValue()"
              >
                スライダーリセット
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="page1" class="pages tabcontent" v-show="activetab === 1">
        <table
          id="tbl1"
          class="table table-sm table-bordered nowrap"
          width="100%"
        >
          <thead class="bg-primary text-light">
            <tr>
              <th v-for="value in ths" :key="value">{{ value }}</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div id="page2" class="pages tabcontent" v-show="activetab === 2">
        <p>
          ・改修可能装備の絞り込み(Veuでは未実装)<br />
          ・ステータス絞り込み（Veuでは未実装）<br />

          ・（詳細表示フィルタ）<br />
          ・改修値適用<br />
          与ダメージ（デフォルトは砲撃戦 選択[雷撃戦 夜戦 対潜攻撃]）<br />
          ・最大補正値適用（装備シナジーを除き艦シナジー）<br />
          ・艦載機の対空等意味のないものを外すフィルタ<br />
          ・改修目標入力（今はとりあえず列ごと非表示）<br />
          ・データ保存（AWS）<br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// jQuery
import $ from "jquery";
window.$ = $;
// bootstrap
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// datatables
import "datatables.net-bs4";
import "datatables.net-select-bs4";
import "datatables.net-responsive-bs4";
import "datatables.net-buttons-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css";
import "datatables.net-select-bs4/css/select.bootstrap4.min.css";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";
// モジュール
import columnsSet from "./columnsSettings.js"; // eslint-disable-line
import wpTypeL from "./wpTypeL.js"; // eslint-disable-line
import cate from "./cate.js"; // eslint-disable-line
//
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import db from "./wpdb.js";

// テストデータ
import testData from "./test.js"; // eslint-disable-line

// 絞り込み用のカテゴリ配列を区切ったもの
var newWpType = sepArrayGen(wpTypeL, 4);

// 配列を区切る関数、使いまわし出来そう
function sepArrayGen(ArrayObgect, sepNum) {
  var newArray = [];
  var tmpType = [];
  for (let i = 0; i < ArrayObgect.length; i++) {
    tmpType.push(ArrayObgect[i]);
    var tmp = i;
    if ((tmp + 1) % sepNum == 0 || i == ArrayObgect.length - 1) {
      newArray.push(tmpType);
      tmpType = [];
    }
  }
  return newArray;
}

//オブジェクトから最大最小を取る関数、見た目もう少しマシにしたい
function dbMax(key) {
  return Math.max.apply(
    null,
    db.map(function (o) {
      return o[key];
    })
  );
}
function dbMin(key) {
  return Math.min.apply(
    null,
    db.map(function (o) {
      return o[key];
    })
  );
}

// スライダーの定義オブジェクト、半自動生成（多分もう少し良く出来る
var sliderPro = [
  { col: 3, name: "改修Lv", min: 0, max: 10 },
  { col: 6, name: "火力", min: dbMin("fire"), max: dbMax("fire") },
  { col: 7, name: "雷装", min: dbMin("torpedo"), max: dbMax("torpedo") },
  { col: 8, name: "対空", min: dbMin("aa"), max: dbMax("aa") },
  { col: 9, name: "装甲", min: dbMin("armor"), max: dbMax("armor") },
  { col: 10, name: "対潜", min: dbMin("asw"), max: dbMax("asw") },
  { col: 11, name: "回避", min: dbMin("evasion"), max: dbMax("evasion") },
  { col: 12, name: "索敵", min: dbMin("los"), max: dbMax("los") },
  { col: 13, name: "命中", min: dbMin("accuracy"), max: dbMax("accuracy") },
  { col: 14, name: "爆装", min: dbMin("bombing"), max: dbMax("bombing") },
];

// スライダーの初期値[配列]を生成する
function newsValueGen() {
  var sValueTmp = [];
  for (var i = 0; i < sliderPro.length; i++) {
    sValueTmp[i] = [sliderPro[i].min, sliderPro[i].max];
  }
  return sValueTmp;
}
var newsValue = newsValueGen();

// テーブルのヘッダー定義配列
var ths = [
  "ID",
  "装備種別",
  "装備名",
  "改修Lv",
  "目標Lv",
  "アイコン",
  "火力",
  "雷装",
  "対空",
  "装甲",
  "対潜",
  "航空戦",
  "雷撃",
  "火力(非空母)",
  "火力(空母)",
  "火力(夜戦)",
  "夜間航空攻撃",
  "夜戦(対地)",
  "制空",
  "回避",
  "索敵",
  "命中",
  "爆装",
  "射程",
  "行動範囲",
  "改修",
  "ボーナス",
  "wiki",
];

export default {
  data() {
    return {
      columnsSet,
      dataTable: null,
      activetab: 1,
      wpTypeL,
      newWpType,
      selectChecked: wpTypeL.map((obj) => obj.wpTypeCateName),
      ths,
      sValue: newsValue,
      sliderPro,
      testData,
      db,
      startVisivle: true,
      cate,
    };
  },
  components: {
    vueSlider: VueSlider,
  },
  mounted: function () {
    const columnsSettings = columnsSet.columnsSettings;

    //datatables言語設定
    $.extend($.fn.dataTable.defaults, {
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Japanese.json",
      },
    });

    // データテーブル反映
    this.dataTable = window.$("#tbl1").DataTable({
      data: JSON.parse(JSON.stringify(testData)),
      responsive: true,
      lengthChange: false,
      displayLength: 500,
      select: true,
      columns: columnsSettings,
    });
    // 初期フィルタ
    var search = [];
    cate
      .filter((v) => v.state === true)
      .map((v) => v.typename)
      .forEach(function (value) {
        search = search.concat(value);
      });
    var searchType = "^" + search.join("$|^");
    this.dataTable.columns(1).search(searchType, true).draw();
    // this.dataTable.columns(1).search("^小口径主砲$", true).draw();
  },
  methods: {
    // カテゴリフィルタ
    onChangeInput(selectChecked) {
      var searchType = "^" + selectChecked.join("$|^");
      this.dataTable.columns(1).search(searchType, true).draw();
    },
    // 列表示切替
    visivle(startVisivle) {
      this.dataTable.columns([6, 7, 8, 9, 10, 22]).visible(startVisivle);
      this.dataTable
        .columns([11, 12, 13, 14, 15, 16, 17, 18])
        .visible(!startVisivle);
    },
    // カテゴリフィルタボタンアクティブ切り替え
    activeCateChenge(obj, idx) {
      var tmpbool;
      var searchType;

      // 全てボタンの動作
      if (idx == 0) {
        //全てのボタン状態一斉変更
        tmpbool = !obj[0].state;
        obj.forEach((v, i) => (obj[i].state = tmpbool));
        // 検索キーワード設定
        searchType = tmpbool === true ? "" : "null";
        // 個別ボタンの動作
      } else {
        //ボタン状態変更
        obj[idx].state = !obj[idx].state;
        // 検索キーワード設定
        var search = [];
        obj
          .filter((v) => v.state === true)
          .map((v) => v.typename)
          .forEach(function (value) {
            search = search.concat(value);
          });
        searchType = search.length === 0 ? "null" : "^" + search.join("$|^");

        // 先頭以外のすべてのボタンがtrueの場合全てボタンもtrueにする
        obj[0].state =
          obj.filter((v, i) => i != 0 && v.state === true).length ===
          obj.length - 1
            ? true
            : false;
      }
      this.dataTable.columns(1).search(searchType, true).draw();
      return obj;
    },
    // スライダーリセット
    resetSValue() {
      $.fn.dataTable.ext.search = [];
      this.dataTable.draw();
      return newsValueGen();
    },
    // スライダー変更
    sliderChenged(sValue) {
      $.fn.dataTable.ext.search = [];
      $.fn.dataTable.ext.search.push(function (settings, data) {
        for (var i = 0; i < sValue.length; i++) {
          if (
            sValue[i][0] > parseInt(data[sliderPro[i].col], 10) ||
            parseInt(data[sliderPro[i].col], 10) > sValue[i][1]
          ) {
            return false;
          }
        }
        return true;
      });

      this.dataTable.draw();
    },
  },
};
</script>



<style>
html {
  font-size: 13px;
}

.dataTables_filter {
  display: none;
}

input {
  position: relative;
  top: 3px;
}

table.dataTable thead .sorting::after,
table.dataTable thead .sorting::before,
table.dataTable thead .sorting_asc::after,
table.dataTable thead .sorting_asc::before {
  display: none;
}

table.dataTable.dtr-inline.collapsed.table-sm
  > tbody
  > tr
  > td:first-child:before,
table.dataTable.dtr-inline.collapsed.table-sm
  > tbody
  > tr
  > th:first-child:before {
  top: 11px !important;
}

table.dataTable thead .sorting_desc::after,
table.dataTable thead .sorting_desc::before {
  display: none;
}

table.dataTable thead .sorting {
  background-image: url(https://datatables.net/media/images/sort_both.png);
  background-repeat: no-repeat;
  background-position: center right;
}

table.dataTable thead .sorting_asc {
  background-image: url(https://datatables.net/media/images/sort_asc.png);
  background-repeat: no-repeat;
  background-position: center right;
}

table.dataTable thead .sorting_desc {
  background-image: url(https://datatables.net/media/images/sort_desc.png);
  background-repeat: no-repeat;
  background-position: center right;
}
.modal-footer > * {
  font-size: 15px;
}
.vue-slider-dot-tooltip-inner {
  font-size: 10px;
  white-space: nowrap;
  padding: 0px 7px;
  min-width: 20px;
}
.btn:not(:disabled):not(.disabled) {
  font-size: 12px;
}

.btn-outline-info {
  /* 改行出すために入れたところ */
  white-space: pre-line;
  width: 60px;
  height: 50px;
  max-width: 60px;
  max-height: 50px;
  margin: 2px;
}

.navbar {
  padding-left: 0px;
}
.navbar-brand {
  margin: 0px;
}
</style>