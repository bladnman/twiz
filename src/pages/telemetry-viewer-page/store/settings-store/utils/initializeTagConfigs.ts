import { SavedSettingsStore } from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { TAG_CONFIG } from '@pages/telemetry-viewer-page/constants/TAG_CONFIG.ts';

export default function initializeTagConfigs(
  savedStore: SavedSettingsStore,
): TagConfig[] {
  const savedConfigs = savedStore.__tag_configs || [];
  // start with the default tag configs
  const configs = [...TAG_CONFIG];

  // and then add or update any saved tag configs
  savedConfigs.forEach((savedConfig) => {
    const index = configs.findIndex((config) => config.key === savedConfig.key);
    // UPDATE
    if (index !== -1) {
      configs[index] = savedConfig;
    }
    // ADD
    else {
      configs.push(savedConfig);
    }
  });

  return configs;
}