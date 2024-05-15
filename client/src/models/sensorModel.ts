export interface AuthorizedSensor {}

export interface UnauthorizedSensor {
   sensor_name: string;
   sensor_token: string;
   timestamp: number;
}
