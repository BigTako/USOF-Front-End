import { createGlobalStyle } from 'styled-components';

/*
--- 01 TYPOGRAPHY SYSTEM

- Font sizes (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

- Font weights
Default: 400
Medium: 500
Semi-bold: 600
Bold: 700

- Line heights
Default: 1
Small: 1.05
Medium: 1.2
Paragraph default: 1.6
Large: 1.8

- Letter spacing
-0.5px
0.75px

--- 02 COLORS


--- 05 SHADOWS

0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);

--- 06 BORDER-RADIUS

Default: 9px
Medium: 11px

--- 07 WHITESPACE

- Spacing system (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/

const GlobalStyles = createGlobalStyle`
:root {
  --main-header-offset: 2.4rem;
  --general-border-radius: 0.5rem;
  --button-border-radius: 2rem;
  --container-offset: 2rem;
  --container-padding: 1.6rem;

  --page-layout-offset: 2rem;

  &, &.light-mode {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f8fafc;
  --color-grey-100: #f1f5f9;
  --color-grey-200: #e2e8f0;
  --color-grey-300: #cbd5e1;
  --color-grey-400: #94a3b8;
  --color-grey-500: #64748b;
  --color-grey-600: #475569;
  --color-grey-700: #334155;
  --color-grey-800: #1e293b;
  --color-grey-900: #0f172a;
  --color-grey-950: #020617;

  --table-header-color: #020617;
  --table-header-font-color: #fff;
  --table-font-color: #020617;
  --table-body-color: #fff;
  }

  &.dark-mode {
    --color-grey-0: #0f172a;
    --color-grey-50: #0f172a;
    --color-grey-100: #1e293b;
    --color-grey-200: #334155;
    --color-grey-300: #4b5563;
    --color-grey-400: #475569;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;
    --color-grey-950: #cbd5e1;


    --table-header-color: #020617;
    --table-header-font-color: #cbd5e1;
    --table-font-color: #cbd5e1;
    --table-body-color: #475569;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;

    body {
      background-color: var(--color-grey-100);
    }

    .modal-content {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
      background-color: var(--color-grey-100);
      color: var(--color-grey-950);
    }
  }

  --color-error: #ef4444;
}

*,
  *::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Comfortaa', sans-serif;
  /* font-family: 'Comfortified', sans-serif; */
  background-color: var(--color-grey-200);
  color: var(--color-grey-950);
  overflow-x: hidden;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  transition: color 0.3s, background-color 0.3s;
}

strong {
  font-weight: 700;
}

input,
button,
textarea,
select {
  font-size: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

textarea {
  background-color: inherit;
  color: inherit;
}

input:active,select:active {
  outline: none;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: none;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
  border: none;
  outline: none;
}

a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
  margin: 0;
}

img {
  max-width: 100%;

  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: inherit;
  
}

h1 {
  font-size: 3.4rem;
}

h2 {
  font-size: 2.4rem;
}

h3 {
  font-size: 2rem;
}
h4 {
  font-size: 1.6rem;
}

h5 {
  font-size: 1.4rem;
}

h6 {
  font-size: 1.2rem;
}

/* .modal {
  background-color: var(--color-grey-0);
  color: var(--color-grey-950);
} */

.modal-70w {
  min-width: 70%;
  padding: 0;
}

.modal-90w {
  min-width: 90%;
  padding: 0;
}

.rounded--shadow {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 576px) {
  html {
  font-size: 56.25%;
}
}
@media (max-width: 1199px) {
  .modal-open .modal {
    padding-left: 0 !important;
  }

  
}
`;

export default GlobalStyles;
