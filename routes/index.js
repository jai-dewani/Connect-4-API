var express = require("express");
var router = express.Router();
var { checkRows, checkCol, checkDiagonal, makeMove, checkWin }  = require("./gameRules")
var Game = require("../models/game");

// State matrix values
// 0 -> None 
// 1 -> Yellow 
// 2 -> Red 

// Status values 
// 0 -> Game Ended
// 1 -> Game On 


router.get("/",function(req,res){
    const token = req.query.token;
    Game.findOne({_id:token},function(err,data){

        console.log(data.no_of_moves);
        console.log(data.moves);
        console.log(data.result);
        console.log('newtate',data.state)
        console.log(data.status)
        
        return res.json(data)
    })
});

router.post("/",function(req,res){
    const {token, col} = req.body;
    if(col<0 || col>=7){
        return res.json({
            'status': "Invalid"
        })
    }
    Game.find({_id:token},function(err,data){
        if(err) return err;
        var {state, moves, no_of_moves, result, status} = data[0];
        if(state[0][col]!=0){
            return res.json({
                'status': "Invalid"
            })
        }else if(status==0){
            return res.json({
                'status': result
            })
        }
        else{
            if(no_of_moves%2){
                state = makeMove(state,col,2)
            }else{
                state = makeMove(state,col,1)
            }
            const ans = checkWin(state)
            no_of_moves += 1
            if(ans==1){
                result = "Yellow Won"
                status = 0
            }else if(ans==2){
                result = "Red Won"
                status = 0
            }else if(no_of_moves%2){
                result = "Red's Turn"
            }else{
                result = "Yellow's Turn"
            }
            moves = moves.concat([col])
            Game.updateOne({_id:token},{
                state,
                moves,
                no_of_moves,
                result,
                status
            },(err,update)=>{
                if(err) return err
                if(status){
                    return res.json({
                        'status': "Valid",
                    })
                }else{
                    return res.json({
                        'status': result
                    })
                }
            })
        }
    })
})

router.post("/start",function(req,res){
    var state = new Array(6)
    for(i=0;i<6;i++){
        state[i] = new Array(7)
        state[i].fill(0)
    }
    var moves = new Array()
    var no_of_moves = 0
    var result = "Yellow's Turn"
    var status = 1
    var game = new Game({
        state, 
        moves,
        no_of_moves,
        result,
        status
    })
    game.save()
    return res.json({
        "token": game._id
    })
})

router.get("/reset",function(req,res){
    const token = req.query.token
    Game.findById(token,function(err,data){
        var {state, moves, no_of_moves, result} = data;
        for(i=0;i<6;i++){
            state[i].fill(0)
        }
        moves = []
        no_of_moves = 0
        result = "Yellow's Turn"
        status = 1
        Game.updateOne({_id:token},{
            state,
            moves,
            no_of_moves,
            result,
            status
        },(err,update)=>{
            if(err){
                res.json({
                    'staus':"Couldn't Reset the game"
                })
                return err
                
            } 
            return res.json({
                'status': "Game Reset",
            })
        })
    })
})

module.exports = router