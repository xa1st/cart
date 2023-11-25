
export default {
	/**
	 * 判定是否为数字
	 * @param val string|integer|float
	 * @return boolean
	 */
	isNumber: (val: string|number): boolean => {
		return toString.call(val) === '[object Number]' || val == parseFloat(<string>val).toString();
	},
	
	/**
	 * 去除字符串2边的空格
	 * @param str string 要去空格的字段
	 * @return string
	 */
	trim: (str ?: string): string => {
		return String.prototype.trim.call(str);
	},
}