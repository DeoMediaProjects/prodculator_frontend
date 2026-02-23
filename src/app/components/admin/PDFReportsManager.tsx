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
  IconButton,
} from '@mui/material';
import {
  Download,
  Visibility,
  Send,
} from '@mui/icons-material';

export function PDFReportsManager() {
  const reports = [
    {
      id: 'RPT-1234',
      title: 'Untitled Thriller',
      email: 'producer1@example.com',
      generated: '2026-01-21 14:32',
      downloaded: true,
      size: '2.4 MB',
    },
    {
      id: 'RPT-1233',
      title: 'Summer Romance',
      email: 'filmmaker@studio.com',
      generated: '2026-01-21 13:15',
      downloaded: false,
      size: '2.1 MB',
    },
    {
      id: 'RPT-1232',
      title: 'Dark Waters',
      email: 'director@production.com',
      generated: '2026-01-21 11:47',
      downloaded: true,
      size: '2.6 MB',
    },
    {
      id: 'RPT-1231',
      title: 'Comedy Script',
      email: 'writer@creative.com',
      generated: '2026-01-21 09:23',
      downloaded: true,
      size: '2.3 MB',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        PDF Reports Manager
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View, download, and re-issue generated PDF reports
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report ID</TableCell>
                <TableCell>Script Title</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Generated</TableCell>
                <TableCell>Downloaded</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.email}</TableCell>
                  <TableCell>{report.generated}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.downloaded ? 'Yes' : 'No'}
                      size="small"
                      color={report.downloaded ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <IconButton size="small" title="View">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" title="Download">
                      <Download />
                    </IconButton>
                    <IconButton size="small" title="Re-issue">
                      <Send />
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
