'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { Settings, CheckCircle2, X } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onOpenWelcome?: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose, onOpenWelcome }) => {
  const [companyName, setCompanyName] = useState('Acme Technologies Inc.');
  const [currency, setCurrency] = useState('USD');
  const [burnAlertThreshold, setBurnAlertThreshold] = useState('25000');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: '#FCFBF8',
          border: '1px solid #DADBD5',
          boxShadow: '0 24px 64px rgba(37, 41, 35, 0.15)',
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #DADBD5',
          pb: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              p: 0.8,
              borderRadius: '8px',
              bgcolor: '#EEECE4',
              color: '#252923',
              display: 'flex',
            }}
          >
            <Settings size={18} />
          </Box>
          <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: '1.05rem', color: '#252923' }}>
            Workspace Settings
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2.5 }}>
        {savedSuccess && (
          <Alert severity="success" sx={{ mb: 2, fontSize: '0.82rem' }}>
            Settings saved successfully!
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
          <TextField
            label="Organization Name"
            size="small"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FAF9F5',
              },
            }}
          />

          <TextField
            select
            label="Reporting Currency"
            size="small"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FAF9F5',
              },
            }}
          >
            <MenuItem value="USD">USD — US Dollar ($)</MenuItem>
            <MenuItem value="EUR">EUR — Euro (€)</MenuItem>
            <MenuItem value="GBP">GBP — British Pound (£)</MenuItem>
            <MenuItem value="CAD">CAD — Canadian Dollar (C$)</MenuItem>
          </TextField>

          <TextField
            label="Monthly Expense Alert Threshold ($)"
            size="small"
            value={burnAlertThreshold}
            onChange={(e) => setBurnAlertThreshold(e.target.value)}
            fullWidth
            helperText="Receive an automated alert when monthly expenses exceed this target"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FAF9F5',
              },
            }}
          />

          <Box sx={{ p: 1.5, bgcolor: '#EEECE4', borderRadius: '10px' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  color="success"
                  size="small"
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontSize: '0.84rem', fontWeight: 600, color: '#252923' }}>
                    Automated AI Digest Notifications
                  </Typography>
                  <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
                    Receive weekly cash flow summaries and vendor anomaly alerts via email
                  </Typography>
                </Box>
              }
            />
          </Box>

          {onOpenWelcome && (
            <Box
              sx={{
                p: 2,
                bgcolor: 'rgba(221, 240, 206, 0.4)',
                borderRadius: '10px',
                border: '1px solid #CBD8BA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#252923' }}>
                  Product Guide &amp; Introduction
                </Typography>
                <Typography sx={{ fontSize: '0.74rem', color: '#5A6255', mt: 0.2 }}>
                  Revisit the first-time welcome introduction and core features
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  onClose();
                  onOpenWelcome();
                }}
                sx={{
                  borderColor: '#3E502C',
                  color: '#252923',
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 700,
                  fontSize: '0.76rem',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  bgcolor: '#FCFBF8',
                  '&:hover': {
                    bgcolor: '#EEECE4',
                    borderColor: '#2F3C22',
                  },
                }}
              >
                Launch Guide
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: '#DADBD5',
            color: '#252923',
            textTransform: 'none',
            fontSize: '0.84rem',
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: '#252923',
            color: '#F8F7F2',
            textTransform: 'none',
            fontSize: '0.84rem',
            fontWeight: 600,
            '&:hover': { bgcolor: '#3E502C' },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;

