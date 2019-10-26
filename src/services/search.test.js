import { googleMaps } from './search';

describe('search service', () => {
  it('deve realizar uma busca no google maps', async () => {
    const search = 'São Paulo';
    const placeId = 'ChIJ0WGkg4FEzpQRrlsz_whLqZs';

    const result = await googleMaps(search);

    expect(result.length).toBe(1);
    expect(result[0].place_id).toBe(placeId);
    expect(result[0].formatted_address).toBe(
      'São Paulo, State of São Paulo, Brazil'
    );
  });
});
