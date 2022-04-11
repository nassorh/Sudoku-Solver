import unittest
from board import *
from sudokou_solver import *

class Test(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.Board = Board("Board/Tests/Test_Board.txt")
        cls.cell = Cell(0,0)
        cls.NullCell = Cell()
        
    def test_board_converter(self):
        print("Board Converter Test")
        board = [
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
        board_obj = Board.convert_board_to_array("Board/Tests/Test_Board.txt")
        self.assertTrue(board_obj,board)
 
    def test_find_horizonal_nums_test(self):
        print("Get vertical horizonal test")
        nums_found = self.Board.get_horizontal_nums(self.cell)
        self.assertEqual(nums_found,{5: True, 3: True, 7: True})

    def test_find_vertical_nums_test(self):
        print("Get vertical numbers test")
        nums_found = self.Board.get_vertical_nums(self.cell)
        self.assertEqual(nums_found,{5: True, 6: True, 8: True, 4: True, 7: True})
    
    def test_get_nums_in_block(self):
        print("Get numbers in block test")
        nums_found = self.Board.get_nums_in_block(self.cell)
        self.assertEqual(nums_found,{5: True, 3: True, 6: True, 9: True, 8: True})

    def test_fetch_all_neigbour_nums(self):
        print("Fetch all neigbour nums")
        nums_found = self.Board.fetch_all_neigbour_nums(self.cell)
        self.assertEqual(nums_found,{5: True, 3: True, 7: True, 6: True, 8: True, 4: True, 9: True})

    def test_ifValid_valid_num(self):
        print("If Valid Test False")
        self.assertEqual(False,self.Board.ifValid(self.cell,5))

    def test_ifValid_invaild_num(self):
        print("If Valid Test True")
        self.assertEqual(True,self.Board.ifValid(self.cell,1))

    def test_updateVal(self):
        print("Update val test")
        board = [
                [1,3,0,0,7,0,0,0,0],
                [6,0,0,1,9,5,0,0,0],
                [0,9,8,0,0,0,0,6,0],
                [8,0,0,0,6,0,0,0,3],
                [4,0,0,8,0,3,0,0,1],
                [7,0,0,0,2,0,0,0,6],
                [0,6,0,0,0,0,2,8,0],
                [0,0,0,4,1,9,0,0,5],
                [0,0,0,0,8,0,0,7,9]
        ]
        self.Board.updateVal(self.cell,1)
        self.assertEqual(board,self.Board.board)
    
    def test_find_empty_cell(self):
        print("Find Next Empty Cell")
        empty_cell = self.Board.find_next_empty_cell()
        self.assertEqual((empty_cell.row,empty_cell.column),(0,2))

    def test_solver(self):
        board = Board("Board/Tests/Test_Board.txt")
        solution = Board.convert_board_to_array("Board/Tests/Test_Solution.txt")
        Solver.solve(board)
        self.assertEqual(board.board,solution)

if __name__ == "__main__":
    unittest.main()