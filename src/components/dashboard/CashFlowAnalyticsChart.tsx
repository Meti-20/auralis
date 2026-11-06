'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  ButtonGroup,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { TrendingUp, Layers, Calendar, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { DateRange, ChartViewMode, CashFlowChartPoint } from '@/types';
import { CASH_FLOW_CHART_DATA } from '@/data/mockData';
import { useUser } from '@/context/UserContext';

interface CashFlowAnalyticsChartProps {
  selectedRange: DateRange;
}

export const CashFlowAnalyticsChart: React.FC<CashFlowAnalyticsChartProps> = ({
  selectedRange,
}) => {
  const { preferences, formatMoney } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ChartViewMode>('weekly');

  // Series visibility controls for interactive legend
  const [visibleSeries, setVisibleSeries] = useState({
    income: true,
    expenses: true,
    netCashFlow: true,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData: CashFlowChartPoint[] =
    CASH_FLOW_CHART_DATA[selectedRange][viewMode] ||
    CASH_FLOW_CHART_DATA[selectedRange].weekly;

  const toggleSeries = (key: 'income' | 'expenses' | 'netCashFlow') => {
    setVisibleSeries((prev) => {
      // Prevent hiding all 3 series simultaneously
      const next = { ...prev, [key]: !prev[key] };
      if (!next.income && !next.expenses && !next.netCashFlow) {
        return prev;
      }
      return next;
    });
  };

  const formatYAxis = (val: number) => {
    const sym = preferences.currencySymbol;
    if (val >= 1000) return `${sym}${(val / 1000).toFixed(0)}k`;
    return `${sym}${val}`;
  };

  return (
    <Paper
      id="cash-flow"
      elevation={0}
      sx={{
        p: { xs: 2.2, sm: 3 },
        borderRadius: '16px',
        bgcolor: '#FCFBF8',
        border: '1px solid #DADBD5',
        boxShadow: '0 2px 8px rgba(37, 41, 35, 0.02)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Controls: Title, Subtitle, and Weekly/Monthly Toggle */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 2.5,
          gap: 1.5,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 800,
                fontSize: { xs: '1.05rem', sm: '1.18rem' },
                color: '#252923',
              }}
            >
              Cash Flow Analytics
            </Typography>
            <Tooltip
              title="Visualizes cash earned (income) vs money spent (expenses) over time. The dashed line tracks net surplus (cash retained in your business)."
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
            <Chip
              label="Illustrative Cash Flow"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.66rem',
                fontWeight: 700,
                bgcolor: '#DDF0CE',
                color: '#2F3C22',
              }}
            />
          </Box>
          <Typography sx={{ fontSize: '0.78rem', color: '#7D8678', mt: 0.3 }}>
            Income, expenses, and net retained cash flow across sample business accounts
          </Typography>
        </Box>

        {/* View Mode Toggle: Weekly vs Monthly */}
        <ButtonGroup
          size="small"
          sx={{
            bgcolor: '#EEECE4',
            p: 0.4,
            borderRadius: '10px',
            border: '1px solid #DADBD5',
            '& .MuiButton-root': {
              border: 'none',
              borderRadius: '8px !important',
              fontFamily: 'var(--font-manrope)',
              fontWeight: 600,
              fontSize: '0.76rem',
              px: 1.5,
              py: 0.5,
              color: '#5A6255',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.6)',
                color: '#252923',
              },
            },
          }}
        >
          <Button
            onClick={() => setViewMode('weekly')}
            sx={{
              bgcolor: viewMode === 'weekly' ? '#FCFBF8 !important' : 'transparent',
              color: viewMode === 'weekly' ? '#252923 !important' : '#5A6255',
              boxShadow: viewMode === 'weekly' ? '0 2px 4px rgba(37, 41, 35, 0.08)' : 'none',
            }}
          >
            Weekly
          </Button>
          <Button
            onClick={() => setViewMode('monthly')}
            sx={{
              bgcolor: viewMode === 'monthly' ? '#FCFBF8 !important' : 'transparent',
              color: viewMode === 'monthly' ? '#252923 !important' : '#5A6255',
              boxShadow: viewMode === 'monthly' ? '0 2px 4px rgba(37, 41, 35, 0.08)' : 'none',
            }}
          >
            Monthly
          </Button>
        </ButtonGroup>
      </Box>

      {/* Chart Canvas */}
      <Box sx={{ width: '100%', height: 320 }}>
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A5B98A" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A5B98A" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DDF0CE" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#DDF0CE" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DADBD5" vertical={false} />
              <XAxis
                dataKey="period"
                stroke="#7D8678"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#DADBD5' }}
              />
              <YAxis
                stroke="#7D8678"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
              />
              <RechartsTooltip
                formatter={(val: number) => [
                  `${preferences.currencySymbol}${val.toLocaleString()}`,
                  '',
                ]}
                contentStyle={{
                  backgroundColor: '#FCFBF8',
                  border: '1px solid #DADBD5',
                  borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(37, 41, 35, 0.08)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-inter)',
                }}
              />
              {visibleSeries.income && (
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Total Income"
                  stroke="#3E502C"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#incomeGrad)"
                />
              )}
              {visibleSeries.expenses && (
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Total Expenses"
                  stroke="#B24436"
                  strokeWidth={2}
                  fillOpacity={0}
                />
              )}
              {visibleSeries.netCashFlow && (
                <Area
                  type="monotone"
                  dataKey="netCashFlow"
                  name="Net Cash Flow"
                  stroke="#88A26A"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#netGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>

      {/* Interactive Legend with Series Toggles */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 1.5, sm: 2.5 },
          mt: 2,
          pt: 1.8,
          borderTop: '1px solid #DADBD5',
          flexWrap: 'wrap',
        }}
      >
        {/* Toggle Income */}
        <Tooltip title="Click to show/hide Income series">
          <Box
            onClick={() => toggleSeries('income')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.2,
              py: 0.6,
              borderRadius: '8px',
              cursor: 'pointer',
              bgcolor: visibleSeries.income ? 'rgba(62, 80, 44, 0.08)' : 'transparent',
              opacity: visibleSeries.income ? 1 : 0.45,
              transition: 'all 0.15s ease',
              '&:hover': { bgcolor: 'rgba(62, 80, 44, 0.14)' },
            }}
          >
            <Box sx={{ width: 14, height: 4, bgcolor: '#3E502C', borderRadius: 1 }} />
            <Typography sx={{ fontSize: '0.76rem', color: '#252923', fontWeight: 600 }}>
              Income
            </Typography>
          </Box>
        </Tooltip>

        {/* Toggle Expenses */}
        <Tooltip title="Click to show/hide Expenses series">
          <Box
            onClick={() => toggleSeries('expenses')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.2,
              py: 0.6,
              borderRadius: '8px',
              cursor: 'pointer',
              bgcolor: visibleSeries.expenses ? 'rgba(178, 68, 54, 0.08)' : 'transparent',
              opacity: visibleSeries.expenses ? 1 : 0.45,
              transition: 'all 0.15s ease',
              '&:hover': { bgcolor: 'rgba(178, 68, 54, 0.14)' },
            }}
          >
            <Box sx={{ width: 14, height: 4, bgcolor: '#B24436', borderRadius: 1 }} />
            <Typography sx={{ fontSize: '0.76rem', color: '#252923', fontWeight: 600 }}>
              Expenses
            </Typography>
          </Box>
        </Tooltip>

        {/* Toggle Net Cash Flow */}
        <Tooltip title="Click to show/hide Net Cash Flow series">
          <Box
            onClick={() => toggleSeries('netCashFlow')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.2,
              py: 0.6,
              borderRadius: '8px',
              cursor: 'pointer',
              bgcolor: visibleSeries.netCashFlow ? 'rgba(136, 162, 106, 0.12)' : 'transparent',
              opacity: visibleSeries.netCashFlow ? 1 : 0.45,
              transition: 'all 0.15s ease',
              '&:hover': { bgcolor: 'rgba(136, 162, 106, 0.2)' },
            }}
          >
            <Box
              sx={{
                width: 14,
                height: 4,
                bgcolor: '#88A26A',
                borderRadius: 1,
                borderTop: '1px dashed #3E502C',
              }}
            />
            <Typography sx={{ fontSize: '0.76rem', color: '#252923', fontWeight: 600 }}>
              Net Cash Flow
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default CashFlowAnalyticsChart;
