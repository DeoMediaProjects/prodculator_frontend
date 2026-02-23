import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  CheckCircle,
  Circle,
  RadioButtonUnchecked,
  CalendarToday,
  Email,
  Download,
  Add,
  MoreVert,
  Delete,
  Edit,
  Notifications,
  Event,
} from '@mui/icons-material';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dueDate?: string;
  tasks: Task[];
  isCustom?: boolean;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
  territory?: string;
  deadline?: string;
}

interface ProductionTimelineProps {
  scriptTitle: string;
  userPlan: 'free' | 'professional' | 'studio';
}

export function ProductionTimeline({ scriptTitle, userPlan }: ProductionTimelineProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Script Analysis Complete',
      description: 'Your comprehensive production intelligence report is ready',
      status: 'completed',
      tasks: [
        { id: '1-1', text: 'Upload script', completed: true },
        { id: '1-2', text: 'Review territory recommendations', completed: true },
        { id: '1-3', text: 'Download PDF report', completed: true },
      ],
    },
    {
      id: '2',
      title: 'Contact Film Commissions',
      description: 'Reach out to film commissions in your top territories',
      status: 'in-progress',
      dueDate: 'This Week',
      tasks: [
        { id: '2-1', text: 'British Columbia Film Commission', completed: false, territory: 'BC, Canada', deadline: 'Feb 1, 2026' },
        { id: '2-2', text: 'UK BFI (British Film Institute)', completed: false, territory: 'UK', deadline: 'Feb 5, 2026' },
        { id: '2-3', text: 'Georgia Film Office', completed: true, territory: 'Georgia, USA' },
      ],
    },
    {
      id: '3',
      title: 'Tax Advisor Consultation',
      description: 'Book consultation with entertainment tax specialists',
      status: 'upcoming',
      dueDate: 'Next 2 Weeks',
      tasks: [
        { id: '3-1', text: 'Research qualified tax advisors', completed: false },
        { id: '3-2', text: 'Schedule initial consultation', completed: false },
        { id: '3-3', text: 'Prepare budget breakdown', completed: false },
      ],
    },
    {
      id: '4',
      title: 'Submit Incentive Applications',
      description: 'Apply for tax credits and rebates',
      status: 'upcoming',
      dueDate: '6 Weeks',
      tasks: [
        { id: '4-1', text: 'Georgia Application', completed: false, deadline: 'March 15, 2026' },
        { id: '4-2', text: 'BC Application', completed: false, deadline: 'March 20, 2026' },
        { id: '4-3', text: 'Prepare supporting documents', completed: false },
      ],
    },
    {
      id: '5',
      title: 'Location Scouting',
      description: 'Visit and assess filming locations',
      status: 'upcoming',
      dueDate: '8 Weeks',
      tasks: [
        { id: '5-1', text: 'Hire location scout', completed: false },
        { id: '5-2', text: 'Schedule territory visits', completed: false },
        { id: '5-3', text: 'Create location package', completed: false },
      ],
    },
  ]);

  const [emailRemindersEnabled, setEmailRemindersEnabled] = useState(false);
  const [addMilestoneOpen, setAddMilestoneOpen] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);

  const canAddCustomMilestones = userPlan !== 'free';

  const handleTaskToggle = (milestoneId: string, taskId: string) => {
    setMilestones(milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        const updatedTasks = milestone.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const allCompleted = updatedTasks.every(t => t.completed);
        return {
          ...milestone,
          tasks: updatedTasks,
          status: allCompleted ? 'completed' as const : milestone.status,
        };
      }
      return milestone;
    }));
  };

  const handleAddMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestoneTitle,
      description: 'Custom milestone',
      status: 'upcoming',
      tasks: [],
      isCustom: true,
    };
    setMilestones([...milestones, newMilestone]);
    setAddMilestoneOpen(false);
    setNewMilestoneTitle('');
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
    setMenuAnchor(null);
  };

  const exportToCalendar = () => {
    // In real implementation, this would generate .ics file
    alert('Calendar export feature coming soon!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#D4AF37';
      case 'upcoming': return '#666666';
      default: return '#666666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'in-progress': return <Circle sx={{ color: '#D4AF37' }} />;
      case 'upcoming': return <RadioButtonUnchecked sx={{ color: '#666666' }} />;
      default: return <RadioButtonUnchecked sx={{ color: '#666666' }} />;
    }
  };

  const activeStep = milestones.findIndex(m => m.status === 'in-progress');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600, mb: 0.5 }}>
            Production Timeline
          </Typography>
          <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
            "{scriptTitle}" • Track your progress from analysis to production
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Event />}
            onClick={exportToCalendar}
            sx={{
              borderColor: '#D4AF37',
              color: '#D4AF37',
              '&:hover': {
                borderColor: '#E5C158',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
              },
            }}
          >
            Export to Calendar
          </Button>
          {canAddCustomMilestones && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={() => setAddMilestoneOpen(true)}
              sx={{
                bgcolor: '#D4AF37',
                color: '#000000',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#E5C158',
                },
              }}
            >
              Add Milestone
            </Button>
          )}
        </Box>
      </Box>

      {/* Email Reminders Toggle */}
      <Alert 
        severity="info"
        icon={<Email />}
        sx={{ 
          mb: 3,
          bgcolor: 'rgba(33, 150, 243, 0.1)',
          '& .MuiAlert-icon': { color: '#2196F3' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={emailRemindersEnabled}
                onChange={(e) => setEmailRemindersEnabled(e.target.checked)}
                sx={{
                  color: '#2196F3',
                  '&.Mui-checked': { color: '#D4AF37' },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#2196F3' }}>
                Email me weekly reminders about upcoming milestones
              </Typography>
            }
          />
          {!canAddCustomMilestones && (
            <Button 
              size="small" 
              sx={{ 
                color: '#D4AF37',
                fontWeight: 600,
              }}
              onClick={() => window.location.href = '/pricing'}
            >
              Upgrade for Custom Milestones
            </Button>
          )}
        </Box>
      </Alert>

      {/* Timeline Stepper */}
      <Paper
        sx={{
          p: 3,
          bgcolor: '#0a0a0a',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {milestones.map((milestone) => (
            <Step key={milestone.id} completed={milestone.status === 'completed'}>
              <StepLabel
                StepIconComponent={() => getStatusIcon(milestone.status)}
                sx={{
                  '& .MuiStepLabel-label': {
                    color: milestone.status === 'completed' ? '#4caf50' : '#ffffff',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    {milestone.title}
                  </Typography>
                  {milestone.dueDate && (
                    <Chip
                      label={milestone.dueDate}
                      size="small"
                      icon={<CalendarToday />}
                      sx={{
                        bgcolor: milestone.status === 'in-progress' 
                          ? 'rgba(212, 175, 55, 0.2)' 
                          : 'rgba(102, 102, 102, 0.2)',
                        color: milestone.status === 'in-progress' ? '#D4AF37' : '#a0a0a0',
                      }}
                    />
                  )}
                  {milestone.isCustom && (
                    <Box>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          setMenuAnchor(e.currentTarget);
                          setSelectedMilestoneId(milestone.id);
                        }}
                        sx={{ color: '#a0a0a0' }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                <Typography variant="body2" sx={{ color: '#a0a0a0', mt: 0.5 }}>
                  {milestone.description}
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ ml: 2, mt: 2 }}>
                  <List sx={{ p: 0 }}>
                    {milestone.tasks.map((task, index) => (
                      <Box key={task.id}>
                        <ListItem
                          sx={{ 
                            px: 0, 
                            py: 1,
                            opacity: task.completed ? 0.6 : 1,
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Checkbox
                              checked={task.completed}
                              onChange={() => handleTaskToggle(milestone.id, task.id)}
                              sx={{
                                color: '#666666',
                                '&.Mui-checked': {
                                  color: '#4caf50',
                                },
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: task.completed ? '#a0a0a0' : '#ffffff',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                  }}
                                >
                                  {task.text}
                                </Typography>
                                {task.territory && (
                                  <Chip
                                    label={task.territory}
                                    size="small"
                                    sx={{
                                      bgcolor: 'rgba(212, 175, 55, 0.15)',
                                      color: '#D4AF37',
                                      fontSize: '0.7rem',
                                      height: '20px',
                                    }}
                                  />
                                )}
                              </Box>
                            }
                            secondary={
                              task.deadline && (
                                <Typography variant="caption" sx={{ color: '#ff9800' }}>
                                  Deadline: {task.deadline}
                                </Typography>
                              )
                            }
                          />
                        </ListItem>
                        {index < milestone.tasks.length - 1 && (
                          <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }} />
                        )}
                      </Box>
                    ))}
                  </List>

                  {milestone.status === 'completed' && (
                    <Alert 
                      severity="success"
                      icon={<CheckCircle />}
                      sx={{ 
                        mt: 2,
                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                        '& .MuiAlert-icon': { color: '#4caf50' },
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#4caf50' }}>
                        Milestone completed! Great progress.
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Add Custom Milestone Dialog */}
      <Dialog
        open={addMilestoneOpen}
        onClose={() => setAddMilestoneOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            minWidth: '400px',
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
          Add Custom Milestone
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Milestone Title"
            value={newMilestoneTitle}
            onChange={(e) => setNewMilestoneTitle(e.target.value)}
            placeholder="e.g., Finalize Budget, Hire Key Crew"
            sx={{
              '& .MuiInputLabel-root': { color: '#a0a0a0' },
              '& .MuiOutlinedInput-root': {
                color: '#ffffff',
                '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                '&:hover fieldset': { borderColor: '#D4AF37' },
                '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <Button
            onClick={() => setAddMilestoneOpen(false)}
            sx={{ color: '#a0a0a0' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddMilestone}
            disabled={!newMilestoneTitle.trim()}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#E5C158',
              },
              '&:disabled': {
                bgcolor: 'rgba(212, 175, 55, 0.3)',
                color: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Add Milestone
          </Button>
        </DialogActions>
      </Dialog>

      {/* Milestone Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            // Edit functionality
          }}
          sx={{ color: '#ffffff' }}
        >
          <Edit sx={{ mr: 1, fontSize: '1rem' }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => selectedMilestoneId && handleDeleteMilestone(selectedMilestoneId)}
          sx={{ color: '#ff6b6b' }}
        >
          <Delete sx={{ mr: 1, fontSize: '1rem' }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
