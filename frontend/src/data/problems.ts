import { Problem } from '../types';

export const PROBLEMS: Problem[] = [
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Medium',
    category: 'Math',
    description: `A palindrome is a number that reads the same backward as forward. For example, 121 is a palindrome, while 123 is not.

Given an integer x, write a function that determines whether it is a palindrome without converting the integer into a string.

Your task is to implement a function that returns true if x is a palindrome integer and false otherwise.`,
    examples: [
      {
        id: 1,
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads the same backward as forward.'
      },
      {
        id: 2,
        input: 'x = -121',
        output: 'false',
        explanation: 'The number reads -121 from left to right and 121- from right to left. Therefore, it is not a palindrome.'
      },
      {
        id: 3,
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1',
      'Follow up: Could you solve it without converting the integer to a string?'
    ],
    starterCode: {
      python: `def is_palindrome(x: int) -> bool:
    # Write your code here
    pass`,
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    
};`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        
    }
}`
    }
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        id: 1,
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        id: 2,
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
      {
        id: 3,
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      python: `def two_sum(nums: List[int], target: int) -> List[int]:
    # Write your code here
    pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`
    }
  },
  {
    id: 'reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    category: 'Math',
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
    examples: [
      {
        id: 1,
        input: 'x = 123',
        output: '321',
      },
      {
        id: 2,
        input: 'x = -123',
        output: '-321',
      },
      {
        id: 3,
        input: 'x = 120',
        output: '21',
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    starterCode: {
      python: `def reverse(x: int) -> int:
    # Write your code here
    pass`,
      javascript: `/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    
};`,
      java: `class Solution {
    public int reverse(int x) {
        
    }
}`
    }
  },
  {
    id: 'sql-test',
    title: 'SQL: Select All Employees',
    difficulty: 'Easy',
    category: 'Database',
    description: `Write an SQL query to select all employees from the Employees table who work in the 'Sales' department.

Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| department  | varchar |
| salary      | int     |
+-------------+---------+`,
    examples: [
      {
        id: 1,
        input: 'Table: Employees (id, name, department, salary)',
        output: 'Result set with Sales employees',
      }
    ],
    constraints: [
      'The query must be compatible with SQLite.'
    ],
    starterCode: {
      sql: `-- Create the table and insert sample data first, then write your query
CREATE TABLE Employees (id INT, name VARCHAR(255), department VARCHAR(255), salary INT);
INSERT INTO Employees VALUES (1, 'Alice', 'Sales', 50000);
INSERT INTO Employees VALUES (2, 'Bob', 'Engineering', 60000);
INSERT INTO Employees VALUES (3, 'Charlie', 'Sales', 55000);

-- Write your query below
SELECT * FROM Employees WHERE department = 'Sales';`
    }
  }
];

export const PALINDROME_PROBLEM = PROBLEMS[0];
