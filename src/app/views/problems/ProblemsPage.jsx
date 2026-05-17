import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import problems from '../../data/problems';

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

const ProblemsPage = () => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/problems/${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Problems
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="problems table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem, index) => (
              <TableRow
                key={problem.id}
                hover
                onClick={() => handleRowClick(problem.id)}
                sx={{ 
                  cursor: 'pointer', 
                  '&:last-child td, &:last-child th': { border: 0 } 
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.category}</TableCell>
                <TableCell>
                  <Chip
                    label={problem.difficulty}
                    color={getDifficultyColor(problem.difficulty)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProblemsPage;
