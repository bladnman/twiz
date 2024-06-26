import TWEvent from '@classes/data/TWEvent.ts';
import DetailDisplay from '@common/event-token/features/event-details/parts/DetailDisplay.tsx';
import getEventDescriptions from '@utils//event-utils/getEventDescriptions.ts';
export default function EventDetails({
  event,
  colorMode = 'dual',
  displayMode = 'details',
}: {
  event: TWEvent;
  fontSize?: string;
  colorMode?: TokenColorMode;
  displayMode?: TokenMode;
}) {
  const includeColor = colorMode === 'dual';
  const includeMessage = displayMode === 'details';
  const { highlight, message, color = 'fg.main' } = getEventDescriptions(event);
  const finalMessage = includeMessage ? message : undefined;

  // bail - no highlight or message
  if (highlight === undefined && finalMessage === undefined) return null;

  return (
    <DetailDisplay
      highlight={highlight as string}
      message={finalMessage as string}
      color={includeColor ? color : undefined}
    />
  );
}
