export interface TemperatureModel {
   id: number;
   sub_section_id: number;
   value: number;
   timestamp: number;
   isInvalid?: boolean;
}
