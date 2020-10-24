Vue.config.devtools = true;

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({

  el: '#app',
  data: {
    //sdef:100
    // columnsSet,
    // show_contents: [],
    // dataTable: null
  },
  mounted: function () {
  },
  render: h => h(App),
})