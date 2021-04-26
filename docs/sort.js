let arr = [2, 6, 2, 3, 9, 4];

function boubleSort(arr) {
    let len = arr.length;
    if (arr.length === 1) return arr;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    console.log(arr);
}


function insertSort(arr) {
    let len = arr.length;
    if (arr.length === 1) return arr;
    let prev, curr;
    for (let i = 1; i < len; i++) {
        curr = arr[i];
        prev = i - 1;
        while (prev >= 0 && arr[prev] > curr) {
            arr[prev + 1] = arr[prev];
            prev--;
        }
        arr[prev + 1] = curr;

    }
    console.log(arr);

}

function selectSort(arr) {
    let len = arr.length;
    if (arr.length === 1) return arr;
    let minIndex;
    for (let i = 0; i < len; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    console.log(arr);
}


function merge(left, right) {
    let il = 0, ir = 0, leftLen = left.length, rightLen = right.length, res = [];
    while (il < leftLen && ir < rightLen) {
        if (left[il] > right[ir]) {
            res.push(right[ir]);
            ir++;
        } else {
            res.push(left[il]);
            il++;
        }
    }
    while (il < leftLen) {
        res.push(left[il]);
        il++;
    }
    while (ir < rightLen) {
        res.push(right[ir]);
        ir++;
    }
    return res;
}

function mergeSort(arr) {
    let len = arr.length;
    if (len === 1) return arr;
    let mid = Math.floor(len / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, len);
    return merge(mergeSort(left), right(right));
}

const quickSort = function (arr) {
    const quick = function (arr) {
        if (arr.length <= 1) return arr
        const len = arr.length
        const index = Math.floor(len >> 1)
        const pivot = arr.splice(index, 1)[0]
        const left = []
        const right = []
        for (let i = 0; i < len; i++) {
            if (arr[i] > pivot) {
                right.push(arr[i])
            } else if (arr[i] <= pivot) {
                left.push(arr[i])
            }
        }
        return quick(left).concat([pivot], quick(right))
    }
    const result = quick(arr)
    return result
}



function convertNumber(str) {
    let count = Math.floor(str.length / 3);
    let tail = str.length % 3;
    let tmpStack = [];
    let i = 0;
    let tmpStr = '';

    while (i < count) {
        tmpStr = str.substr(str.length - 3 * i - 3, 3);
        tmpStack.push(tmpStr);
        i++;
    }
    if (tail > 0) {
        tmpStack.push(str.slice(0, tail));
    }
    // console.log(tmpStack);

    let res = '';

    while (tmpStack.length > 0) {
        if (tmpStack.length > 1) {
            res += tmpStack.pop() + '.';
        } else {
            res += tmpStack.pop();
        }
    }

    console.log(res);
}

function howManyCoins(x) {
    let leave = 1024 - x;
    let coinNum = 0;


    function getCoin(leave, maxNum) {
        if (leave < maxNum) {
            if (maxNum > 1) {
                getCoin(leave, maxNum / 4);
            } else {
                getCoin(leave, 1);
            }
        } else {
            if (leave % maxNum > 0) {
                leave -= maxNum * (Math.floor(leave / maxNum));
                if (leave > 0) {
                    getCoin(leave, maxNum / 4);
                }
            } else {
                coinNum += leave / maxNum;
            }
        }
    }

    getCoin(leave, 64);
    return coinNum;
}

console.log(howManyCoins(400));
