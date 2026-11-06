'use client';

import React from 'react';
import { Box, Paper, Typography, Grid, Chip, Tooltip } from '@mui/material';
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Minus,
  TrendingDown,
  HelpCircle,
} from 'lucide-react';
import { SummaryKPIs, KPICardData } from '@/types';
import { useUser } from '@/context/UserContext';

interface SummaryKPICardsProps {
  kpis: SummaryKPIs;
  activeFilter?: string;
  onCardClick?: (metricKey: string) => void;
}

const getKPIIcon = (type: KPICardData['iconType']) => {
  switch (type) {
    case 'income':
      return <ArrowDownLeft size={18} color="#367B4A" />;
    case 'expense':
      return <ArrowUpRight size={18} color="#252923" />;
    case 'net':
      return <TrendingUp size={18} color="#3E502C" />;
    case 'balance':
      return <Wallet size={18} color="#3E502C" />;
  }
};

const getIconBg = (type: KPICardData['iconType']) => {
  switch (type) {
    case 'income':
      return 'rgba(221, 240, 206, 0.7)';
    case 'expense':
      return '#EEECE4';
    case 'net':
      return 'rgba(221, 240, 206, 0.5)';
    case 'balance':
      return '#EEECE4';
  }
};

export const SummaryKPICards: React.FC<SummaryKPICardsProps> = ({
  kpis,
  activeFilter,
  onCardClick,
}) => {
  const { formatMoney } = useUser();

  const cards: { key: string; data: KPICardData }[] = [
    { key: 'income', data: kpis.totalIncome },
    { key: 'expenses', data: kpis.totalExpenses },
    { key: 'net', data: kpis.netCashFlow },
    { key: 'balance', data: kpis.availableBalance },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map(({ key, data }) => {
        const isPositive = data.changePercent > 0;
        const isFavorable = data.isPositiveChange;
        const isActive = activeFilter === key;

        return (
          <Grid item xs={12} sm={6} lg={3} key={key}>
            <Paper
              elevation={0}
              onClick={() => onCardClick && onCardClick(key)}
              sx={{
                p: { xs: 2.2, sm: 2.8 },
                borderRadius: '14px',
                bgcolor: '#FCFBF8',
                border: isActive ? '1.5px solid #A5B98A' : '1px solid #DADBD5',
                boxShadow: isActive
                  ? '0 6px 18px rgba(165, 185, 138, 0.18)'
                  : '0 2px 6px rgba(37, 41, 35, 0.02)',
                cursor: onCardClick ? 'pointer' : 'default',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                '&:hover': onCardClick
                  ? {
                      transform: 'translateY(-2px)',
                      borderColor: '#A5B98A',
                      boxShadow: '0 6px 20px rgba(37, 41, 35, 0.05)',
                    }
                  : {},
              }}
            >
              {/* Header: Title, Tooltip and Icon */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#5A6255',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {data.title}
                  </Typography>
                  <Tooltip
                    title={data.description}
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
                          maxWidth: 260,
                        },
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        cursor: 'help',
                        color: '#7D8678',
                        '&:hover': { color: '#252923' },
                      }}
                    >
                      <HelpCircle size={13} />
                    </Box>
                  </Tooltip>
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    bgcolor: getIconBg(data.iconType),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getKPIIcon(data.iconType)}
                </Box>
              </Box>

              {/* Main Financial Value */}
              <Typography
                variant="h4"
                className="tabular-numbers"
                sx={{
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 800,
                  fontSize: { xs: '1.65rem', sm: '1.95rem' },
                  color: '#252923',
                  lineHeight: 1.15,
                  mb: 1.2,
                }}
              >
                {formatMoney(data.amount)}
              </Typography>

              {/* Trend & Comparison Label */}
              <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  size="small"
                  icon={
                    data.changePercent === 0 ? (
                      <Minus size={11} color="#5A6255" />
                    ) : isPositive ? (
                      <TrendingUp size={11} color={isFavorable ? '#2F3C22' : '#8B2C20'} />
                    ) : (
                      <TrendingDown size={11} color={isFavorable ? '#2F3C22' : '#8B2C20'} />
                    )
                  }
                  label={`${isPositive ? '+' : ''}${data.changePercent}%`}
                  sx={{
                    height: 22,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    bgcolor: isFavorable ? 'rgba(221, 240, 206, 0.8)' : '#FDEAE8',
                    color: isFavorable ? '#2F3C22' : '#8B2C20',
                    border: isFavorable ? '1px solid #CBD8BA' : '1px solid #F5C6CB',
                    '& .MuiChip-icon': {
                      ml: 0.4,
                    },
                  }}
                />
                <Typography sx={{ fontSize: '0.72rem', color: '#7D8678', fontWeight: 500 }}>
                  {data.comparisonLabel}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SummaryKPICards;
