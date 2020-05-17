declare module "config" {
  export interface Config {
    API_URL: string;
  }
  const config: Config;
  export default config;
}
