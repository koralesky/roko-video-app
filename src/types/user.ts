import { Device } from "./device";

export interface User {
  username: string;
  password: string;
  device: Device;
}
