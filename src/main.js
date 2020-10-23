Vue.config.devtools = true;

// jQuery
import $ from 'jquery';
window.$ = $
// bootstrap
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// datatables
import 'datatables.net-bs4'
import 'datatables.net-select-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-buttons-bs4'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css'
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
// モジュール
import columnsSet from "./columnsSettings.js"; // eslint-disable-line
// import wpTypeL from "./wpTypeL.js"; // eslint-disable-line
// テストデータ
import testData from "./test.js"; // eslint-disable-line

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({

  el: '#app',
  data: {
    columnsSet,
    show_contents: [],
    dataTable: null
  },

  mounted: function () {
    const columnsSettings = columnsSet.columnsSettings

    // const wp = [{ "api_slotitem_id": 12, "api_level": 0 }, { "api_slotitem_id": 41, "api_level": 0 }];
    // const wp = testData;

    // //大カテゴリ作成
    // var newLcateDB = Array.from(new Map(wpTypeL.map((v) => [v.wpTypeLCateId, v])).values()).map(function (v) { return { "wpTypeLCateId": v.wpTypeLCateId, "wpTypeLCateName": v.wpTypeLCateName } })

    // //チェックリスト生成
    // genCateCheck(1, newLcateDB, 'wpTypeLCateName', "wpTypeLCheck")
    // genCateCheck(2, wpTypeL, 'wpTypeCateName', "wpTypeCheck")

    // //チェックリスト共通処理
    // function genCateCheck(pageNum, db, key, checkName) {
    //   var j = 0;
    //   $('#filter-body').append(`<div id="catePage${pageNum}" class="row col-12 catePages"></div>`);
    //   if (pageNum === 2) { $(`#catePage${pageNum}`).css('display', 'none'); }

    //   $(`#catePage${pageNum}`).append(`<div class="row col-12"></div>`);
    //   for (let i = 0; i < db.length; i++) {
    //     $(`#catePage${pageNum} > div `).eq(j).append(`
    //                 <div class="dropdown-item col-md-6 col-xl-3" style="vertical-align:middle !important;">
    //                 <div class="row col-12"><input type="checkbox" name="${checkName}" value="${db[i][key]}"  checked="checked" class="col-2">
    //                 <div class="col-8">${db[i][key]}</div></div>`)
    //     if ((((i + 1) % 4) == 0) && (i !== (db.length - 1))) {
    //       $(`#catePage${pageNum} `).append('<div class="row col-12"></div>')
    //       j++;
    //     }
    //   }
    // }

    //datatables言語設定
    $.extend($.fn.dataTable.defaults, {
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Japanese.json"
      }
    });

    this.dataTable = window.$("#tbl1").DataTable({
      data: JSON.parse(JSON.stringify(testData)),
      responsive: true,
      lengthChange: false,
      displayLength: 50,
      select: true,
      columns: columnsSettings,
    });
  },
  render: h => h(App),
})