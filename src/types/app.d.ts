/**
 * @fileoverview
 * This file contains engineCode definitions for the Telemetry Viewer Page.
 *
 * We do NOT want any "export" statements in this file. If you include
 * the "export" keyword, the TypeScript compiler will treat this file
 * as a module, and you will not be able to use the types defined here
 * without "importing" them. THIS DEFEATS THE MAGIC OF TYPE INFERENCE.
 *
 * If you have types that need parts to be exported, you should define
 * a new engineCode file in this same folder. Those types will need to be
 * imported, while the majority (these) will not.
 */
type TokenMode = 'details' | 'tag' | 'icon';
type TokenWidth = 'min' | 'max';
type TokenColorMode = 'dual' | 'single' | 'none';
interface TelemetryTokenProps {
  eventIcon?: ReactNode;
  eventColor?: string;
  eventAbbrv?: string;
  eventDetails?: ReactNode;
  eventTag?: ReactNode;

  tokenMode?: TokenMode;
  tokenWidth?: TokenWidth;
  tokenFontSize?: number;
  tokenColorMode?: TokenColorMode;
}
type ConnectionPlatform = 'Mock' | 'Mobile' | 'TD Server' | 'TwizService';
type DetailsTab = 'Summary' | 'Notes' | 'Raw';
