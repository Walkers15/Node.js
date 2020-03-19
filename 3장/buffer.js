const buffer = Buffer.from('용암폭발을 김치에 싸서 드셔보세요');
console.log('from(): ', buffer);
console.log('length: ', buffer.length);
console.log('toString(): ', buffer.toString());

const array = [Buffer.from('끔찍한 '), Buffer.from('시간을 '), Buffer.from('보내고 '), Buffer.from('싶어?')];
const buffer2 = Buffer.concat(array);
console.log('concat().toString(): ',buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc(): ',buffer3);