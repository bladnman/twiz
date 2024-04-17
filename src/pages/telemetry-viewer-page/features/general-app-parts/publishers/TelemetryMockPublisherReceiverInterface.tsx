import { useCallback, useMemo } from 'react';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { Button } from '@mui/material';
import telemetryDebuggerEvents from '@pages/telemetry-viewer-page/data/mobile_session_full.json';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import TelemetryReceiver from '@pages/telemetry-viewer-page/classes/telemetry-receiver/TelemetryReceiver.ts';
import actionAddEvents from '@pages/telemetry-viewer-page/store/event-store/actions/actionAddEvents.ts';
export default function TelemetryMockPublisherReceiverInterface() {
  // the receiver is the part that receives events and sends them to the store
  const receiver = useMemo(() => new TelemetryReceiver(actionAddEvents), []);
  const onData = useCallback(
    (events: unknown) => {
      receiver.receiveEvents(events);
    },
    [receiver],
  );

  // create a MOCK PUBLISHER at this time
  // to act like we are getting data sent to us
  const publisher = useTCxMockPublisher<TelemetryDebuggerEvent>(
    onData,
    100,
    telemetryDebuggerEvents,
  );

  return (
    <HStack>
      {!publisher.isRunning && (
        <Button
          variant={'contained'}
          // @ts-expect-error : using my own colors
          color={'appGreen'}
          onClick={() => publisher.start()}
        >
          <PlayArrowIcon />
        </Button>
      )}
      {publisher.isRunning && (
        <Button
          variant={'contained'}
          // @ts-expect-error : using my own colors
          color={'appRed'}
          onClick={() => publisher.stop()}
        >
          <StopIcon />
        </Button>
      )}
    </HStack>
  );
}