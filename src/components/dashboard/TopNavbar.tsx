'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  ButtonGroup,
  Button,
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Bell,
  Menu as MenuIcon,
  Check,
  Calendar,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { DateRange, NotificationItem } from '@/types';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';

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
            Welcome back, Meti • Acme Technologies Inc.
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
                fontSize: { xs: '0.74rem', sm: '0.8rem' },
                px: { xs: 1.2, sm: 1.8 },
                py: 0.6,
                color: '#5A6255',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.6)',
                  color: '#252923',
                },
              },
            }}
          >
            {(
              [
                { id: '7d', label: 'Last 7 days' },
                { id: '30d', label: 'Last 30 days' },
                { id: '90d', label: 'Last 90 days' },
              ] as const
            ).map((range) => {
              const isSelected = selectedRange === range.id;
              return (
                <Button
                  key={range.id}
                  onClick={() => onRangeChange(range.id)}
                  sx={{
                    bgcolor: isSelected ? '#FCFBF8 !important' : 'transparent',
                    color: isSelected ? '#252923 !important' : '#5A6255',
                    boxShadow: isSelected ? '0 2px 4px rgba(37, 41, 35, 0.08)' : 'none',
                  }}
                >
                  {range.label}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>

        {/* Notifications Icon Button */}
        <IconButton
          onClick={(e) => setNotifAnchor(e.currentTarget)}
          aria-label="Open notifications"
          sx={{
            color: '#252923',
            bgcolor: '#EEECE4',
            p: 1.1,
            borderRadius: '10px',
            '&:hover': { bgcolor: '#DADBD5' },
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="success"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: '#367B4A',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 700,
                height: 18,
                minWidth: 18,
              },
            }}
          >
            <Bell size={18} />
          </Badge>
        </IconButton>

        {/* User Profile Avatar Trigger */}
        <IconButton
          onClick={(e) => setProfileAnchor(e.currentTarget)}
          aria-label="User profile menu"
          sx={{ p: 0.2 }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#3E502C',
              color: '#F8F7F2',
              fontFamily: 'var(--font-manrope)',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: '2px solid #EEECE4',
            }}
          >
            MJ
          </Avatar>
        </IconButton>
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
            borderRadius: '14px',
            bgcolor: '#FCFBF8',
            border: '1px solid #DADBD5',
            boxShadow: '0 12px 36px rgba(37, 41, 35, 0.1)',
            overflow: 'hidden',
            mt: 1,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #DADBD5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#FAF9F5',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'var(--font-manrope)', fontWeight: 700, fontSize: '0.92rem', color: '#252923' }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Box
                sx={{
                  px: 0.8,
                  py: 0.2,
                  bgcolor: '#DDF0CE',
                  color: '#2F3C22',
                  borderRadius: '10px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                }}
              >
                {unreadCount} new
              </Box>
            )}
          </Box>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllRead}
              sx={{
                fontSize: '0.72rem',
                textTransform: 'none',
                color: '#3E502C',
                fontWeight: 600,
                p: 0,
                minWidth: 'auto',
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
              }}
            >
              Mark all read
            </Button>
          )}
        </Box>

        <List sx={{ p: 0, maxHeight: 320, overflowY: 'auto' }}>
          {notifications.map((notif) => (
            <ListItem
              key={notif.id}
              onClick={() => handleToggleRead(notif.id)}
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: '1px solid #EBEBE5',
                bgcolor: notif.isRead ? '#FCFBF8' : 'rgba(221, 240, 206, 0.25)',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                '&:hover': { bgcolor: '#EEECE4' },
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.4 }}>
                    <Typography sx={{ fontSize: '0.84rem', fontWeight: notif.isRead ? 600 : 700, color: '#252923' }}>
                      {notif.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: '#7D8678' }}>
                      {notif.timestamp}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography sx={{ fontSize: '0.78rem', color: '#5A6255', lineHeight: 1.4 }}>
                    {notif.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 240,
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
            Meti Jemal
          </Typography>
          <Typography sx={{ fontSize: '0.74rem', color: '#7D8678' }}>
            meti@acmetech.io
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
          onClick={() => setProfileAnchor(null)}
          sx={{ fontSize: '0.84rem', py: 1, color: '#252923', '&:hover': { bgcolor: '#EEECE4' } }}
        >
          <ListItemIcon sx={{ minWidth: 28, color: '#5A6255' }}>
            <Building2 size={16} />
          </ListItemIcon>
          Acme Technologies (Active)
        </MenuItem>
        <Divider sx={{ borderColor: '#DADBD5' }} />
        <MenuItem
          onClick={() => setProfileAnchor(null)}
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

