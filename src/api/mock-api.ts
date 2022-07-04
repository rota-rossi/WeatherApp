import {createServer, Response} from 'miragejs';
import {Server} from 'miragejs/server';
import {cities} from '../../samples/cities';
import {config} from '../config';

let server: Server;

export const initializeMockServer = () => {
  if (server) {
    server.shutdown();
  }
  server = createServer({
    routes() {
      this.urlPrefix = config.weatherURL;
      this.get('http://localhost:5000/cities', async () => {
        return cities;
      });
      this.get('/geo/1.0/direct', (_, request) => {
        const query = request.queryParams?.q;
        if (query) {
          console.log({query});
          const [cityName, countryCode] = query.split(',');
          const response = cities.filter(
            city => city.name === cityName && city.country === countryCode,
          );
          return response.length ? response : [cities[0]];
        } else {
          return new Response(
            400,
            {},
            {cod: '400', message: 'Nothing to geocode'},
          );
        }
      });

      this.passthrough('/data/2.5/forecast');
      this.passthrough('/geo/1.0/reverse');
    },
  });

  return server;
};
