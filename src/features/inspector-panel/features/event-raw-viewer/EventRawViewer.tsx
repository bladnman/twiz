import { VStack } from '@common/mui-stacks.tsx';
import { useTheme } from '@mui/material';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { CSSProperties } from 'react';
import { jsonViewTheme_VSCodeDark } from '@features/inspector-panel/features/event-raw-viewer/json-view-themes.ts';

export default function EventRawViewer({
  event,
  collapsed = 2,
}: {
  event: object;
  collapsed?: number;
}) {
  const theme = useTheme();
  const mode = theme.palette.mode; // Accessing the mode (light/dark)
  return (
    <VStack fill topLeft sx={{ px: 2 }}>
      <JsonView
        value={event as object}
        collapsed={collapsed}
        displayDataTypes={false}
        enableClipboard={false}
        style={
          {
            ...(mode === 'dark' ? jsonViewTheme_VSCodeDark : lightTheme),
            backgroundColor: 'transparent',
          } as CSSProperties
        }
      />
    </VStack>
  );
}
