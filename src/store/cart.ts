import { toRefs, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import utils from '@/utils/utils';

export const useCartStore = defineStore('cart', () => {
  
  // 定义列表
  const state = reactive({
    datalist: [] as Good[]
  });

  // 总价
	const sum = computed<number>(() => {

		// 不另外写方法了
		let sum: number = 0;
		
		// 计算一下总价
		state.datalist.forEach((item: Good) => {
					
			// 单位转化为分，防止浮点数计算错误
			let money: number = item.price * 100;

			if (typeof item.num != 'number') return; 
			
      // 计算总价
			sum += money * item.num;
			
		});
		
		return sum / 100;
		
	});

  // 统计商品数量
	const total = computed<number>(() => {

		// 不另外写方法了
		let total: number = 0;
		
		// 计算一下总价
		state.datalist.forEach((item: Good) => {
						
			total += typeof item.num == 'number' ? item.num : 0;
			
		});
		
		return total;
		
	});

  // 添加内容到列表
	const add = (data: Good): void => {
			
		if (!data.title) return;
		
		// 加入之前查重，如果有重，直接加数量，所谓重复，是指：名称和数量相同
		let ind = isExist(data);
						
		// 不存在就直接加入数组
		if (ind == -1) {

			// 价格计算
			let price: number = Math.round((data.price * 100)) / 100;
			
			state.datalist.push(<Good>{
				title: utils.trim(data.title), 
				price: price, 
				num: data.num, // 取整
				priceTxt: price.toFixed(2)
			});
			
		}
		
		// 如果存在，则直接加数量,前面加判定防止出现意外值
		if (ind >= 0 && state.datalist[ind]) state.datalist[ind].num += data.num;		
		
	}

  // 修改数据
	const update = (data: Good, i: string): void => {
		// 没有值就直接返回
		if (i === "") return;

		let ind: number = parseInt(i);
		// 添加新值
		state.datalist[ind] = data;
	}

  // 删除指定的方法
	const del = (i: number): void => {
		state.datalist.splice(i, 1);	
	}

  // 查下datalist里是否存在相同数据，如果存在，则返回i
	const isExist = (data: Good): number => {
		// 学习indexof，不存在直接返回-1
		let ind = -1;
		
		// 用循环查找，找到就直接中断
		for(let i = 0; i < state.datalist.length; i++) {
      // 只有标题和价格完全相同，才算是同一件商品
			if (state.datalist[i].title == data.title && state.datalist[i].price == data.price) {
				ind = i;
				break;
			}
		}
		
		return ind;
	}

  // 修改数量
	const num = (index: number, act: number): void => {
				
		// 如果内容不存在，或者变化值小于1，直接不动
		if (!state.datalist[index]) return;
		
		// 新增
		if (act == 1) state.datalist[index].num++;
		
		// 减少
		if (act == 2 && state.datalist[index].num > 0) state.datalist[index].num--;
			
	} 

  // 重置
	const $reset = () => {
		state.datalist = [];
	}
	
  // 返回值
  return {
		...toRefs(state),
		sum,
		add,
		del,
		update,
		num,
		total,
		$reset
	}
})
