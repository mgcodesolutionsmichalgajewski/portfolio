# MG Code Solutions — portfolio

Jednostronicowa wizytówka Michała Gajewskiego zbudowana w React i Vite.

## Uruchomienie

Wymagany Node.js 22 lub nowszy.

```bash
npm install
npm run dev
```

Wersję produkcyjną utworzysz poleceniem `npm run build`. Gotowe pliki znajdziesz w `dist/`.

Formularz kontaktowy korzysta z FormSubmit. Adres odbiorcy wymaga jednorazowej aktywacji po pierwszym wysłaniu wiadomości.

## Formatowanie kodu

Projekt używa Prettier. Uruchom `npm run format`, aby sformatować pliki, lub `npm run format:check`, aby sprawdzić ich format bez zmian.

## Struktura kodu

- `src/App.tsx` — układ strony i stan galerii.
- `src/components/` — osobne sekcje strony, formularz i modal galerii.
- `src/data/` — nawigacja, technologie i lista zrzutów ekranu.
- `src/styles.css` — style strony.

## Publikacja

Zmiany wysłane do gałęzi `main` są publikowane przez GitHub Actions.
