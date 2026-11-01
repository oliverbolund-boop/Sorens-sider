# Sørens sider – designforslag

Seks designforslag til den nye hjemmeside for Sørens hverdagshjælp (IT & hjemmeservice, Kerteminde og omegn).

- `/` – oversigt med alle seks forslag
- `/1` til `/6` – de enkelte forslag

Siderne er skjult for Google (`noindex` i `index.html`).

## Ret indhold

Hvert forslag ligger i sin egen fil i `src/forslag/` (F1.jsx … F6.jsx). Tekster, priser og spørgsmål står i bunden af hver fil i `renderVals()`, og resten af teksterne står direkte i markup'en. Oversigten ligger i `src/Overview.jsx`.

## Kør lokalt

```bash
npm install
npm run dev
```

## Udgiv på Vercel

1. Log ind på vercel.com med GitHub.
2. **Add New → Project**, vælg dette repo, og tryk **Deploy**.
3. Hver gang der bliver pushet til GitHub, opdaterer Vercel siden automatisk.
