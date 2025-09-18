import { getFeatureFlags } from '../../utils/configuration';
import CallLoggingConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.call_logging as CallLoggingConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
