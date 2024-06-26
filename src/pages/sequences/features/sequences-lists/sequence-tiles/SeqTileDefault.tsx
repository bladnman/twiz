import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import getEventDefAppIcon from '@utils/event-utils/event-def/getEventDefAppIcon.ts';

export default function SeqTileDefault({ sequence }: SequenceTileProps) {
  const icon = getEventDefAppIcon(sequence.engine.appName as string);
  const label = sequence.engine.appName as string;
  const description = sequence.name;

  const uniqueDescription = description !== label ? description : null;

  const tileSx = {
    px: 1,
    py: 0.5,
    borderRadius: 1,
  };
  return (
    <VStack hFill left spaceBetween sx={tileSx} spacing={0}>
      <HStack hFill left spaceBetween spacing={4}>
        <HStack topLeft spacing={1}>
          <VStack topLeft spacing={0} sx={{ pt: 0.25 }}>
            <Typography variant="body1">{icon}</Typography>
          </VStack>
          <VStack topLeft spacing={0}>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'nowrap',
                // color: isSelected ? `${selectionColorName}.contrastText` : 'fg.main',
              }}
            >
              {label}
            </Typography>
            {uniqueDescription && (
              <VStack hFill left>
                <Typography
                  variant="caption"
                  sx={
                    {
                      // color: isSelected ? `${selectionColorName}.contrastText` : 'fg.main',
                      // opacity: 0.7,
                    }
                  }
                >
                  {description}
                </Typography>
              </VStack>
            )}
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
}
