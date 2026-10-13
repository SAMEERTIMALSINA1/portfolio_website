# Creating board
def board_created():
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]
    return board
# Printing board
def printboard(board):
    print(f" {board[0][0]} | {board[0][1]} | {board[0][2]}")
    print("---+---+---")
    print(f" {board[1][0]} | {board[1][1]} | {board[1][2]}")
    print("---+---+---")
    print(f" {board[2][0]} | {board[2][1]} | {board[2][2]}")
    

# Input places of board
def userplays(board,play):
    print(play)
    if play == "1":
        board[0][0] = now_play()
    elif play == "2":
        board[0][1] = now_play()
    elif play == "3":
        board[0][2] = now_play()
    elif play == "4":
        board[1][0] = now_play()
    elif play == "5":
        board[1][1] = now_play()
    elif play == "6":
        board[1][2] = now_play()
    elif play == "7":
        board[2][0] = now_play()
    elif play == "8":
        board[2][1] = now_play()
    elif play == "9":
        board[2][2] = now_play()
    else:
        print("Only 1-9 move is acceptable")
        return

# checking (move ?= valid )
def is_move_valid(play,played_positon):
    global played_position
    if play not in played_position:
        return True
    else:
        return False        

# Decide whose play is going to happen
def now_play():
    if i % 2 == 0:
        init_play = computer
    else:
        init_play = player
    return init_play 

# Win condition
def win_condition(board):
    if board[0][0] == board[0][1] == board[0][2] == now_play(): # 123
        return True
    elif board[1][0] == board[1][1] == board[1][2] == now_play(): #456
        return True
    elif board[2][0] == board[2][1] == board[2][2] == now_play(): # 789
        return True
    elif board[0][0] == board[1][0] == board[2][0] == now_play(): # 147
        return True
    elif board[0][1] == board[1][1] == board[2][1] == now_play(): # 258 
        return True
    elif board[0][2] == board[1][2] == board[2][2] == now_play(): # 369 
        return True
    elif board[0][0] == board[1][1] == board[2][2] == now_play(): # 159
        return True
    elif board[2][0] == board[1][1] == board[0][2] == now_play(): # 753
        return True
    else:
        return "Draw"
    
    
# Main Game
player = "X"
computer = "O"
i = 0
played_position = []


print("##### Game Start ########")
print(f"#### Player = {player} ####")
print(f"#### Computer = {computer} ####")
board = board_created()
printboard(board)

while i < 9:
    play = input("Enter your move (1-9): ")

    is_move_valid(play,played_position)

    if is_move_valid(play, played_position) == True:

        # itterater counter to prevent invalid move errors
        i = i+1
        played_position.append(play)

        userplays(board,play)
        printboard(board)
        
        if win_condition(board) == True:
            print(f"{now_play()} is the winner")
            break
    else:
        print(f"{play} has been already played.")