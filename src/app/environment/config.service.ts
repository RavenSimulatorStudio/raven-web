import { Injectable } from '@angular/core';

type Config = {
  production: {
    fontPath: string;
  };
  development: {
    fontPath: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: Config = {
    production: {
      fontPath: '/assets/fonts/Pridi/Pridi-Regular.ttf',
    },
    development: {
      fontPath: '../../assets/fonts/Pridi/Pridi-Regular.ttf',
    },
  };

  getConfigValue(variable: keyof Config['production'], isDevelopment: boolean): string {
    const environment = isDevelopment ? 'development' : 'production';
    return this.config[environment][variable];
  }
}
