/**
 * Test Harness Generator for Judge0
 *
 * Wraps user code with a test harness so Judge0 can:
 * 1. Import/define the user's function
 * 2. Parse the test case input
 * 3. Call the correct function with correct arguments
 * 4. Print the output in a standard comparable format
 */

// Map problem IDs to their function names per language
const FUNCTION_NAME_MAP = {
  "linear-search": { python: "linear_search", javascript: "linearSearch" },
  "matrix-search-manhattan": { python: "search_matrix", javascript: "searchMatrix" },
  "binary-search": { python: "search", javascript: "search" },
  "palindrome-check": { python: "is_palindrome", javascript: "isPalindrome" },
  "shortest-palindrome": { python: "shortest_palindrome", javascript: "shortestPalindrome" },
  "two-sum": { python: "two_sum", javascript: "twoSum" },
  "bubble-sort": { python: "bubble_sort", javascript: "bubbleSort" },
  "selection-sort": { python: "selection_sort", javascript: "selectionSort" },
};

// Problems that are too complex for a simple harness — return code as-is
const SKIP_HARNESS_IDS = [
  "stack-implementation",
  "queue-implementation",
  "circular-queue",
];

/**
 * Generates test-harnessed code that Judge0 can execute.
 *
 * @param {object} problem        - Full problem object (uses problem.id)
 * @param {string} userCode       - The code the user wrote in the editor
 * @param {string} language       - "python" | "javascript" | "cpp" | "java"
 * @param {string} testCaseInput  - Raw input string from the test case
 * @returns {string} The wrapped source code ready for Judge0 submission
 */
export function generateTestCode(problem, userCode, language, testCaseInput) {
  const problemId = problem?.id;

  // Skip harness for complex / unrecognized problems
  if (SKIP_HARNESS_IDS.includes(problemId)) {
    return userCode;
  }

  // Only Python and JavaScript are supported for now
  if (language !== "python" && language !== "javascript") {
    return userCode;
  }

  const fnEntry = FUNCTION_NAME_MAP[problemId];
  if (!fnEntry) {
    // Unrecognized problem — return as-is
    return userCode;
  }

  const functionName = fnEntry[language];
  if (!functionName) {
    return userCode;
  }

  // Escape the test-case input for safe embedding in strings
  const escapedInput = testCaseInput.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');

  if (language === "python") {
    return generatePythonHarness(userCode, functionName, escapedInput);
  }

  if (language === "javascript") {
    return generateJavaScriptHarness(userCode, functionName, escapedInput);
  }

  return userCode;
}

/**
 * Generates a Python test harness.
 */
function generatePythonHarness(userCode, functionName, escapedInput) {
  return `${userCode}

import sys, json, ast

def run_test():
    args = ast.literal_eval("${escapedInput}")
    result = ${functionName}(*args)
    print(json.dumps(result) if isinstance(result, (list, dict)) else str(result).lower() if isinstance(result, bool) else str(result))

run_test()
`;
}

/**
 * Generates a JavaScript test harness.
 */
function generateJavaScriptHarness(userCode, functionName, escapedInput) {
  return `${userCode}

const args = JSON.parse('${escapedInput}');
const result = ${functionName}(...args);
if (Array.isArray(result)) {
  console.log(JSON.stringify(result));
} else if (typeof result === 'boolean') {
  console.log(result.toString());
} else {
  console.log(result);
}
`;
}
