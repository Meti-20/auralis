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
  ExternalLink,
} from 'lucide-react';
import { AuralisLogo } from '../common/AuralisLogo';

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

  return (
    <Box
      sx={{
        width: 260,
        height: '100%',
        bgcolor: '#FCFBF8',
        borderRight: '1px solid #DADBD5',
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        userSelect: 'none',
      }}
    >
      {/* Brand Header */}
      <Box sx={{ mb: 3.5, px: 0.5 }}>
        <AuralisLogo size="medium" linked={false} />
        <Typography
          sx={{
            fontSize: '0.74rem',
            color: '#7D8678',
            mt: 0.8,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          Understand your money.
          <br />
          Make better decisions.
        </Typography>
      </Box>

      {/* Main Navigation List */}
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
                  px: 1.8,
                  bgcolor: isActive ? '#EEECE4' : 'transparent',
                  color: isActive ? '#252923' : '#5A6255',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: isActive ? '#EEECE4' : 'rgba(238, 236, 228, 0.6)',
                    color: '#252923',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color: isActive ? '#3E502C' : '#7D8678',
                  }}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontFamily: 'var(--font-manrope)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.88rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Product Guide quick button */}
      {onOpenProductGuide && (
        <Box sx={{ mt: 'auto', mb: 1.5 }}>
          <ListItemButton
            onClick={() => {
              onOpenProductGuide();
              if (onCloseMobile) onCloseMobile();
            }}
            sx={{
              borderRadius: '10px',
              py: 0.9,
              px: 1.5,
              bgcolor: 'rgba(221, 240, 206, 0.45)',
              border: '1px solid #CBD8BA',
              color: '#2F3C22',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: 'rgba(221, 240, 206, 0.8)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 28, color: '#3E502C' }}>
              <HelpCircle size={16} />
            </ListItemIcon>
            <ListItemText
              primary="Product Guide"
              primaryTypographyProps={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 700,
                fontSize: '0.82rem',
              }}
            />
          </ListItemButton>
        </Box>
      )}

      {/* Bottom User Profile Section */}
      <Box sx={{ mt: onOpenProductGuide ? 0 : 'auto', pt: 2, borderTop: '1px solid #DADBD5' }}>
        <Box
          onClick={onOpenSettings}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.2,
            borderRadius: '12px',
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
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              MJ
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
              Meti Jemal
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
              Acme Technologies Inc.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

