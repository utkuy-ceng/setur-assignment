import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    border: string;
    cardBg: string;
    buttonText: string;
    secondary: string;
  }
}
