'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  TrendingUp,
  Zap,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { AIInsightItem } from '@/types';
import { MOCK_AI_INSIGHTS } from '@/data/mockData';

export const AIInsightsCard: React.FC = () => {
  const [selectedInsight, setSelectedInsight] = useState<AIInsightItem | null>(null);
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>(MOCK_AI_INSIGHTS[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleApplyAction = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setAppliedActions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCategoryIcon = (category: AIInsightItem['category']) => {
    switch (category) {
      case 'Spending Analysis':
        return <AlertTriangle size={14} color="#8B2C20" />;
      case 'Cash Flow Observation':
        return <TrendingUp size={14} color="#367B4A" />;
      case 'Saving Opportunity':
      default:
        return <Zap size={14} color="#3E502C" />;
    }
  };

  const getCategoryStyles = (category: AIInsightItem['category']) => {
    switch (category) {
      case 'Spending Analysis':
        return { bg: '#FDEAE8', text: '#8B2C20', border: '#F5C6CB' };
      case 'Cash Flow Observation':
        return { bg: 'rgba(221, 240, 206, 0.8)', text: '#2F3C22', border: '#CBD8BA' };
      case 'Saving Opportunity':
      default:
        return { bg: '#EEECE4', text: '#252923', border: '#DADBD5' };
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: '16px',
          bgcolor: '#FCFBF8',
          border: '1px solid #CBD8BA',
          boxShadow: '0 4px 20px rgba(165, 185, 138, 0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle pale lime ambient glow */}
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 140,
            height: 140,
            borderRadius: '50%',
            bgcolor: 'rgba(221, 240, 206, 0.45)',
            filter: 'blur(32px)',
            pointerEvents: 'none',
          }}
        />

        {/* Card Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2.5,
            position: 'relative',
            zIndex: 1,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                bgcolor: '#DDF0CE',
                color: '#252923',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={17} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'var(--font-manrope)',
                    fontWeight: 800,
                    fontSize: { xs: '1.05rem', sm: '1.18rem' },
                    color: '#252923',
                  }}
                >
                  Auralis AI Insights
                </Typography>
                <Tooltip
                  title="Simulated autonomous reasoning detecting spending anomalies, cash flow surplus health, and recurring software savings."
                  arrow
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#252923',
                        color: '#F8F7F2',
                        fontSize: '0.74rem',
                        p: 1.2,
                        borderRadius: '8px',
                        border: '1px solid #DADBD5',
                        maxWidth: 280,
                      },
                    },
                  }}
                >
                  <Box component="span" sx={{ display: 'inline-flex', cursor: 'help', color: '#7D8678', '&:hover': { color: '#252923' } }}>
                    <HelpCircle size={14} />
                  </Box>
                </Tooltip>
              </Box>
              <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
                Autonomous Financial Pattern Intelligence
              </Typography>
            </Box>
          </Box>

          <Chip
            label="Simulated Sample Analysis"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.66rem',
              fontWeight: 600,
              bgcolor: '#EEECE4',
              color: '#5A6255',
            }}
          />
        </Box>

        {/* List of 3 Insights */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, position: 'relative', zIndex: 1 }}>
          {MOCK_AI_INSIGHTS.map((insight) => {
            const isExpanded = expandedId === insight.id;
            const isApplied = appliedActions[insight.id];
            const badge = getCategoryStyles(insight.category);

            return (
              <Box
                key={insight.id}
                sx={{
                  p: 2.2,
                  borderRadius: '12px',
                  bgcolor: isExpanded ? '#FAF9F5' : '#FCFBF8',
                  border: isExpanded ? '1px solid #A5B98A' : '1px solid #DADBD5',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#A5B98A',
                    bgcolor: '#FAF9F5',
                  },
                }}
              >
                {/* Top Row: Category Pill & Expand Toggle */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      icon={getCategoryIcon(insight.category)}
                      label={insight.category}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                      }}
                    />
                    <Chip
                      label={`${insight.confidenceScore}% confidence`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.66rem',
                        fontWeight: 600,
                        bgcolor: '#EEECE4',
                        color: '#5A6255',
                      }}
                    />
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() => toggleExpand(insight.id)}
                    sx={{ color: '#5A6255' }}
                    aria-label={isExpanded ? 'Collapse insight' : 'Expand insight'}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </IconButton>
                </Box>

                {/* Short Summary Text */}
                <Typography
                  sx={{
                    fontFamily: 'var(--font-manrope)',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    color: '#252923',
                    lineHeight: 1.4,
                    mb: 1.2,
                  }}
                >
                  {insight.shortSummary}
                </Typography>

                {/* Bottom Row: Impact Metric and "Explore insight" Button */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.8,
                      px: 1.2,
                      py: 0.4,
                      borderRadius: '6px',
                      bgcolor: 'rgba(221, 240, 206, 0.4)',
                      border: '1px solid #CBD8BA',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.72rem', color: '#5A6255', fontWeight: 600 }}>
                      {insight.impactMetric}:
                    </Typography>
                    <Typography
                      className="tabular-numbers"
                      sx={{ fontSize: '0.76rem', fontWeight: 800, color: '#2F3C22' }}
                    >
                      {insight.impactValue}
                    </Typography>
                  </Box>

                  <Button
                    size="small"
                    onClick={() => setSelectedInsight(insight)}
                    endIcon={<ArrowRight size={13} />}
                    sx={{
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-manrope)',
                      fontWeight: 700,
                      color: '#252923',
                      bgcolor: '#EEECE4',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#DADBD5',
                      },
                    }}
                  >
                    Explore insight
                  </Button>
                </Box>

                {/* Inline Collapsible Details */}
                <Collapse in={isExpanded}>
                  <Box
                    sx={{
                      mt: 1.8,
                      pt: 1.8,
                      borderTop: '1px solid #DADBD5',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ p: 1.5, bgcolor: '#EEECE4', borderRadius: '8px' }}>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#252923', textTransform: 'uppercase', mb: 0.3 }}>
                        Root Cause Breakdown:
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#5A6255', lineHeight: 1.5 }}>
                        {insight.deepAnalysis}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: isApplied ? '#E2F3E7' : 'rgba(221, 240, 206, 0.4)',
                        borderRadius: '8px',
                        border: isApplied ? '1px solid #A5B98A' : '1px solid #CBD8BA',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        justifyContent: 'space-between',
                        gap: 1.2,
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#252923', mb: 0.2 }}>
                          Recommended Action:
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#3E502C' }}>
                          {insight.suggestedAction}
                        </Typography>
                      </Box>

                      <Button
                        size="small"
                        onClick={(e) => handleApplyAction(e, insight.id)}
                        startIcon={isApplied ? <CheckCircle2 size={13} /> : <Zap size={13} />}
                        sx={{
                          bgcolor: isApplied ? '#367B4A' : '#252923',
                          color: '#F8F7F2',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          py: 0.5,
                          px: 1.6,
                          borderRadius: '6px',
                          textTransform: 'none',
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            bgcolor: isApplied ? '#2F663D' : '#3E502C',
                          },
                        }}
                      >
                        {isApplied ? 'Action Applied' : 'Simulate Action'}
                      </Button>
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Explore Insight Modal Dialog */}
      <Dialog
        open={Boolean(selectedInsight)}
        onClose={() => setSelectedInsight(null)}
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
        {selectedInsight && (
          <>
            <DialogTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 1,
                borderBottom: '1px solid #DADBD5',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Sparkles size={18} color="#3E502C" />
                <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: '1.05rem', color: '#252923' }}>
                  {selectedInsight.title}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setSelectedInsight(null)}>
                <X size={18} />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ py: 2.5 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={selectedInsight.category}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    bgcolor: '#EEECE4',
                    color: '#252923',
                  }}
                />
                <Chip
                  label={`${selectedInsight.confidenceScore}% Algorithm Confidence`}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    bgcolor: 'rgba(221, 240, 206, 0.6)',
                    color: '#2F3C22',
                  }}
                />
              </Box>

              <Typography sx={{ fontSize: '0.92rem', color: '#252923', fontWeight: 600, mb: 2 }}>
                {selectedInsight.shortSummary}
              </Typography>

              <Box sx={{ p: 2, bgcolor: '#EEECE4', borderRadius: '10px', mb: 2 }}>
                <Typography sx={{ fontSize: '0.76rem', fontWeight: 700, color: '#252923', textTransform: 'uppercase', mb: 0.5 }}>
                  Detailed Diagnostic Analysis:
                </Typography>
                <Typography sx={{ fontSize: '0.86rem', color: '#5A6255', lineHeight: 1.6 }}>
                  {selectedInsight.deepAnalysis}
                </Typography>
              </Box>

              <Box sx={{ p: 2, bgcolor: 'rgba(221, 240, 206, 0.45)', borderRadius: '10px', border: '1px solid #CBD8BA' }}>
                <Typography sx={{ fontSize: '0.76rem', fontWeight: 700, color: '#3E502C', textTransform: 'uppercase', mb: 0.5 }}>
                  Recommended Financial Action:
                </Typography>
                <Typography sx={{ fontSize: '0.86rem', color: '#252923', lineHeight: 1.5 }}>
                  {selectedInsight.suggestedAction}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <ShieldCheck size={14} color="#7D8678" />
                <Typography sx={{ fontSize: '0.72rem', color: '#7D8678' }}>
                  Simulated recommendation based on local sample transactions.
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setSelectedInsight(null)}
                sx={{
                  borderColor: '#DADBD5',
                  color: '#252923',
                  textTransform: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={(e) => {
                  handleApplyAction(e, selectedInsight.id);
                  setSelectedInsight(null);
                }}
                sx={{
                  bgcolor: appliedActions[selectedInsight.id] ? '#367B4A' : '#252923',
                  color: '#F8F7F2',
                  textTransform: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  '&:hover': { bgcolor: appliedActions[selectedInsight.id] ? '#2F663D' : '#3E502C' },
                }}
              >
                {appliedActions[selectedInsight.id] ? 'Action Simulated' : 'Simulate Action'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default AIInsightsCard;

