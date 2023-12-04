<template>
  <header>
    <!-- 标题栏 -->
    <div class="titbox text-center relative">
      <div class="tit">购物清单</div>
      <div class="clear absolute" @click="clear"><i class="iconfont cartclear"/></div>
    </div>
  </header>

  <section class="section padding-24">

    <!-- 清单列表 -->
    <cart-list class="listbox" :list="cartStore.datalist" @changenum="change" @modify="modify" @del="del"></cart-list>

    <!-- 测试按钮 -->
    <div class="addItem text-center radius" @click="addItem()">
      <i class="iconfont cartnew"/>
      <text>添加商品</text>
    </div>

    <!-- 版权 -->
    <div class="copyright text-center">
      <a href="//github.com/afyi/cart" target="_blank" title="该项目的github">小小购物车 V{{ $VERSION }}</a><a href="//blog.del.pub" target="_blank" title="联系我"> @ 猫东东</a>
    </div>

  </section>

  <footer class="fixed tool">
    <!-- 总计 -->
    <div class="flex justify-between padding-24">
			<div class="num">共计：<span class="val">{{ cartStore.total }}</span>件商品</div>
			<div class="sum">总计：<span class="val">{{ sum }}</span>元</div>
		</div>
  </footer>

  <!-- 弹框 -->
  <input-box v-model:good="goodItem" :index="index" @close="close" @submit="submit" v-show="combox"></input-box>

  <!-- 遮罩层 -->
  <div class="mask" :style="{height: bgHeight}" @click="close" v-show="mask"></div>
  
</template>

<script setup lang="ts">

  import { computed, reactive, ref } from 'vue';
  
  import { useCartStore } from '@/store/cart';

  import cartList from '@/components/cartList.vue';

  import inputBox from '@/components/inputBox.vue';

  import { vuepop, vuemsg } from 'vue3-popup';

  import 'vue3-popup/lib/style.css';

  // 加载store
  const cartStore = useCartStore();

  // 控制弹窗 打开: true 关闭: false
	const combox = ref<boolean>(false);

  // 控制遮罩层 打开: true 关闭: false
  const mask = ref<boolean>(false);

  // 当前index
  const index = ref<string>("");

  // 商品信息， 此处给num -1 是为了默认为
	const goodItem = reactive<Good>({title: '', price: 0, num: -1, priceTxt: '0.00'});

  // 总价
  const sum = computed<string>(() => cartStore.sum.toFixed(2));

  // 遮罩层高度
  const bgHeight = computed<string>(() => (document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight) + 163 + 'px');

  // 加减按钮
  const change = (index:number, act: string) => act == 'inc' ? cartStore.num(index, 1) : cartStore.num(index, 2);;

  // 修改事件
  const modify = (i: number) => {

    // 读取当前商品信息
    let good: Good = cartStore.datalist[i];

    // 给框内内容赋值
    goodItem.title = good.title;
    goodItem.price = good.price;
    goodItem.num = good.num;
    goodItem.priceTxt = good.price.toFixed(2);

    // 当前操作的数据排序
    index.value = i.toString();

    // 打开弹窗
    actBox(1);
  };

  // 清理事件
  const clear = () => {
    vuepop({
      title: '重要',
      msg: '是否要清空购物清单?',
      okText: '确定',
      ok: () => cartStore.$reset()
    });
  }

  // 删除内容
  const del = (i: number) => {
    vuepop({
      title: '重要',
      msg: '是否要删除商品【' + cartStore.datalist[i].title + '】?',
      okText: '确定',
      ok: () => cartStore.del(i)
    });
  }

  // 新增
  const addItem = () => {
    
    // 重置数据
    goodReset();

    // 打开弹窗
    actBox(1);
    
  }

  // 更新数据
  const submit = (good: Good, index: string) => {

    // 验证名称
    if (good.title == '') return vuemsg('标题不能为空');

    // 判定价格格式是否正确
    if (!/^\d+(\.\d{0,2})?$/.test(good.price.toString())) return vuemsg('价格格式不正确');

    // 判定数量是否存在小数
    if (!/^\d+$/.test(good.num.toString())) return vuemsg('数量格式不正确');

    index === '' ? cartStore.add(good) : cartStore.update(good, index);

    // 关闭弹窗
    actBox(0);    

  }

  // 点击遮罩关闭弹窗
	const close = () => {
    // 关闭弹窗
		actBox(0);
	}

  // 数据重置
  const goodReset = () => {
    // 重置数据
    goodItem.title = '';
    goodItem.price = 0;
    goodItem.num = -1;
    goodItem.priceTxt = '';
    index.value = '';
  }


  // 打开弹窗
  const actBox = (act: number = 1) => {

    combox.value = act == 1;

    mask.value = act == 1;

    // 关闭弹窗的时候就直接重置变量
    if (act == 0) goodReset();
    
  }

</script>


<style lang="scss">
  // 导入全局通用样式
  @import '@/assets/base.scss';
  // 加载图标
	@import '@/assets/icon/iconfont.css';
  header, section, footer {max-width: $max-width;}
  .titbox, .tool {width: 100%; background-color: $bg-color; height: 3.5rem; line-height: 3.5rem;}
  .titbox .clear {right: .8rem;top: 0;}
  .tool {bottom: 0;}
  .section {width: 100%;}
  .addItem { width: 100%; background-color: $color-primary; line-height: 3rem; margin: .8rem auto; color:$bg-color;}
  .mask {width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; right: 0; z-index: 1; background-color: $bg-color-mask;}
  .editbox .addbtn {background-color: $color-primary;}
  .copyright{margin-bottom: 4rem;}
  .copyright a{color: #bbb;text-decoration: none;font-size: .85rem;}
</style>
