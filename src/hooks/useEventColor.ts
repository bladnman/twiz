import TWEvent from '@classes/data/TWEvent.ts';
import getEventColorName from '@utils/event-utils/getEventColorName.ts';
import { useMemo } from 'react';

/**
 * Returns the color of the event engineCode
 *
 * NOTE: This will return the "overall" color, not
 * a specific shade of the color. This will be a string,
 * but cannot be used directly as a color unless given
 * to a MUI component.
 *
 * Example:
 *
 * This may give you 'appRed' back. But to use that in
 * something like an sx prop, you would need to do
 * `${'appRed'}.main` to get the actual color.
 *
 * In a button you can do:
 * <Button color='appRed'>
 *
 * This is because MUI uses the color prop and will apply
 * the main, light, and dark shades as needed.
 */
export default function useEventColor(event: TWEvent, defaultColor: string = 'fg') {
  return useMemo(() => {
    return getEventColorName(event, defaultColor);
  }, [event.twType]);
}
