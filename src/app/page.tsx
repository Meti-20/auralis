'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Drawer,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { DateRange } from '@/types';
import { KPI_DATA_BY_RANGE } from '@/data/mockData';
import Sidebar from '@/components/dashboard/Sidebar';
import TopNavbar from '@/components/dashboard/TopNavbar';
import SummaryKPICards from '@/components/dashboard/SummaryKPICards';
import CashFlowAnalyticsChart from '@/components/dashboard/CashFlowAnalyticsChart';
import ExpenseBreakdown from '@/components/dashboard/ExpenseBreakdown';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import ReportsDialog from '@/components/dashboard/ReportsDialog';
import SettingsDialog from '@/components/dashboard/SettingsDialog';
import WelcomeScreen from '@/components/dashboard/WelcomeScreen';
import { UserProvider, useUser } from '@/context/UserContext';

function DashboardContent() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('30d');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // First-time welcome intro experience state
  const [showWelcome, setShowWelcome] = useState(false);

  // Dialog states
  const [reportsOpen, setReportsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const hasCompletedIntro = localStorage.getItem('auralis_intro_completed');
      if (!hasCompletedIntro) {
        setShowWelcome(true);
      }
    } catch {
      // In case localStorage is blocked or restricted
    }
  }, []);

  const handleDismissWelcome = () => {
    try {
      localStorage.setItem('auralis_intro_completed', 'true');
    } catch {
      // No-op
    }
    setShowWelcome(false);
  };

  const handleOpenWelcome = () => {
    setShowWelcome(true);
  };

  // Smooth scroll helper for single-page dashboard navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleCategorySelectFromBreakdown = (categoryName: string) => {
    setSelectedCategory(categoryName);
    handleNavigate('transactions');
  };

  const currentKPIs = KPI_DATA_BY_RANGE[selectedRange];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F7F2' }}>
      {/* 0. First-Time Welcome Onboarding Experience */}
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onDismiss={handleDismissWelcome} />}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 260,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 120,
        }}
      >
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenReports={() => setReportsOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenProductGuide={handleOpenWelcome}
        />
      </Box>

      {/* Mobile Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 270,
            bgcolor: '#FCFBF8',
            borderRight: '1px solid #DADBD5',
          },
        }}
      >
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenReports={() => setReportsOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenProductGuide={handleOpenWelcome}
          onCloseMobile={() => setMobileDrawerOpen(false)}
        />
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          bgcolor: '#F8F7F2',
        }}
      >
        {/* Sticky Top Navigation Bar */}
        <TopNavbar
          selectedRange={selectedRange}
          onRangeChange={(range) => setSelectedRange(range)}
          onOpenMobileMenu={() => setMobileDrawerOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenProductGuide={handleOpenWelcome}
        />

        {/* Dashboard Content Container */}
        <Container
          maxWidth="xl"
          id="overview"
          sx={{
            py: { xs: 2.5, sm: 3.5 },
            px: { xs: 2, sm: 3.5 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* 1. Four Financial Summary KPI Cards */}
          <SummaryKPICards
            kpis={currentKPIs}
            onCardClick={(key) => {
              if (key === 'income' || key === 'expenses' || key === 'net') {
                handleNavigate('cash-flow');
              } else if (key === 'balance') {
                handleNavigate('transactions');
              }
            }}
          />

          {/* 2. Main Analytics & Expense Breakdown Grid */}
          <Grid container spacing={3}>
            {/* Left: Main Cash Flow Analytics Chart */}
            <Grid item xs={12} lg={8}>
              <CashFlowAnalyticsChart selectedRange={selectedRange} />
            </Grid>

            {/* Right: Expense Category Breakdown */}
            <Grid item xs={12} lg={4}>
              <ExpenseBreakdown
                selectedRange={selectedRange}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelectFromBreakdown}
              />
            </Grid>
          </Grid>

          {/* 3. AI Financial Insights Card */}
          <AIInsightsCard />

          {/* 4. Recent Transactions Table */}
          <TransactionsTable
            externalCategoryFilter={selectedCategory}
            onClearExternalFilter={() => setSelectedCategory('All')}
          />
        </Container>

        {/* Bottom subtle copyright note */}
        <Box
          sx={{
            py: 2.5,
            px: { xs: 2, sm: 3.5 },
            borderTop: '1px solid #DADBD5',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            bgcolor: '#FCFBF8',
            mt: 'auto',
            gap: 1,
          }}
        >
          <Box
            sx={{
              fontFamily: 'var(--font-manrope)',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: '#252923',
            }}
          >
            AURALIS &bull; Cash Flow Analytics Workspace
          </Box>
          <Box sx={{ fontSize: '0.72rem', color: '#7D8678' }}>
            Illustrative Portfolio Demonstration &bull; Sample Financial Data
          </Box>
        </Box>
      </Box>

      {/* Interactive Modal Dialogs */}
      <ReportsDialog
        open={reportsOpen}
        onClose={() => setReportsOpen(false)}
        selectedRange={selectedRange}
      />
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onOpenWelcome={handleOpenWelcome}
      />
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  );
}
