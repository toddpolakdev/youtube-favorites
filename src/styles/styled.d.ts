// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    cardBg: string;
    text: string;
    buttonBg: string;
    buttonHover: string;
  }
}
