import TWEvent from '@classes/data/TWEvent.ts';
import { create } from 'zustand';
import TelemetryFilter from '@classes/TelemetryFilter.ts';
import { persist } from 'zustand/middleware';
import initializeFilters from '@store/event-store/utils/initializeFilters.ts';

export interface EventStore {
  allEvents: TWEvent[];
  filters: TelemetryFilter[];
  eventTypeFilter: string[];
  maxEventCount: number;
  sequences: Sequences;

  // timeline features
  displayEvents: TWEvent[];
  eventForDetails: TWEvent | null;
}

/**
 * Event Store
 *
 * This store contains things that change VERY FREQUENTLY.
 * When referencing this store, be sure to use any helper
 * hook defined in this file.
 *
 * If you are adding something that does not change often,
 * even if it is related to events, consider putting it in
 * the settings store.
 *
 * See store/README.md for more information.
 *
 * Keep actions external to the store. This should be a pure store.
 */
const useEventStore = create<EventStore>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_set) => ({
      allEvents: [],
      filters: initializeFilters(),
      eventTypeFilter: [],
      maxEventCount: 10000,
      sequences: {},

      // timeline features
      displayEvents: [],
      eventForDetails: null,
    }),
    {
      name: 'event-store',
      partialize: (state) => {
        return {
          __filter_fields: state.filters.map((f) => ({
            field: f.field,
            isCollapsed: f.collapsed,
          })),
        };
      },
    },
  ),
);
export default useEventStore;

//  _  _          _     _  _     _
// | || |___  ___| |__ | || |___| |_ __  ___ _ _ ___
// | __ / _ \/ _ \ / / | __ / -_) | '_ \/ -_) '_(_-<
// |_||_\___/\___/_\_\ |_||_\___|_| .__/\___|_| /__/
//                                |_|
//
export const useAllEvents = () => useEventStore((state) => state.allEvents);
export const useDisplayEvents = () => useEventStore((state) => state.displayEvents);
export const useFilters = () => useEventStore((state) => state.filters);
export const useEventTypeFilter = () => useEventStore((state) => state.eventTypeFilter);
export const useEventForDetails = () => useEventStore((state) => state.eventForDetails);
export const useMaxEventCount = () => useEventStore((state) => state.maxEventCount);
export const useSequences = () => useEventStore((state) => state.sequences);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - forcing the store to global reference
window['eventStore'] = useEventStore;
console.warn(
  "The store is externalized for development mode under the label 'eventStore' here.\n\n Try `eventStore.getState()` to browse.",
);
