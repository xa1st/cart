<template>
  <div class="editbox text-center padding-24 show">
    <div class="title">{{ title }}</div>

    <input type="text" class="input radius text-center" autocomplete="off" placeholder="请输入商品的名称,必填" :value.trim="good.title" @blur="editTit"/>
		<input type="number" class="input radius text-center" autocomplete="off" placeholder="请输入商品的价格,单位:元,默认0.00" :value.number="good.priceTxt" @blur="editPrice"/>
		<input type="number" class="input radius text-center" autocomplete="off" placeholder="请输入商品的数量,默认为1" :value.number="good.num == -1 ? '' : good.num " @blur="editNum"/>
		<div class="addbtn text-center radius" @click.stop="submit">我填好了啦 ^_^</div>
		<div class="closebtn" @click.stop="close"><i class="iconfont cartclose"/></div>
    
  </div>
</template>

<script lang="ts" setup>

  import { computed } from 'vue';

  import utils from '@/utils/utils';

  // 定义props
  const props = defineProps<{
    good: Good,
    index: string
  }>();

  // defineEmits(['update:title'])

  // 定义子组件传递事件
  const emit = defineEmits<{
    (e: 'close'): void,
    (e: 'submit', good: Good, index: string): void,
    (e: 'update:good', good: Good): void
  }>()

  const good = computed<Good>({
    set(value) {
      emit('update:good', value);
    },
    get() {
      let good = props.good;
      return {title: good.title, price: good.price, num: good.num, priceTxt: good.priceTxt};
    }
  });


  // 当前的标题
  const title = computed<string> (() => props.good.title.length > 0 ? '修改商品' : '新增商品');

  // 关闭窗口
  const close = () => emit('close');


  // 更新标题
  const editTit = (e: any) => {

    console.log("======editTit", e.target.value);

    let value = utils.trim(e.target.value);

    good.value.title = value;

  }

  // 更新价格
  const editPrice = (e: any) => {

    console.log("======editPrice", e.target.value);

    let value = utils.trim(e.target.value);

    // 如果没填，则直接为0.00
    if (value === '') value = '0.00';

    // 写值给good
    good.value.price = parseFloat(value);

    // 写值给good.pricetxt
    good.value.priceTxt = good.value.price.toFixed(2);

  }

  // 更新数量
  const editNum = (e: any) => {

    console.log("======editNum", e.target.value);
    
    let value = utils.trim(e.target.value);

    // 写值给good
    good.value.num = value === '' ? 1 : parseInt(value);

  }

  // 提交数据
  const submit = () => {

    let data = good.value;

    // 提交数据
    emit('submit', {title: data.title, price: data.price, num: (data.num == -1 ? 1 : data.num), priceTxt: data.price.toFixed(2)}, props.index);

  }


</script>

<style lang="scss">

  .editbox {
    width: 90%;
    min-height: 19.5rem;
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
			border: #F2F2F2 solid 2px;
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