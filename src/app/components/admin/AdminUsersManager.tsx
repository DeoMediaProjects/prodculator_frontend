import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Shield,
  CheckCircle,
  Cancel,
  Person,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth, AdminRole, ROLE_PERMISSIONS, type AdminUser } from '@/app/contexts/AuthContext';

const ROLE_LABELS: Record<AdminRole, string> = {
  master_admin: 'Master Admin',
  senior_admin: 'Senior Admin',
  data_admin: 'Data Admin',
  support_admin: 'Support Admin',
};

const ROLE_COLORS: Record<AdminRole, string> = {
  master_admin: '#D4AF37',
  senior_admin: '#42a5f5',
  data_admin: '#66bb6a',
  support_admin: '#ab47bc',
};

export function AdminUsersManager() {
  const { hasAdminPermission, adminUser } = useAuth();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<AdminRole>('support_admin');

  // Check if user has permission
  if (!hasAdminPermission('canManageAdmins')) {
    return (
      <Box>
        <Alert severity="error" sx={{ bgcolor: 'rgba(244, 67, 54, 0.1)', color: '#f44336' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Access Denied
          </Typography>
          <Typography>
            You don't have permission to manage admin users. Only Master Admins can access this page.
          </Typography>
        </Alert>
      </Box>
    );
  }

  const handleAddAdmin = () => {
    const newAdmin: AdminUser = {
      id: (adminUsers.length + 1).toString(),
      name: formName,
      email: formEmail,
      role: formRole,
      permissions: ROLE_PERMISSIONS[formRole],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAdminUsers([...adminUsers, newAdmin]);
    setAddDialogOpen(false);
    resetForm();
  };

  const handleEditAdmin = () => {
    if (!selectedAdmin) return;

    setAdminUsers(
      adminUsers.map((admin) =>
        admin.id === selectedAdmin.id
          ? {
              ...admin,
              name: formName,
              email: formEmail,
              role: formRole,
              permissions: ROLE_PERMISSIONS[formRole],
            }
          : admin
      )
    );

    setEditDialogOpen(false);
    setSelectedAdmin(null);
    resetForm();
  };

  const handleDeleteAdmin = () => {
    if (!selectedAdmin) return;
    setAdminUsers(adminUsers.filter((admin) => admin.id !== selectedAdmin.id));
    setDeleteDialogOpen(false);
    setSelectedAdmin(null);
  };

  const openEditDialog = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setFormName(admin.name);
    setFormEmail(admin.email);
    setFormRole(admin.role);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormRole('support_admin');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 1 }}>
            Admin User Management
          </Typography>
          <Typography variant="body1" sx={{ color: '#a0a0a0' }}>
            Manage admin accounts and assign role-based permissions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddDialogOpen(true)}
          sx={{
            bgcolor: '#D4AF37',
            color: '#000000',
            fontWeight: 600,
            '&:hover': { bgcolor: '#E5C158' },
          }}
        >
          Add Admin
        </Button>
      </Box>

      {/* Current Admin Info */}
      <Alert
        icon={<AdminPanelSettings />}
        sx={{
          mb: 3,
          bgcolor: 'rgba(212, 175, 55, 0.1)',
          color: '#D4AF37',
          border: '1px solid rgba(212, 175, 55, 0.3)',
        }}
      >
        <Typography variant="body2">
          <strong>Logged in as:</strong> {adminUser?.name} ({adminUser?.email}) —{' '}
          <strong>{ROLE_LABELS[adminUser?.role || 'support_admin']}</strong>
        </Typography>
      </Alert>

      {/* Admin Users Table */}
      <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)', mb: 4 }}>
        <CardContent>
          <TableContainer component={Paper} sx={{ bgcolor: 'transparent' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Created</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Last Login</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminUsers.map((admin) => (
                  <TableRow
                    key={admin.id}
                    sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}
                  >
                    <TableCell sx={{ color: '#ffffff', fontWeight: 500 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ color: '#D4AF37', fontSize: 20 }} />
                        {admin.name}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#a0a0a0' }}>{admin.email}</TableCell>
                    <TableCell>
                      <Chip
                        icon={<Shield sx={{ fontSize: 16 }} />}
                        label={ROLE_LABELS[admin.role]}
                        size="small"
                        sx={{
                          bgcolor: `${ROLE_COLORS[admin.role]}20`,
                          color: ROLE_COLORS[admin.role],
                          fontWeight: 600,
                          border: `1px solid ${ROLE_COLORS[admin.role]}40`,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                      {admin.createdAt}
                    </TableCell>
                    <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                      {admin.lastLogin
                        ? new Date(admin.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit Admin">
                          <IconButton
                            size="small"
                            onClick={() => openEditDialog(admin)}
                            sx={{ color: '#D4AF37' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Admin">
                          <IconButton
                            size="small"
                            onClick={() => openDeleteDialog(admin)}
                            sx={{ color: '#f44336' }}
                            disabled={admin.id === adminUser?.id}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Role Permissions Reference */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#D4AF37', mb: 3 }}>
        Role Permissions Reference
      </Typography>

      <Grid container spacing={3}>
        {(Object.keys(ROLE_PERMISSIONS) as AdminRole[]).map((role) => (
          <Grid size={{ xs: 12, md: 6 }} key={role}>
            <Card
              sx={{
                bgcolor: '#0a0a0a',
                border: `2px solid ${ROLE_COLORS[role]}40`,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Shield sx={{ color: ROLE_COLORS[role], fontSize: 32 }} />
                  <Typography variant="h6" sx={{ color: ROLE_COLORS[role], fontWeight: 600 }}>
                    {ROLE_LABELS[role]}
                  </Typography>
                </Box>

                <List dense>
                  {Object.entries(ROLE_PERMISSIONS[role]).map(([permission, enabled]) => (
                    <ListItem key={permission} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {enabled ? (
                              <CheckCircle sx={{ color: '#66bb6a', fontSize: 18 }} />
                            ) : (
                              <Cancel sx={{ color: '#666', fontSize: 18 }} />
                            )}
                            <Typography
                              variant="body2"
                              sx={{
                                color: enabled ? '#ffffff' : '#666',
                                fontSize: '0.875rem',
                              }}
                            >
                              {permission
                                .replace(/^can/, '')
                                .replace(/([A-Z])/g, ' $1')
                                .trim()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Admin Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
          resetForm();
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#D4AF37', fontWeight: 600 }}>Add New Admin</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              label="Full Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Admin Role</InputLabel>
              <Select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value as AdminRole)}
                label="Admin Role"
              >
                {(Object.keys(ROLE_LABELS) as AdminRole[]).map((role) => (
                  <MenuItem key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {formRole && (
              <Alert
                severity="info"
                sx={{
                  bgcolor: `${ROLE_COLORS[formRole]}20`,
                  color: ROLE_COLORS[formRole],
                  border: `1px solid ${ROLE_COLORS[formRole]}40`,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  {ROLE_LABELS[formRole]} Permissions:
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', lineHeight: 1.6 }}>
                  {Object.entries(ROLE_PERMISSIONS[formRole])
                    .filter(([, enabled]) => enabled)
                    .map(([permission]) =>
                      permission
                        .replace(/^can/, '')
                        .replace(/([A-Z])/g, ' $1')
                        .trim()
                    )
                    .join(', ')}
                </Typography>
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              resetForm();
            }}
            sx={{ color: '#a0a0a0' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddAdmin}
            disabled={!formName || !formEmail}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              '&:hover': { bgcolor: '#E5C158' },
            }}
          >
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedAdmin(null);
          resetForm();
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#D4AF37', fontWeight: 600 }}>Edit Admin</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              label="Full Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Admin Role</InputLabel>
              <Select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value as AdminRole)}
                label="Admin Role"
              >
                {(Object.keys(ROLE_LABELS) as AdminRole[]).map((role) => (
                  <MenuItem key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => {
              setEditDialogOpen(false);
              setSelectedAdmin(null);
              resetForm();
            }}
            sx={{ color: '#a0a0a0' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEditAdmin}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              '&:hover': { bgcolor: '#E5C158' },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedAdmin(null);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '2px solid rgba(244, 67, 54, 0.4)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#f44336', fontWeight: 600 }}>Delete Admin?</DialogTitle>
        <DialogContent>
          <Alert
            severity="error"
            sx={{
              mb: 2,
              bgcolor: 'rgba(244, 67, 54, 0.1)',
              color: '#f44336',
            }}
          >
            <strong>Warning:</strong> This action cannot be undone!
          </Alert>
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            Are you sure you want to delete <strong>{selectedAdmin?.name}</strong> (
            {selectedAdmin?.email})?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setSelectedAdmin(null);
            }}
            sx={{ color: '#a0a0a0' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteAdmin}
            sx={{
              bgcolor: '#f44336',
              color: '#ffffff',
              '&:hover': { bgcolor: '#d32f2f' },
            }}
          >
            Delete Admin
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}