export const EVENT_TYPES = [
  'ApplicationError',
  'AvatarImageLoad',
  'Interaction',
  'LoadTime',
  'Navigation',
  'NetworkError',
  'Startup',
  'VideoStream',
  'ViewableImpression',
  'ApplicationDbAppBrowse',
  'SetBackgroundResult',
  'AsyncStorageInternalError',
  'NpdrmGetPreorderFailure',
  'NpdrmRightsVerification',
  'NpdrmGetInternalEntitlements',
  'NpdrmGetRif',
  'NpdrmDrmServiceFailure',
  'NpWebApi2WebApiUsageStats',
  'NpWebApi2SdkApiErrorStats',
  'NetSocketTraffic',
  'PlayGoApiStats',
  'PatchCheckEnd',
  'ErrorDialog',
  'ConsoleLogout',
  'ConsoleLogin',
  'PeripheralConnection',
  'ActiveSignin',
  'PushSdkApiUsageStats',
  'UserAndPeripheralBinding',
  'GetRifFailure',
  'AppFrameworkError',
  'AppSessionCrash',
  'JSCdNativeModuleError',
  'NetSocketTraffic',
  'ControllerProfilingData',
  'HttpCacheStatistics',
  'JSCdNativeModuleError',
  'SaveDataAutoSyncCondition',
  'NetStackData',
  'DbHeapSize',
  'NotificationDb',
  'TraceSpan',
  'TelemetryDropped',
  'Other',
] as const;
export type EventTypes = (typeof EVENT_TYPES)[number];
