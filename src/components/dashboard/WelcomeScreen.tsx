'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  PieChart,
  Sparkles,
  Receipt,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuralisLogo from '../common/AuralisLogo';
import { useUser } from '@/context/UserContext';

interface WelcomeScreenProps {
  onDismiss: () => void;
}

const CAPABILITIES = [
  {
    id: 'cash-flow',
    title: 'Cash Flow Analytics',
    tagline: 'Understand incoming and outgoing money.',
    description:
      'Track real-time money velocity, measure net retained cash surplus, and compare weekly and monthly trajectories.',
    icon: TrendingUp,
    badgeColor: '#A5B98A',
    badgeBg: 'rgba(221, 240, 206, 0.7)',
  },
  {
    id: 'expense-tracking',
    title: 'Expense Tracking',
    tagline: 'See where business money goes.',
    description:
      'Categorize operational disbursements across Salaries, Marketing, Operations, Software, and team overhead without spreadsheets.',
    icon: PieChart,
    badgeColor: '#3E502C',
    badgeBg: '#EEECE4',
  },
  {
    id: 'ai-insights',
    title: 'AI Financial Insights',
    tagline: 'Discover useful financial observations & savings.',
    description:
      'Detect marketing spend spikes, verify healthy runway surpluses, and uncover redundant software subscriptions.',
    icon: Sparkles,
    badgeColor: '#2F3C22',
    badgeBg: '#DDF0CE',
    highlight: true,
  },
  {
    id: 'transaction-monitoring',
    title: 'Transaction Monitoring',
    tagline: 'Review business financial activity.',
    description:
      'Inspect verified bank transactions with live search, category filtering, and instant sort order by amount or date.',
    icon: Receipt,
    badgeColor: '#3E502C',
    badgeBg: '#EEECE4',
  },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss }) => {
  const { profile } = useUser();
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        bgcolor: 'rgba(248, 247, 242, 0.96)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3, md: 4 },
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 880 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4.5, md: 5 },
            borderRadius: { xs: '20px', sm: '24px' },
            bgcolor: '#FCFBF8',
            border: '1px solid #DADBD5',
            boxShadow: '0 24px 64px rgba(37, 41, 35, 0.12), 0 4px 16px rgba(37, 41, 35, 0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle ambient glow in top right */}
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 220,
              height: 220,
              borderRadius: '50%',
              bgcolor: 'rgba(221, 240, 206, 0.45)',
              filter: 'blur(48px)',
              pointerEvents: 'none',
            }}
          />

          {/* Brand & Badge Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <AuralisLogo size="medium" linked={false} />
            <Chip
              icon={<Sparkles size={13} color="#3E502C" />}
              label="Interactive Onboarding"
              size="small"
              sx={{
                bgcolor: '#DDF0CE',
                color: '#2F3C22',
                fontFamily: 'var(--font-manrope)',
                fontWeight: 700,
                fontSize: '0.72rem',
                border: '1px solid #CBD8BA',
              }}
            />
          </Box>

          {/* Greeting & Value Proposition */}
          <Box sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 800,
                fontSize: { xs: '1.85rem', sm: '2.4rem', md: '2.75rem' },
                color: '#252923',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                mb: 1.5,
              }}
            >
              Welcome, {profile.firstName || 'Meti'}!
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.96rem', sm: '1.05rem' },
                color: '#5A6255',
                lineHeight: 1.6,
                maxWidth: 720,
              }}
            >
              Auralis helps you understand your business money and make better decisions.
              Here is a quick overview of what your financial dashboard can do:
            </Typography>
          </Box>

          {/* 4 Main Capabilities Grid */}
          <Grid container spacing={2.2} sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <Grid item xs={12} sm={6} key={cap.id}>
                  <Box
                    sx={{
                      p: 2.4,
                      borderRadius: '14px',
                      bgcolor: cap.highlight ? 'rgba(221, 240, 206, 0.35)' : '#FAF9F5',
                      border: cap.highlight ? '1px solid #CBD8BA' : '1px solid #DADBD5',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#A5B98A',
                        bgcolor: cap.highlight ? 'rgba(221, 240, 206, 0.5)' : '#FCFBF8',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.2 }}>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: '8px',
                          bgcolor: cap.badgeBg,
                          color: cap.badgeColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} strokeWidth={2.2} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'var(--font-manrope)',
                            fontWeight: 800,
                            fontSize: '0.94rem',
                            color: '#252923',
                            lineHeight: 1.2,
                          }}
                        >
                          {cap.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.74rem',
                            color: '#3E502C',
                            fontWeight: 600,
                          }}
                        >
                          {cap.tagline}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        color: '#5A6255',
                        lineHeight: 1.5,
                        mt: 0.5,
                      }}
                    >
                      {cap.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {/* Primary Action Button & Demo Data Disclaimer */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              pt: 2.5,
              borderTop: '1px solid #DADBD5',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldCheck size={16} color="#7D8678" />
              <Typography sx={{ fontSize: '0.76rem', color: '#7D8678', lineHeight: 1.4 }}>
                Demonstration Workspace: Figures and transactions shown are illustrative demo data.
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={onDismiss}
              endIcon={<ArrowRight size={18} />}
              sx={{
                bgcolor: '#252923',
                color: '#F8F7F2',
                fontFamily: 'var(--font-manrope)',
                fontWeight: 700,
                fontSize: '0.95rem',
                py: 1.4,
                px: 3.5,
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(37, 41, 35, 0.15)',
                '&:hover': {
                  bgcolor: '#3E502C',
                  boxShadow: '0 6px 18px rgba(62, 80, 44, 0.25)',
                },
              }}
            >
              Explore My Dashboard
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default WelcomeScreen;

