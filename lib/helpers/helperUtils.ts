export   function styleValue(pathname:string, intendPath: string, styleValue: string[]) {
    if (pathname === intendPath) {
      return styleValue[0];
    }
    return styleValue[1] || '';
  }