<template>
  <div class="editbox text-center padding-24">
    <div class="title">{{ title }}</div>

    <input type="text" class="input radius text-center" placeholder="请输入商品的名称,必填" v-model="good.title" @blur="format('title')"/>
		<input type="number" class="input radius text-center" placeholder="请输入商品的价格,单位:元,默认0.00" v-model="good.price" @blur="format('price')"/>
		<input type="number" class="input radius text-center" placeholder="请输入商品的数量,默认为1" v-model="good.num" @blur="format('num')"/>
		<div class="addbtn text-center radius" @click.stop="submit">我填好了啦 ^_^</div>
		<div class="closebtn" @click.stop="close"><i class="iconfont cartclose"/></div>
    
  </div>
</template>

<script lang="ts" setup>

  import utils from '@/utils/utils';
  import { computed } from 'vue';

  // 定义props
  const props = defineProps<{
    good: Good,
    index: string
  }>();

  // 定义子组件传递事件
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'submit', good: Good, index: string): void
  }>()

  // 对应的商品信息
  const good = computed<{title: string, price: string, num: number}>(() => {
    return {
      title: props.good.title, 
      price: props.good.price != 0 ? props.good.price.toFixed(2) : '', 
      num: props.good.num
    }
  });

  // 当前的标题
  const title = computed<string> (() => props.good.title.length > 0 ? '修改商品' : '新增商品');

  // 关闭窗口
  const close = () => emit('close');

  // 提交数据
  const submit = () => {

    // 验证名称
    if (good.value.title == '') return console.log('标题不能为空');

    // 提交数据
    emit('submit', {title: good.value.title, price: parseFloat(good.value.price || '0.00'), num: good.value.num || 1}, props.index);

  }

  // 格式化数据
  const format = (name: string = '') => {

    // 标题
    if (name == 'title' && good.value.title) good.value.title = utils.trim(good.value.title);

    // 数量
    if (name == 'num' && good.value.num) good.value.num = good.value.num;

    // 价格
    if (name == 'price' && good.value.price) good.value.price = parseFloat(good.value.price).toFixed(2);

  }

</script>

<style lang="scss">

  .editbox {
    width: 90%;
    min-height: 35vh;
    margin: 15vh auto; 
    z-index: 2;
    position: absolute;
		top: 0;
		left: 0;
		right: 0;
    background-color: #fff;
		transition: all 0.3s linear;
    transform: translate(0, -100vh);
    &.show {
      transform: translate(0, 0);
      .closebtn {
        position: absolute;
        bottom: -2.6rem;
        width: 1.6rem;
        height: 1.6rem;
        left: calc(48% - .8rem);
        .iconfont {
          color: #FFF;
          font-size: 2rem;
        }
      }
    }

    .title {
      font-size: 1.1rem;
			line-height: 3rem;
			border-bottom: #F2F2F2 solid 1px;
			margin-bottom: 1.3rem;
    }
    .input {
			line-height: 2rem;
			height: 2.5rem;
			margin: 1rem auto;
			border: rgba(0, 0, 0, .2) solid 2px;
      display: block;
      width: 100%;
      color: #666;
		}
    .addbtn {
			width: 100%;
			line-height: 2.5rem;
			color: #FFF;
			margin-top: 1.5rem;
		}


  }
</style>