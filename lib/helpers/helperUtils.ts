export   function styleValue(pathname:string, intendPath: string, styleValue: string[]) {
    if (pathname === intendPath) {
      return styleValue[0];
    }
    return styleValue[1] || '';
  }


export function milliToMinutes(milli: number) {
  const minutes = Math.floor(milli / 60000);
  const seconds = ((milli % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseFloat(seconds) < 10 ? '0' : ''}${seconds}`;
}