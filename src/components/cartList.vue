<template>
  <div class="cartList">
    <div v-for="(item, index) in props.list" :key="index" :class="'radius item item' + index" @click="modify(index)">
      <div class="info">
				<div class="tit">{{ item.title }}</div>
				<div class="subtit flex justify-between">
					<div class="price">
						<text>单价:</text>
						<text class="val">{{ item.price ? item.price.toFixed(2) : '0.00' }}</text>
						<text>元</text>
					</div>
					<div class="num flex justify-between">
						<div class="sub icon" @click.stop="changenum(index, 'dec')"><i class="iconfont cartsub"/></div>
						<div :class="{val:true, 'text-center': true, vval: item.num == 0}">{{ item.num }}</div>
						<div class="add icon" @click.stop="changenum(index, 'inc')"><i class="iconfont cartadd"/></div>
					</div>
				</div>
			</div>
			<div class="del" @click.stop="del(index)"><i class="iconfont cartdel"/></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  // 定义props
  const props = defineProps<{
    list: Good[]
  }>()

   // 定义子组件传递事件
   const emit = defineEmits<{
    (e: 'changenum', index: number, act: string): void
    (e: 'modify', index: number): void
    (e: 'del', index: number): void
  }>()

  // 修改数量
  const changenum = (index:number, act: string = ''): void => emit('changenum', index, act);
    
  // 修改内容
  const modify = (index: number) => emit('modify', index);
    
  // 删除内容
  const del = (index: number) => emit('del', index);

 

</script>

<style lang="scss">
  .cartList .item {
		background-color: #FFF;
		margin: .8rem auto;
		position: relative;
    padding: .8rem;
    .tit {
			color: #333;
			font-size: 1rem;
			line-height: 1.8rem;
		}
    .del {
			position: absolute;
			top: .8rem;
			right: .3rem;
		}
    .subtit {
			margin: .9rem 0 0;
			font-size: .85rem;
			color: #666;
			.num {
        .iconfont {
          padding: 0;
        }
        .val {
          padding: 0 .5rem;
        }
      }
		}
	}
</style>
