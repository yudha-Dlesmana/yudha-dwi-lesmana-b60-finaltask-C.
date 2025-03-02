const modal = 1_000_000_000;

let depoBank = 350_000_000;

const saldo = modal - depoBank;
let obligasi = saldo*30/100;
let sahamA = saldo*35/100;
let sahamB = saldo - obligasi - sahamA
// let sahamB = saldo*35/100;

function futureValue(P, r, t){
    const result = P *  Math.pow((1 + r), t);
    
    return result;
}
depoBank = futureValue(depoBank, 3.5/100, 2)
obligasi = futureValue(obligasi, 13/100, 2)
sahamA = futureValue(sahamA, 14.5/100, 2)
sahamB = futureValue(sahamB, 12.5/100, 2)

const total = depoBank + obligasi + sahamA + sahamB;
const keuntungan = total-modal;

const jt = 1000_000
const m = 1000_000_000

console.log(`modal: ${modal >= m ? modal/m : modal/jt}${modal >= m ? 'm' : 'jt'}`)
console.log(`keuntungan: ${(keuntungan >= m ? keuntungan/m : keuntungan/jt).toFixed(2)}${keuntungan >= m ? 'm' : 'jt'}`)
console.log(`total: ${(total >= m ? total/m : total/jt).toFixed(2)}${total >= m ? 'm' : 'jt'}`)