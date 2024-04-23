import { useCallback, useMemo } from 'react';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionUpdateTagConfig from '@pages/telemetry-viewer-page/store/settings-store/actions/actionUpdateTagConfig.ts';

export default function useTagConfigs() {
  const { tagConfigs } = useSettingsStore((state) => state);

  const toggleTag = useCallback(
    (tagConfig: TagConfig) => {
      tagConfig.isActive = !tagConfig.isActive;
      actionUpdateTagConfig(tagConfig);
    },
    [tagConfigs],
  );
  const addTag = useCallback(
    (tagConfig: TagConfig) => {
      actionUpdateTagConfig(tagConfig);
    },
    [tagConfigs],
  );
  return useMemo(() => {
    return {
      tagConfigs,
      selectedTagConfigs: tagConfigs.filter((tag) => tag.isActive),
      toggleTag,
    };
  }, [tagConfigs, toggleTag, addTag]);
}
