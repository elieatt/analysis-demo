import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { DataSyncService } from './data-sync.service';

@ApiTags('Data Sync')
@Controller('data-sync')
export class DataSyncController {
  constructor(private readonly dataSyncService: DataSyncService) {}

  @ApiOperation({
    summary: 'Manually re-sync data from the API to the database',
  })
  @ApiCreatedResponse({
    description: 'Synchronization completed successfully.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to synchronize data.',
  })
  @Post('')
  async reSync() {
    const result = await this.dataSyncService.syncDB();

    if (!result) {
      throw new HttpException(
        { success: false, message: 'Failed to synchronize data' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }
}
