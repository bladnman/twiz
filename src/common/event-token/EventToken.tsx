import TWEvent from '@classes/data/TWEvent.ts';
import BaseToken from '@common/event-token/parts/BaseToken.tsx';
import EventIcon from '@common/event-token/features/event-icon/EventIcon.tsx';
import EventDetails from '@common/event-token/features/event-details/EventDetails.tsx';
import { SxProps } from '@mui/material';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { getEventDef } from '@utils/event-utils/event-def/getEventDef.ts';
import EventTag from '@common/event-tag/EventTag.tsx';

interface TelemetryEventTokenProps extends TelemetryTokenProps {
  event: TWEvent;
  sx?: SxProps;
}
export default function EventToken(props: TelemetryEventTokenProps) {
  const { event, sx } = props;
  const storeTokenMode = useSettingsStore((state) => state.tokenMode);
  const storeTokenFontSize = useSettingsStore((state) => state.tokenFontSize);
  const storeTokenColorMode = useSettingsStore((state) => state.tokenColorMode);
  const storeTokenWidth = useSettingsStore((state) => state.tokenWidth);

  const tokenMode = storeTokenMode || props.tokenMode || 'details';
  const tokenFontSize = storeTokenFontSize || props.tokenFontSize || 1;
  const tokenColorMode = storeTokenColorMode || props.tokenColorMode || 'dual';
  const tokenWidth = storeTokenWidth || props.tokenWidth || 'min';

  const eventDef = getEventDef(event);

  return (
    <BaseToken
      eventColor={eventDef.color}
      eventIcon={<EventIcon event={event} fontSize={'1em'} />}
      // eventIcon={eventDef.appIcon}
      eventAbbrv={eventDef.abbreviation}
      // eventAbbrv={eventDef.typeIcon}

      eventDetails={<EventDetails event={event} colorMode={tokenColorMode} />}
      eventTag={<EventTag event={event} />}
      tokenFontSize={tokenFontSize}
      tokenColorMode={tokenColorMode}
      tokenMode={tokenMode}
      tokenWidth={tokenWidth}
      sx={sx}
    />
  );
}
