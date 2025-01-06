import { dalImage } from '@db/dal';
import { ImageAttributes, ImageAttributesInput } from '@db/models';

export default {
  create: async (payload: ImageAttributesInput): Promise<ImageAttributes> => {
    if (payload.dogBreedId) {
      payload.dogBreedId = +payload.dogBreedId;
    }

    const result = await dalImage.create(payload);

    return result;
  }
};
