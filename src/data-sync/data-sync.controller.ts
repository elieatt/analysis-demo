import { Controller, Post } from '@nestjs/common';
import { DataSyncService } from './data-sync.service';

@Controller('data-sync')
export class DataSyncController {
  constructor(private readonly dataSyncService: DataSyncService) {}
  @Post('/refresh')
  reSync() {
    return this.dataSyncService.syncDB();
  }
}
