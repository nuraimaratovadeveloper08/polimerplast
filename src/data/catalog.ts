import schemeCourier from '../assets/catalog/scheme-courier.png';
import schemeZip from '../assets/catalog/scheme-zip.png';
import schemeVacuum from '../assets/catalog/scheme-vacuum.png';
import schemeDoypack from '../assets/catalog/scheme-doypack.png';
import schemeBopp from '../assets/catalog/scheme-bopp.png';
import schemeMeshki from '../assets/catalog/scheme-meshki.png';
import photoMaikaGalmart from '../assets/catalog/maika-galmart.jpg';
import photoMaikaVkusmart from '../assets/catalog/maika-vkusmart.jpg';
import photoZipHandle from '../assets/catalog/zip-lock-handle.jpeg';
import photoVosmishov from '../assets/catalog/vosmishov.jpg';
import photoMusor from '../assets/catalog/musor.png';
import photoMusorKlassB from '../assets/catalog/musor-klass-b.png';

export type CategoryId = 'retail' | 'delivery' | 'food' | 'sacks' | 'garbage';

export type ProductId =
  | 'maikaGalmart'
  | 'maikaVkusmart'
  | 'courier'
  | 'valve'
  | 'zip'
  | 'zipHandle'
  | 'slider'
  | 'vacuum'
  | 'doypack'
  | 'vosmishov'
  | 'bopp'
  | 'meshki'
  | 'musor'
  | 'musorKlassB';

export interface Product {
  id: ProductId;
  category: CategoryId;
  scheme?: string;
  photo?: string;
  // contain — показать фото целиком (для вытянутых снимков)
  photoFit?: 'cover' | 'contain';
  // Размеры в сантиметрах: ширина x высота + складка
  sizes?: string[];
}

export const categoryIds: CategoryId[] = ['retail', 'delivery', 'food', 'sacks', 'garbage'];

export const products: Product[] = [
  { id: 'maikaGalmart', category: 'retail', photo: photoMaikaGalmart, photoFit: 'contain' },
  { id: 'maikaVkusmart', category: 'retail', photo: photoMaikaVkusmart, photoFit: 'contain' },
  { id: 'courier', category: 'delivery', scheme: schemeCourier, sizes: ['28x36+4', '38x47+4', '45x55+4', '55x65+4'] },
  { id: 'valve', category: 'delivery', scheme: schemeCourier, sizes: ['26x35+4', '30x40+4', '35x45+4', '45x60+4'] },
  { id: 'zip', category: 'delivery', scheme: schemeZip, sizes: ['6x9', '8x12', '10x15', '13x19'] },
  { id: 'zipHandle', category: 'delivery', photo: photoZipHandle, sizes: ['15x20+4', '23x28+4', '28x35+4', '38x44+4'] },
  { id: 'slider', category: 'delivery', scheme: schemeZip, sizes: ['26x35', '30x40', '35x45', '45x62'] },
  { id: 'vacuum', category: 'food', scheme: schemeVacuum, sizes: ['15x25', '18x26', '22x32', '24x36'] },
  { id: 'doypack', category: 'food', scheme: schemeDoypack },
  { id: 'vosmishov', category: 'food', photo: photoVosmishov, sizes: ['10x20+6', '14x24+6', '18x28+8', '20x30+8'] },
  { id: 'bopp', category: 'food', scheme: schemeBopp },
  { id: 'meshki', category: 'sacks', scheme: schemeMeshki },
  { id: 'musor', category: 'garbage', photo: photoMusor },
  { id: 'musorKlassB', category: 'garbage', photo: photoMusorKlassB, photoFit: 'contain' }
];
