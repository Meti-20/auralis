'use client';

import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  FileText,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { AuralisLogo } from '../common/AuralisLogo';
import { useUser } from '@/context/UserContext';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenReports: () => void;
  onOpenSettings: () => void;
  onOpenProductGuide?: () => void;
  onCloseMobile?: () => void;
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'cash-flow', label: 'Cash Flow', icon: TrendingUp },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'reports', label: 'Reports', icon: FileText, isModal: true },
  { id: 'settings', label: 'Settings', icon: Settings, isModal: true },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  onOpenReports,
  onOpenSettings,
  onOpenProductGuide,
  onCloseMobile,
}) => {
  const { profile } = useUser();

  const handleItemClick = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.id === 'reports') {
      onOpenReports();
    } else if (item.id === 'settings') {
      onOpenSettings();
    } else {
      onNavigate(item.id);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleOpenGuide = () => {
    if (onOpenProductGuide) {
      onOpenProductGuide();
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleProfileClick = () => {
    onOpenSettings();
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#FCFBF8',
        borderRight: '1px solid #DADBD5',
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
      }}
    >
      {/* Brand Header */}
      <Box sx={{ pb: 3, pt: 0.5, borderBottom: '1px solid #DADBD5' }}>
        <AuralisLogo size="medium" linked={false} />
      </Box>

      {/* Main Navigation Items */}
      <Box sx={{ mt: 2.5, flex: 1 }}>
        <Typography
          sx={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-manrope)',
            fontWeight: 800,
            color: '#7D8678',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            px: 1.5,
            mb: 1,
          }}
        >
          Menu
        </Typography>

        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(item)}
                  sx={{
                    borderRadius: '10px',
                    py: 1.1,
                    px: 1.6,
                    bgcolor: isActive ? '#252923' : 'transparent',
                    color: isActive ? '#F8F7F2' : '#5A6255',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: isActive ? '#3E502C' : '#EEECE4',
                      color: isActive ? '#F8F7F2' : '#252923',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: isActive ? '#DDF0CE' : '#7D8678',
                    }}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: 'var(--font-manrope)',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '0.86rem',
                    }}
                  />
                  {item.isModal && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: isActive ? '#DDF0CE' : '#DADBD5',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Product Guide Quick Link */}
      {onOpenProductGuide && (
        <Box sx={{ mb: 1.5 }}>
          <Box
            onClick={handleOpenGuide}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              p: 1.3,
              borderRadius: '10px',
              bgcolor: 'rgba(221, 240, 206, 0.45)',
              border: '1px solid #CBD8BA',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: 'rgba(221, 240, 206, 0.7)',
                borderColor: '#A5B98A',
              },
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '6px',
                bgcolor: '#DDF0CE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3E502C',
                flexShrink: 0,
              }}
            >
              <Sparkles size={14} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: '#252923',
                  lineHeight: 1.2,
                }}
              >
                Product Guide
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: '#5A6255', lineHeight: 1.2 }}>
                Revisit onboarding tour
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* User Profile Footer */}
      <Box sx={{ pt: 2, borderTop: '1px solid #DADBD5' }}>
        <Box
          onClick={handleProfileClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.4,
            p: 1,
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              bgcolor: '#EEECE4',
            },
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: '#3E502C',
                color: '#F8F7F2',
                fontFamily: 'var(--font-manrope)',
                fontWeight: 800,
                fontSize: '0.9rem',
              }}
            >
              {profile.initials || 'MJ'}
            </Avatar>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: '#367B4A',
                border: '2px solid #FCFBF8',
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 700,
                fontSize: '0.86rem',
                color: '#252923',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {profile.fullName}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.72rem',
                color: '#7D8678',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {profile.companyName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
