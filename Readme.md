# Connect 4 API

# API Instructions 

## GET Information

API-type: GET  
API-url: /?token=your-game-token  
Data-expected: None

Response-type:   

    {
        'state': 2D-Array,  
        'moves': 1D-Array,  
        'no_of_moves': Number,  
        'result': String,  
        'status': Number  
    }  

    - state: A matrix depicting the state of game with inegers in each cell 
        - 0 -> Empty 
        - 1 -> Yellow 
        - 2 -> Red 

    - moves: An array containing the column numbers entered at each move taken at every step
        - Odd moves are of Yellow
        - Even moves are of Red

    - no_of_moves: The total number of moves that both players combined have taken 

    - result: It contains textual message like, 
        - "Yellow Wins"
        - "Red Wins"
        - "Yellow's Turn"
        - "Red's Turn"


## Play Next Move

API-tpye: POST  
API-url: / 
Data-expected:  
- token: Your game-token you got at the beginning of the game  
- col: The column at which the player is inserting the next coint  

Response-type:

    {
        'status': String  
    }  

    - status: Contains text describing if the move was valid or invalid and if someone win's the game it will display "Red Won" or "Yellow Won"

## Start a game

API-type: GET 
API-url: /start/
Data-expected: None

Response-type:

    { 
        'token': String
    }

    - token: A string which will be used identify a unique game

## Reset the game 

API-type: GET
API-url: /reset/?token=your-game-token  
Data-expected: None

Response-type:

    {
        'status': String
    }

    - status: Tells if the game was reset or not