export default async function asyncMap(array, callback) {
	var retArr = [];
	for (let index = 0; index < array.length; index++) {
		var obj = await callback(array[index], index, array);

		retArr.push(obj);
	}

	return retArr;
}