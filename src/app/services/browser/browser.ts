export interface BrowserOptions {
  width: number;
  height: number;
  popup?: 'yes';
  left: number;
  top: number;
  callback?: (event: any) => any;
}

export enum BrowserTarget {
  _blank = '_blank',
  _self = '_self',
  _parent = '_parent',
  _top = '_top',
}
