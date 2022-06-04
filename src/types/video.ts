export interface Video {
  AvailableFrom: string;
  Categories: [Category];
  Description: string;
  Duration: number;
  Guid: string;
  Id: number;
  Images: [Image];
  IsTrialContentAvailable: boolean;
  MediaAgeRestrictionImageUrl: string;
  MediaAgeRestrictionValueMin: number;
  MediaTypeCode: string;
  MediaTypeDisplayName: "VOD";
  Products: [Product];
  Title: string;
  Year: number;
}

interface Image {
  Height: number;
  Id: number;
  ImageTypeCode: string;
  MediaId: number;
  PlatformCode: string;
  Url: string;
  Width: number;
}

interface Category {
  CategoryCode: string;
  CategoryId: number;
  CategoryName: string;
}

interface Product {
  id: number;
}
