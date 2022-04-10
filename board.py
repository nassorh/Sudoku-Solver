from ipaddress import collapse_addresses
from tkinter import HORIZONTAL
from xmlrpc.client import boolean
from mysqlx import Row
import numpy as np
from pandas import array
import re 

class Cell():
    def __init__(self,row=None,column=None):
        self.row = row 
        self.column = column
    
class Board():
    def __init__(self,board_dir):
        self.board = self.convert_board_to_array(board_dir)

        #Len of row for each block
        self.rowLen = 3
        #Len of col for each block
        self.colLen = 3

    def displayBoard(self) -> None:
        print(np.matrix(self.board))

    def find_next_empty_cell(self) -> Cell:
        cell = Cell()

        for row in range(len(self.board)):
            for column in range(len(self.board[row])):
                if self.board[row][column] == 0:
                    cell.row = row
                    cell.column = column
                    return cell
        return cell

    def fetch_all_neigbour_nums(self,cell) -> dict:
        numbersFound= {}
        
        horizontal_nums = self.get_horizontal_nums(cell)
        vertical_nums = self.get_vertical_nums(cell)
        block_nums = self.get_nums_in_block(cell)    
        
        numbersFound.update(horizontal_nums)
        numbersFound.update(vertical_nums)
        numbersFound.update(block_nums)

        return numbersFound
    
    def get_horizontal_nums(self,cell_obj) -> dict:
        numbersFound_boolean = dict()
        for x in range(len(self.board[cell_obj.row])):
            cell = self.board[cell_obj.row][x]
            if numbersFound_boolean.get(cell) == None and cell!=0:
                numbersFound_boolean[cell] = True
        return numbersFound_boolean
    
    def get_vertical_nums(self,cell_obj) -> dict:
        numbersFound_boolean = dict()
        for x in range(len(self.board)):
            cell = self.board[x][cell_obj.column]
            if numbersFound_boolean.get(cell) == None and cell!=0:
                numbersFound_boolean[cell] = True
        return numbersFound_boolean
    
    def get_nums_in_block(self,cell_obj) -> dict:
        numbersFound_boolean = dict()

        boxRowStart=(cell_obj.row//3)*3
        colRowStart=(cell_obj.column//3)*3
        for x in range(boxRowStart,boxRowStart+3):
            for y in range(colRowStart,colRowStart+3):
                cell = self.board[x][y]
                if numbersFound_boolean.get(cell) == None and cell!=0:
                    numbersFound_boolean[cell] = True
                    
        return numbersFound_boolean

    def ifValid(self,cell,num) -> boolean:
        numbersFound = self.fetch_all_neigbour_nums(cell)
        if numbersFound.get(num)==None:
            return True
        else:
            return False

    def updateVal(self,cell,val) -> boolean:
        self.board[cell.row][cell.column] = val
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
cell = Cell()