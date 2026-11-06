'use client';

import React, { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
  Avatar,
  Grid,
  RadioGroup,
  Radio,
  Tooltip,
} from '@mui/material';
import {
  Settings,
  CheckCircle2,
  X,
  User,
  Sliders,
  Bell,
  Palette,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Building2,
  Mail,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import {
  CurrencyCode,
  DateFormatOption,
  NumberFormatOption,
  InterfaceDensity,
} from '@/types';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onOpenWelcome?: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  onOpenWelcome,
}) => {
  const { profile, preferences, updateProfile, updatePreferences, resetDefaults } = useUser();

  const [activeTab, setActiveTab] = useState(0);

  // Profile local form state
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [companyName, setCompanyName] = useState(profile.companyName);
  const [initials, setInitials] = useState(profile.initials);

  // Preferences local form state
  const [currency, setCurrency] = useState<CurrencyCode>(preferences.currency);
  const [dateFormat, setDateFormat] = useState<DateFormatOption>(preferences.dateFormat);
  const [numberFormat, setNumberFormat] = useState<NumberFormatOption>(preferences.numberFormat);
  const [density, setDensity] = useState<InterfaceDensity>(preferences.density);

  // Notification local form state
  const [emailAlerts, setEmailAlerts] = useState(preferences.emailAlerts);
  const [weeklyDigest, setWeeklyDigest] = useState(preferences.weeklyDigest);
  const [burnAlertThreshold, setBurnAlertThreshold] = useState(preferences.burnAlertThreshold);

  // Appearance local form state
  const [aiGlow, setAiGlow] = useState(preferences.aiGlow);

  // Feedback states
  const [validationError, setValidationError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Re-sync local form state whenever dialog opens or profile changes
  useEffect(() => {
    if (open) {
      setFullName(profile.fullName);
      setEmail(profile.email);
      setCompanyName(profile.companyName);
      setInitials(profile.initials);

      setCurrency(preferences.currency);
      setDateFormat(preferences.dateFormat);
      setNumberFormat(preferences.numberFormat);
      setDensity(preferences.density);

      setEmailAlerts(preferences.emailAlerts);
      setWeeklyDigest(preferences.weeklyDigest);
      setBurnAlertThreshold(preferences.burnAlertThreshold);

      setAiGlow(preferences.aiGlow);
      setValidationError(null);
      setSavedSuccess(false);
    }
  }, [open, profile, preferences]);

  // Auto-generate initials when full name changes
  const handleFullNameChange = (val: string) => {
    setFullName(val);
    const parts = val.trim().split(/\s+/);
    if (parts.length > 0 && parts[0]) {
      const generated = parts
        .map((p) => p[0]?.toUpperCase())
        .slice(0, 2)
        .join('');
      setInitials(generated || 'U');
    }
  };

  const handleSave = () => {
    if (!fullName.trim()) {
      setValidationError('Full Name cannot be empty.');
      setActiveTab(0);
      return;
    }
    if (!companyName.trim()) {
      setValidationError('Company Name cannot be empty.');
      setActiveTab(0);
      return;
    }

    setValidationError(null);

    // Save Profile
    updateProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      companyName: companyName.trim(),
      initials: initials.trim() || 'MJ',
    });

    // Save Preferences
    updatePreferences({
      currency,
      dateFormat,
      numberFormat,
      density,
      emailAlerts,
      weeklyDigest,
      burnAlertThreshold: burnAlertThreshold.trim() || '25000',
      aiGlow,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const handleReset = () => {
    resetDefaults();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: '16px', sm: '20px' },
          bgcolor: '#FCFBF8',
          border: '1px solid #DADBD5',
          boxShadow: '0 24px 64px rgba(37, 41, 35, 0.15)',
          p: { xs: 0.5, sm: 1.5 },
          m: { xs: 1.5, sm: 2 },
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #DADBD5',
          pb: 1.5,
          pt: 1.5,
          px: { xs: 2, sm: 3 },
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
          <Box>
            <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: { xs: '1rem', sm: '1.15rem' }, color: '#252923', lineHeight: 1.2 }}>
              Workspace &amp; User Settings
            </Typography>
            <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
              Personalize your identity, financial formats, and display preferences
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={onClose} aria-label="Close settings dialog">
          <X size={18} />
        </IconButton>
      </DialogTitle>

      {/* Responsive Navigation Tabs */}
      <Box sx={{ borderBottom: '1px solid #DADBD5', px: { xs: 1, sm: 2 }, bgcolor: '#FAF9F5' }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 46,
            '& .MuiTab-root': {
              minHeight: 46,
              fontFamily: 'var(--font-manrope)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'none',
              color: '#5A6255',
              px: { xs: 1.5, sm: 2 },
              '&.Mui-selected': {
                color: '#252923',
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#3E502C',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab icon={<User size={15} />} iconPosition="start" label="Profile" />
          <Tab icon={<Sliders size={15} />} iconPosition="start" label="Preferences" />
          <Tab icon={<Bell size={15} />} iconPosition="start" label="Notifications" />
          <Tab icon={<Palette size={15} />} iconPosition="start" label="Appearance" />
          <Tab icon={<Sparkles size={15} />} iconPosition="start" label="Product Guide" />
        </Tabs>
      </Box>

      {/* Scrollable Dialog Content */}
      <DialogContent sx={{ py: 2.5, px: { xs: 2, sm: 3.5 }, overflowY: 'auto' }}>
        {validationError && (
          <Alert severity="error" sx={{ mb: 2, fontSize: '0.82rem', borderRadius: '8px' }}>
            {validationError}
          </Alert>
        )}

        {savedSuccess && (
          <Alert
            severity="success"
            icon={<CheckCircle2 size={16} />}
            sx={{
              mb: 2,
              fontSize: '0.82rem',
              borderRadius: '8px',
              bgcolor: '#E2F3E7',
              color: '#2F3C22',
              border: '1px solid #A5B98A',
            }}
          >
            Settings saved and persisted successfully!
          </Alert>
        )}

        {/* TAB 0: PERSONAL PROFILE */}
        {activeTab === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#FAF9F5', borderRadius: '12px', border: '1px solid #DADBD5' }}>
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  bgcolor: '#3E502C',
                  color: '#F8F7F2',
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                }}
              >
                {initials || 'MJ'}
              </Avatar>
              <Box>
                <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: '1rem', color: '#252923' }}>
                  {fullName || 'Demo User'}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: '#7D8678' }}>
                  {companyName || 'Company'} &bull; Active Workspace
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  size="small"
                  value={fullName}
                  onChange={(e) => handleFullNameChange(e.target.value)}
                  fullWidth
                  required
                  helperText="Displayed across greeting banners and workspace records"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#FAF9F5',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Avatar Initials"
                  size="small"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 3))}
                  fullWidth
                  helperText="1-3 letter initials for topbar and sidebar badges"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#FAF9F5',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  size="small"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  helperText="User profile email and statement recipient"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#FAF9F5',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization / Company Name"
                  size="small"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  fullWidth
                  required
                  helperText="Financial workspace entity name"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#FAF9F5',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* TAB 1: FINANCIAL PREFERENCES */}
        {activeTab === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#252923', mb: 1 }}>
                Reporting Currency
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { code: 'USD', symbol: '$', label: 'US Dollar ($)' },
                  { code: 'EUR', symbol: '€', label: 'Euro (€)' },
                  { code: 'GBP', symbol: '£', label: 'British Pound (£)' },
                  { code: 'CAD', symbol: 'CA$', label: 'Canadian Dollar (CA$)' },
                ].map((c) => (
                  <Grid item xs={6} sm={3} key={c.code}>
                    <Box
                      onClick={() => setCurrency(c.code as CurrencyCode)}
                      sx={{
                        p: 1.5,
                        borderRadius: '10px',
                        border: currency === c.code ? '1.5px solid #3E502C' : '1px solid #DADBD5',
                        bgcolor: currency === c.code ? 'rgba(221, 240, 206, 0.4)' : '#FAF9F5',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#252923' }}>
                        {c.symbol}
                      </Typography>
                      <Typography sx={{ fontSize: '0.74rem', color: '#5A6255', fontWeight: 600 }}>
                        {c.code}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Date Display Format"
                  size="small"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value as DateFormatOption)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#FAF9F5',
                    },
                  }}
                >
                  <MenuItem value="MMM DD, YYYY">MMM DD, YYYY (e.g. Oct 30, 2026)</MenuItem>
                  <MenuItem value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-10-30)</MenuItem>
                  <MenuItem value="DD/MM/YYYY">DD/MM/YYYY (e.g. 30/10/2026)</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Number Display Format"
                  size="small"
                  value={numberFormat}
                  onChange={(e) => setNumberFormat(e.target.value as NumberFormatOption)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      bgcolor: '#FAF9F5',
                    },
                  }}
                >
                  <MenuItem value="standard">Standard Commas (e.g. $48,250)</MenuItem>
                  <MenuItem value="compact">Compact Units (e.g. $48.3k)</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* TAB 2: NOTIFICATIONS */}
        {activeTab === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: '#FAF9F5', borderRadius: '10px', border: '1px solid #DADBD5' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    color="success"
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#252923' }}>
                      Automated Email Anomaly Alerts
                    </Typography>
                    <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
                      Receive immediate notifications when marketing spend increases or subscriptions duplicate
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Box sx={{ p: 2, bgcolor: '#FAF9F5', borderRadius: '10px', border: '1px solid #DADBD5' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    color="success"
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#252923' }}>
                      Weekly Cash Flow Digest
                    </Typography>
                    <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
                      Consolidated weekly report of incoming receivables, payroll, and burn variance
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <TextField
              label="Monthly Expense Alert Threshold ($)"
              size="small"
              value={burnAlertThreshold}
              onChange={(e) => setBurnAlertThreshold(e.target.value)}
              fullWidth
              helperText="Trigger an alert banner when operational disbursements exceed this amount"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#FAF9F5',
                },
              }}
            />
          </Box>
        )}

        {/* TAB 3: APPEARANCE */}
        {activeTab === 3 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: '#FAF9F5', borderRadius: '10px', border: '1px solid #DADBD5' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={aiGlow}
                    onChange={(e) => setAiGlow(e.target.checked)}
                    color="success"
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#252923' }}>
                      Soft AI Glow Highlights
                    </Typography>
                    <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
                      Enable subtle futuristic lime accents around simulated AI insight cards
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Box sx={{ p: 2, bgcolor: '#FAF9F5', borderRadius: '10px', border: '1px solid #DADBD5' }}>
              <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#252923', mb: 0.5 }}>
                UI Layout Density
              </Typography>
              <Typography sx={{ fontSize: '0.74rem', color: '#7D8678', mb: 1.5 }}>
                Adjust table row height and padding across data visualizations
              </Typography>
              <RadioGroup
                row
                value={density}
                onChange={(e) => setDensity(e.target.value as InterfaceDensity)}
              >
                <FormControlLabel
                  value="comfortable"
                  control={<Radio size="small" sx={{ color: '#3E502C', '&.Mui-checked': { color: '#3E502C' } }} />}
                  label={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>Comfortable (Default)</Typography>}
                />
                <FormControlLabel
                  value="compact"
                  control={<Radio size="small" sx={{ color: '#3E502C', '&.Mui-checked': { color: '#3E502C' } }} />}
                  label={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>Compact Density</Typography>}
                />
              </RadioGroup>
            </Box>
          </Box>
        )}

        {/* TAB 4: PRODUCT GUIDE & ONBOARDING */}
        {activeTab === 4 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                p: 2.5,
                bgcolor: 'rgba(221, 240, 206, 0.45)',
                borderRadius: '12px',
                border: '1px solid #CBD8BA',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Sparkles size={18} color="#3E502C" />
                <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: '0.98rem', color: '#252923' }}>
                  Revisit Product Introduction
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.82rem', color: '#5A6255', lineHeight: 1.5, mb: 2 }}>
                Relaunch the interactive 4-step onboarding overlay introducing Cash Flow Analytics, Expense
                Tracking, AI Insights, and Transaction Monitoring.
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  onClose();
                  if (onOpenWelcome) onOpenWelcome();
                }}
                sx={{
                  bgcolor: '#252923',
                  color: '#F8F7F2',
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 2.2,
                  '&:hover': { bgcolor: '#3E502C' },
                }}
              >
                Launch Onboarding Guide
              </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1 }}>
              <ShieldCheck size={14} color="#7D8678" />
              <Typography sx={{ fontSize: '0.72rem', color: '#7D8678' }}>
                Preferences are persisted locally in your browser workspace via localStorage.
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      {/* Dialog Footer Actions */}
      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          borderTop: '1px solid #DADBD5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Button
          variant="text"
          size="small"
          onClick={handleReset}
          startIcon={<RotateCcw size={13} />}
          sx={{
            color: '#7D8678',
            fontSize: '0.76rem',
            textTransform: 'none',
            '&:hover': { color: '#B24436', bgcolor: '#FDEAE8' },
          }}
        >
          Reset to Demo Defaults
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#DADBD5',
              color: '#252923',
              textTransform: 'none',
              fontSize: '0.84rem',
              fontWeight: 600,
              borderRadius: '8px',
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
              fontWeight: 700,
              borderRadius: '8px',
              px: 2.5,
              '&:hover': { bgcolor: '#3E502C' },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
