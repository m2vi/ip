import Container from '@components/Container';
import ErrorText from '@components/Error';
import ip from 'apis/ip';
import type { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getClientIp } from 'request-ip';
import { Marker, MapContainer, TileLayer, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';

import dynamic from 'next/dynamic';
import Text from '@components/Text';
import Group from '@components/Group';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const Home = (props: { data: any }) => {
  const [data, setData] = useState<any>(props.data);

  useEffect(() => {
    console.log(data);
  });

  return (
    <Container>
      {data?.error ? (
        <ErrorText message='IP is invalid' />
      ) : data?.ip ? (
        <div className='grid grid-cols-12 h-full'>
          <div className='col-span-8 p-5 h-full'>
            <Text label='IP Address' value={data?.ip} />

            <Text label='Location' value={data?.loc?.join(', ')} />

            <Group>
              <Text label='Timezone' value={data?.timezone} />
              <Text label='Currency' value={data?.currency} />
            </Group>

            <Group>
              <Text label='City' value={data?.city} />
              <Text label='Region' value={data?.region} />
              <Text label='Country' value={data?.country} />
            </Group>

            <Group>
              <Text label='ASN' value={data?.asn?.asn} />
              <Text label='Name' value={data?.asn?.name} />
              <Text label='Route' value={data?.asn?.route} />
            </Group>

            <Group>
              <Text label='Proxy' value={data?.privacy?.proxy} />
              <Text label='Relay' value={data?.privacy?.relay} />
              <Text label='Tor' value={data?.privacy?.tor} />
              <Text label='VPN' value={data?.privacy?.vpn} />
            </Group>
          </div>
          <div className='col-span-4 h-full bg-primary-700'>{data?.loc?.length !== 0 && <Map loc={data?.loc} />}</div>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await ip.lookup(
    context.query.query?.toString() || (ip.validate(getClientIp(context.req)).valid ? getClientIp(context.req) : process.env.IP_FALLBACK!)
  );

  return {
    props: {
      data: data,
    },
  };
};
