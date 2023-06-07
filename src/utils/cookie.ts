export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, props: { expires: any } | undefined = undefined) {
  const currentProps: { expires: any } | {} = props || {};

  let exp;

  if ("expires" in currentProps) {
    exp = currentProps.expires;

    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = currentProps.expires = d;
    }
    if (exp && exp.toUTCString) {
      currentProps.expires = exp.toUTCString();
    }
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in currentProps) {
    updatedCookie += '; ' + propName;
    const propValue = currentProps[propName as keyof typeof currentProps];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
