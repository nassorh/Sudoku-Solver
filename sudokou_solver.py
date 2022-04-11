from board import Board, NullCell


class Solver():
    @classmethod    
    def solve(cls,board) -> bool:
        cell = board.find_next_empty_cell()
        if  isinstance(cell,NullCell):
            return True
        else:
            cell = board.find_next_empty_cell()
        for x in range(1,10):
            if board.ifValid(cell,x):
                board.updateVal(cell,x)
                
                if cls.solve(board):
                    return True
                
                board.updateVal(cell,0)
                
        return False

if __name__ == "__main__":
    board = Board("Board/board.txt")
    board.displayBoard()
    
    if Solver.solve(board):
        print("Solved Succesfully")
        board.displayBoard()
    else:
        print("Failed To Solve")
        board.displayBoard()

