<template>
	<view>
		<ai-navbar title="帮助"></ai-navbar>
		<view>{{question}}</view>
		<view>{{answer}}</view>
	</view>
</template>

<script>
	import aiNavbar from '@/components/ai-navbar'
	import helpData from './helpData.js'
	export default {
		components: {
			aiNavbar
		},
		data() {
			return {
				question: null,
				answer: null
			}
		},
		onLoad: function(option){
			this.question = helpData[option.id].title
			this.answer = helpData[option.id].content
		},
		methods: {
		}
	}
</script>

<style>

</style>