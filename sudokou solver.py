from board import Board


class Solver():    
    def solve(self,board):
        find = board.findEmptyCell() 
        if  board.findEmptyCell() == False:
            return True
        else:
            row,col = board.findEmptyCell()
        for x in range(1,10):
            if board.ifValid(row,col,x):
                board.updateVal(row,col,x)
                
                if self.solve(board):
                    return True
                
                board.updateVal(row,col,0)
                
        return False
    
                
        
if __name__ == "__main__":
    board = Board()
    solver = Solver()
    board.displayBoard()
    
    solver.solve(board)
    
    if board.testAnswer() == True:
        print("Solved Succesfully")
        board.displayBoard()
    else:
        print("Failed To Solve")
