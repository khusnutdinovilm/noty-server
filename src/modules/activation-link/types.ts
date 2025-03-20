export interface IActivationLinkModel {
  _id: string;
  userId: string;
  link: string;
}

export interface IActivationLinkDto extends Omit<IActivationLinkModel, "_id"> {
  id: string;
}
