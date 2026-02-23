import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Block,
  CheckCircle,
  Search,
} from '@mui/icons-material';

export function EmailGatingManager() {
  const [searchQuery, setSearchQuery] = useState('');

  const usedEmails = [
    {
      email: 'producer1@example.com',
      date: '2026-01-21 14:32',
      reportGenerated: true,
      blocked: false,
    },
    {
      email: 'filmmaker@studio.com',
      date: '2026-01-21 13:15',
      reportGenerated: true,
      blocked: false,
    },
    {
      email: 'test@test.com',
      date: '2026-01-21 12:47',
      reportGenerated: false,
      blocked: true,
    },
    {
      email: 'director@production.com',
      date: '2026-01-21 11:23',
      reportGenerated: true,
      blocked: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Email Gating Management
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Abuse Prevention
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Monitor and manage free report usage per email address
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by email address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email Address</TableCell>
                <TableCell>Date Used</TableCell>
                <TableCell>Report Generated</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usedEmails.map((email, index) => (
                <TableRow key={index}>
                  <TableCell>{email.email}</TableCell>
                  <TableCell>{email.date}</TableCell>
                  <TableCell>
                    {email.reportGenerated ? (
                      <Chip label="Yes" size="small" color="success" icon={<CheckCircle />} />
                    ) : (
                      <Chip label="No" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={email.blocked ? 'Blocked' : 'Active'}
                      size="small"
                      color={email.blocked ? 'error' : 'success'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color={email.blocked ? 'success' : 'error'}>
                      <Block />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
