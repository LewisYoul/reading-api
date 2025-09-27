import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('api/reading')
export class ReadingProxyController {
  private readonly baseUrl = 'https://api.reading.gov.uk';

  constructor(private readonly httpService: HttpService) {}

  @Get('rbc/getaddresses/:postcode')
  async getAddresses(@Param('postcode') postcode: string) {
    try {
      console.log(`Proxying address request for postcode: ${postcode}`);
      
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/rbc/getaddresses/${postcode}`)
      );
      
      return response.data;
    } catch (error) {
      console.error('Error proxying address request:', error.message);
      
      if (error.response) {
        throw new HttpException(
          error.response.data || 'Failed to fetch addresses',
          error.response.status
        );
      }
      
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('api/collections/:uprn')
  async getCollections(@Param('uprn') uprn: string) {
    try {
      console.log(`Proxying collections request for UPRN: ${uprn}`);
      
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/api/collections/${uprn}`)
      );
      
      return response.data;
    } catch (error) {
      console.error('Error proxying collections request:', error.message);
      
      if (error.response) {
        throw new HttpException(
          error.response.data || 'Failed to fetch collections',
          error.response.status
        );
      }
      
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
