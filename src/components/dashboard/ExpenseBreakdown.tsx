'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { PieChart as PieIcon, HelpCircle } from 'lucide-react';
import { DateRange, ExpenseCategoryItem } from '@/types';
import { EXPENSE_CATEGORIES_BY_RANGE } from '@/data/mockData';

interface ExpenseBreakdownProps {
  selectedRange: DateRange;
}

export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({
  selectedRange,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories: ExpenseCategoryItem[] =
    EXPENSE_CATEGORIES_BY_RANGE[selectedRange] ||
    EXPENSE_CATEGORIES_BY_RANGE['30d'];

  const totalExpense = categories.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.2, sm: 3 },
        borderRadius: '16px',
        bgcolor: '#FCFBF8',
        border: '1px solid #DADBD5',
        boxShadow: '0 2px 8px rgba(37, 41, 35, 0.02)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              Expense Breakdown
            </Typography>
            <Tooltip
              title="Classifies operational spending across Salaries, Marketing, Operations, Software, and other overhead to pinpoint budget creep."
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
              <Box component="span" sx={{ display: 'inline-flex', cursor: 'help', color: '#7D8678', '&:hover': { color: '#252923' } }}>
                <HelpCircle size={14} />
              </Box>
            </Tooltip>
          </Box>
          <Typography
            className="tabular-numbers"
            sx={{
              fontFamily: 'var(--font-manrope)',
              fontWeight: 800,
              fontSize: '1rem',
              color: '#3E502C',
            }}
          >
            ${totalExpense.toLocaleString()}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.78rem', color: '#7D8678', mt: 0.3 }}>
          Departmental spending distribution across verified categories
        </Typography>
      </Box>

      {/* Donut Chart Visualization */}
      <Box sx={{ height: 160, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="amount"
                nameKey="name"
              >
                {categories.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} stroke="#FCFBF8" strokeWidth={2} />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(val: number) => [`$${val.toLocaleString()}`, 'Amount']}
                contentStyle={{
                  backgroundColor: '#FCFBF8',
                  border: '1px solid #DADBD5',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>

      {/* Corresponding Category Progress List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 'auto', pt: 1.5 }}>
        {categories.map((cat) => (
          <Box key={cat.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: cat.color,
                  }}
                />
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#252923' }}>
                  {cat.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  className="tabular-numbers"
                  sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#252923' }}
                >
                  ${cat.amount.toLocaleString()}
                </Typography>
                <Typography
                  className="tabular-numbers"
                  sx={{
                    fontSize: '0.74rem',
                    color: '#7D8678',
                    minWidth: 32,
                    textAlign: 'right',
                  }}
                >
                  {cat.percentage}%
                </Typography>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={cat.percentage}
              sx={{
                height: 5,
                borderRadius: 3,
                bgcolor: '#EEECE4',
                '& .MuiLinearProgress-bar': {
                  bgcolor: cat.color,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ExpenseBreakdown;

