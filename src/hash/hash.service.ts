import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class HashService {
  public hashString(password: string) {
    const hash = createHash('sha256');
    hash.update(password);
    return hash.digest().toString();
  }
}
