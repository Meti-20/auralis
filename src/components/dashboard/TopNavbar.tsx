'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  ButtonGroup,
  Button,
  IconButton,
  Avatar,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Bell,
  Menu as MenuIcon,
  Check,
  CheckCheck,
  Settings,
  HelpCircle,
  Building2,
  AlertTriangle,
  TrendingUp,
  Receipt,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { DateRange, NotificationItem } from '@/types';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';
import { useUser } from '@/context/UserContext';

interface TopNavbarProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  onOpenMobileMenu: () => void;
  onOpenSettings: () => void;
  onOpenProductGuide?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  selectedRange,
  onRangeChange,
  onOpenMobileMenu,
  onOpenSettings,
  onOpenProductGuide,
}) => {
  const { profile, isLoaded } = useUser();

  // Notifications Popover state
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [notifAnchor, setNotifAnchor] = useState<HTMLButtonElement | null>(null);

  // Profile Menu state
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  // Keyboard navigation: Close popups on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNotifAnchor(null);
        setProfileAnchor(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        bgcolor: '#FCFBF8',
        borderBottom: '1px solid #DADBD5',
        py: { xs: 1.8, sm: 2.2 },
        px: { xs: 2, sm: 3.5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left: Mobile Toggle + Title & Welcome */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
        <IconButton
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
            p: 1,
            color: '#252923',
            bgcolor: '#EEECE4',
            borderRadius: '8px',
          }}
        >
          <MenuIcon size={20} />
        </IconButton>

        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'var(--font-manrope)',
              fontWeight: 800,
              fontSize: { xs: '1.15rem', sm: '1.35rem' },
              color: '#252923',
              lineHeight: 1.2,
            }}
          >
            Financial Overview
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.74rem', sm: '0.8rem' },
              color: '#7D8678',
              mt: 0.2,
            }}
          >
            Welcome back, {profile.firstName} &bull; {profile.companyName}
          </Typography>
        </Box>
      </Box>

      {/* Right: Date-Range Selector & Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {/* Date-Range Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                fontSize: { xs: '0.72rem', sm: '0.78rem' },
                px: { xs: 1, sm: 1.6 },
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
            {(['7d', '30d', '90d'] as DateRange[]).map((range) => {
              const active = selectedRange === range;
              const labels: Record<DateRange, string> = {
                '7d': '7 Days',
                '30d': '30 Days',
                '90d': '90 Days',
              };
              return (
                <Button
                  key={range}
                  onClick={() => onRangeChange(range)}
                  sx={{
                    bgcolor: active ? '#FCFBF8 !important' : 'transparent',
                    color: active ? '#252923 !important' : '#5A6255',
                    boxShadow: active ? '0 2px 4px rgba(37, 41, 35, 0.08)' : 'none',
                  }}
                >
                  {labels[range]}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>

        {/* Notifications Icon Button */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={(e) => setNotifAnchor(e.currentTarget)}
            aria-label="Open notifications"
            sx={{
              p: 1.1,
              bgcolor: '#FAF9F5',
              border: '1px solid #DADBD5',
              borderRadius: '10px',
              color: '#252923',
              '&:hover': { bgcolor: '#EEECE4' },
            }}
          >
            <Badge
              badgeContent={unreadCount}
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: '#3E502C',
                  color: '#F8F7F2',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  height: 17,
                  minWidth: 17,
                },
              }}
            >
              <Bell size={18} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* User Profile Avatar Button */}
        <Tooltip title="User Profile">
          <Box
            onClick={(e) => setProfileAnchor(e.currentTarget)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              p: 0.4,
              pl: { xs: 0.4, sm: 1.2 },
              borderRadius: '24px',
              border: '1px solid #DADBD5',
              bgcolor: '#FAF9F5',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: '#EEECE4',
                borderColor: '#A5B98A',
              },
            }}
          >
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#252923',
                fontFamily: 'var(--font-manrope)',
                pr: 0.5,
              }}
            >
              {profile.firstName}
            </Typography>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#3E502C',
                color: '#F8F7F2',
                fontFamily: 'var(--font-manrope)',
                fontWeight: 800,
                fontSize: '0.82rem',
              }}
            >
              {profile.initials || 'MJ'}
            </Avatar>
          </Box>
        </Tooltip>
      </Box>

      {/* Notifications Popover */}
      <Popover
        open={Boolean(notifAnchor)}
        anchorEl={notifAnchor}
        onClose={() => setNotifAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 340,
            maxWidth: '92vw',
            borderRadius: '14px',
            bgcolor: '#FCFBF8',
            border: '1px solid #DADBD5',
            boxShadow: '0 12px 32px rgba(37, 41, 35, 0.12)',
            mt: 1,
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #DADBD5',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 800, fontSize: '0.94rem', color: '#252923' }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} new`}
                size="small"
                sx={{
                  bgcolor: '#DDF0CE',
                  color: '#2F3C22',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  height: 20,
                }}
              />
            )}
          </Box>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllRead}
              startIcon={<CheckCheck size={14} />}
              sx={{
                fontSize: '0.74rem',
                textTransform: 'none',
                color: '#3E502C',
                fontWeight: 600,
                p: 0.5,
              }}
            >
              Mark all read
            </Button>
          )}
        </Box>

        <List sx={{ p: 0, maxHeight: 340, overflowY: 'auto' }}>
          {notifications.map((notif) => (
            <ListItem
              key={notif.id}
              onClick={() => handleToggleRead(notif.id)}
              sx={{
                py: 1.5,
                px: 2,
                cursor: 'pointer',
                bgcolor: notif.isRead ? '#FCFBF8' : 'rgba(221, 240, 206, 0.25)',
                borderBottom: '1px solid #EEECE4',
                transition: 'background-color 0.15s ease',
                '&:hover': { bgcolor: '#FAF9F5' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {notif.type === 'transaction' && <Receipt size={17} color="#367B4A" />}
                {notif.type === 'alert' && <AlertTriangle size={17} color="#C48232" />}
                {notif.type === 'system' && <TrendingUp size={17} color="#3E502C" />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.3 }}>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: notif.isRead ? 600 : 700, color: '#252923' }}>
                      {notif.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: '#7D8678' }}>
                      {notif.timestamp}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography sx={{ fontSize: '0.76rem', color: '#5A6255', lineHeight: 1.35 }}>
                    {notif.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* User Profile Menu Dropdown */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 250,
            borderRadius: '12px',
            bgcolor: '#FCFBF8',
            border: '1px solid #DADBD5',
            boxShadow: '0 8px 24px rgba(37, 41, 35, 0.08)',
            mt: 1,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '0.88rem', color: '#252923' }}>
            {profile.fullName}
          </Typography>
          <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
            {profile.email}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#DADBD5' }} />
        {onOpenProductGuide && (
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              onOpenProductGuide();
            }}
            sx={{ fontSize: '0.84rem', py: 1, color: '#252923', '&:hover': { bgcolor: '#EEECE4' } }}
          >
            <ListItemIcon sx={{ minWidth: 28, color: '#3E502C' }}>
              <Sparkles size={16} />
            </ListItemIcon>
            Product Guide &amp; Intro
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setProfileAnchor(null);
            onOpenSettings();
          }}
          sx={{ fontSize: '0.84rem', py: 1, color: '#252923', '&:hover': { bgcolor: '#EEECE4' } }}
        >
          <ListItemIcon sx={{ minWidth: 28, color: '#5A6255' }}>
            <Settings size={16} />
          </ListItemIcon>
          Workspace Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setProfileAnchor(null);
            onOpenSettings();
          }}
          sx={{ fontSize: '0.84rem', py: 1, color: '#252923', '&:hover': { bgcolor: '#EEECE4' } }}
        >
          <ListItemIcon sx={{ minWidth: 28, color: '#5A6255' }}>
            <Building2 size={16} />
          </ListItemIcon>
          {profile.companyName}
        </MenuItem>
        <Divider sx={{ borderColor: '#DADBD5' }} />
        <MenuItem
          onClick={() => {
            setProfileAnchor(null);
            if (onOpenProductGuide) onOpenProductGuide();
          }}
          sx={{ fontSize: '0.84rem', py: 1, color: '#5A6255', '&:hover': { bgcolor: '#EEECE4' } }}
        >
          <ListItemIcon sx={{ minWidth: 28, color: '#7D8678' }}>
            <HelpCircle size={16} />
          </ListItemIcon>
          Help &amp; Documentation
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TopNavbar;
