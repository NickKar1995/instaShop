export interface Landmark {
  title: 'string';
  createdAt: 'string';
  updatedAt: 'string';
  url: 'string';
  short_info: 'string';
  photo: IPhoto;
  photo_thumb: IPhoto;
  location: number[];
  objectId: 'string';
}

interface IPhoto {
  url: 'string';
  name: 'string';
}
