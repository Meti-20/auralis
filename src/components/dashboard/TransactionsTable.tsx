'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  Button,
  Tooltip,
} from '@mui/material';
import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  X,
  HelpCircle,
} from 'lucide-react';
import { DashboardTransaction } from '@/types';
import { MOCK_TRANSACTIONS_LIST } from '@/data/mockData';

export const TransactionsTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');

  const filteredTransactions = useMemo(() => {
    let result = [...MOCK_TRANSACTIONS_LIST];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.account.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter((t) => t.type === selectedType);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return b.rawDate.localeCompare(a.rawDate);
      }
      if (sortBy === 'date-asc') {
        return a.rawDate.localeCompare(b.rawDate);
      }
      if (sortBy === 'amount-desc') {
        return b.amount - a.amount;
      }
      if (sortBy === 'amount-asc') {
        return a.amount - b.amount;
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  const categories = ['All', 'Income', 'Salaries', 'Marketing', 'Operations', 'Software', 'Other'];

  return (
    <Paper
      id="transactions"
      elevation={0}
      sx={{
        p: { xs: 2.2, sm: 3 },
        borderRadius: '16px',
        bgcolor: '#FCFBF8',
        border: '1px solid #DADBD5',
        boxShadow: '0 2px 8px rgba(37, 41, 35, 0.02)',
      }}
    >
      {/* Header and Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          mb: 2.5,
          gap: 2,
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
              Recent Transactions
            </Typography>
            <Tooltip
              title="Real-time transaction stream across your connected accounts. Green (+) rows represent income, while dark (-) rows reflect business expenses."
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
              label={`${filteredTransactions.length} items`}
              size="small"
              sx={{
                bgcolor: '#EEECE4',
                color: '#5A6255',
                fontSize: '0.7rem',
                fontWeight: 600,
                height: 20,
              }}
            />
          </Box>
          <Typography sx={{ fontSize: '0.78rem', color: '#7D8678', mt: 0.3 }}>
            Real-time cleared transaction stream across connected banking accounts
          </Typography>
        </Box>

        {/* Search & Sort Controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            width: { xs: '100%', md: 'auto' },
            flexWrap: 'wrap',
          }}
        >
          {/* Search Field */}
          <TextField
            size="small"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={15} color="#7D8678" />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <Box
                    component="span"
                    onClick={() => setSearchQuery('')}
                    sx={{ cursor: 'pointer', display: 'flex' }}
                  >
                    <X size={14} color="#7D8678" />
                  </Box>
                </InputAdornment>
              ) : null,
            }}
            sx={{
              width: { xs: '100%', sm: 220 },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                bgcolor: '#FAF9F5',
                fontSize: '0.82rem',
                '& fieldset': { borderColor: '#DADBD5' },
                '&:hover fieldset': { borderColor: '#A5B98A' },
              },
            }}
          />

          {/* Sort Selector */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              displayEmpty
              sx={{
                borderRadius: '10px',
                bgcolor: '#FAF9F5',
                fontSize: '0.8rem',
                height: 38,
                '& fieldset': { borderColor: '#DADBD5' },
              }}
            >
              <MenuItem value="date-desc">Newest First</MenuItem>
              <MenuItem value="date-asc">Oldest First</MenuItem>
              <MenuItem value="amount-desc">Highest Amount</MenuItem>
              <MenuItem value="amount-asc">Lowest Amount</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Category Filter Chips */}
      <Box
        sx={{
          display: 'flex',
          gap: 0.8,
          mb: 2.5,
          overflowX: 'auto',
          pb: 0.5,
          '&::-webkit-scrollbar': { height: 4 },
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Chip
              key={cat}
              label={cat}
              size="small"
              onClick={() => setSelectedCategory(cat)}
              sx={{
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                bgcolor: isSelected ? '#252923' : '#EEECE4',
                color: isSelected ? '#F8F7F2' : '#5A6255',
                border: isSelected ? '1px solid #252923' : '1px solid transparent',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: isSelected ? '#3E502C' : '#DADBD5',
                },
              }}
            />
          );
        })}
      </Box>

      {/* Transactions Table Container */}
      <TableContainer sx={{ maxHeight: 420, overflowX: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: '#FAF9F5', fontSize: '0.74rem', fontWeight: 700, color: '#5A6255', borderBottom: '1px solid #DADBD5' }}>
                Transaction Name
              </TableCell>
              <TableCell sx={{ bgcolor: '#FAF9F5', fontSize: '0.74rem', fontWeight: 700, color: '#5A6255', borderBottom: '1px solid #DADBD5' }}>
                Category
              </TableCell>
              <TableCell sx={{ bgcolor: '#FAF9F5', fontSize: '0.74rem', fontWeight: 700, color: '#5A6255', borderBottom: '1px solid #DADBD5' }}>
                Date
              </TableCell>
              <TableCell sx={{ bgcolor: '#FAF9F5', fontSize: '0.74rem', fontWeight: 700, color: '#5A6255', borderBottom: '1px solid #DADBD5' }}>
                Status
              </TableCell>
              <TableCell align="right" sx={{ bgcolor: '#FAF9F5', fontSize: '0.74rem', fontWeight: 700, color: '#5A6255', borderBottom: '1px solid #DADBD5' }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 6, textAlign: 'center' }}>
                  <Typography sx={{ color: '#7D8678', fontSize: '0.88rem', mb: 1 }}>
                    No transactions match your current filters.
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedType('all');
                    }}
                    sx={{ fontSize: '0.76rem', color: '#3E502C', textTransform: 'none' }}
                  >
                    Reset all filters
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {/* Name & Account */}
                  <TableCell sx={{ py: 1.4, borderBottom: '1px solid #EBEBE5' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '8px',
                          bgcolor: tx.type === 'income' ? 'rgba(221, 240, 206, 0.7)' : '#EEECE4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {tx.type === 'income' ? (
                          <ArrowDownLeft size={15} color="#367B4A" />
                        ) : (
                          <ArrowUpRight size={15} color="#252923" />
                        )}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.84rem', fontWeight: 600, color: '#252923', lineHeight: 1.2 }}>
                          {tx.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: '#7D8678', mt: 0.2 }}>
                          {tx.account}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Category */}
                  <TableCell sx={{ py: 1.4, borderBottom: '1px solid #EBEBE5' }}>
                    <Chip
                      label={tx.category}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        bgcolor: tx.category === 'Income' ? 'rgba(221, 240, 206, 0.5)' : '#EEECE4',
                        color: tx.category === 'Income' ? '#2F3C22' : '#5A6255',
                      }}
                    />
                  </TableCell>

                  {/* Date */}
                  <TableCell sx={{ py: 1.4, borderBottom: '1px solid #EBEBE5' }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#5A6255', whiteSpace: 'nowrap' }}>
                      {tx.date}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ py: 1.4, borderBottom: '1px solid #EBEBE5' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                      {tx.status === 'Cleared' ? (
                        <CheckCircle2 size={13} color="#367B4A" />
                      ) : (
                        <Clock size={13} color="#C48232" />
                      )}
                      <Typography
                        sx={{
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          color: tx.status === 'Cleared' ? '#367B4A' : '#C48232',
                        }}
                      >
                        {tx.status}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Amount */}
                  <TableCell align="right" sx={{ py: 1.4, borderBottom: '1px solid #EBEBE5' }}>
                    <Typography
                      className="tabular-numbers"
                      sx={{
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: tx.type === 'income' ? '#367B4A' : '#252923',
                      }}
                    >
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionsTable;

