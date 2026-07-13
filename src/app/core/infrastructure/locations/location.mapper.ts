import { Location } from '../../domain/interfaces/location.interface';
import { SimpsonsApiLocationDto } from './location.dto';

export function mapSimpsonsApiLocationToDomain(dto: SimpsonsApiLocationDto): Location {
  return {
    id: dto.id,
    name: dto.name,
    imagePath: dto.image_path,
    town: dto.town,
    use: dto.use,
    description: dto.description,
  };
}
