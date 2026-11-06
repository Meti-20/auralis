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
import { PieChart as PieIcon, HelpCircle, ArrowRight } from 'lucide-react';
import { DateRange, ExpenseCategoryItem } from '@/types';
import { EXPENSE_CATEGORIES_BY_RANGE } from '@/data/mockData';
import { useUser } from '@/context/UserContext';

interface ExpenseBreakdownProps {
  selectedRange: DateRange;
  selectedCategory?: string;
  onSelectCategory?: (categoryName: string) => void;
}

export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({
  selectedRange,
  selectedCategory,
  onSelectCategory,
}) => {
  const { preferences, formatMoney } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories: ExpenseCategoryItem[] =
    EXPENSE_CATEGORIES_BY_RANGE[selectedRange] ||
    EXPENSE_CATEGORIES_BY_RANGE['30d'];

  const totalExpense = categories.reduce((sum, item) => sum + item.amount, 0);

  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) {
      // Toggle if already selected
      if (selectedCategory?.toLowerCase() === catName.toLowerCase()) {
        onSelectCategory('All');
      } else {
        onSelectCategory(catName);
      }
    }
  };

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
              title="Classifies operational spending across Salaries, Marketing, Operations, Software, and other overhead to pinpoint budget creep. Click any category to filter the ledger."
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
            {formatMoney(totalExpense)}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.78rem', color: '#7D8678', mt: 0.3 }}>
          Departmental spending distribution across business categories
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
                onClick={(entry) => handleCategoryClick(entry.name)}
                cursor="pointer"
              >
                {categories.map((entry) => {
                  const isFiltered =
                    selectedCategory &&
                    selectedCategory !== 'All' &&
                    selectedCategory.toLowerCase() !== entry.name.toLowerCase();
                  return (
                    <Cell
                      key={entry.id}
                      fill={entry.color}
                      opacity={isFiltered ? 0.35 : 1}
                      stroke="#FCFBF8"
                      strokeWidth={2}
                    />
                  );
                })}
              </Pie>
              <RechartsTooltip
                formatter={(val: number) => [`${preferences.currencySymbol}${val.toLocaleString()}`, 'Amount']}
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4, mt: 'auto', pt: 1.5 }}>
        {categories.map((cat) => {
          const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();

          return (
            <Box
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              sx={{
                p: 0.8,
                borderRadius: '8px',
                cursor: 'pointer',
                bgcolor: isSelected ? 'rgba(221, 240, 206, 0.45)' : 'transparent',
                border: isSelected ? '1px solid #CBD8BA' : '1px solid transparent',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: isSelected ? 'rgba(221, 240, 206, 0.6)' : '#FAF9F5',
                },
              }}
            >
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
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 600, color: '#252923' }}>
                    {cat.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    className="tabular-numbers"
                    sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#252923' }}
                  >
                    {preferences.currencySymbol}{cat.amount.toLocaleString()}
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
          );
        })}
      </Box>
    </Paper>
  );
};

export default ExpenseBreakdown;
