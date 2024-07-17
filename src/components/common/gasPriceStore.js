import Vue from 'vue'

import BN from 'bignumber.js'

export const state = Vue.observable({
	fetched: false,
	gasPriceInfo: {},
	gasPrice: 10,
	gasPriceWei: "10000000000",
	gasPriceInterval: null,
})