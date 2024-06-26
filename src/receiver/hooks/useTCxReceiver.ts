import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TelemetryReceiver from '@src/receiver/classes/telemetry-receiver/TelemetryReceiver.ts';
import { TCxState, useTCx } from '@tcx-hosted/tcx-react';
import { TcxSS_CONFIG } from '@tcx-hosted/tcx-react/hooks/useTCx.ts';
import actionSetConnectedViaTCx from '@store/settings-store/actions/actionSetConnectedViaTCx.ts';
import actionClearConnectToTCxName from '@store/settings-store/actions/actionClearConnectToTCxName.ts';
import actionAddUnMappedEvents from '@store/event-store/actions/actionAddUnMappedEvents.ts';

export default function useTCxReceiver() {
  // the store is where events end up
  const { connectToTCxName } = useSettingsStore();
  const [tcxName] = useState('TelemetryViewer');

  // we use the receiver to receive events and to clean them up
  // before they are sent to the store
  const receiver = useMemo(() => new TelemetryReceiver(actionAddUnMappedEvents), []);

  const onData = useCallback(
    (events: unknown) => {
      receiver.receiveEvents(events);
    },
    [receiver],
  );
  const onStateChange = useCallback((state: TCxState) => {
    actionSetConnectedViaTCx(state.isConnectedToPeer);
  }, []);
  const onConnect = useCallback(() => {
    // noop
  }, []);
  const onDisconnect = useCallback(() => {
    actionClearConnectToTCxName();
  }, []);

  const tcxHandlers = useMemo(() => {
    return {
      onData: onData,
      onStateChange: onStateChange,
      onConnect: onConnect,
      onDisconnect: onDisconnect,
    };
  }, [onData, onStateChange, onConnect, onDisconnect]);

  const tcx = useTCx(tcxName, TcxSS_CONFIG, tcxHandlers);

  useEffect(() => {
    if (connectToTCxName) {
      tcx.connectTo(connectToTCxName).catch((err) => {
        console.error(`❌ Failed to connect to [${connectToTCxName}]`, err);
      });
    } else {
      tcx.disconnect();
    }
  }, [connectToTCxName, tcx]);

  return { receiver, tcx };
}
