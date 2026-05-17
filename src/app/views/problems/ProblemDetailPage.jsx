import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Divider, Paper, Alert, Select, MenuItem, Button, FormControl, CircularProgress } from '@mui/material';
import Editor from '@monaco-editor/react';
import problems from '../../data/problems';
import { runCode } from '../../utils/judge0';

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'Hard':
      return 'error';
    default:
      return 'default';
  }
};

const LANGUAGES = [
  { label: 'Python (71)', value: 'python', id: 71 },
  { label: 'JavaScript (63)', value: 'javascript', id: 63 },
  { label: 'C++ (54)', value: 'cpp', id: 54 },
  { label: 'Java (62)', value: 'java', id: 62 },
];

const ProblemDetailPage = () => {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);
  const [output, setOutput] = useState(null);
  const [submitResults, setSubmitResults] = useState(null);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '');
    }
  }, [problem, language]);

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    if (problem) {
      setCode(problem.starterCode[newLang] || '');
    }
  };

  const handleRunCode = async () => {
    if (!problem) return;
    
    setIsSubmitting(true);
    setOutput(null);
    setSubmitResults(null);

    const langObj = LANGUAGES.find((l) => l.value === language);
    const languageId = langObj ? langObj.id : 71;

    const firstVisibleTest = problem.testCases.find((tc) => !tc.hidden);
    const stdin = firstVisibleTest ? firstVisibleTest.input : '';

    const result = await runCode(code, languageId, stdin);
    setOutput(result);
    setIsSubmitting(false);
  };

  const handleTestApi = async () => {
    setIsSubmitting(true);
    setOutput(null);
    setSubmitResults(null);
    const result = await runCode("print('Hello from RapidAPI!')", 71, "");
    setOutput(result);
    setIsSubmitting(false);
  };

  const handleSubmitCode = async () => {
    if (!problem) return;
    
    setIsSubmittingCode(true);
    setSubmitResults(null);
    setOutput(null);

    const langObj = LANGUAGES.find((l) => l.value === language);
    const languageId = langObj ? langObj.id : 71;

    const testCases = problem.testCases;
    const results = [];
    let passedCount = 0;

    for (const tc of testCases) {
      const result = await runCode(code, languageId, tc.input);
      
      let actualOutput = "";
      if (result.stdout) {
        actualOutput = result.stdout;
      } else if (result.compile_output) {
        actualOutput = result.compile_output;
      } else if (result.stderr) {
        actualOutput = result.stderr;
      } else if (result.error) {
        actualOutput = result.error;
      }

      const passed = (result.stdout || "").trim() === tc.expectedOutput.trim();
      if (passed) passedCount++;

      results.push({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: actualOutput.trim(),
        passed
      });
    }

    setSubmitResults({
      results,
      passedCount,
      totalCount: testCases.length,
      verdict: passedCount === testCases.length ? 'Accepted' : 'Wrong Answer'
    });
    
    setIsSubmittingCode(false);
  };

  if (!problem) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Problem not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 64px)' }}>
      {/* Left Panel - Problem Description */}
      <Box
        sx={{
          width: '45%',
          overflow: 'auto',
          p: '2rem',
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Typography variant="h4" component="h1">
            {problem.title}
          </Typography>
          <Chip
            label={problem.difficulty}
            color={getDifficultyColor(problem.difficulty)}
            size="small"
          />
        </Box>

        <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
          {problem.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Examples
        </Typography>
        {problem.examples.map((example, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="subtitle2" gutterBottom>Example {index + 1}:</Typography>
            <Box sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <div><strong>Input:</strong> {example.input}</div>
              <div><strong>Output:</strong> {example.output}</div>
              {example.explanation && (
                <div><strong>Explanation:</strong> {example.explanation}</div>
              )}
            </Box>
          </Paper>
        ))}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Constraints
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 4 }}>
          {problem.constraints.map((constraint, index) => (
            <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5, fontFamily: 'monospace' }}>
              {constraint}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Right Panel - Editor & Console */}
      <Box sx={{ width: '55%', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar with language selector and run button */}
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Language' }}
            >
              {LANGUAGES.map((lang) => (
                <MenuItem key={lang.value} value={lang.value}>
                  {lang.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={handleTestApi}
              disabled={isSubmitting || isSubmittingCode}
            >
              Test API
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleRunCode}
              disabled={isSubmitting || isSubmittingCode}
              startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {isSubmitting ? 'Running...' : 'Run Code'}
            </Button>
            <Button 
              variant="outlined" 
              color="success"
              onClick={handleSubmitCode}
              disabled={isSubmitting || isSubmittingCode}
              startIcon={isSubmittingCode ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {isSubmittingCode ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Box>

        {/* Monaco Editor */}
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
          />
        </Box>

        {/* Console Area */}
        <Box
          sx={{
            height: '200px',
            bgcolor: '#1e1e1e',
            color: '#fff',
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            overflow: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', color: '#888' }}>
              Console
            </Typography>
            {output && output.time != null && output.memory != null && (
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#888' }}>
                Time: {output.time}s | Memory: {output.memory}KB
              </Typography>
            )}
          </Box>
          {submitResults ? (
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: submitResults.verdict === 'Accepted' ? '#4caf50' : '#f44336',
                  mb: 1
                }}
              >
                {submitResults.verdict} ({submitResults.passedCount} / {submitResults.totalCount} test cases passed)
              </Typography>
              <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {submitResults.results.map((res, idx) => (
                  <Box key={idx} sx={{ p: 1, border: '1px solid', borderColor: res.passed ? '#4caf50' : '#f44336', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ color: res.passed ? '#4caf50' : '#f44336', fontWeight: 'bold', mb: 1 }}>
                      {res.passed ? '✅ Passed' : '❌ Failed'} - Test Case {idx + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                      <strong>Input:</strong> {res.input}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                      <strong>Expected:</strong> {res.expectedOutput}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', color: res.passed ? 'inherit' : '#f44336' }}>
                      <strong>Actual:</strong> {res.actualOutput || 'No Output'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : output ? (
            <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {output.error && (
                <Typography variant="body2" color="error">
                  {output.error}
                </Typography>
              )}
              {output.compile_output && (
                <Typography variant="body2" color="error">
                  {output.compile_output}
                </Typography>
              )}
              {output.stderr && (
                <Typography variant="body2" color="error">
                  {output.stderr}
                </Typography>
              )}
              {output.stdout && (
                <Typography variant="body2" sx={{ color: '#4caf50' }}>
                  {output.stdout}
                </Typography>
              )}
              {!output.error && !output.compile_output && !output.stderr && !output.stdout && (
                <Typography variant="body2" sx={{ color: '#ccc' }}>
                  Execution finished with no output.
                </Typography>
              )}
              {output.status && output.status.description && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#aaa' }}>
                  Status: {output.status.description}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              Output will appear here
            </Typography>
          )}
        </Box>
        <Box sx={{ bgcolor: '#1e1e1e', px: 2, pb: 1, textAlign: 'right' }}>
          <Typography variant="caption" sx={{ color: '#888' }}>
            Powered by Judge0 CE via RapidAPI
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProblemDetailPage;
