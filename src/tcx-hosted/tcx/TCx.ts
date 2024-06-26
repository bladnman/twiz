import { IWebSocketConstructor, TCxSSOptions } from './TCxSignalServerManager';
import TCxConnectionManager from './TCxConnectionManager';

export default class TCx {
  private readonly WS: IWebSocketConstructor;
  private readonly RTC: TCxRTC.IRTCPeerConnectionConstructor;
  name: string;
  onStateChange: () => void;
  options: TCxSSOptions;
  onData?: (data: unknown) => void;
  connectionHandlers?: {
    onConnect?: () => void;
    onDisconnect?: () => void;
  };

  private readonly ssCnxMgr: TCxConnectionManager;

  get isConnectedToSignalServer(): boolean {
    return this.ssCnxMgr.isConnectedToSignalServer;
  }
  get isConnectedToPeer(): boolean {
    return this.ssCnxMgr.isConnectedToPeer;
  }

  constructor(
    WS: IWebSocketConstructor,
    RTC: TCxRTC.IRTCPeerConnectionConstructor,
    name: string,
    onStateChange: () => void,
    options: TCxSSOptions,
    onData?: (data: unknown) => void,
    connectionHandlers?: {
      onConnect?: () => void;
      onDisconnect?: () => void;
    },
  ) {
    this.WS = WS;
    this.RTC = RTC;
    this.name = name;
    this.onStateChange = onStateChange;
    this.options = options;
    this.onData = onData;
    this.connectionHandlers = connectionHandlers;

    // INERT
    // define the WS and RTC classes
    // but don't start anything yet
    // ... that's what register() is for
    this.ssCnxMgr = new TCxConnectionManager(
      this.name,
      this.WS,
      this.RTC,
      this.options,
      this.handleCnxMgrStateChange.bind(this),
      this.receive.bind(this),
      {
        onConnect: this.handleCnxMgrConnection.bind(this),
        onDisconnect: this.handleCnxMgrDisconnection.bind(this),
      },
    );
  }
  register(): Promise<void> {
    return this.ssCnxMgr.registerWithSignalServer();
  }
  private handleCnxMgrConnection(): void {
    this.connectionHandlers?.onConnect?.();
  }
  private handleCnxMgrDisconnection(): void {
    this.connectionHandlers?.onDisconnect?.();
  }
  private handleCnxMgrStateChange(): void {
    this.onStateChange();
  }
  private registerIfNotRegistered(): Promise<void> {
    if (!this.ssCnxMgr) {
      return this.register();
    }
    return Promise.resolve();
  }
  async connectTo(name: string): Promise<void> {
    await this.registerIfNotRegistered();
    this.ssCnxMgr.connectTo(name);
  }
  send(data: unknown): void {
    this.ssCnxMgr.send(JSON.stringify(data));
  }
  private receive(data: unknown): void {
    this.onData?.(JSON.parse(data as string));
  }
  disconnect(): void {
    this.ssCnxMgr?.disconnect();
  }
  closeDataChannel(): void {
    this.ssCnxMgr?.closeDataChannel();
  }
}
