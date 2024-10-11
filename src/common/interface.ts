export interface ValidationRule {
  validator: (value: any) => boolean;
  message: string | ((value: any) => string);
  optional?: boolean;
}
