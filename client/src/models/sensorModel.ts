export interface Sensor {
   id: number;
   sensor_name: string;
   sensor_token: string;
   sub_section_id: number;
   last_auth_attempt: number;
   last_data_update: number;
   authorized: boolean;
}
