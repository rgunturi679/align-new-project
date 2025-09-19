import { getFeatureFlags } from '../../utils/configuration';
import CallLogging2Config from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.call_logging2 as CallLogging2Config) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
