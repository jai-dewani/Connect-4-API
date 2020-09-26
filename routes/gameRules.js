const { bulkWrite } = require("../models/game")

function makeMove(state,col,player){
    for(i=0;i<5;i++){
        if(state[i+1][col]!=0){
            state[i][col] = player
            return state
        }
    }
    state[5][col] = player
    return state
}

function checkRows(state){
    var count = 0
    var player = 0
    for(i=0;i<6;i++){
        for(j=0;j<7;j++){
            if(state[i][j]!=0 && state[i][j]==player){
                count += 1
            }else if(state[i][j]!=0){
                player = state[i][j]
                count = 1
            }else count = 0;
            if(count>=4) return player;
        }
        count = 0
    }
    return 0
}

function checkCol(state){
    var count = 0
    var player = 0
    for(i=0;i<7;i++){
        for(j=0;j<6;j++){
            if(state[j][i]!=0 && state[j][i]==player){
                count += 1
            }else if(state[j][i]!=0){
                player = state[j][i]
                count = 1 
            }else{
                count = 0
            }
            if(count>=4) return player;
        }
        count = 0
    }
    return 0
}

function checkDiagonal(state){
    // top-left to bottom-right
    const rowMax = 6, colMax = 7;
    for( var rowStart = 0; rowStart < rowMax - 4; rowStart++){
        var player = 0, count = 0;
        var row, col;
        for( row = rowStart, col = 0; row < rowMax && col < colMax; row++, col++ ){
            if(state[row][col]!=0 && state[row][col] == player){
                count++;
                if(count >= 4) return player;
            }
            else if(state[row][col]!=0) {
                player = state[row][col]
                count = 1;
            }else{
                count = 0
            }
        }
    }
    // top-left to bottom-right
    for( var colStart = 1; colStart < colMax - 4; colStart++){
        var player = 0, count = 0;
        var row, col;
        for( var row = 0, col = colStart; row < rowMax && col < colMax; row++, col++ ){
            if(state[row][col]!=0 && state[row][col] == player){
                count++;
                if(count >= 4) return player;
            }
            else if(state[row][col]!=0) {
                player = state[row][col]
                count = 1
            }else{
                count = 0
            }
        }
    }

    // top-right to bottom-left
    for ( var colStart = colMax; colStart > 2; colStart--){
        var player = 0, count = 0;
        var row, col;
        for(row=0, col=colStart; row<rowMax && col>=0; row++, col--){
            if(state[row][col]!=0 && state[row][col] == player){
                count++
                if(count >=4) return player
            }else if(state[row][col]!=0){
                count = 1
                player = state[row][col]
            }else count = 0;
        }
    }
        
    // top-right to bottom-left
    for ( var rowStart = 1; rowStart < rowMax - 4; rowStart++){
        var player = 0, count = 0;
        var row, col;
        for(row = rowStart, col=0; row < rowMax && col >= 0; row++, col--){
            if(state[row][col]!=0){
                if(state[row][col] == player){
                    count++
                    if(count >= 4) return player;
                }else{
                    player = state[row][col]
                    count = 1;
                }
            }else{
                count = 0
            }
        }
    }
    return 0
}

function checkWin(state){
    checks = [checkRows, checkCol, checkDiagonal]
    var result = 0
    for(var i=0;i<3;i++){
        const ans = checks[i](state)
        if(ans!=0){
            result = ans  
            break
        } 
    }
    return result
}

module.exports = { checkRows, checkCol, checkDiagonal, makeMove, checkWin }