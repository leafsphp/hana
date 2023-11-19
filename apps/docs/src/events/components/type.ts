export interface Event {
  name: string;
  flyer: string;
  intro: string;
  date: string;
  description: string[];
  topics: string[];
  region: string[];
  location: string[];
  website: {
    text: string;
    url: string;
  }
  contact: string;
}
