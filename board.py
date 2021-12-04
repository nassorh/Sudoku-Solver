import numpy as np

class Board():
    def __init__(self):
        self.board = [
                [5,3,0,0,7,0,0,0,0],
                [6,0,0,1,9,5,0,0,0],
                [0,9,8,0,0,0,0,6,0],
                [8,0,0,0,6,0,0,0,3],
                [4,0,0,8,0,3,0,0,1],
                [7,0,0,0,2,0,0,0,6],
                [0,6,0,0,0,0,2,8,0],
                [0,0,0,4,1,9,0,0,5],
                [0,0,0,0,8,0,0,7,9]
            ]

        self.solution = [
                    [5,3,4,6,7,8,9,1,2],
                    [6,7,2,1,9,5,3,4,8],
                    [1,9,8,3,4,2,5,6,7],
                    [8,5,9,7,6,1,4,2,3],
                    [4,2,6,8,5,3,7,9,1],
                    [7,1,3,9,2,4,8,5,6],
                    [9,6,1,5,3,7,2,8,4],
                    [2,8,7,4,1,9,6,3,5],
                    [3,4,5,2,8,6,1,7,9]
            ]

        #Len of row for each block
        self.rowLen = 3
        #Len of col for each block
        self.colLen = 3

    def displayBoard(self):
        print(np.matrix(self.board))

    def findEmptyCell(self):
        for row in range(len(self.board)):
            for column in range(len(self.board[row])):
                if self.board[row][column] == 0:
                    return row,column
        return False

    def fetchAllNeigbourNums(self,row,col):
        numbersFound = dict()
        #Horizontal test
        for x in range(len(self.board[row])):
            cell = self.board[row][x]
            if numbersFound.get(cell) == None and cell!=0:
                numbersFound[cell] = True
            
        #Vertical test
        for x in range(len(self.board)):
            cell = self.board[x][col]
            if numbersFound.get(cell) == None and cell!=0:
                numbersFound[cell] = True

        #Block loop        
        boxRowStart=(row//3)*3
        colRowStart=(col//3)*3
        for x in range(boxRowStart,boxRowStart+3):
            for y in range(colRowStart,colRowStart+3):
                cell = self.board[x][y]
                if numbersFound.get(cell) == None and cell!=0:
                    numbersFound[cell] = True
                    
        return numbersFound
    
    def ifValid(self,row,col,num):
        numbersFound = self.fetchAllNeigbourNums(row,col)
        if numbersFound.get(num)==None:
            return True
        else:
            return False

    def updateVal(self,row,col,val):
        self.board[row][col] = val
        return True

    def testAnswer(self):
        boardLen = len(self.board)
        count = 0
        for x in range(boardLen):
            if self.board[x] == self.solution[x]:
                count+=1
        return count==boardLen
