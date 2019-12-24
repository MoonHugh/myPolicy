import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			// 首页
			path: '/',
			name: 'default',
			component: resolve => require(['../page/index.vue'], resolve)
		},
		{
			// 首页
			path: '/index',
			name: 'index',
			component: resolve => require(['../page/index.vue'], resolve)
		},
		{
			// 险种
			path: '/policy',
			name: 'policy',
			component: resolve => require(['../page/policy.vue'], resolve)
		},
		{
			// 历史保单
			path: '/historyPolicy',
			name: 'historyPolicy',
			component: resolve => require(['../page/historyPolicy.vue'], resolve)
		},
		{
			// 历史保单详情
			path: '/historyPolicyDetails',
			name: 'historyPolicyDetails',
			component: resolve => require(['../page/historyPolicyDetails.vue'], resolve)
		},
		{
			// 历史保单详情展示
			path: '/policy2',
			name: 'policy2',
			component: resolve => require(['../page/policy2.vue'], resolve)
		},
		{
			// 没理赔提示页
			path: '/hintView',
			name: 'hintView',
			component: resolve => require(['../page/hintView.vue'], resolve)
		}
	]
})
