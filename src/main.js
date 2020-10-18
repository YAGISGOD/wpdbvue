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

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({

  el: '#app',
  data: {
    columnsSet,
    dataTable: null
  },

  mounted: function () {
    const columnsSettings = columnsSet.columnsSettings

    const wp = [{ "api_slotitem_id": 12, "api_level": 0 }, { "api_slotitem_id": 41, "api_level": 0 }];
    var input = wp;

    //datatables言語設定
    $.extend($.fn.dataTable.defaults, {
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Japanese.json"
      }
    });

    this.dataTable = window.$("#tbl1").DataTable({
      data: JSON.parse(JSON.stringify(input)),
      responsive: true,
      lengthChange: false,
      displayLength: 50,
      select: true,
      columns: columnsSettings,
    });

  },

  render: h => h(App),
})