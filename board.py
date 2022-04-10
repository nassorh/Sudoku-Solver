from tkinter import HORIZONTAL
from xmlrpc.client import boolean
import numpy as np
from pandas import array
import re 

class Board():
    def __init__(self,board_dir):
        self.board = self.convert_board_to_array(board_dir)

        #Len of row for each block
        self.rowLen = 3
        #Len of col for each block
        self.colLen = 3

    def displayBoard(self) -> None:
        print(np.matrix(self.board))

    def find_next_empty_cell(self):
        #ROW AND COL IN DATA STRCUTURE
        #RE CODE THIS
        for row in range(len(self.board)):
            for column in range(len(self.board[row])):
                if self.board[row][column] == 0:
                    return row,column
        return False

    def fetch_all_neigbour_nums(self,row,col) -> dict:
        numbersFound= {}
        
        horizontal_nums = self.get_horizontal_nums(row)
        vertical_nums = self.get_vertical_nums(col)
        block_nums = self.get_nums_in_block(row,col)    
        
        numbersFound.update(horizontal_nums)
        numbersFound.update(vertical_nums)
        numbersFound.update(block_nums)

        return numbersFound
    
    def get_horizontal_nums(self,row) -> dict:
        numbersFound_boolean = dict()
        for x in range(len(self.board[row])):
            cell = self.board[row][x]
            if numbersFound_boolean.get(cell) == None and cell!=0:
                numbersFound_boolean[cell] = True
        return numbersFound_boolean
    
    def get_vertical_nums(self,col) -> dict:
        numbersFound_boolean = dict()
        for x in range(len(self.board)):
            cell = self.board[x][col]
            if numbersFound_boolean.get(cell) == None and cell!=0:
                numbersFound_boolean[cell] = True
        return numbersFound_boolean
    
    def get_nums_in_block(self,row,col) -> dict:
        numbersFound_boolean = dict()

        boxRowStart=(row//3)*3
        colRowStart=(col//3)*3
        for x in range(boxRowStart,boxRowStart+3):
            for y in range(colRowStart,colRowStart+3):
                cell = self.board[x][y]
                if numbersFound_boolean.get(cell) == None and cell!=0:
                    numbersFound_boolean[cell] = True
                    
        return numbersFound_boolean

    def ifValid(self,row,col,num) -> boolean:
        numbersFound = self.fetch_all_neigbour_nums(row,col)
        if numbersFound.get(num)==None:
            return True
        else:
            return False

    def updateVal(self,row,col,val) -> boolean:
        self.board[row][col] = val
        return True

    @classmethod
    def convert_board_to_array(cls,filedir) -> array:
        board_array = []
        with open(filedir) as file:
            lines = file.readlines()
            for line in lines:
                nums = []
                line = line.strip().split(",")
                for num in line:
                    nums.append(int(num))
                board_array.append(nums)
        return board_array

board = Board.convert_board_to_array("board.txt")