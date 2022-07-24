import ipRegex from 'ip-regex';
import { ValidateResponse } from 'types/common';
import cache from 'memory-cache';

class Ip {
  public validate(ip: string | null): ValidateResponse {
    if (ip === null) {
      return {
        valid: false,
        message: 'IP is null',
      };
    }

    if (['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip)) {
      return {
        valid: false,
        message: 'IP is localhost',
      };
    }

    if (ip.length === 0) {
      return {
        valid: false,
        message: 'IP is empty',
      };
    }

    if (ip.length > 15) {
      return {
        valid: false,
        message: 'IP is too long',
      };
    }

    if (ipRegex.v4().test(ip)) {
      return {
        valid: true,
        message: 'IP is IPv4',
      };
    }

    if (ipRegex.v6().test(ip)) {
      return {
        valid: true,
        message: 'IP is IPv6',
      };
    }

    return {
      valid: false,
      message: 'IP is invalid',
    };
  }

  private async vpnapi(ip: string) {
    const data = await (await fetch(`https://vpnapi.io/api/${ip}?key=${process.env.VPNAPI}`)).json();

    return data;
  }

  private async abstract(ip: string) {
    const data = await (await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT}&ip_address=${ip}`)).json();

    return data;
  }

  private async ipapi(ip: string) {
    const data = await (await fetch(`http://ip-api.com/json/${ip}?fields=16904704`)).json();

    return data;
  }

  private async fetchData(ip: string) {
    const cached = cache.get(ip);
    if (cached) return cached;

    const data = await Promise.all([this.vpnapi(ip), this.abstract(ip), this.ipapi(ip)]);

    cache.put(ip, data, 1000 * 60 * 60);

    return data;
  }

  public async lookup(ip: string | null) {
    const vipr = this.validate(ip);

    if (!vipr.valid || ip === null) {
      return {
        error: vipr.message,
      };
    }

    const [vpnapi, abstract, ipapi] = await this.fetchData(ip);

    return {
      ip,
      city: abstract?.city ?? null,
      region: abstract?.region ?? null,
      country: abstract?.country ?? null,
      continent: abstract?.continent ?? null,
      loc: typeof abstract?.longitude === 'number' ? [abstract?.latitude, abstract?.longitude] : [],
      postal: abstract?.postal_code ?? null,
      currency: abstract?.currency?.currency_code ?? null,
      timezone: abstract?.timezone?.name ?? null,
      reverse: ipapi?.reverse ?? null,
      isp: ipapi?.isp ?? null,
      asn: {
        asn: vpnapi?.network?.autonomous_system_number ?? null,
        name: vpnapi?.network?.autonomous_system_organization ?? null,
        route: vpnapi?.network?.network ?? null,
      },
      privacy: { ...(vpnapi?.security ?? {}), hosting: ipapi?.hosting ?? null, cellular: ipapi?.mobile ?? null },
    };
  }
}

export const ip = new Ip();
export default ip;
