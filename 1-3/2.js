function sortArray(arr){
    const target = 'Dumbways is awesome'
    const targetArr = target.split('');
    let resultArr = []
    if(!Array.isArray(arr)){
        console.log(`Invalid Input`)
    } else if (target.length != arr.length){
        console.log(`Array length mismatch`)
    } else{
        for(let m = 0; m < targetArr.length; m++){
            for(let n = 0; n < arr.length; n++){
                if (arr[n] == targetArr[m]){
                    resultArr.push(arr[n])
                    break
                }
            }
        }
        result = resultArr.join('')

        if(result == target){
            console.log(`Success! Rearranged into: ${result}`)
        }else {
            console.log(`Error! Obtained result: ${result}`)
        }
    }
}
sortArray(['a', 'd', 'd' ])
sortArray(['u', 'D', 'm', 'w', 'b', 'a', 'y', 's', 'i', 's', 'w', 'a', 'e', 's', 'e', 'o', 'm', ' ', ' '])
sortArray(['u', 'd', 'l', 'w', 'b', 'a', 'y', 's', 'i', 's', 'w', 'a', 'e', 's', 'e', 'o', 'm', ' ', ' '])
sortArray(`testing`)
sortArray(1231)