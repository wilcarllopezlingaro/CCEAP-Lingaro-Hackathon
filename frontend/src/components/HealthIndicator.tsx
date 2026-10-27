import React, { useState, useEffect } from 'react';
import { Box, Chip, Tooltip } from '@mui/material';
import { CheckCircle, Error, Warning } from '@mui/icons-material';
import { healthService } from '../services/apiService';

type HealthStatus = 'checking' | 'healthy' | 'degraded' | 'unhealthy';

interface HealthIndicatorProps {
  /**
   * Interval in milliseconds for health checks (default: 1000ms)
   */
  checkInterval?: number;
}

export const HealthIndicator: React.FC<HealthIndicatorProps> = ({
  checkInterval = 1000
}) => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('checking');
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [statusDetails, setStatusDetails] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      const response = await healthService.checkHealth();
      
      if (response.status === 'healthy') {
        // State 3: Both backend and database working
        setHealthStatus('healthy');
        setStatusDetails('Backend and database are healthy');
      } else if (response.status === 'degraded') {
        // This shouldn't happen with current implementation but keeping for completeness
        setHealthStatus('degraded');
        setStatusDetails('Backend healthy, database issues');
      }
      
      setLastCheck(new Date());
    } catch (err: unknown) {
      let errorMessage = 'Health check failed';
      let status: HealthStatus = 'unhealthy';
      
      if (err && typeof err === 'object' && 'status' in err && err.status === 503) {
        // State 2: Backend works but database doesn't (HTTP 503)
        status = 'degraded';
        errorMessage = 'Backend healthy, database unavailable';
      } else {
        // State 1: Backend completely down (network error, timeout, etc.)
        status = 'unhealthy';
        errorMessage = 'Backend not responding';
      }
      
      setHealthStatus(status);
      setStatusDetails(errorMessage);
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    // Initial check
    checkHealth();

    // Set up interval
    const interval = setInterval(checkHealth, checkInterval);

    // Cleanup
    return () => clearInterval(interval);
  }, [checkInterval]);

  const getIndicatorProps = () => {
    switch (healthStatus) {
      case 'checking':
        return {
          label: 'Checking...',
          color: 'default' as const,
          icon: undefined
        };
      case 'healthy':
        return {
          label: 'All Systems Healthy',
          color: 'success' as const,
          icon: <CheckCircle sx={{ fontSize: 16 }} />
        };
      case 'degraded':
        return {
          label: 'Backend OK, DB Issue',
          color: 'warning' as const,
          icon: <Warning sx={{ fontSize: 16 }} />
        };
      case 'unhealthy':
        return {
          label: 'Backend Down',
          color: 'error' as const,
          icon: <Error sx={{ fontSize: 16 }} />
        };
      default:
        return {
          label: 'Unknown',
          color: 'default' as const,
          icon: undefined
        };
    }
  };

  const { label, color, icon } = getIndicatorProps();

  const tooltipText = `Last check: ${lastCheck?.toLocaleTimeString() || 'Never'} - ${statusDetails || 'No details'}`;

  return (
    <Box>
      <Tooltip title={tooltipText} arrow>
        <Chip
          label={label}
          color={color}
          size="small"
          icon={icon}
          variant="filled"
        />
      </Tooltip>
    </Box>
  );
};

export default HealthIndicator;