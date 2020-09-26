var { checkRows, checkCol, checkDiagonal, makeMove, checkWin }  = require("../routes/gameRules")

var state = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
]

function copy(ar){
    c = []
    for(i=0;i<6;i++){
        c[i] = ar[i].slice()
    }
    return c
}

function test1(){
    t1 = copy(state) 
    makeMove(t1,0,1)
    makeMove(t1,1,2)
    makeMove(t1,1,1)
    makeMove(t1,2,2)
    makeMove(t1,3,1)
    makeMove(t1,2,2)
    makeMove(t1,2,1)
    makeMove(t1,3,2)
    makeMove(t1,4,1)
    makeMove(t1,3,2)
    makeMove(t1,3,1)
    if (checkWin(t1)==1) console.log("TestCase1: Passed")
    else console.log("TestCase2: Failed");
}

function test2(){
    var state = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,2,2,0,0,0],
        [1,1,1,1,2,0,0],
    ]
    if (checkWin(state)==1) console.log("TestCase1: Passed")
    else console.log("TestCase2: Failed");
}

function test3(){
    var state = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,1,0],
        [0,0,0,0,1,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0],
    ]
    if (checkWin(state)==1) console.log("TestCase1: Passed")
    else console.log("TestCase2: Failed");
}

function test4(){
    var state = [
        [0,0,0,0,0,0,0],
        [0,0,1,0,0,0,1],
        [0,0,0,1,0,2,0],
        [0,0,0,0,1,0,0],
        [0,0,0,2,0,1,0],
        [0,0,0,0,0,0,2],
    ]
    if (checkWin(state)==1) console.log("TestCase1: Passed")
    else console.log("TestCase2: Failed");
}


test1()
test2()
test3()
test4()