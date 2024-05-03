import useSummaryComponent from '@pages/timeline/features/right-drawer/features/details-summary-viewer/hooks/useSummaryComponent.ts';
import { VStack } from '@common/mui-stacks.tsx';

export default function DetailsSummaryViewer({ event }: { event: TVEvent }) {
  const SummaryComponent = useSummaryComponent(event);
  if (!SummaryComponent) return null;

  return (
    <VStack hFill sx={{ p: 3, flexShrink: 0 }}>
      <VStack
        hFill
        sx={{
          backgroundColor: 'bg90.main',
          padding: '1em',
          borderRadius: '0.5em',
        }}
      >
        <SummaryComponent event={event} />
      </VStack>
    </VStack>
  );
}
