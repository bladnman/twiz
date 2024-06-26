import TWEvent from '@classes/data/TWEvent.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import { SxProps } from '@mui/material';
import RowContextMenu from '@pages/timeline/features/main-body/features/timeline-list/features/telemetry-row/features/row-context-menu/RowContextMenu.tsx';
import TelemetryRow from '@pages/timeline/features/main-body/features/timeline-list/features/telemetry-row/TelemetryRow.tsx';
import TelemetryDivider from '@pages/timeline/features/main-body/features/timeline-list/features/TelemetryDivider.tsx';
import actionToggleEventForDetailsById from '@store/event-store/actions/actionToggleEventForDetailsById.ts';
import { useEventForDetails } from '@store/event-store/useEventStore.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { usePopupState } from 'material-ui-popup-state/hooks';
import React, { ReactNode, useMemo, useRef, useState } from 'react';

type SxGenerator = ((event: TWEvent) => SxProps | null) | null;
export default function TimelineList({
  events,
  allowDividers = true,
  allowSelection = true,
  generateRowSx = null,
  generateTokenSx = null,
}: {
  events: TWEvent[];
  allowDividers?: boolean;
  allowSelection?: boolean;
  generateRowSx?: SxGenerator;
  generateTokenSx?: SxGenerator;
}) {
  const [contextMenuEvent, setContextMenuEvent] = useState<TWEvent | null>(null);
  const eventForDetails = useEventForDetails();
  const { dividerFields } = useSettingsStore();
  let dividerValues = useRef<string[] | undefined[]>([]).current;
  const contextPopupState = usePopupState({
    variant: 'popover',
    popupId: 'event-row-context-menu',
  });
  const handleContextMenuClick = useMemo(() => {
    return (e: React.MouseEvent, event: TWEvent) => {
      e.preventDefault();
      setContextMenuEvent(event);
      if (event) {
        setTimeout(() => {
          contextPopupState.open(e);
        }, 100);
      }
    };
    // if you include contextPopupState in the dependencies, it will cause a re-render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally not exhaustive
  }, []);

  const renderRows = () => {
    const rows: ReactNode[] = [];
    if (!events || events.length < 1) return rows;
    events.forEach((event, idx) => {
      if (allowDividers && dividerFields.length > 0) {
        for (let i = 0; i < dividerFields.length; i++) {
          const dividerField = dividerFields[i];
          const dividerValue = dividerValues[i];
          const eventValue = event.getStr(dividerField, `(none)`);

          if (dividerValue !== eventValue) {
            // once we have a value not matching
            // we remove the following values
            dividerValues = dividerValues.slice(0, i);
            // then add the new value at this idx
            dividerValues[i] = eventValue;
            rows.push(
              <TelemetryDivider
                key={`divider_${dividerField}_${idx}`}
                field={dividerField}
                value={dividerValues[i] ?? ''}
                sx={{
                  pl: `${i}em`,
                  pt: 0,
                  pb: 0,
                  position: 'sticky',
                  top: `calc(0px + ${i * 30}px)`,
                  backgroundColor: 'bg.main',
                  zIndex: 1, // pulls the divider above the rows
                }}
              />,
            );
          }
        }
      }

      const lastDividerValue = dividerValues[dividerValues.length - 1];
      rows.push(
        <HStack
          hFill
          left
          sx={{ pl: `${Math.max(0, dividerFields.length - 1)}em` }}
          key={`row|:|${event.twId}|:|dividers:${lastDividerValue}`}
          data-event-id={event.twId}
        >
          <TelemetryRow
            event={event}
            selected={eventForDetails === event}
            onClick={allowSelection ? actionToggleEventForDetailsById : undefined}
            onContextClick={handleContextMenuClick}
            rowSx={generateRowSx ? generateRowSx(event) : {}}
            tokenSx={generateTokenSx ? generateTokenSx(event) : {}}
          />
        </HStack>,
      );
    });
    return rows;
  };
  return (
    <VStack hFill vAlign={'leading'} hAlign={'leading'} spacing={0}>
      {renderRows()}
      <RowContextMenu event={contextMenuEvent} popupState={contextPopupState} />
    </VStack>
  );
}
