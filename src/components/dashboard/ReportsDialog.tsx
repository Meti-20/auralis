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
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { FileText, Download, CheckCircle2, X, Printer, ShieldCheck } from 'lucide-react';
import { DateRange } from '@/types';
import { KPI_DATA_BY_RANGE, EXPENSE_CATEGORIES_BY_RANGE, MOCK_TRANSACTIONS_LIST } from '@/data/mockData';
import { useUser } from '@/context/UserContext';
import { exportFinancialStatementCSV, openPrintableReport } from '@/utils/exportUtils';

interface ReportsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedRange?: DateRange;
}

export const ReportsDialog: React.FC<ReportsDialogProps> = ({
  open,
  onClose,
  selectedRange = '30d',
}) => {
  const { profile, preferences } = useUser();
  const [reportType, setReportType] = useState<'cashflow' | 'expenses' | 'tax'>('cashflow');
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportedResult, setExportedResult] = useState<string | null>(null);

  const handleExport = () => {
    setIsExporting(true);
    setExportedResult(null);

    const kpis = KPI_DATA_BY_RANGE[selectedRange];
    const categories = EXPENSE_CATEGORIES_BY_RANGE[selectedRange];

    setTimeout(() => {
      if (format === 'csv') {
        const { success, filename } = exportFinancialStatementCSV({
          reportType,
          dateRange: selectedRange,
          kpis,
          categories,
          transactions: MOCK_TRANSACTIONS_LIST,
          profile,
          preferences,
        });
        setIsExporting(false);
        if (success) {
          setExportedResult(`Generated and downloaded ${filename}`);
        }
      } else {
        // PDF / Printable Statement
        openPrintableReport({
          reportType,
          dateRange: selectedRange,
          kpis,
          categories,
          transactions: MOCK_TRANSACTIONS_LIST,
          profile,
          preferences,
        });
        setIsExporting(false);
        setExportedResult('Printable presentation statement opened in a new tab.');
      }
    }, 400);
  };

  const handleClose = () => {
    setExportedResult(null);
    setIsExporting(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: '16px', sm: '20px' },
          bgcolor: '#FCFBF8',
          border: '1px solid #DADBD5',
          boxShadow: '0 24px 64px rgba(37, 41, 35, 0.15)',
          p: { xs: 1, sm: 1.5 },
          m: { xs: 1.5, sm: 2 },
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
          pt: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              p: 0.8,
              borderRadius: '8px',
              bgcolor: '#DDF0CE',
              color: '#3E502C',
              display: 'flex',
            }}
          >
            <FileText size={18} />
          </Box>
          <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: { xs: '0.98rem', sm: '1.1rem' }, color: '#252923' }}>
            Export Financial Statements
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} aria-label="Close dialog">
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2.5, px: { xs: 2, sm: 3 } }}>
        <Typography sx={{ fontSize: '0.84rem', color: '#5A6255', mb: 2 }}>
          Download executive digests and itemized spreadsheets for {profile.companyName} covering the trailing{' '}
          <strong>{selectedRange.toUpperCase()}</strong> window.
        </Typography>

        {/* Report Template Selector */}
        <Box sx={{ mb: 2.8 }}>
          <Typography sx={{ fontSize: '0.76rem', fontWeight: 700, color: '#252923', textTransform: 'uppercase', letterSpacing: '0.04em', mb: 1 }}>
            Select Statement Type:
          </Typography>
          <RadioGroup value={reportType} onChange={(e) => setReportType(e.target.value as any)}>
            {[
              {
                id: 'cashflow',
                title: 'Cash Flow & Inflow Statement',
                desc: 'Executive summary with revenue velocity, vendor debits, and net retained surplus.',
              },
              {
                id: 'expenses',
                title: 'Departmental Expense Breakdown',
                desc: 'Itemized operational outlay across Salaries, Marketing, Operations, and Software.',
              },
              {
                id: 'tax',
                title: 'Tax & Compliance Preparation Ledger',
                desc: 'Cleared transaction ledger records with merchant references and accounts.',
              },
            ].map((item) => (
              <Box
                key={item.id}
                onClick={() => setReportType(item.id as any)}
                sx={{
                  p: 1.5,
                  borderRadius: '10px',
                  border: reportType === item.id ? '1.5px solid #A5B98A' : '1px solid #DADBD5',
                  bgcolor: reportType === item.id ? 'rgba(221, 240, 206, 0.3)' : '#FAF9F5',
                  mb: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.2,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    borderColor: '#A5B98A',
                    bgcolor: reportType === item.id ? 'rgba(221, 240, 206, 0.4)' : '#FCFBF8',
                  },
                }}
              >
                <Radio
                  checked={reportType === item.id}
                  value={item.id}
                  size="small"
                  sx={{ color: '#3E502C', '&.Mui-checked': { color: '#3E502C' }, p: 0.2, mt: 0.2 }}
                />
                <Box>
                  <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#252923' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.74rem', color: '#7D8678', lineHeight: 1.4 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </RadioGroup>
        </Box>

        {/* Format Selector */}
        <Box sx={{ mb: 2.5 }}>
          <Typography sx={{ fontSize: '0.76rem', fontWeight: 700, color: '#252923', textTransform: 'uppercase', letterSpacing: '0.04em', mb: 1 }}>
            File Format:
          </Typography>
          <RadioGroup row value={format} onChange={(e) => setFormat(e.target.value as any)}>
            <FormControlLabel
              value="csv"
              control={<Radio size="small" sx={{ color: '#3E502C', '&.Mui-checked': { color: '#3E502C' } }} />}
              label={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>CSV Spreadsheet (.csv)</Typography>}
            />
            <FormControlLabel
              value="pdf"
              control={<Radio size="small" sx={{ color: '#3E502C', '&.Mui-checked': { color: '#3E502C' } }} />}
              label={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>Printable / PDF Statement</Typography>}
            />
          </RadioGroup>
        </Box>

        {exportedResult && (
          <Alert
            severity="success"
            icon={<CheckCircle2 size={16} />}
            sx={{
              bgcolor: '#E2F3E7',
              color: '#2F3C22',
              fontSize: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #A5B98A',
              mb: 1,
            }}
          >
            {exportedResult}
          </Alert>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1 }}>
          <ShieldCheck size={14} color="#7D8678" />
          <Typography sx={{ fontSize: '0.72rem', color: '#7D8678' }}>
            Client-side generation using local illustrative workspace data.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: 2, pt: 1, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            borderColor: '#DADBD5',
            color: '#252923',
            textTransform: 'none',
            fontSize: '0.84rem',
            fontWeight: 600,
            borderRadius: '8px',
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          disabled={isExporting}
          onClick={handleExport}
          startIcon={
            isExporting ? (
              <CircularProgress size={14} color="inherit" />
            ) : format === 'pdf' ? (
              <Printer size={14} />
            ) : (
              <Download size={14} />
            )
          }
          sx={{
            bgcolor: '#252923',
            color: '#F8F7F2',
            textTransform: 'none',
            fontSize: '0.84rem',
            fontWeight: 700,
            borderRadius: '8px',
            px: 2.4,
            '&:hover': { bgcolor: '#3E502C' },
          }}
        >
          {isExporting ? 'Generating...' : format === 'pdf' ? 'Open & Print PDF' : 'Download CSV'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportsDialog;
