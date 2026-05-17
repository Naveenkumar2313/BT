const problems = [
  {
    id: "linear-search",
    title: "1. Linear Search",
    difficulty: "Easy",
    category: "Arrays",
    description: "Write a function to find the first index of a target element `k` in an array. Return `-1` if the element is not found. Your solution should have a time complexity of O(n).",
    constraints: [
      "1 <= array.length <= 10^4",
      "-10^4 <= array[i], k <= 10^4"
    ],
    examples: [
      { input: "array = [1, 2, 3, 4, 5], k = 3", output: "2", explanation: "The target element 3 is found at index 2." },
      { input: "array = [5, 4, 3, 2, 1], k = 6", output: "-1", explanation: "The target element 6 is not in the array." }
    ],
    testCases: [
      { input: "[[1, 2, 3, 4, 5], 3]", expectedOutput: "2", hidden: false },
      { input: "[[5, 4, 3, 2, 1], 6]", expectedOutput: "-1", hidden: false },
      { input: "[[1], 1]", expectedOutput: "0", hidden: true }
    ],
    starterCode: {
      python: "def linear_search(array, k):\n    # Write your code here\n    pass",
      javascript: "function linearSearch(array, k) {\n  // Write your code here\n}",
      cpp: "int linearSearch(vector<int>& array, int k) {\n    // Write your code here\n    return -1;\n}",
      java: "class Solution {\n    public int linearSearch(int[] array, int k) {\n        // Write your code here\n        return -1;\n    }\n}"
    }
  },
  {
    id: "matrix-search-manhattan",
    title: "2. Matrix Search with Manhattan Distance",
    difficulty: "Medium",
    category: "Matrix",
    description: "Given an unsorted `m x n` matrix and a target value, find the target and return its Manhattan distance from the origin (0, 0) to its first occurrence (searching row by row, from top to bottom, left to right). If the target is not found, return `-1`. The Manhattan distance from `(0, 0)` to `(r, c)` is `r + c`.",
    constraints: [
      "1 <= m, n <= 100",
      "-10^4 <= matrix[i][j], target <= 10^4"
    ],
    examples: [
      { input: "matrix = [[3, 1, 4], [2, 5, 8], [9, 6, 7]], target = 5", output: "2", explanation: "Target 5 is at index (1, 1). Distance = 1 + 1 = 2." }
    ],
    testCases: [
      { input: "[[[3, 1, 4], [2, 5, 8], [9, 6, 7]], 5]", expectedOutput: "2", hidden: false },
      { input: "[[[1, 2], [3, 4]], 9]", expectedOutput: "-1", hidden: false },
      { input: "[[[1]], 1]", expectedOutput: "0", hidden: true }
    ],
    starterCode: {
      python: "def search_matrix(matrix, target):\n    # Write your code here\n    pass",
      javascript: "function searchMatrix(matrix, target) {\n  // Write your code here\n}",
      cpp: "int searchMatrix(vector<vector<int>>& matrix, int target) {\n    // Write your code here\n    return -1;\n}",
      java: "class Solution {\n    public int searchMatrix(int[][] matrix, int target) {\n        // Write your code here\n        return -1;\n    }\n}"
    }
  },
  {
    id: "binary-search",
    title: "3. Binary Search",
    difficulty: "Easy",
    category: "Arrays",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`. You must write an algorithm with `O(log n)` runtime complexity.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1" }
    ],
    testCases: [
      { input: "[[-1,0,3,5,9,12], 9]", expectedOutput: "4", hidden: false },
      { input: "[[-1,0,3,5,9,12], 2]", expectedOutput: "-1", hidden: false },
      { input: "[[5], 5]", expectedOutput: "0", hidden: true }
    ],
    starterCode: {
      python: "def search(nums, target):\n    # Write your code here\n    pass",
      javascript: "function search(nums, target) {\n  // Write your code here\n}",
      cpp: "int search(vector<int>& nums, int target) {\n    // Write your code here\n    return -1;\n}",
      java: "class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n        return -1;\n    }\n}"
    }
  },
  {
    id: "palindrome-check",
    title: "4. Palindrome Check",
    difficulty: "Easy",
    category: "Strings",
    description: "Write a function that takes in a non-empty string and returns a boolean representing whether the string is a palindrome. A palindrome is defined as a string that's written the same forward and backward.",
    constraints: [
      "1 <= string.length <= 10^5",
      "String consists only of printable ASCII characters."
    ],
    examples: [
      { input: "string = \"abcdcba\"", output: "true", explanation: "\"abcdcba\" reads the same forward and backward." },
      { input: "string = \"hello\"", output: "false", explanation: "\"hello\" reversed is \"olleh\"." }
    ],
    testCases: [
      { input: "[\"abcdcba\"]", expectedOutput: "true", hidden: false },
      { input: "[\"hello\"]", expectedOutput: "false", hidden: false },
      { input: "[\"a\"]", expectedOutput: "true", hidden: true }
    ],
    starterCode: {
      python: "def is_palindrome(string):\n    # Write your code here\n    pass",
      javascript: "function isPalindrome(string) {\n  // Write your code here\n}",
      cpp: "bool isPalindrome(string string) {\n    // Write your code here\n    return false;\n}",
      java: "class Solution {\n    public boolean isPalindrome(String string) {\n        // Write your code here\n        return false;\n    }\n}"
    }
  },
  {
    id: "shortest-palindrome",
    title: "5. Shortest Palindrome",
    difficulty: "Hard",
    category: "Strings",
    description: "You are given a string `s`. You can convert `s` to a palindrome by adding characters in front of it. Return the shortest palindrome you can find by performing this transformation.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of lowercase English letters only."
    ],
    examples: [
      { input: "s = \"aacecaaa\"", output: "\"aaacecaaa\"", explanation: "Adding 'a' to the front makes it a palindrome." },
      { input: "s = \"abcd\"", output: "\"dcbabcd\"", explanation: "Adding 'dcb' to the front makes it a palindrome." }
    ],
    testCases: [
      { input: "[\"aacecaaa\"]", expectedOutput: "\"aaacecaaa\"", hidden: false },
      { input: "[\"abcd\"]", expectedOutput: "\"dcbabcd\"", hidden: false },
      { input: "[\"a\"]", expectedOutput: "\"a\"", hidden: true }
    ],
    starterCode: {
      python: "def shortest_palindrome(s):\n    # Write your code here\n    pass",
      javascript: "function shortestPalindrome(s) {\n  // Write your code here\n}",
      cpp: "string shortestPalindrome(string s) {\n    // Write your code here\n    return \"\";\n}",
      java: "class Solution {\n    public String shortestPalindrome(String s) {\n        // Write your code here\n        return \"\";\n    }\n}"
    }
  },
  {
    id: "two-sum",
    title: "6. Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." }
    ],
    testCases: [
      { input: "[[2,7,11,15], 9]", expectedOutput: "[0,1]", hidden: false },
      { input: "[[3,2,4], 6]", expectedOutput: "[1,2]", hidden: false },
      { input: "[[3,3], 6]", expectedOutput: "[0,1]", hidden: true }
    ],
    starterCode: {
      python: "def two_sum(nums, target):\n    # Write your code here\n    pass",
      javascript: "function twoSum(nums, target) {\n  // Write your code here\n}",
      cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n    return {};\n}",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}"
    }
  },
  {
    id: "bubble-sort",
    title: "7. Bubble Sort",
    difficulty: "Easy",
    category: "Sorting",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array. Use the Bubble Sort algorithm to sort the array in ascending order. Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    constraints: [
      "1 <= array.length <= 1000",
      "-10^4 <= array[i] <= 10^4"
    ],
    examples: [
      { input: "array = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "Array sorted in ascending order using bubble sort." }
    ],
    testCases: [
      { input: "[[8, 5, 2, 9, 5, 6, 3]]", expectedOutput: "[2, 3, 5, 5, 6, 8, 9]", hidden: false },
      { input: "[[1, 2, 3]]", expectedOutput: "[1, 2, 3]", hidden: false },
      { input: "[[]]", expectedOutput: "[]", hidden: true }
    ],
    starterCode: {
      python: "def bubble_sort(array):\n    # Write your code here\n    pass",
      javascript: "function bubbleSort(array) {\n  // Write your code here\n}",
      cpp: "vector<int> bubbleSort(vector<int>& array) {\n    // Write your code here\n    return {};\n}",
      java: "class Solution {\n    public int[] bubbleSort(int[] array) {\n        // Write your code here\n        return new int[]{};\n    }\n}"
    }
  },
  {
    id: "selection-sort",
    title: "8. Selection Sort",
    difficulty: "Easy",
    category: "Sorting",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array. Use the Selection Sort algorithm to sort the array in ascending order. Selection sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist and moves it to the end of the sorted sublist.",
    constraints: [
      "1 <= array.length <= 1000",
      "-10^4 <= array[i] <= 10^4"
    ],
    examples: [
      { input: "array = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "Array sorted in ascending order using selection sort." }
    ],
    testCases: [
      { input: "[[8, 5, 2, 9, 5, 6, 3]]", expectedOutput: "[2, 3, 5, 5, 6, 8, 9]", hidden: false },
      { input: "[[1, 2, 3]]", expectedOutput: "[1, 2, 3]", hidden: false },
      { input: "[[]]", expectedOutput: "[]", hidden: true }
    ],
    starterCode: {
      python: "def selection_sort(array):\n    # Write your code here\n    pass",
      javascript: "function selectionSort(array) {\n  // Write your code here\n}",
      cpp: "vector<int> selectionSort(vector<int>& array) {\n    // Write your code here\n    return {};\n}",
      java: "class Solution {\n    public int[] selectionSort(int[] array) {\n        // Write your code here\n        return new int[]{};\n    }\n}"
    }
  },
  {
    id: "stack-implementation",
    title: "9. Stack Implementation",
    difficulty: "Medium",
    category: "Data Structures",
    description: "Implement a Stack class using an array or a linked list. The stack should support the following operations:\n- `push(value)`: Pushes a value onto the stack.\n- `pop()`: Removes and returns the top value from the stack. If the stack is empty, return -1.\n- `peek()`: Returns the top value without removing it. If empty, return -1.\n- `isEmpty()`: Returns true if the stack is empty, otherwise false.\n- `size()`: Returns the number of elements in the stack.",
    constraints: [
      "0 <= values pushed <= 10^4",
      "At most 10^4 calls will be made to push, pop, peek, isEmpty, and size."
    ],
    examples: [
      { input: "operations = [\"Stack\", \"push\", \"push\", \"peek\", \"pop\", \"isEmpty\", \"size\"], values = [[], [5], [10], [], [], [], []]", output: "[null, null, null, 10, 10, false, 1]", explanation: "push(5), push(10), peek() returns 10, pop() returns 10, isEmpty() returns false, size() returns 1." }
    ],
    testCases: [
      { input: "[[\"Stack\", \"push\", \"push\", \"peek\", \"pop\", \"isEmpty\", \"size\"], [[], [5], [10], [], [], [], []]]", expectedOutput: "[null, null, null, 10, 10, false, 1]", hidden: false },
      { input: "[[\"Stack\", \"pop\", \"peek\", \"isEmpty\"], [[], [], [], []]]", expectedOutput: "[null, -1, -1, true]", hidden: false }
    ],
    starterCode: {
      python: "class Stack:\n    def __init__(self):\n        pass\n    def push(self, value):\n        pass\n    def pop(self):\n        return -1\n    def peek(self):\n        return -1\n    def is_empty(self):\n        return True\n    def size(self):\n        return 0",
      javascript: "class Stack {\n  constructor() {}\n  push(value) {}\n  pop() { return -1; }\n  peek() { return -1; }\n  isEmpty() { return true; }\n  size() { return 0; }\n}",
      cpp: "class Stack {\npublic:\n    Stack() {}\n    void push(int value) {}\n    int pop() { return -1; }\n    int peek() { return -1; }\n    bool isEmpty() { return true; }\n    int size() { return 0; }\n};",
      java: "class Stack {\n    public Stack() {}\n    public void push(int value) {}\n    public int pop() { return -1; }\n    public int peek() { return -1; }\n    public boolean isEmpty() { return true; }\n    public int size() { return 0; }\n}"
    }
  },
  {
    id: "queue-implementation",
    title: "10. Queue Implementation",
    difficulty: "Medium",
    category: "Data Structures",
    description: "Implement a Queue class. The queue should support the following operations:\n- `enqueue(value)`: Adds a value to the back of the queue.\n- `dequeue()`: Removes and returns the value from the front of the queue. If empty, return -1.\n- `peek()`: Returns the value at the front without removing it. If empty, return -1.\n- `isEmpty()`: Returns true if the queue is empty, false otherwise.\n- `size()`: Returns the number of elements in the queue.",
    constraints: [
      "0 <= values enqueued <= 10^4",
      "At most 10^4 calls will be made to enqueue, dequeue, peek, isEmpty, and size."
    ],
    examples: [
      { input: "operations = [\"Queue\", \"enqueue\", \"enqueue\", \"peek\", \"dequeue\", \"isEmpty\"], values = [[], [1], [2], [], [], []]", output: "[null, null, null, 1, 1, false]", explanation: "enqueue(1), enqueue(2), peek() returns 1, dequeue() returns 1, isEmpty() returns false." }
    ],
    testCases: [
      { input: "[[\"Queue\", \"enqueue\", \"enqueue\", \"peek\", \"dequeue\", \"isEmpty\"], [[], [1], [2], [], [], []]]", expectedOutput: "[null, null, null, 1, 1, false]", hidden: false },
      { input: "[[\"Queue\", \"dequeue\", \"isEmpty\"], [[], [], []]]", expectedOutput: "[null, -1, true]", hidden: false }
    ],
    starterCode: {
      python: "class Queue:\n    def __init__(self):\n        pass\n    def enqueue(self, value):\n        pass\n    def dequeue(self):\n        return -1\n    def peek(self):\n        return -1\n    def is_empty(self):\n        return True\n    def size(self):\n        return 0",
      javascript: "class Queue {\n  constructor() {}\n  enqueue(value) {}\n  dequeue() { return -1; }\n  peek() { return -1; }\n  isEmpty() { return true; }\n  size() { return 0; }\n}",
      cpp: "class Queue {\npublic:\n    Queue() {}\n    void enqueue(int value) {}\n    int dequeue() { return -1; }\n    int peek() { return -1; }\n    bool isEmpty() { return true; }\n    int size() { return 0; }\n};",
      java: "class Queue {\n    public Queue() {}\n    public void enqueue(int value) {}\n    public int dequeue() { return -1; }\n    public int peek() { return -1; }\n    public boolean isEmpty() { return true; }\n    public int size() { return 0; }\n}"
    }
  },
  {
    id: "circular-queue",
    title: "11. Circular Queue",
    difficulty: "Medium",
    category: "Data Structures",
    description: "Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle. It is also called 'Ring Buffer'.\n\nImplement the `CircularQueue` class:\n- `CircularQueue(k)` Initializes the object with the size of the queue to be `k`.\n- `enqueue(value)` Inserts an element into the circular queue. Return true if the operation is successful.\n- `dequeue()` Deletes an element from the circular queue. Return true if the operation is successful.\n- `Front()` Gets the front item from the queue. If the queue is empty, return -1.\n- `Rear()` Gets the last item from the queue. If the queue is empty, return -1.\n- `isEmpty()` Checks whether the circular queue is empty or not.\n- `isFull()` Checks whether the circular queue is full or not.",
    constraints: [
      "1 <= k <= 1000",
      "0 <= value <= 1000",
      "At most 3000 calls will be made to enqueue, dequeue, Front, Rear, isEmpty, and isFull."
    ],
    examples: [
      { input: "operations = [\"CircularQueue\", \"enqueue\", \"enqueue\", \"enqueue\", \"enqueue\", \"Rear\", \"isFull\", \"dequeue\", \"enqueue\", \"Rear\"], values = [[3], [1], [2], [3], [4], [], [], [], [4], []]", output: "[null, true, true, true, false, 3, true, true, true, 4]", explanation: "Initialize with size 3. enqueue 1, 2, 3 (returns true). enqueue 4 fails (returns false). Rear is 3. Queue is full. Dequeue 1 (returns true). enqueue 4 (returns true). Rear is 4." }
    ],
    testCases: [
      { input: "[[\"CircularQueue\", \"enqueue\", \"enqueue\", \"enqueue\", \"enqueue\", \"Rear\", \"isFull\", \"dequeue\", \"enqueue\", \"Rear\"], [[3], [1], [2], [3], [4], [], [], [], [4], []]]", expectedOutput: "[null, true, true, true, false, 3, true, true, true, 4]", hidden: false }
    ],
    starterCode: {
      python: "class CircularQueue:\n    def __init__(self, k):\n        pass\n    def enqueue(self, value):\n        return False\n    def dequeue(self):\n        return False\n    def Front(self):\n        return -1\n    def Rear(self):\n        return -1\n    def is_empty(self):\n        return True\n    def is_full(self):\n        return False",
      javascript: "class CircularQueue {\n  constructor(k) {}\n  enqueue(value) { return false; }\n  dequeue() { return false; }\n  Front() { return -1; }\n  Rear() { return -1; }\n  isEmpty() { return true; }\n  isFull() { return false; }\n}",
      cpp: "class CircularQueue {\npublic:\n    CircularQueue(int k) {}\n    bool enqueue(int value) { return false; }\n    bool dequeue() { return false; }\n    int Front() { return -1; }\n    int Rear() { return -1; }\n    bool isEmpty() { return true; }\n    bool isFull() { return false; }\n};",
      java: "class CircularQueue {\n    public CircularQueue(int k) {}\n    public boolean enqueue(int value) { return false; }\n    public boolean dequeue() { return false; }\n    public int Front() { return -1; }\n    public int Rear() { return -1; }\n    public boolean isEmpty() { return true; }\n    public boolean isFull() { return false; }\n}"
    }
  }
];

export default problems;
