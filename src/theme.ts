import { createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#e7f5ff',
  '#d0e9ff',
  '#a6d5ff',
  '#79bfff',
  '#57acff',
  '#3d9fff',
  '#2b96ff',
  '#1a7fd6',
  '#0e6dc1',
  '#005bab'
];

export const theme = createTheme({
  primaryColor: 'myColor',
  colors: {
    myColor,
  },
  fontFamily: 'Verdana, sans-serif',
  defaultRadius: 'md',
  
  // Add any other theme customizations here
  // You can use the `light` and `dark` properties to specify different values for light and dark modes
  // For example:
  // components: {
  //   Button: {
  //     styles: (theme) => ({
  //       root: {
  //         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  //       },
  //     }),
  //   },
  // },
});