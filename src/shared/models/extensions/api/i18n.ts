import { replaceAll } from '@/utils/strings';
import { remote } from 'electron';
import { API } from '.';

let api: API;

// https://developer.chrome.com/extensions/i18n

export class I18n {
  // tslint:disable-next-line
  constructor(_api: API) {
    api = _api;
  }

  public getAcceptLanguages = (cb: any) => {
    if (cb) {
      cb(navigator.languages);
    }
  };

  public getMessage = (messageName: string, substitutions?: any) => {
    if (messageName === '@@ui_locale') return 'en_US';

    const { extensionId } = api.runtime.getManifest();
    const locale = remote.getGlobal('extensionsLocales')[extensionId];
    const substitutionsArray = substitutions instanceof Array;

    const item = locale[messageName];

    if (item == null) return '';
    if (substitutionsArray && substitutions.length >= 9) return null;

    let message = item.message;

    if (typeof item.placeholders === 'object') {
      for (const placeholder in item.placeholders) {
        message = replaceAll(
          message,
          `$${placeholder}$`,
          item.placeholders[placeholder].content,
        );
      }
    }

    if (substitutionsArray) {
      for (let i = 0; i < 9; i++) {
        message = replaceAll(message, `$${i + 1}`, substitutions[i] || ' ');
      }
    }

    return message;
  };

  public getUILanguage = () => {
    return navigator.language;
  };

  public detectLanguage = (text: string, cb: any) => {
    // TODO
    if (cb) {
      cb({
        isReliable: false,
        languages: [],
      });
    }
  };
}
