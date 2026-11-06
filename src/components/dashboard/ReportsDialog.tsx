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
} from '@mui/material';
import { FileText, Download, CheckCircle2, X } from 'lucide-react';

interface ReportsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ReportsDialog: React.FC<ReportsDialogProps> = ({ open, onClose }) => {
  const [reportType, setReportType] = useState('cashflow');
  const [format, setFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setExportComplete(false);

    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
    }, 700);
  };

  const handleClose = () => {
    setExportComplete(false);
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
              bgcolor: '#DDF0CE',
              color: '#3E502C',
              display: 'flex',
            }}
          >
            <FileText size={18} />
          </Box>
          <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: '1.05rem', color: '#252923' }}>
            Export Financial Reports
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2.5 }}>
        <Typography sx={{ fontSize: '0.84rem', color: '#5A6255', mb: 2 }}>
          Generate presentation-ready executive digests or accounting ledger exports for your investors, accountants, and board.
        </Typography>

        {/* Report Template Selector */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#252923', textTransform: 'uppercase', mb: 1 }}>
            Select Statement:
          </Typography>
          <RadioGroup value={reportType} onChange={(e) => setReportType(e.target.value)}>
            {[
              { id: 'cashflow', title: 'Cash Flow & Inflow Statement', desc: 'Detailed receipts, vendor disbursements, and net retained cash.' },
              { id: 'expenses', title: 'Departmental Expense Breakdown', desc: 'Categorized operational outlay: Salaries, Marketing, Operations, Software.' },
              { id: 'tax', title: 'Tax & Compliance Preparation Ledger', desc: 'Itemized cleared transaction records with merchant references.' },
            ].map((item) => (
              <Box
                key={item.id}
                onClick={() => setReportType(item.id)}
                sx={{
                  p: 1.5,
                  borderRadius: '10px',
                  border: reportType === item.id ? '1px solid #A5B98A' : '1px solid #DADBD5',
                  bgcolor: reportType === item.id ? 'rgba(221, 240, 206, 0.25)' : '#FCFBF8',
                  mb: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
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
                  <Typography sx={{ fontSize: '0.76rem', color: '#7D8678' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </RadioGroup>
        </Box>

        {/* Format Selector */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#252923', textTransform: 'uppercase', mb: 1 }}>
            File Format:
          </Typography>
          <RadioGroup row value={format} onChange={(e) => setFormat(e.target.value)}>
            <FormControlLabel
              value="pdf"
              control={<Radio size="small" sx={{ color: '#3E502C', '&.Mui-checked': { color: '#3E502C' } }} />}
              label={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>PDF Presentation</Typography>}
            />
            <FormControlLabel
              value="xlsx"
              control={<Radio size="small" sx={{ color: '#3E502C', '&.Mui-checked': { color: '#3E502C' } }} />}
              label={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>Excel Spreadsheet (.xlsx)</Typography>}
            />
          </RadioGroup>
        </Box>

        {exportComplete && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: '8px',
              bgcolor: '#E2F3E7',
              border: '1px solid #A5B98A',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CheckCircle2 size={16} color="#367B4A" />
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#2F3C22' }}>
              Report generated successfully! (Simulated download completed)
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
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
          disabled={isExporting}
          onClick={handleExport}
          startIcon={isExporting ? <CircularProgress size={14} color="inherit" /> : <Download size={14} />}
          sx={{
            bgcolor: '#252923',
            color: '#F8F7F2',
            textTransform: 'none',
            fontSize: '0.84rem',
            fontWeight: 600,
            '&:hover': { bgcolor: '#3E502C' },
          }}
        >
          {isExporting ? 'Generating...' : `Export ${format.toUpperCase()}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportsDialog;

