'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

interface AuralisLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'mark';
  linked?: boolean;
}

export const AuralisBrandMark: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Outer subtle shield / base container */}
      <rect
        width="40"
        height="40"
        rx="10"
        fill="#252923"
      />
      {/* Precision architectural 'A' symbol with dynamic financial ascendant lines */}
      <path
        d="M20 7L30.5 28.5H25.2L20 17.5L14.8 28.5H9.5L20 7Z"
        fill="#F8F7F2"
      />
      {/* Geometric horizontal intelligence beam in Sage Green */}
      <path
        d="M13.5 22.8H26.5L25 25.8H15L13.5 22.8Z"
        fill="#A5B98A"
      />
      {/* Futuristic AI core jewel in Pale Lime */}
      <circle
        cx="20"
        cy="24.3"
        r="1.8"
        fill="#DDF0CE"
      />
    </svg>
  );
};

export const AuralisLogo: React.FC<AuralisLogoProps> = ({
  size = 'medium',
  variant = 'full',
  linked = true,
}) => {
  const markDimensions = size === 'small' ? 26 : size === 'large' ? 42 : 32;
  const wordmarkFontSize = size === 'small' ? '1.1rem' : size === 'large' ? '1.75rem' : '1.35rem';

  const content = (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        textDecoration: 'none',
        userSelect: 'none',
        transition: 'opacity 0.15s ease',
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      <AuralisBrandMark size={markDimensions} />
      {variant === 'full' && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            component="span"
            sx={{
              fontFamily: 'var(--font-manrope), sans-serif',
              fontWeight: 800,
              fontSize: wordmarkFontSize,
              letterSpacing: '0.08em',
              color: '#252923',
              lineHeight: 1,
            }}
          >
            AURALIS
          </Typography>
          {size === 'large' && (
            <Typography
              component="span"
              sx={{
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7D8678',
                mt: 0.4,
                fontWeight: 600,
              }}
            >
              Financial Intelligence
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );

  if (linked) {
    return (
      <Link href="/" style={{ textDecoration: 'none' }} aria-label="Auralis Home">
        {content}
      </Link>
    );
  }

  return content;
};

export default AuralisLogo;

