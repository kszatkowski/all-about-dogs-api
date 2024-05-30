import { dalImage } from 'src/db/dal';
import { ImageAttributes, ImageAttributesInput } from 'src/db/models/Image';

export default {
  create: async (payload: ImageAttributesInput): Promise<ImageAttributes> => {
    if (payload.dogBreedId) {
      payload.dogBreedId = +payload.dogBreedId;
    }

    const result = await dalImage.create(payload);

    return result;
  }
};
